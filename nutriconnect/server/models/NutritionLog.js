const mongoose = require('mongoose');

const NutritionLogSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
date: {
    type: Date,
    default: Date.now
},
meals: [{
    type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    required: true
    },
    foods: [{
    name: String,
    quantity: Number,
    unit: String,
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number
    }]
}],
waterIntake: {
    amount: Number,
    unit: {
    type: String,
    default: 'ml'
    }
},
dailyTotals: {
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number
},
notes: String
}, {
timestamps: true
});

module.exports = mongoose.model('NutritionLog', NutritionLogSchema);