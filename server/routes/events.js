const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};
    if (category && category !== 'all') query.category = category;
    const events = await Event.find(query).populate('createdBy', 'name role').sort({ date: 1 });
    res.json(events);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, date, time, location, category, maxAttendees, tags } = req.body;
    const event = await Event.create({ title, description, date, time, location, category, maxAttendees, tags, createdBy: req.user._id });
    await event.populate('createdBy', 'name role');
    res.status(201).json(event);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/rsvp', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const idx = event.rsvps.indexOf(req.user._id);
    if (idx > -1) { event.rsvps.splice(idx, 1); }
    else { event.rsvps.push(req.user._id); }
    await event.save();
    res.json({ rsvps: event.rsvps.length, isRsvped: idx === -1 });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
