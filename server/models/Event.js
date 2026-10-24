const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  time: { type: String, default: '' },
  location: { type: String, default: '' },
  category: { type: String, enum: ['hackathon', 'workshop', 'cultural', 'sports', 'seminar', 'other'], default: 'other' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxAttendees: { type: Number, default: 200 },
  imageUrl: { type: String, default: '' },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
