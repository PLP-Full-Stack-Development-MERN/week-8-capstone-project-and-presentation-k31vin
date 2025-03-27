const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.validateToken = async (req, res) => {
    try {
        // Check for token in headers
        const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Token validated successfully', user });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};
