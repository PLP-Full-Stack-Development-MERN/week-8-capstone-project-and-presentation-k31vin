
const express = require('express');
const router = express.Router();
const { getAllMessages, getMessagesByUser, sendMessage } = require('../controllers/messageController');

// Get all messages
router.get('/', getAllMessages);

// Get messages by user
router.get('/user/:userId', getMessagesByUser);

// Send message
router.post('/', sendMessage);

module.exports = router;
