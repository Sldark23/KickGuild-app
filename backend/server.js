const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const clusterRoutes = require('./routes/clusters');
const noemiaRoutes = require('./routes/noemias');
const messageRoutes = require('./routes/messages');
const friendRoutes = require('./routes/friends');
const notificationRoutes = require('./routes/notifications');
const badgeRoutes = require('./routes/badges');
const adminRoutes = require('./routes/admin');
const searchRoutes = require('./routes/search');
const inviteRoutes = require('./routes/invites');

// Initialize app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection (to be implemented in config/db.js)
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/clusters', clusterRoutes);
app.use('/api/noemias', noemiaRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/invites', inviteRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to KickGuild API' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
