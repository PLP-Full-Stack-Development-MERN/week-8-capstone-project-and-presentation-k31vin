import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const NutritionProfileSetup = () => {
const [formData, setFormData] = useState({
    bodyMetrics: {
    height: { value: '', unit: 'cm' },
    weight: { value: '', unit: 'kg' }
    },
    healthGoals: [],
    dietaryPreferences: [],
    allergies: [],
    medicalConditions: [],
    fitnessLevel: '',
    dailyNutritionGoals: {
    calories: '',
    protein: '',
    carbohydrates: '',
    fat: ''
    },
    trackingPreferences: {
    weightTrackingFrequency: '',
    nutritionTrackingMethod: ''
    }
});

const navigate = useNavigate();

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
        setFormData(prev => ({
            ...prev,
            [name]: checked
                ? [...(prev[name] || []), value]  // Use an empty array if undefined
                : (prev[name] || []).filter(item => item !== value)
        }));
    } else if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent] || {}),  // Ensure parent is an object
                [child]: value || ''      // Ensure child value is not undefined
            }
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value || ''  // Ensure value is not undefined
        }));
    }
};


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.post('/api/nutrition/profile', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    toast.success('Nutrition profile created successfully!');
    navigate('/dashboard');
    } catch (error) {
    toast.error('Failed to create nutrition profile');
    console.error(error);
    }
};

return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Setup Your Nutrition Profile</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
        {/* Body Metrics Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Body Metrics</h2>
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block mb-2">Height</label>
            <div className="flex">
                <input
                type="number"
                name="bodyMetrics.height.value"
                value={formData.bodyMetrics.height.value || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-l"
                placeholder="Enter height"
                />
                <select
                name="bodyMetrics.height.unit"
                value={formData.bodyMetrics.height.unit}
                onChange={handleChange}
                className="px-3 py-2 border rounded-r"
                >
                <option value="cm">cm</option>
                <option value="inches">inches</option>
                </select>
            </div>
            </div>
            <div>
            <label className="block mb-2">Weight</label>
            <div className="flex">
                <input
                type="number"
                name="bodyMetrics.weight.value"
                value={formData.bodyMetrics.weight.value || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-l"
                placeholder="Enter weight"
                />
                <select
                name="bodyMetrics.weight.unit"
                value={formData.bodyMetrics.weight.unit}
                onChange={handleChange}
                className="px-3 py-2 border rounded-r"
                >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
                </select>
            </div>
            </div>
        </div>
        </div>

        {/* Health Goals Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Health Goals</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
            'Weight Loss', 'Muscle Gain', 'Maintain Weight', 
            'Improve Endurance', 'Improve Nutrition', 'Manage Chronic Condition'
            ].map(goal => (
            <label key={goal} className="inline-flex items-center">
                <input
                type="checkbox"
                name="healthGoals"
                value={goal}
                checked={formData.healthGoals.includes(goal)}
                onChange={handleChange}
                className="form-checkbox"
                />
                <span className="ml-2">{goal}</span>
            </label>
            ))}
        </div>
        </div>

        {/* More sections can be added similarly */}
        <div className="text-right">
        <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
            Save Nutrition Profile
        </button>
        </div>
    </form>
    </div>
);
};

export default NutritionProfileSetup;