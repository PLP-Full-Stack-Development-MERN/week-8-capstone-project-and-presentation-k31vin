require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
}
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Socket.IO Configuration
require('./services/socketService')(io);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/nutrition', require('./routes/nutritionRoutes'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, io };