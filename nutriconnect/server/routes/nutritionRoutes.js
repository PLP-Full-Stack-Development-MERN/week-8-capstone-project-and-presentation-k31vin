const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const NutritionProfile = require('../models/NutritionProfile');
const NutritionLog = require('../models/NutritionLog');

router.get('/data', protect, async (req, res) => {
    try {
        const data = [
            { name: 'Carbohydrates', value: 50 },
            { name: 'Proteins', value: 30 },
            { name: 'Fats', value: 20 }
        ];

        res.status(200).json({ message: 'Nutrition data fetched successfully!', data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching nutrition data', error: error.message });
    }
});

// Create or Update Nutrition Profile
router.post('/profile', protect, async (req, res) => {
try {
    const {
    bodyMetrics,
    healthGoals,
    dietaryPreferences,
    allergies,
    medicalConditions,
    fitnessLevel,
    dailyNutritionGoals,
    trackingPreferences
    } = req.body;

    let nutritionProfile = await NutritionProfile.findOne({ user: req.user._id });

    if (nutritionProfile) {
    // Update existing profile
    nutritionProfile = await NutritionProfile.findOneAndUpdate(
        { user: req.user._id },
        {
        bodyMetrics,
        healthGoals,
        dietaryPreferences,
        allergies,
        medicalConditions,
        fitnessLevel,
        dailyNutritionGoals,
        trackingPreferences
        },
        { new: true }
    );
    } else {
    // Create new profile
    nutritionProfile = new NutritionProfile({
        user: req.user._id,
        bodyMetrics,
        healthGoals,
        dietaryPreferences,
        allergies,
        medicalConditions,
        fitnessLevel,
        dailyNutritionGoals,
        trackingPreferences
    });
    await nutritionProfile.save();
    }

    res.status(200).json(nutritionProfile);
} catch (error) {
    res.status(500).json({ message: 'Error updating nutrition profile', error: error.message });
}
});

// Get Nutrition Profile
// Get Nutrition Profile
router.get('/profile', protect, async (req, res) => {
    try {
        console.log('User ID from protect middleware:', req.user?._id);  // Log user ID

        const nutritionProfile = await NutritionProfile.findOne({ user: req.user._id });

        if (!nutritionProfile) {
            return res.status(404).json({ message: 'Nutrition profile not found' });
        }

        res.status(200).json(nutritionProfile);
    } catch (error) {
        console.error('Error fetching nutrition profile:', error.message);
        res.status(500).json({ message: 'Error fetching nutrition profile', error: error.message });
    }
});


// Log Daily Nutrition
router.post('/log', protect, async (req, res) => {
try {
    const { date, meals, waterIntake, notes } = req.body;

    // Calculate daily totals
    const dailyTotals = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0
    };

    meals.forEach(meal => {
    meal.foods.forEach(food => {
        dailyTotals.calories += food.calories || 0;
        dailyTotals.protein += food.protein || 0;
        dailyTotals.carbohydrates += food.carbohydrates || 0;
        dailyTotals.fat += food.fat || 0;
    });
    });

    const nutritionLog = new NutritionLog({
    user: req.user._id,
    date: date || Date.now(),
    meals,
    waterIntake,
    dailyTotals,
    notes
    });

    await nutritionLog.save();

    res.status(201).json(nutritionLog);
} catch (error) {
    res.status(500).json({ message: 'Error logging nutrition', error: error.message });
}
});

// Get Nutrition Logs
router.get('/logs', protect, async (req, res) => {
try {
    const { startDate, endDate } = req.query;

    const query = { user: req.user._id };

    if (startDate && endDate) {
    query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
    };
    }

    const nutritionLogs = await NutritionLog.find(query)
    .sort({ date: -1 });

    res.status(200).json(nutritionLogs);
} catch (error) {
    res.status(500).json({ message: 'Error retrieving nutrition logs', error: error.message });
}
});

module.exports = router;