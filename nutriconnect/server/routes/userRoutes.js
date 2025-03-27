const express = require('express');
const router = express.Router();

// Example route: Get all users
router.get('/users', (req, res) => {
    res.json({ message: "List of all users" });
});

// Example route: Create a new user
router.post('/users', (req, res) => {
    res.json({ message: "New user created" });
});

module.exports = router;
