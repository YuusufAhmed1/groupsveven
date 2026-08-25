const User = require('../models/User');
const Event = require('../models/Event');
const TicketType = require('../models/TicketType');
const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('name email role createdAt').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name email')
      .sort({ date: -1 });

    const ticketTypes = await TicketType.find().select('event name price quantity soldQuantity');
    const ticketTypesByEvent = ticketTypes.reduce((result, ticketType) => {
      const eventId = ticketType.event.toString();
      if (!result[eventId]) result[eventId] = [];
      result[eventId].push({
        name: ticketType.name,
        price: ticketType.price,
        quantity: ticketType.quantity,
        soldQuantity: ticketType.soldQuantity,
        remaining: ticketType.quantity - ticketType.soldQuantity,
      });
      return result;
    }, {});

    const eventData = events.map((event) => ({
      id: event._id,
      title: event.title,
      category: event.category,
      date: event.date,
      location: event.location,
      status: event.status,
      organizer: event.organizer,
      ticketTypes: ticketTypesByEvent[event._id.toString()] || [],
    }));

    res.status(200).json({ success: true, count: eventData.length, events: eventData });
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find()
      .select('ticketId status checkedIn checkedInAt user event ticketType createdAt')
      .populate('user', 'name email')
      .populate('event', 'title date location')
      .populate('ticketType', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tickets.length, tickets });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalOrganizers, totalEvents, totalTickets, checkedInTickets, totalBookings, successfulPayments] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'organizer' }),
      Event.countDocuments(),
      Ticket.countDocuments(),
      Ticket.countDocuments({ checkedIn: true }),
      Booking.countDocuments(),
      Payment.countDocuments({ status: 'successful' }),
    ]);

    res.status(200).json({
      success: true,
      stats: { totalUsers, totalOrganizers, totalEvents, totalTickets, checkedInTickets, totalBookings, successfulPayments },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getEvents, getTickets, getStats };
