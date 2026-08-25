const express = require('express');
const { createBooking, getMyBookings, getEventBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/event/:eventId', protect, authorize('organizer'), getEventBookings);

module.exports = router;
