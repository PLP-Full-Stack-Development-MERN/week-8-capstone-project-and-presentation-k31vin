
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/users');
const mealPlanRoutes = require('./routes/mealPlans');
const vitalsRoutes = require('./routes/vitals');
const resourcesRoutes = require('./routes/resources');
const messagesRoutes = require('./routes/messages');

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://week-8-capstone-project-and-presentation-k31vin.vercel.app/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/vitals', vitalsRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/messages', messagesRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('NutriConnect API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
