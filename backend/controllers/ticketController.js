const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');

const ticketDetails = (ticket) => ({
  ticketId: ticket.ticketId,
  attendee: {
    name: ticket.user.name,
    email: ticket.user.email,
  },
  event: {
    title: ticket.event.title,
    date: ticket.event.date,
    location: ticket.event.location,
  },
  ticketType: ticket.ticketType.name,
  checkedIn: ticket.checkedIn,
  checkedInAt: ticket.checkedInAt,
});

const getTicketWithDetails = (query) =>
  query
    .populate('user', 'name email')
    .populate('event', 'title date location organizer')
    .populate('ticketType', 'name');

const getMyTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id })
      .populate('event', 'title date startTime endTime location image')
      .populate('ticketType', 'name price')
      .populate('booking', 'quantity totalAmount paymentStatus status')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: tickets.length, tickets });
  } catch (error) {
    next(error);
  }
};

const getTicketById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(req.params.id)
      .populate('event', 'title date startTime endTime location image')
      .populate('ticketType', 'name price')
      .populate('booking', 'quantity totalAmount paymentStatus status');

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You do not own this ticket' });
    }

    return res.status(200).json({ success: true, ticket });
  } catch (error) {
    next(error);
  }
};

const verifyTicket = async (req, res, next) => {
  try {
    const { qrToken } = req.body;
    if (!qrToken || !String(qrToken).trim()) {
      return res.status(400).json({ success: false, message: 'QR token is required' });
    }

    const ticket = await getTicketWithDetails(Ticket.findOne({ qrToken: String(qrToken).trim() }));
    if (!ticket) {
      return res.status(404).json({ success: false, status: 'invalid', message: 'Invalid ticket' });
    }

    if (ticket.event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'You are not authorized to manage this event' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({ success: false, status: 'cancelled', message: 'Ticket has been cancelled' });
    }

    if (ticket.checkedIn || ticket.status === 'checked_in') {
      return res.status(400).json({
        success: false,
        status: 'already_used',
        message: 'Ticket already used',
        ticket: ticketDetails(ticket),
      });
    }

    const checkedInTicket = await getTicketWithDetails(
      Ticket.findOneAndUpdate(
        { _id: ticket._id, status: 'valid', checkedIn: false },
        { $set: { status: 'checked_in', checkedIn: true, checkedInAt: new Date() } },
        { returnDocument: 'after' }
      )
    );

    if (!checkedInTicket) {
      const latestTicket = await getTicketWithDetails(Ticket.findById(ticket._id));
      if (latestTicket && (latestTicket.checkedIn || latestTicket.status === 'checked_in')) {
        return res.status(400).json({
          success: false,
          status: 'already_used',
          message: 'Ticket already used',
          ticket: ticketDetails(latestTicket),
        });
      }

      return res.status(400).json({ success: false, message: 'Ticket could not be checked in' });
    }

    return res.status(200).json({
      success: true,
      status: 'checked_in',
      message: 'Checked In Successfully',
      ticket: ticketDetails(checkedInTicket),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyTickets, getTicketById, verifyTicket };
