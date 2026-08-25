const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    ticketType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TicketType',
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    qrToken: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['valid', 'checked_in', 'cancelled'],
      default: 'valid',
    },
    checkedIn: {
      type: Boolean,
      default: false,
    },
    checkedInAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
