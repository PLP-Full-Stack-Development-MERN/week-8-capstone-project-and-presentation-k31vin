
// Dummy meal plans data
const mealPlans = [
  {
    id: "mp1",
    title: "Second Trimester Balanced Nutrition Plan",
    clientId: "1",
    nutritionistId: "2",
    status: "active",
    startDate: "2025-04-10",
    endDate: "2025-04-17",
    days: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Greek Yogurt with Berries and Granola",
            description: "Greek yogurt topped with mixed berries and low-sugar granola",
            nutrients: {
              calories: 320,
              protein: 18,
              carbs: 40,
              fat: 10,
              fiber: 6
            }
          },
          {
            type: "Lunch",
            name: "Mediterranean Quinoa Salad",
            description: "Quinoa with cucumber, tomatoes, olives, feta cheese, and olive oil dressing",
            nutrients: {
              calories: 420,
              protein: 15,
              carbs: 52,
              fat: 18,
              fiber: 8
            }
          },
          {
            type: "Dinner",
            name: "Baked Salmon with Roasted Vegetables",
            description: "Omega-3 rich salmon with a side of roasted sweet potatoes, broccoli, and carrots",
            nutrients: {
              calories: 480,
              protein: 32,
              carbs: 42,
              fat: 20,
              fiber: 7
            }
          },
          {
            type: "Snack",
            name: "Apple with Almond Butter",
            description: "Medium apple with 1 tablespoon of almond butter",
            nutrients: {
              calories: 180,
              protein: 4,
              carbs: 25,
              fat: 8,
              fiber: 5
            }
          }
        ]
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Spinach and Feta Omelette",
            description: "Two-egg omelette with spinach, feta cheese, and whole grain toast",
            nutrients: {
              calories: 350,
              protein: 22,
              carbs: 28,
              fat: 18,
              fiber: 4
            }
          },
          {
            type: "Lunch",
            name: "Chickpea and Vegetable Soup",
            description: "Hearty soup with chickpeas, carrots, celery, and kale, served with a whole grain roll",
            nutrients: {
              calories: 380,
              protein: 16,
              carbs: 58,
              fat: 10,
              fiber: 12
            }
          },
          {
            type: "Dinner",
            name: "Turkey and Vegetable Stir-Fry",
            description: "Lean ground turkey with bell peppers, snap peas, and broccoli, served over brown rice",
            nutrients: {
              calories: 450,
              protein: 30,
              carbs: 48,
              fat: 15,
              fiber: 6
            }
          },
          {
            type: "Snack",
            name: "Greek Yogurt with Honey",
            description: "Plain Greek yogurt with a drizzle of honey and sliced banana",
            nutrients: {
              calories: 200,
              protein: 15,
              carbs: 30,
              fat: 2,
              fiber: 2
            }
          }
        ]
      }
    ],
    notes: "Focus on iron-rich foods and omega-3 fatty acids, which are essential for baby's brain development during the second trimester."
  },
  {
    id: "mp2",
    title: "Low Glycemic Diet for Gestational Diabetes",
    clientId: "1",
    nutritionistId: "2",
    status: "active",
    startDate: "2025-04-08",
    endDate: "2025-04-15",
    days: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Overnight Chia Pudding",
            description: "Chia seeds soaked in almond milk with a small amount of berries",
            nutrients: {
              calories: 280,
              protein: 12,
              carbs: 30,
              fat: 14,
              fiber: 10
            }
          },
          {
            type: "Lunch",
            name: "Grilled Chicken Salad",
            description: "Mixed greens with grilled chicken, avocado, cherry tomatoes, and olive oil dressing",
            nutrients: {
              calories: 380,
              protein: 35,
              carbs: 15,
              fat: 20,
              fiber: 6
            }
          },
          {
            type: "Dinner",
            name: "Zucchini Noodles with Turkey Meatballs",
            description: "Spiralized zucchini with lean turkey meatballs and tomato sauce",
            nutrients: {
              calories: 350,
              protein: 30,
              carbs: 20,
              fat: 18,
              fiber: 5
            }
          },
          {
            type: "Snack",
            name: "Cottage Cheese with Cucumber",
            description: "Low-fat cottage cheese with cucumber slices",
            nutrients: {
              calories: 150,
              protein: 18,
              carbs: 8,
              fat: 4,
              fiber: 1
            }
          }
        ]
      }
    ],
    notes: "This plan focuses on keeping blood sugar levels stable by emphasizing protein, healthy fats, and complex carbohydrates while limiting simple sugars."
  }
];

/**
 * Get all meal plans
 */
const getAllMealPlans = (req, res) => {
  res.status(200).json(mealPlans);
};

/**
 * Get user's meal plans
 */
const getUserMealPlans = (req, res) => {
  const userId = req.params.userId;
  const userPlans = mealPlans.filter(plan => plan.clientId === userId || plan.nutritionistId === userId);
  
  res.status(200).json(userPlans);
};

/**
 * Get meal plan by ID
 */
const getMealPlanById = (req, res) => {
  const plan = mealPlans.find(p => p.id === req.params.id);
  
  if (!plan) {
    return res.status(404).json({ message: 'Meal plan not found' });
  }
  
  res.status(200).json(plan);
};

/**
 * Create meal plan
 */
const createMealPlan = (req, res) => {
  const { title, clientId, nutritionistId, startDate, endDate, days, notes } = req.body;
  
  const newPlan = {
    id: `mp${mealPlans.length + 1}`,
    title,
    clientId,
    nutritionistId,
    status: "draft",
    startDate,
    endDate,
    days: days || [],
    notes: notes || ""
  };
  
  mealPlans.push(newPlan);
  
  res.status(201).json(newPlan);
};

/**
 * Update meal plan
 */
const updateMealPlan = (req, res) => {
  const planId = req.params.id;
  const planIndex = mealPlans.findIndex(p => p.id === planId);
  
  if (planIndex === -1) {
    return res.status(404).json({ message: 'Meal plan not found' });
  }
  
  // Update plan
  mealPlans[planIndex] = {
    ...mealPlans[planIndex],
    ...req.body
  };
  
  res.status(200).json(mealPlans[planIndex]);
};

/**
 * Delete meal plan
 */
const deleteMealPlan = (req, res) => {
  const planId = req.params.id;
  const planIndex = mealPlans.findIndex(p => p.id === planId);
  
  if (planIndex === -1) {
    return res.status(404).json({ message: 'Meal plan not found' });
  }
  
  // Remove plan
  mealPlans.splice(planIndex, 1);
  
  res.status(200).json({ message: 'Meal plan deleted successfully' });
};

module.exports = {
  getAllMealPlans,
  getUserMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
};
