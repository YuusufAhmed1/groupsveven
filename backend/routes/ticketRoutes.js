const express = require('express');
const { getMyTickets, getTicketById, verifyTicket } = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/my-tickets', protect, getMyTickets);
router.post('/verify', protect, authorize('organizer'), verifyTicket);
router.get('/:id', protect, getTicketById);

module.exports = router;
