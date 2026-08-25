const crypto = require('crypto');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const Ticket = require('../models/Ticket');
const { createTicketDocuments } = require('../utils/ticketGenerator');

const generateTransactionId = () => `DEMO-${crypto.randomUUID()}`;

const isDemoCardValid = (cardNumber) => /^\d{12,19}$/.test(String(cardNumber).replace(/[\s-]/g, ''));

const processDemoPayment = async (req, res, next) => {
  try {
    const { bookingId, cardName, cardNumber, expiryDate, cvv } = req.body;
    if (!bookingId || !cardName || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ success: false, message: 'Booking ID and demo card details are required' });
    }

    if (!mongoose.isValidObjectId(bookingId)) {
      return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You do not own this booking' });
    }

    if (booking.status !== 'pending' || booking.paymentStatus !== 'pending') {
      return res.status(400).json({ success: false, message: 'This booking has already been processed' });
    }

    const amount = booking.totalAmount;
    if (!isDemoCardValid(cardNumber)) {
      await Payment.create({
        booking: booking._id,
        amount,
        status: 'failed',
        transactionId: generateTransactionId(),
      });

      return res.status(400).json({
        success: false,
        message: 'Demo payment failed. Use a valid demo card number.',
      });
    }

    const payment = await Payment.create({
      booking: booking._id,
      amount,
      status: 'successful',
      transactionId: generateTransactionId(),
    });

    const confirmedBooking = await Booking.findOneAndUpdate(
      { _id: booking._id, user: req.user._id, paymentStatus: 'pending', status: 'pending' },
      { $set: { paymentStatus: 'successful', status: 'confirmed' } },
      { returnDocument: 'after' }
    );

    if (!confirmedBooking) {
      await payment.deleteOne();
      return res.status(400).json({ success: false, message: 'This booking has already been processed' });
    }

    const tickets = await Ticket.insertMany(createTicketDocuments(confirmedBooking, confirmedBooking.quantity));

    return res.status(200).json({
      success: true,
      message: 'Demo payment successful',
      transactionId: payment.transactionId,
      bookingId: confirmedBooking._id,
      amount: payment.amount,
      ticket: {
        id: tickets[0]._id,
        ticketId: tickets[0].ticketId,
        qrToken: tickets[0].qrToken,
        status: tickets[0].status,
      },
      tickets: tickets.map((ticket) => ({
        id: ticket._id,
        ticketId: ticket.ticketId,
        qrToken: ticket.qrToken,
        status: ticket.status,
      })),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { processDemoPayment };
