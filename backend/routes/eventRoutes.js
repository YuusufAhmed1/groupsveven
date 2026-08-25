const express = require('express');
const {
  createEvent,
  getPublishedEvents,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
  publishEvent,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getPublishedEvents);
router.get('/my-events', protect, authorize('organizer'), getMyEvents);
router.post('/', protect, authorize('organizer'), createEvent);
router.get('/:id', getEventById);
router.put('/:id', protect, authorize('organizer'), updateEvent);
router.delete('/:id', protect, authorize('organizer'), deleteEvent);
router.patch('/:id/publish', protect, authorize('organizer'), publishEvent);

module.exports = router;
