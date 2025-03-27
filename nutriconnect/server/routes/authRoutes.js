const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const { validateToken } = require('../controllers/authController');

// Helper function to generate JWT
const generateToken = (user) => {
return jwt.sign(
    { 
    id: user._id, 
    role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRATION }
);
};

// Register Route
router.post('/register', async (req, res) => {
try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
    username,
    email,
    password,
    role
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
    });
} catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
}
});

// Login Route
router.post('/login', async (req, res) => {
try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
    message: 'Login successful',
    token,
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
    });
} catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
}
});

// Token validation route
router.get('/validate', validateToken);


module.exports = router;