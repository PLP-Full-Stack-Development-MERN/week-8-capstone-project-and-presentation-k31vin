
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, Apple, Info, CheckCircle, FileText, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define meal types and interfaces
interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
  completed: boolean;
}

interface MealPlan {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  nutritionist: string;
  notes: string;
  days: {
    day: string;
    meals: {
      breakfast: Meal;
      lunch: Meal;
      dinner: Meal;
      snacks: Meal[];
    };
  }[];
}

const MealPlanView = () => {
  const { toast } = useToast();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [mealDialogOpen, setMealDialogOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  // Mock meal plan data
  const mockMealPlan: MealPlan = {
    id: "mp123",
    title: "Second Trimester Balanced Nutrition Plan",
    description: "A balanced diet plan focused on essential nutrients needed during the second trimester of pregnancy.",
    startDate: "April 10, 2025",
    endDate: "April 17, 2025",
    nutritionist: "Dr. Jennifer Lee",
    notes: "This meal plan focuses on foods rich in iron, calcium, and omega-3 fatty acids. Please make sure to drink plenty of water throughout the day. If you have any food aversions or cravings, let me know so we can adjust the plan.",
    days: [
      {
        day: "Monday",
        meals: {
          breakfast: {
            id: "b1",
            name: "Spinach and Feta Omelette with Whole Grain Toast",
            calories: 450,
            protein: 22,
            carbs: 35,
            fat: 18,
            description: "A protein-rich breakfast with iron-packed spinach and calcium from feta cheese.",
            ingredients: [
              "3 eggs",
              "1 cup fresh spinach",
              "30g feta cheese",
              "1 slice whole grain bread",
              "1 tsp olive oil",
              "Salt and pepper to taste"
            ],
            completed: false
          },
          lunch: {
            id: "l1",
            name: "Quinoa Salad with Grilled Chicken",
            calories: 520,
            protein: 35,
            carbs: 45,
            fat: 15,
            description: "A balanced lunch that provides sustained energy through the afternoon.",
            ingredients: [
              "120g grilled chicken breast",
              "1 cup cooked quinoa",
              "1 cup mixed vegetables (bell peppers, cucumber, cherry tomatoes)",
              "2 tbsp olive oil lemon dressing",
              "¼ avocado",
              "Mixed herbs"
            ],
            completed: false
          },
          dinner: {
            id: "d1",
            name: "Baked Salmon with Sweet Potato and Broccoli",
            calories: 580,
            protein: 40,
            carbs: 35,
            fat: 22,
            description: "A nutrient-dense dinner rich in omega-3 fatty acids and vitamins.",
            ingredients: [
              "150g salmon fillet",
              "1 medium sweet potato",
              "1 cup broccoli florets",
              "1 tbsp olive oil",
              "Lemon wedges",
              "Dill and thyme",
              "Salt and pepper to taste"
            ],
            completed: false
          },
          snacks: [
            {
              id: "s1",
              name: "Greek Yogurt with Berries and Honey",
              calories: 180,
              protein: 15,
              carbs: 20,
              fat: 5,
              description: "A calcium-rich snack with antioxidants from berries.",
              ingredients: [
                "1 cup Greek yogurt",
                "½ cup mixed berries",
                "1 tsp honey",
                "1 tbsp chia seeds"
              ],
              completed: false
            },
            {
              id: "s2",
              name: "Apple Slices with Almond Butter",
              calories: 220,
              protein: 6,
              carbs: 25,
              fat: 12,
              description: "A satisfying snack that combines fiber and healthy fats.",
              ingredients: [
                "1 medium apple",
                "2 tbsp almond butter"
              ],
              completed: false
            }
          ]
        }
      },
      {
        day: "Tuesday",
        meals: {
          breakfast: {
            id: "b2",
            name: "Overnight Oats with Chia Seeds and Berries",
            calories: 390,
            protein: 15,
            carbs: 55,
            fat: 12,
            description: "A fiber-rich breakfast that's quick and convenient.",
            ingredients: [
              "½ cup rolled oats",
              "⅔ cup milk or plant-based alternative",
              "1 tbsp chia seeds",
              "½ cup mixed berries",
              "1 tbsp maple syrup",
              "¼ tsp vanilla extract"
            ],
            completed: false
          },
          lunch: {
            id: "l2",
            name: "Mediterranean Lentil Soup with Whole Grain Bread",
            calories: 480,
            protein: 20,
            carbs: 65,
            fat: 12,
            description: "A warming lunch packed with plant-based protein and iron.",
            ingredients: [
              "1 cup lentil soup (tomatoes, lentils, carrots, celery, onions)",
              "2 slices whole grain bread",
              "1 tbsp olive oil",
              "Fresh herbs"
            ],
            completed: false
          },
          dinner: {
            id: "d2",
            name: "Turkey and Vegetable Stir Fry with Brown Rice",
            calories: 550,
            protein: 35,
            carbs: 50,
            fat: 15,
            description: "A lean protein dinner with a variety of colorful vegetables.",
            ingredients: [
              "120g turkey breast strips",
              "2 cups mixed vegetables (broccoli, bell peppers, snap peas, carrots)",
              "¾ cup cooked brown rice",
              "1 tbsp sesame oil",
              "2 tbsp stir-fry sauce (low sodium)",
              "Sesame seeds"
            ],
            completed: false
          },
          snacks: [
            {
              id: "s3",
              name: "Hummus with Vegetable Sticks",
              calories: 170,
              protein: 7,
              carbs: 18,
              fat: 8,
              description: "A fiber-rich snack with plant-based protein.",
              ingredients: [
                "¼ cup hummus",
                "1 cup mixed vegetable sticks (carrots, cucumber, bell peppers)"
              ],
              completed: false
            },
            {
              id: "s4",
              name: "Mixed Nuts and Dried Fruit",
              calories: 210,
              protein: 6,
              carbs: 15,
              fat: 15,
              description: "A portable snack with healthy fats and quick energy.",
              ingredients: [
                "¼ cup mixed nuts (almonds, walnuts, cashews)",
                "2 tbsp dried fruit (apricots, raisins)"
              ],
              completed: false
            }
          ]
        }
      }
      // Additional days would be added here
    ]
  };

  // Toggle meal completion status
  const toggleMealCompleted = (mealId: string) => {
    // In a real app, this would update in the database
    // For now, we'll just show a toast
    toast({
      title: "Meal status updated",
      description: "Your meal completion has been recorded.",
    });
  };

  // View meal details
  const viewMealDetails = (meal: Meal) => {
    setSelectedMeal(meal);
    setMealDialogOpen(true);
  };

  const calculateDailyNutrients = (dayIndex: number) => {
    const day = mockMealPlan.days[dayIndex];
    const meals = [
      day.meals.breakfast,
      day.meals.lunch,
      day.meals.dinner,
      ...day.meals.snacks
    ];
    
    return {
      calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
      fat: meals.reduce((sum, meal) => sum + meal.fat, 0)
    };
  };

  const renderMealCard = (meal: Meal, mealType: string) => (
    <Card className="mb-4 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-1">
            {mealType}
          </Badge>
          <Checkbox 
            checked={meal.completed} 
            onCheckedChange={() => toggleMealCompleted(meal.id)} 
            aria-label="Toggle meal completed"
          />
        </div>
        <CardTitle className="text-base">{meal.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap justify-between text-sm text-muted-foreground">
          <span>{meal.calories} kcal</span>
          <span>Protein: {meal.protein}g</span>
          <span>Carbs: {meal.carbs}g</span>
          <span>Fat: {meal.fat}g</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full"
          onClick={() => viewMealDetails(meal)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold">{mockMealPlan.title}</h2>
          <p className="text-muted-foreground">{mockMealPlan.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{mockMealPlan.startDate} - {mockMealPlan.endDate}</span>
          </Badge>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>Message Nutritionist</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Nutritionist Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{mockMealPlan.notes}</p>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="mr-2 h-4 w-4" />
            <span>Prepared by {mockMealPlan.nutritionist}</span>
          </div>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <Tabs defaultValue="0" onValueChange={(value) => setActiveDay(parseInt(value))}>
          <TabsList className="grid w-full grid-cols-7">
            {mockMealPlan.days.map((day, index) => (
              <TabsTrigger key={index} value={index.toString()}>
                {day.day}
              </TabsTrigger>
            ))}
          </TabsList>

          {mockMealPlan.days.map((day, index) => (
            <TabsContent key={index} value={index.toString()} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-medium">{day.day}'s Meals</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Daily Plan</span>
                    </div>
                  </div>

                  {renderMealCard(day.meals.breakfast, "Breakfast")}
                  {renderMealCard(day.meals.lunch, "Lunch")}
                  {renderMealCard(day.meals.dinner, "Dinner")}
                  
                  <h4 className="mb-3 mt-6 font-medium">Snacks</h4>
                  {day.meals.snacks.map((snack) => (
                    renderMealCard(snack, "Snack")
                  ))}
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Apple className="h-5 w-5" />
                        Nutritional Summary
                      </CardTitle>
                      <CardDescription>
                        Daily nutritional breakdown
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Calories</span>
                            <span className="text-sm font-bold">{calculateDailyNutrients(activeDay).calories} kcal</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-nutrition-green-500"
                              style={{ width: `100%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Protein</span>
                            <span className="text-sm font-bold">{calculateDailyNutrients(activeDay).protein}g</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-nutrition-blue-500"
                              style={{ width: `${(calculateDailyNutrients(activeDay).protein / 100) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Carbohydrates</span>
                            <span className="text-sm font-bold">{calculateDailyNutrients(activeDay).carbs}g</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-nutrition-peach-500"
                              style={{ width: `${(calculateDailyNutrients(activeDay).carbs / 300) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium">Fat</span>
                            <span className="text-sm font-bold">{calculateDailyNutrients(activeDay).fat}g</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-yellow-500"
                              style={{ width: `${(calculateDailyNutrients(activeDay).fat / 70) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t flex justify-between px-6 py-3">
                      <Button variant="outline" size="sm">
                        View Detailed Analysis
                      </Button>
                      <Button size="sm" className="gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Mark Day Complete
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Shopping List</CardTitle>
                      <CardDescription>
                        Ingredients needed for today's meals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="mb-2 font-medium">Proteins</h4>
                          <ul className="list-inside list-disc space-y-1">
                            {[...new Set([
                              ...day.meals.breakfast.ingredients.filter(i => i.includes("egg") || i.includes("chicken") || i.includes("turkey") || i.includes("beef") || i.includes("fish") || i.includes("salmon")),
                              ...day.meals.lunch.ingredients.filter(i => i.includes("egg") || i.includes("chicken") || i.includes("turkey") || i.includes("beef") || i.includes("fish") || i.includes("salmon")),
                              ...day.meals.dinner.ingredients.filter(i => i.includes("egg") || i.includes("chicken") || i.includes("turkey") || i.includes("beef") || i.includes("fish") || i.includes("salmon")),
                              ...day.meals.snacks.flatMap(s => s.ingredients).filter(i => i.includes("egg") || i.includes("chicken") || i.includes("turkey") || i.includes("beef") || i.includes("fish") || i.includes("salmon"))
                            ])].map((item, index) => (
                              <li key={index} className="text-sm text-muted-foreground">{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="mb-2 font-medium">Fruits & Vegetables</h4>
                          <ul className="list-inside list-disc space-y-1">
                            {[...new Set([
                              ...day.meals.breakfast.ingredients.filter(i => /spinach|apple|berr|fruit|vegetable|carrot|pepper|cucumber|tomato|broccoli|avocado/i.test(i)),
                              ...day.meals.lunch.ingredients.filter(i => /spinach|apple|berr|fruit|vegetable|carrot|pepper|cucumber|tomato|broccoli|avocado/i.test(i)),
                              ...day.meals.dinner.ingredients.filter(i => /spinach|apple|berr|fruit|vegetable|carrot|pepper|cucumber|tomato|broccoli|avocado/i.test(i)),
                              ...day.meals.snacks.flatMap(s => s.ingredients).filter(i => /spinach|apple|berr|fruit|vegetable|carrot|pepper|cucumber|tomato|broccoli|avocado/i.test(i))
                            ])].map((item, index) => (
                              <li key={index} className="text-sm text-muted-foreground">{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="mb-2 font-medium">Grains & Other</h4>
                          <ul className="list-inside list-disc space-y-1">
                            {[...new Set([
                              ...day.meals.breakfast.ingredients.filter(i => /bread|toast|oat|rice|pasta|quinoa|seed|nut/i.test(i)),
                              ...day.meals.lunch.ingredients.filter(i => /bread|toast|oat|rice|pasta|quinoa|seed|nut/i.test(i)),
                              ...day.meals.dinner.ingredients.filter(i => /bread|toast|oat|rice|pasta|quinoa|seed|nut/i.test(i)),
                              ...day.meals.snacks.flatMap(s => s.ingredients).filter(i => /bread|toast|oat|rice|pasta|quinoa|seed|nut/i.test(i))
                            ])].map((item, index) => (
                              <li key={index} className="text-sm text-muted-foreground">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Download Shopping List
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Meal Detail Dialog */}
      <Dialog open={mealDialogOpen} onOpenChange={setMealDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMeal?.name}</DialogTitle>
            <DialogDescription>{selectedMeal?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-muted p-3 text-center">
                <div className="text-xs font-medium uppercase text-muted-foreground">
                  Calories
                </div>
                <div className="text-lg font-bold">{selectedMeal?.calories}</div>
              </div>
              <div className="rounded-lg bg-muted p-3 text-center">
                <div className="text-xs font-medium uppercase text-muted-foreground">
                  Protein
                </div>
                <div className="text-lg font-bold">{selectedMeal?.protein}g</div>
              </div>
              <div className="rounded-lg bg-muted p-3 text-center">
                <div className="text-xs font-medium uppercase text-muted-foreground">
                  Carbs
                </div>
                <div className="text-lg font-bold">{selectedMeal?.carbs}g</div>
              </div>
              <div className="rounded-lg bg-muted p-3 text-center">
                <div className="text-xs font-medium uppercase text-muted-foreground">
                  Fat
                </div>
                <div className="text-lg font-bold">{selectedMeal?.fat}g</div>
              </div>
            </div>
            
            <div>
              <h4 className="mb-2 font-medium">Ingredients</h4>
              <ul className="list-inside list-disc space-y-1">
                {selectedMeal?.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setMealDialogOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={() => {
                toggleMealCompleted(selectedMeal?.id || "");
                setMealDialogOpen(false);
              }}
            >
              Mark as {selectedMeal?.completed ? "Incomplete" : "Complete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealPlanView;
