const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { course, search } = req.query;
    const query = {};
    if (course && course !== 'all') query.course = course;
    if (search) query.title = { $regex: search, $options: 'i' };
    const discussions = await Discussion.find(query).populate('author', 'name university role verified').sort({ createdAt: -1 }).limit(30);
    res.json(discussions);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, body, course, category, tags } = req.body;
    const discussion = await Discussion.create({ title, body, course, category, tags, author: req.user._id });
    await discussion.populate('author', 'name university role verified');
    res.status(201).json(discussion);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/upvote', protect, async (req, res) => {
  try {
    const disc = await Discussion.findById(req.params.id);
    if (!disc) return res.status(404).json({ message: 'Discussion not found' });
    const idx = disc.upvotes.indexOf(req.user._id);
    if (idx > -1) { disc.upvotes.splice(idx, 1); } else { disc.upvotes.push(req.user._id); }
    await disc.save();
    res.json({ upvotes: disc.upvotes.length, upvoted: idx === -1 });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/reply', protect, async (req, res) => {
  try {
    const { text } = req.body;
    const disc = await Discussion.findById(req.params.id);
    if (!disc) return res.status(404).json({ message: 'Discussion not found' });
    disc.replies.push({ author: req.user._id, text });
    await disc.save();
    await disc.populate('replies.author', 'name');
    res.json(disc.replies[disc.replies.length - 1]);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
