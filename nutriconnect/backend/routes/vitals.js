
const express = require('express');
const router = express.Router();
const { getAllVitals, getVitalsByUserId, addVitals, getVitalsHistory } = require('../controllers/vitalsController');

// Get all vitals
router.get('/', getAllVitals);

// Get vitals by user ID
router.get('/user/:userId', getVitalsByUserId);

// Get vitals history
router.get('/history/:userId', getVitalsHistory);

// Add vitals
router.post('/', addVitals);

module.exports = router;
