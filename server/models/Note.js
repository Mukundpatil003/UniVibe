const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  course: { type: String, required: true },
  subject: { type: String, default: '' },
  university: { type: String, default: '' },
  professor: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, default: '#' },
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5 },
  ratingCount: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  pages: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
