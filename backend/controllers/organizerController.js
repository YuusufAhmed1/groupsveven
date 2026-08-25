const Event = require('../models/Event');
const TicketType = require('../models/TicketType');
const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');

const getStats = async (req, res, next) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).select('_id');
    const eventIds = events.map((event) => event._id);

    const [ticketTypes, checkedInAttendees, revenueResult] = await Promise.all([
      TicketType.find({ event: { $in: eventIds } }).select('quantity soldQuantity'),
      Ticket.countDocuments({ event: { $in: eventIds }, checkedIn: true }),
      Booking.aggregate([
        {
          $match: {
            event: { $in: eventIds },
            paymentStatus: 'successful',
            status: 'confirmed',
          },
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
    ]);

    const totalTicketsSold = ticketTypes.reduce((total, ticketType) => total + ticketType.soldQuantity, 0);
    const totalAvailableTickets = ticketTypes.reduce(
      (total, ticketType) => total + ticketType.quantity - ticketType.soldQuantity,
      0
    );

    res.status(200).json({
      success: true,
      stats: {
        totalEvents: events.length,
        totalTicketsSold,
        totalAvailableTickets,
        checkedInAttendees,
        totalRevenue: revenueResult[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };
