const mongoose = require('mongoose');

const NutritionProfileSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
bodyMetrics: {
    height: {
    value: Number,
    unit: {
        type: String,
        enum: ['cm', 'inches'],
        default: 'cm'
    }
    },
    weight: {
    value: Number,
    unit: {
        type: String,
        enum: ['kg', 'lbs'],
        default: 'kg'
    }
    },
    bodyFatPercentage: Number,
    muscleMass: Number
},
healthGoals: {
    type: [String],
    enum: [
    'Weight Loss', 
    'Muscle Gain', 
    'Maintain Weight', 
    'Improve Endurance', 
    'Improve Nutrition', 
    'Manage Chronic Condition'
    ]
},
dietaryPreferences: {
    type: [String],
    enum: [
    'Vegetarian', 
    'Vegan', 
    'Pescatarian', 
    'Gluten-Free', 
    'Dairy-Free', 
    'Keto', 
    'Paleo'
    ]
},
allergies: [String],
medicalConditions: [String],
fitnessLevel: {
    type: String,
    enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active']
},
dailyNutritionGoals: {
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number
},
trackingPreferences: {
    weightTrackingFrequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Bi-Weekly']
    },
    nutritionTrackingMethod: {
    type: String,
    enum: ['Manual', 'Automatic', 'Hybrid']
    }
},
createdAt: {
    type: Date,
    default: Date.now
},
updatedAt: {
    type: Date,
    default: Date.now
}
}, {
timestamps: true
});

module.exports = mongoose.model('NutritionProfile', NutritionProfileSchema);