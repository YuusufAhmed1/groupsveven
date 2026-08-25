const express = require('express');
const { processDemoPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/demo', protect, processDemoPayment);

module.exports = router;
