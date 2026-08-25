const express = require('express');
const {
  createTicketType,
  getTicketTypesForEvent,
  updateTicketType,
  deleteTicketType,
} = require('../controllers/ticketTypeController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/types', protect, authorize('organizer'), createTicketType);
router.get('/types/:eventId', getTicketTypesForEvent);
router.put('/types/:id', protect, authorize('organizer'), updateTicketType);
router.delete('/types/:id', protect, authorize('organizer'), deleteTicketType);

module.exports = router;
