const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect, teacherOnly } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { course, verified, search, page = 1, limit = 12 } = req.query;
    const query = {};
    if (course && course !== 'all') query.course = course;
    if (verified === 'true') query.verified = true;
    if (search) query.title = { $regex: search, $options: 'i' };
    const notes = await Note.find(query).populate('author', 'name university').sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await Note.countDocuments(query);
    res.json({ notes, total, pages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, course, subject, university, professor, tags, pages } = req.body;
    const note = await Note.create({ title, description, course, subject, university: university || req.user.university, professor, tags, pages, author: req.user._id });
    await note.populate('author', 'name university');
    res.status(201).json(note);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/download', protect, async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { $inc: { downloads: 1 } }, { new: true });
    res.json({ downloads: note.downloads, fileUrl: note.fileUrl });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/verify', protect, teacherOnly, async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { verified: true, verifiedBy: req.user._id }, { new: true }).populate('author', 'name');
    res.json(note);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('author', 'name university');
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
