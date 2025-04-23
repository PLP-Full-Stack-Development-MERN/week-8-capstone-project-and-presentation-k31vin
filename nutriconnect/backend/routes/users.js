
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, loginUser, registerUser } = require('../controllers/userController');

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Login user
router.post('/login', loginUser);

// Register user
router.post('/register', registerUser);

module.exports = router;
