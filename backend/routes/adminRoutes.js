const express = require('express');
const { getUsers, getEvents, getTickets, getStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));
router.get('/users', getUsers);
router.get('/events', getEvents);
router.get('/tickets', getTickets);
router.get('/stats', getStats);

module.exports = router;
