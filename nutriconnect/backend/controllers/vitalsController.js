
// Dummy vitals data with historical records
const vitals = [
  // User 1 Weight records
  {
    id: "v1",
    userId: "1",
    type: "weight",
    value: 64.3,
    unit: "kg",
    date: "2025-04-01T08:30:00Z"
  },
  {
    id: "v2",
    userId: "1",
    type: "weight",
    value: 64.5,
    unit: "kg",
    date: "2025-04-03T09:15:00Z"
  },
  {
    id: "v3",
    userId: "1",
    type: "weight",
    value: 64.2,
    unit: "kg",
    date: "2025-04-05T07:45:00Z"
  },
  {
    id: "v4",
    userId: "1",
    type: "weight",
    value: 64.4,
    unit: "kg",
    date: "2025-04-07T08:00:00Z"
  },
  {
    id: "v5",
    userId: "1",
    type: "weight",
    value: 64.1,
    unit: "kg",
    date: "2025-04-10T08:30:00Z"
  },
  {
    id: "v6",
    userId: "1",
    type: "weight",
    value: 64.0,
    unit: "kg",
    date: "2025-04-12T07:30:00Z"
  },
  
  // User 1 Blood Pressure records
  {
    id: "v7",
    userId: "1",
    type: "blood_pressure",
    value: { systolic: 118, diastolic: 76 },
    unit: "mmHg",
    date: "2025-04-01T08:30:00Z"
  },
  {
    id: "v8",
    userId: "1",
    type: "blood_pressure",
    value: { systolic: 120, diastolic: 78 },
    unit: "mmHg",
    date: "2025-04-03T09:15:00Z"
  },
  {
    id: "v9",
    userId: "1",
    type: "blood_pressure",
    value: { systolic: 116, diastolic: 74 },
    unit: "mmHg",
    date: "2025-04-05T07:45:00Z"
  },
  {
    id: "v10",
    userId: "1",
    type: "blood_pressure",
    value: { systolic: 119, diastolic: 77 },
    unit: "mmHg",
    date: "2025-04-07T08:00:00Z"
  },
  {
    id: "v11",
    userId: "1",
    type: "blood_pressure",
    value: { systolic: 121, diastolic: 79 },
    unit: "mmHg",
    date: "2025-04-10T08:30:00Z"
  },
  {
    id: "v12",
    userId: "1",
    type: "blood_pressure",
    value: { systolic: 117, diastolic: 75 },
    unit: "mmHg",
    date: "2025-04-12T07:30:00Z"
  },
  
  // User 1 Blood Sugar records
  {
    id: "v13",
    userId: "1",
    type: "blood_sugar",
    value: 98,
    unit: "mg/dL",
    date: "2025-04-01T08:30:00Z"
  },
  {
    id: "v14",
    userId: "1",
    type: "blood_sugar",
    value: 103,
    unit: "mg/dL",
    date: "2025-04-03T09:15:00Z"
  },
  {
    id: "v15",
    userId: "1",
    type: "blood_sugar",
    value: 95,
    unit: "mg/dL",
    date: "2025-04-05T07:45:00Z"
  },
  {
    id: "v16",
    userId: "1",
    type: "blood_sugar",
    value: 99,
    unit: "mg/dL",
    date: "2025-04-07T08:00:00Z"
  },
  {
    id: "v17",
    userId: "1",
    type: "blood_sugar",
    value: 97,
    unit: "mg/dL",
    date: "2025-04-10T08:30:00Z"
  },
  {
    id: "v18",
    userId: "1",
    type: "blood_sugar",
    value: 94,
    unit: "mg/dL",
    date: "2025-04-12T07:30:00Z"
  },
  
  // User 1 Water Intake records
  {
    id: "v19",
    userId: "1",
    type: "water_intake",
    value: 6,
    unit: "glasses",
    date: "2025-04-12T20:30:00Z"
  }
];

/**
 * Get all vitals
 */
const getAllVitals = (req, res) => {
  res.status(200).json(vitals);
};

/**
 * Get vitals by user ID
 */
const getVitalsByUserId = (req, res) => {
  const userId = req.params.userId;
  
  // Get the most recent record of each type for the user
  const types = ['weight', 'blood_pressure', 'blood_sugar', 'water_intake'];
  const latestVitals = types.map(type => {
    const records = vitals
      .filter(v => v.userId === userId && v.type === type)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return records.length > 0 ? records[0] : null;
  }).filter(Boolean);
  
  res.status(200).json(latestVitals);
};

/**
 * Get vitals history
 */
const getVitalsHistory = (req, res) => {
  const userId = req.params.userId;
  const type = req.query.type;
  
  let userVitals = vitals.filter(v => v.userId === userId);
  
  if (type) {
    userVitals = userVitals.filter(v => v.type === type);
  }
  
  // Sort by date
  userVitals.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Format the data for charts if needed
  const formattedData = {};
  
  types = ['weight', 'blood_pressure', 'blood_sugar', 'water_intake'];
  types.forEach(vitalType => {
    const typeData = userVitals.filter(v => v.type === vitalType);
    
    if (typeData.length > 0) {
      if (vitalType === 'blood_pressure') {
        // Format blood pressure for charts
        formattedData[vitalType] = typeData.map(record => ({
          date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          systolic: record.value.systolic,
          diastolic: record.value.diastolic
        }));
      } else {
        // Format other vitals for charts
        formattedData[vitalType] = typeData.map(record => ({
          date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: record.value
        }));
      }
    }
  });
  
  res.status(200).json({
    raw: userVitals,
    formatted: formattedData
  });
};

/**
 * Add vitals
 */
const addVitals = (req, res) => {
  const { userId, type, value, unit } = req.body;
  
  const newVital = {
    id: `v${vitals.length + 1}`,
    userId,
    type,
    value,
    unit,
    date: new Date().toISOString()
  };
  
  vitals.push(newVital);
  
  res.status(201).json(newVital);
};

module.exports = {
  getAllVitals,
  getVitalsByUserId,
  getVitalsHistory,
  addVitals
};
