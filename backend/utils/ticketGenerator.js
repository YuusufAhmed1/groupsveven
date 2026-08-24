const crypto = require('crypto');

const generateTicketId = () =>
  `TKT-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

const generateQrToken = () => crypto.randomBytes(32).toString('hex');

const createTicketDocuments = (booking, quantity) =>
  Array.from({ length: quantity }, () => ({
    ticketId: generateTicketId(),
    user: booking.user,
    event: booking.event,
    ticketType: booking.ticketType,
    booking: booking._id,
    qrToken: generateQrToken(),
  }));

module.exports = { createTicketDocuments };