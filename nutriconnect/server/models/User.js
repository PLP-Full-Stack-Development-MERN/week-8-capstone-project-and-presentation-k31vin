const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
},
email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
},
role: {
    type: String,
    enum: ['client', 'nutritionist', 'admin'],
    default: 'client'
},
profile: {
    firstName: String,
    lastName: String,
    age: Number,
    height: Number,
    weight: Number,
    dietaryPreferences: [String],
    healthGoals: [String]
},
createdAt: {
    type: Date,
    default: Date.now
}
}, {
toJSON: { virtuals: true },
toObject: { virtuals: true }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
if (!this.isModified('password')) return next();

try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
} catch (error) {
    next(error);
}
});

// Method to check password
UserSchema.methods.comparePassword = async function(candidatePassword) {
return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
return `${this.profile.firstName} ${this.profile.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);