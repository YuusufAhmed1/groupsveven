const mongoose = require('mongoose');
const Event = require('../models/Event');

const eventFields = ['title', 'description', 'category', 'date', 'startTime', 'endTime', 'location', 'image'];

const isValidEventId = (id) => mongoose.isValidObjectId(id);

const getEventOrRespond = async (id, res) => {
  if (!isValidEventId(id)) {
    res.status(400).json({ success: false, message: 'Invalid event ID' });
    return null;
  }

  const event = await Event.findById(id);
  if (!event) {
    res.status(404).json({ success: false, message: 'Event not found' });
    return null;
  }

  return event;
};

const ensureOwner = (event, user, res) => {
  if (event.organizer.toString() !== user._id.toString()) {
    res.status(403).json({ success: false, message: 'You do not own this event' });
    return false;
  }

  return true;
};

const createEvent = async (req, res, next) => {
  try {
    const { title, description, category, date, startTime, endTime, location, image } = req.body;
    if (!title || !description || !category || !date || !startTime || !endTime || !location) {
      return res.status(400).json({ success: false, message: 'Title, description, category, date, start time, end time, and location are required' });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      startTime,
      endTime,
      location,
      image,
      organizer: req.user._id,
      status: 'published',
    });

    return res.status(201).json({ success: true, message: 'Event created and published successfully', event });
  } catch (error) {
    next(error);
  }
};

const getPublishedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ status: 'published' })
      .populate('organizer', 'name')
      .sort({ date: 1, startTime: 1 });

    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    next(error);
  }
};

const getEventById = async (req, res, next) => {
  try {
    if (!isValidEventId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid event ID' });
    }

    const event = await Event.findById(req.params.id).populate('organizer', 'name');
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    if (Object.hasOwn(req.body, 'organizer') || Object.hasOwn(req.body, 'status')) {
      return res.status(400).json({ success: false, message: 'Organizer and status cannot be changed through this endpoint' });
    }

    const event = await getEventOrRespond(req.params.id, res);
    if (!event || !ensureOwner(event, req.user, res)) return;

    const updates = Object.fromEntries(
      eventFields.filter((field) => Object.hasOwn(req.body, field)).map((field) => [field, req.body[field]])
    );

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Provide at least one event field to update' });
    }

    Object.assign(event, updates);
    await event.save();

    return res.status(200).json({ success: true, message: 'Event updated successfully', event });
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const event = await getEventOrRespond(req.params.id, res);
    if (!event || !ensureOwner(event, req.user, res)) return;

    await event.deleteOne();
    return res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const publishEvent = async (req, res, next) => {
  try {
    const event = await getEventOrRespond(req.params.id, res);
    if (!event || !ensureOwner(event, req.user, res)) return;

    event.status = 'published';
    await event.save();

    return res.status(200).json({ success: true, message: 'Event published successfully', event });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEvent,
  getPublishedEvents,
  getEventById,
  getMyEvents,
  updateEvent,
  deleteEvent,
  publishEvent,
};
