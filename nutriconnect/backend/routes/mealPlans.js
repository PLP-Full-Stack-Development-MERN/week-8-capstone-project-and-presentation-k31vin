
const express = require('express');
const router = express.Router();
const { getAllMealPlans, getMealPlanById, createMealPlan, updateMealPlan, deleteMealPlan, getUserMealPlans } = require('../controllers/mealPlanController');

// Get all meal plans
router.get('/', getAllMealPlans);

// Get user's meal plans
router.get('/user/:userId', getUserMealPlans);

// Get meal plan by ID
router.get('/:id', getMealPlanById);

// Create meal plan
router.post('/', createMealPlan);

// Update meal plan
router.put('/:id', updateMealPlan);

// Delete meal plan
router.delete('/:id', deleteMealPlan);

module.exports = router;
