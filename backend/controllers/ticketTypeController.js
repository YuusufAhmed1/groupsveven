const mongoose = require('mongoose');
const Event = require('../models/Event');
const TicketType = require('../models/TicketType');

const isValidId = (id) => mongoose.isValidObjectId(id);

const formatTicketType = (ticketType) => {
  const ticket = ticketType.toObject ? ticketType.toObject() : ticketType;
  const remaining = ticket.quantity - ticket.soldQuantity;

  return {
    ...ticket,
    remaining,
    availabilityStatus: remaining === 0 ? 'sold out' : 'available',
  };
};

const getOwnedEvent = async (eventId, user, res) => {
  if (!isValidId(eventId)) {
    res.status(400).json({ success: false, message: 'Invalid event ID' });
    return null;
  }

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404).json({ success: false, message: 'Event not found' });
    return null;
  }

  if (event.organizer.toString() !== user._id.toString()) {
    res.status(403).json({ success: false, message: 'You do not own this event' });
    return null;
  }

  return event;
};

const createTicketType = async (req, res, next) => {
  try {
    const { eventId, name, price, quantity } = req.body;
    if (!eventId || !name || price === undefined || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Event ID, name, price, and quantity are required' });
    }

    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ success: false, message: 'Price must be a non-negative number' });
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be a whole number greater than 0' });
    }

    const event = await getOwnedEvent(eventId, req.user, res);
    if (!event) return;

    const ticketType = await TicketType.create({ event: event._id, name, price, quantity });
    return res.status(201).json({ success: true, message: 'Ticket type created successfully', ticketType: formatTicketType(ticketType) });
  } catch (error) {
    next(error);
  }
};

const getTicketTypesForEvent = async (req, res, next) => {
  try {
    if (!isValidId(req.params.eventId)) {
      return res.status(400).json({ success: false, message: 'Invalid event ID' });
    }

    const eventExists = await Event.exists({ _id: req.params.eventId });
    if (!eventExists) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const ticketTypes = await TicketType.find({ event: req.params.eventId }).sort({ price: 1 });
    return res.status(200).json({
      success: true,
      count: ticketTypes.length,
      ticketTypes: ticketTypes.map(formatTicketType),
    });
  } catch (error) {
    next(error);
  }
};

const getOwnedTicketType = async (ticketTypeId, user, res) => {
  if (!isValidId(ticketTypeId)) {
    res.status(400).json({ success: false, message: 'Invalid ticket type ID' });
    return null;
  }

  const ticketType = await TicketType.findById(ticketTypeId);
  if (!ticketType) {
    res.status(404).json({ success: false, message: 'Ticket type not found' });
    return null;
  }

  const event = await getOwnedEvent(ticketType.event, user, res);
  if (!event) return null;

  return ticketType;
};

const updateTicketType = async (req, res, next) => {
  try {
    if (Object.hasOwn(req.body, 'event') || Object.hasOwn(req.body, 'eventId') || Object.hasOwn(req.body, 'soldQuantity')) {
      return res.status(400).json({ success: false, message: 'Event and sold quantity cannot be changed' });
    }

    const ticketType = await getOwnedTicketType(req.params.id, req.user, res);
    if (!ticketType) return;

    const { name, price, quantity } = req.body;
    if (price !== undefined && (!Number.isFinite(Number(price)) || Number(price) < 0)) {
      return res.status(400).json({ success: false, message: 'Price must be a non-negative number' });
    }

    if (quantity !== undefined && (!Number.isInteger(Number(quantity)) || Number(quantity) < ticketType.soldQuantity || Number(quantity) < 1)) {
      return res.status(400).json({ success: false, message: 'Quantity must be a whole number and cannot be less than sold quantity' });
    }

    if (name === undefined && price === undefined && quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Provide name, price, or quantity to update' });
    }

    if (name !== undefined) ticketType.name = name;
    if (price !== undefined) ticketType.price = price;
    if (quantity !== undefined) ticketType.quantity = quantity;
    await ticketType.save();

    return res.status(200).json({ success: true, message: 'Ticket type updated successfully', ticketType: formatTicketType(ticketType) });
  } catch (error) {
    next(error);
  }
};

const deleteTicketType = async (req, res, next) => {
  try {
    const ticketType = await getOwnedTicketType(req.params.id, req.user, res);
    if (!ticketType) return;

    await ticketType.deleteOne();
    return res.status(200).json({ success: true, message: 'Ticket type deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTicketType, getTicketTypesForEvent, updateTicketType, deleteTicketType };
