const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/events', require('./routes/events'));
app.use('/api/memes', require('./routes/memes'));
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/notifications', require('./routes/notifications'));

// Socket.IO
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('join_room', (userId) => socket.join(userId));
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

app.set('io', io);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'UniVibe API running 🎓' }));

// MongoDB connect + server start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    httpServer.listen(PORT, () => console.log(`🚀 UniVibe server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Starting server without DB (demo mode)...');
    httpServer.listen(PORT, () => console.log(`🚀 UniVibe server running on port ${PORT} (no DB)`));
  });

module.exports = { app, io };
