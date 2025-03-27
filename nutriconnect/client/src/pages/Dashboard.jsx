import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
const { user } = useAuth();
const [nutritionProfile, setNutritionProfile] = useState(null);
const [nutritionLogs, setNutritionLogs] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate(); // Hook for navigation


useEffect(() => {
    const fetchNutritionData = async () => {
    try {
        // Fetch nutrition profile
        const profileResponse = await axios.get('/api/nutrition/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNutritionProfile(profileResponse.data);

        // Fetch nutrition logs for the last 30 days
        const logsResponse = await axios.get('/api/nutrition/logs', {
        params: {
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            endDate: new Date()
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNutritionLogs(logsResponse.data);
    } catch (error) {
        console.error('Error fetching nutrition data', error);
    } finally {
        setLoading(false);
    }
    };

    fetchNutritionData();
}, []);

if (loading) {
    return <div>Loading...</div>;
}

// Prepare chart data
const calorieChartData = nutritionLogs.map(log => ({
    date: new Date(log.date).toLocaleDateString(),
    calories: log.dailyTotals.calories
}));

return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>

    {nutritionProfile ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Nutrition Profile</h2>
            <div className="space-y-2">
            <p><strong>Health Goals:</strong> {nutritionProfile.healthGoals.join(', ')}</p>
            <p><strong>Dietary Preferences:</strong> {nutritionProfile.dietaryPreferences.join(', ')}</p>
            <p><strong>Fitness Level:</strong> {nutritionProfile.fitnessLevel}</p>
            </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Daily Nutrition Goals</h2>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="font-medium">Calories</p>
                <p>{nutritionProfile.dailyNutritionGoals.calories} kcal</p>
            </div>
            <div>
                <p className="font-medium">Protein</p>
                <p>{nutritionProfile.dailyNutritionGoals.protein}g</p>
            </div>
            <div>
                <p className="font-medium">Carbohydrates</p>
                <p>{nutritionProfile.dailyNutritionGoals.carbohydrates}g</p>
            </div>
            <div>
                <p className="font-medium">Fat</p>
                <p>{nutritionProfile.dailyNutritionGoals.fat}g</p>
            </div>
            </div>
        </div>

        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Calorie Intake Trend</h2>
            <LineChart width={600} height={300} data={calorieChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
        </div>
    ) : (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p>Complete your nutrition profile to get personalized insights!</p>
        <button 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/nutrition-profile-setup')} // Navigate to setup page
        >
            Setup Profile
        </button>
        </div>
    )}
    </div>
);
};

export default Dashboard;