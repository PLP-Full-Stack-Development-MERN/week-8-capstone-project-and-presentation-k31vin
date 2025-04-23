
const express = require('express');
const router = express.Router();
const { getAllResources, getResourceById, getResourcesByCategory } = require('../controllers/resourceController');

// Get all resources
router.get('/', getAllResources);

// Get resources by category
router.get('/category/:category', getResourcesByCategory);

// Get resource by ID
router.get('/:id', getResourceById);

module.exports = router;
