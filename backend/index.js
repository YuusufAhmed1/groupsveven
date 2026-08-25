require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const ticketTypeRoutes = require('./routes/ticketTypeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const adminRoutes = require('./routes/adminRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const errorHandler = require('./middleware/errorMiddleware');

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  throw new Error('MONGO_URI and JWT_SECRET must be configured in .env');
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Event & Ticket Management API is running',
    healthCheck: '/api/health',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketTypeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/organizer', organizerRoutes);
app.use(errorHandler);

const port = process.env.PORT || 9500;

const startServer = async () => {
  await connectDB();


  
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

startServer();
