const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const memes = await Meme.find().populate('author', 'name university').sort({ createdAt: -1 }).limit(20);
    res.json(memes);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const { imageUrl, caption, tags } = req.body;
    const meme = await Meme.create({ imageUrl, caption, tags, author: req.user._id });
    await meme.populate('author', 'name university');
    res.status(201).json(meme);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/like', protect, async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme not found' });
    const idx = meme.likes.indexOf(req.user._id);
    if (idx > -1) { meme.likes.splice(idx, 1); } else { meme.likes.push(req.user._id); }
    await meme.save();
    res.json({ likes: meme.likes.length, liked: idx === -1 });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
