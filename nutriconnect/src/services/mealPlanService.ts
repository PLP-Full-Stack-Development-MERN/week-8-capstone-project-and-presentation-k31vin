
import api from './api';

export interface MealPlan {
  id: string;
  title: string;
  clientId: string;
  nutritionistId: string;
  status: "draft" | "active" | "approved";
  startDate: string;
  endDate: string;
  days: MealDay[];
  notes: string;
}

export interface MealDay {
  day: string;
  meals: Meal[];
}

export interface Meal {
  type: string;
  name: string;
  description: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

const mealPlanService = {
  getAllMealPlans: async (): Promise<MealPlan[]> => {
    const response = await api.get('/meal-plans');
    return response.data;
  },
  
  getUserMealPlans: async (userId: string): Promise<MealPlan[]> => {
    const response = await api.get(`/meal-plans/user/${userId}`);
    return response.data;
  },
  
  getMealPlanById: async (id: string): Promise<MealPlan> => {
    const response = await api.get(`/meal-plans/${id}`);
    return response.data;
  },
  
  createMealPlan: async (mealPlan: Partial<MealPlan>): Promise<MealPlan> => {
    const response = await api.post('/meal-plans', mealPlan);
    return response.data;
  },
  
  updateMealPlan: async (id: string, mealPlan: Partial<MealPlan>): Promise<MealPlan> => {
    const response = await api.put(`/meal-plans/${id}`, mealPlan);
    return response.data;
  },
  
  deleteMealPlan: async (id: string): Promise<void> => {
    await api.delete(`/meal-plans/${id}`);
  }
};

export default mealPlanService;
