const mongoose = require('mongoose');
const Event = require('../models/Event');
const TicketType = require('../models/TicketType');
const Booking = require('../models/Booking');

const createBooking = async (req, res, next) => {
  try {
    const { eventId, ticketTypeId, quantity } = req.body;
    if (!eventId || !ticketTypeId || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Event ID, ticket type ID, and quantity are required' });
    }

    if (!mongoose.isValidObjectId(eventId) || !mongoose.isValidObjectId(ticketTypeId)) {
      return res.status(400).json({ success: false, message: 'Invalid event ID or ticket type ID' });
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be a whole number greater than 0' });
    }

    const requestedQuantity = Number(quantity);
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.status !== 'published') {
      return res.status(400).json({ success: false, message: 'Tickets can only be booked for published events' });
    }

    const ticketType = await TicketType.findById(ticketTypeId);
    if (!ticketType) {
      return res.status(404).json({ success: false, message: 'Ticket type not found' });
    }

    if (ticketType.event.toString() !== event._id.toString()) {
      return res.status(400).json({ success: false, message: 'Ticket type does not belong to this event' });
    }

    const remaining = ticketType.quantity - ticketType.soldQuantity;
    if (requestedQuantity > remaining) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      event: event._id,
      ticketType: ticketType._id,
      quantity: requestedQuantity,
      totalAmount: ticketType.price * requestedQuantity,
    });

    const updatedTicketType = await TicketType.findOneAndUpdate(
      {
        _id: ticketType._id,
        $expr: { $gte: [{ $subtract: ['$quantity', '$soldQuantity'] }, requestedQuantity] },
      },
      { $inc: { soldQuantity: requestedQuantity } },
      { new: true }
    );

    if (!updatedTicketType) {
      await booking.deleteOne();
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully. Payment is pending.',
      booking,
      ticketAvailability: {
        remaining: updatedTicketType.quantity - updatedTicketType.soldQuantity,
        status: updatedTicketType.quantity === updatedTicketType.soldQuantity ? 'sold out' : 'available',
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event', 'title date location')
      .populate('ticketType', 'name price')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

const getEventBookings = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.eventId)) {
      return res.status(400).json({ success: false, message: 'Invalid event ID' });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You do not own this event' });
    }

    const bookings = await Booking.find({ event: event._id })
      .populate('user', 'name email')
      .populate('ticketType', 'name price')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getMyBookings, getEventBookings };
