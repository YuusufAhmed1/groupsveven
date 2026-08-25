require('dotenv').config();

const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');
const { createTicketDocuments } = require('../utils/ticketGenerator');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const indexes = await Ticket.collection.indexes();
    if (indexes.some((index) => index.name === 'booking_1')) {
      await Ticket.collection.dropIndex('booking_1');
      console.log('Removed old one-ticket-per-booking index.');
    }

    const confirmedBookings = await Booking.find({ paymentStatus: 'successful', status: 'confirmed' });
    let createdTickets = 0;

    for (const booking of confirmedBookings) {
      const existingCount = await Ticket.countDocuments({ booking: booking._id });
      const missingQuantity = Math.max(booking.quantity - existingCount, 0);

      if (missingQuantity > 0) {
        await Ticket.insertMany(createTicketDocuments(booking, missingQuantity));
        createdTickets += missingQuantity;
      }
    }

    console.log(`Ticket backfill complete. Created ${createdTickets} ticket(s).`);
    await mongoose.disconnect();
  } catch (error) {
    console.error(`Ticket backfill failed: ${error.message}`);
    await mongoose.disconnect();
    process.exit(1);
  }
};

run();
