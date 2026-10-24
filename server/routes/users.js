const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ xp: -1 }).limit(20).select('name university xp streak role verified');
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/profile', protect, async (req, res) => {
  try {
    const { name, bio, university, department, year } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, bio, university, department, year }, { new: true }).select('-password');
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
