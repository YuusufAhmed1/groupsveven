const express = require('express');
const { getStats } = require('../controllers/organizerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, authorize('organizer'), getStats);

module.exports = router;
