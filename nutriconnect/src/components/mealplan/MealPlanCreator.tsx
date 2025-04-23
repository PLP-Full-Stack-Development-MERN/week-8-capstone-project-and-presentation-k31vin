import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, Calendar, FilePlus, MoveLeft, MoveRight, Save, FileCheck, CheckCircle } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
}

interface MealTemplate {
  id: string;
  category: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
  tags: string[];
}

interface DayPlan {
  day: string;
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
  snacks: Meal[];
}

const MealPlanCreator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [planDays, setPlanDays] = useState(7);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state
  const [planTitle, setPlanTitle] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [planNotes, setPlanNotes] = useState("");
  
  // Array of days for the meal plan
  const [days, setDays] = useState<DayPlan[]>([
    {
      day: "Monday",
      breakfast: null,
      lunch: null,
      dinner: null,
      snacks: []
    }
  ]);

  // Mock meal templates
  const mealTemplates: MealTemplate[] = [
    {
      id: "mt1",
      category: "breakfast",
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
      tags: ["high-protein", "vegetarian", "iron-rich"]
    },
    {
      id: "mt2",
      category: "breakfast",
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
      tags: ["fiber", "vegetarian", "quick"]
    },
    {
      id: "mt3",
      category: "lunch",
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
      tags: ["high-protein", "gluten-free"]
    },
    {
      id: "mt4",
      category: "lunch",
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
      tags: ["vegetarian", "iron-rich", "high-fiber"]
    },
    {
      id: "mt5",
      category: "dinner",
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
      tags: ["omega-3", "gluten-free", "high-protein"]
    },
    {
      id: "mt6",
      category: "dinner",
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
      tags: ["lean-protein", "low-fat"]
    },
    {
      id: "mt7",
      category: "snack",
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
      tags: ["high-protein", "calcium-rich", "quick"]
    },
    {
      id: "mt8",
      category: "snack",
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
      tags: ["vegetarian", "quick", "fiber"]
    },
    {
      id: "mt9",
      category: "snack",
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
      tags: ["vegetarian", "plant-protein", "quick"]
    },
    {
      id: "mt10",
      category: "snack",
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
      tags: ["vegetarian", "portable", "energy-rich"]
    }
  ];

  // Mock client list
  const mockClients = [
    { id: "c1", name: "Emma Thompson" },
    { id: "c2", name: "Sarah Johnson" },
    { id: "c3", name: "Rebecca Wilson" },
    { id: "c4", name: "Melissa Parker" }
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Initialize days when plan days change
  const initializeDays = (numDays: number) => {
    const newDays: DayPlan[] = [];
    for (let i = 0; i < numDays; i++) {
      newDays.push({
        day: daysOfWeek[i % 7],
        breakfast: null,
        lunch: null,
        dinner: null,
        snacks: []
      });
    }
    setDays(newDays);
    setCurrentDayIndex(0);
  };

  // Add a meal to the current day plan
  const addMealToDay = (meal: MealTemplate, mealType: "breakfast" | "lunch" | "dinner" | "snack") => {
    const newDays = [...days];
    const newMeal: Meal = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      description: meal.description,
      ingredients: [...meal.ingredients]
    };

    if (mealType === "snack") {
      newDays[currentDayIndex].snacks.push(newMeal);
    } else {
      newDays[currentDayIndex][mealType] = newMeal;
    }

    setDays(newDays);
    
    toast({
      title: "Meal added",
      description: `${meal.name} added to ${days[currentDayIndex].day}'s ${mealType}.`,
    });
  };

  // Remove a meal from the current day plan
  const removeMeal = (mealType: "breakfast" | "lunch" | "dinner", index?: number) => {
    const newDays = [...days];
    
    if (typeof index === "number") {
      // Remove a snack (by index)
      newDays[currentDayIndex].snacks.splice(index, 1);
    } else {
      // Remove a main meal
      newDays[currentDayIndex][mealType] = null;
    }
    
    setDays(newDays);
  };

  // Get filtered meal templates based on search and category
  const getFilteredMealTemplates = (category: string) => {
    return mealTemplates.filter(meal => 
      meal.category === category && 
      (searchTerm === "" || 
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  };

  // Handle saving the meal plan
  const saveMealPlan = () => {
    // Validate required fields
    if (!planTitle || !clientId || !startDate || !endDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields in the plan details.",
        variant: "destructive",
      });
      setActiveTab("details");
      return;
    }

    // Check if all days have at least breakfast, lunch, and dinner
    const incompleteDay = days.findIndex(day => 
      day.breakfast === null || day.lunch === null || day.dinner === null
    );

    if (incompleteDay !== -1) {
      toast({
        title: "Incomplete meal plan",
        description: `${days[incompleteDay].day} is missing one or more main meals.`,
        variant: "destructive",
      });
      setCurrentDayIndex(incompleteDay);
      setActiveTab("plan");
      return;
    }

    // In a real app, this would save to the backend
    toast({
      title: "Meal plan saved",
      description: "The meal plan has been saved successfully.",
    });
  };

  // Handle submitting the meal plan for approval
  const submitForApproval = () => {
    saveMealPlan();
    
    toast({
      title: "Submitted for approval",
      description: "The meal plan has been submitted for administrative approval.",
    });
  };

  // Calculate daily nutrients for the current day
  const calculateDailyNutrients = () => {
    const currentDay = days[currentDayIndex];
    const meals = [
      currentDay.breakfast,
      currentDay.lunch,
      currentDay.dinner,
      ...currentDay.snacks
    ].filter(Boolean) as Meal[];
    
    return {
      calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
      fat: meals.reduce((sum, meal) => sum + meal.fat, 0)
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold">Create Meal Plan</h2>
          <p className="text-muted-foreground">
            Design a personalized nutrition plan for your client
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Button variant="outline" onClick={saveMealPlan} className="flex items-center gap-2">
            <Save size={16} />
            Save Draft
          </Button>
          <Button onClick={submitForApproval} className="flex items-center gap-2">
            <FileCheck size={16} />
            Submit for Approval
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            <span>Plan Details</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Daily Meal Planning</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="plan-title">Plan Title <span className="text-red-500">*</span></Label>
                    <Input
                      id="plan-title"
                      placeholder="e.g., Second Trimester Nutrition Plan"
                      value={planTitle}
                      onChange={(e) => setPlanTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client <span className="text-red-500">*</span></Label>
                    <Select value={clientId} onValueChange={setClientId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plan-description">Plan Description</Label>
                  <Textarea
                    id="plan-description"
                    placeholder="Describe the purpose and focus of this meal plan"
                    value={planDescription}
                    onChange={(e) => setPlanDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date <span className="text-red-500">*</span></Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date <span className="text-red-500">*</span></Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plan-days">Number of Days</Label>
                  <Select 
                    value={planDays.toString()} 
                    onValueChange={(value) => {
                      const numDays = parseInt(value);
                      setPlanDays(numDays);
                      initializeDays(numDays);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of days" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 3, 5, 7, 14, 21, 28].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "day" : "days"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nutritional Guidelines & Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="plan-notes">Notes for Client</Label>
                  <Textarea
                    id="plan-notes"
                    placeholder="Add important notes, dietary instructions, or general guidance for the client"
                    className="min-h-[150px]"
                    value={planNotes}
                    onChange={(e) => setPlanNotes(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Checkbox id="include-shopping-list" defaultChecked />
                    <span>Generate shopping list for client</span>
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("plan")} className="ml-auto">
                Continue to Meal Planning
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="plan" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentDayIndex(Math.max(0, currentDayIndex - 1))}
                disabled={currentDayIndex === 0}
              >
                <MoveLeft className="h-4 w-4" />
              </Button>
              <Select 
                value={currentDayIndex.toString()} 
                onValueChange={(value) => setCurrentDayIndex(parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {day.day} (Day {index + 1})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentDayIndex(Math.min(days.length - 1, currentDayIndex + 1))}
                disabled={currentDayIndex === days.length - 1}
              >
                <MoveRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search meals by name or tag..."
                className="w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Breakfast</CardTitle>
                </CardHeader>
                <CardContent>
                  {days[currentDayIndex].breakfast ? (
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{days[currentDayIndex].breakfast.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeMeal("breakfast")}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{days[currentDayIndex].breakfast.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{days[currentDayIndex].breakfast.calories} kcal</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].breakfast.protein}g protein</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].breakfast.carbs}g carbs</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].breakfast.fat}g fat</span>
                      </div>
                    </div>
                  ) : (
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      <div className="space-y-4">
                        {getFilteredMealTemplates("breakfast").map(meal => (
                          <div 
                            key={meal.id} 
                            className="flex cursor-pointer flex-col rounded-md border p-3 transition-colors hover:bg-muted/50"
                            onClick={() => addMealToDay(meal, "breakfast")}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">{meal.name}</h3>
                              <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{meal.calories} kcal</p>
                          </div>
                        ))}
                        {getFilteredMealTemplates("breakfast").length === 0 && (
                          <p className="text-center text-sm text-muted-foreground">No breakfast options matching your search</p>
                        )}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Lunch</CardTitle>
                </CardHeader>
                <CardContent>
                  {days[currentDayIndex].lunch ? (
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{days[currentDayIndex].lunch.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeMeal("lunch")}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{days[currentDayIndex].lunch.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{days[currentDayIndex].lunch.calories} kcal</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].lunch.protein}g protein</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].lunch.carbs}g carbs</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].lunch.fat}g fat</span>
                      </div>
                    </div>
                  ) : (
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      <div className="space-y-4">
                        {getFilteredMealTemplates("lunch").map(meal => (
                          <div 
                            key={meal.id} 
                            className="flex cursor-pointer flex-col rounded-md border p-3 transition-colors hover:bg-muted/50"
                            onClick={() => addMealToDay(meal, "lunch")}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">{meal.name}</h3>
                              <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{meal.calories} kcal</p>
                          </div>
                        ))}
                        {getFilteredMealTemplates("lunch").length === 0 && (
                          <p className="text-center text-sm text-muted-foreground">No lunch options matching your search</p>
                        )}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Dinner</CardTitle>
                </CardHeader>
                <CardContent>
                  {days[currentDayIndex].dinner ? (
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{days[currentDayIndex].dinner.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeMeal("dinner")}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{days[currentDayIndex].dinner.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{days[currentDayIndex].dinner.calories} kcal</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].dinner.protein}g protein</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].dinner.carbs}g carbs</span>
                        <span>•</span>
                        <span>{days[currentDayIndex].dinner.fat}g fat</span>
                      </div>
                    </div>
                  ) : (
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      <div className="space-y-4">
                        {getFilteredMealTemplates("dinner").map(meal => (
                          <div 
                            key={meal.id} 
                            className="flex cursor-pointer flex-col rounded-md border p-3 transition-colors hover:bg-muted/50"
                            onClick={() => addMealToDay(meal, "dinner")}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">{meal.name}</h3>
                              <Plus className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{meal.calories} kcal</p>
                          </div>
                        ))}
                        {getFilteredMealTemplates("dinner").length === 0 && (
                          <p className="text-center text-sm text-muted-foreground">No dinner options matching your search</p>
                        )}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Snacks</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {days[currentDayIndex].snacks.length} added
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {days[currentDayIndex].snacks.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {days[currentDayIndex].snacks.map((snack, index) => (
                        <div key={snack.id} className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{snack.name}</h3>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeMeal("breakfast", index)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span>{snack.calories} kcal</span>
                            <span>•</span>
                            <span>{snack.protein}g protein</span>
                            <span>•</span>
                            <span>{snack.carbs}g carbs</span>
                            <span>•</span>
                            <span>{snack.fat}g fat</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <div className="space-y-4">
                      {getFilteredMealTemplates("snack").map(meal => (
                        <div 
                          key={meal.id} 
                          className="flex cursor-pointer flex-col rounded-md border p-3 transition-colors hover:bg-muted/50"
                          onClick={() => addMealToDay(meal, "snack")}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">{meal.name}</h3>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{meal.calories} kcal</p>
                        </div>
                      ))}
                      {getFilteredMealTemplates("snack").length === 0 && (
                        <p className="text-center text-sm text-muted-foreground">No snack options matching your search</p>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Day Summary - {days[currentDayIndex].day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">Nutritional Breakdown</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Calories</span>
                          <span className="font-bold">{calculateDailyNutrients().calories} kcal</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-nutrition-green-500"
                            style={{ width: `${Math.min(100, (calculateDailyNutrients().calories / 2000) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>Target: 1800-2200 kcal</span>
                          <span>3000</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Protein</span>
                          <span className="font-bold">{calculateDailyNutrients().protein}g</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-nutrition-blue-500"
                            style={{ width: `${Math.min(100, (calculateDailyNutrients().protein / 100) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>Target: 70-100g</span>
                          <span>150g</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Carbohydrates</span>
                          <span className="font-bold">{calculateDailyNutrients().carbs}g</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-nutrition-peach-500"
                            style={{ width: `${Math.min(100, (calculateDailyNutrients().carbs / 250) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>Target: 200-250g</span>
                          <span>400g</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Fat</span>
                          <span className="font-bold">{calculateDailyNutrients().fat}g</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full bg-yellow-500"
                            style={{ width: `${Math.min(100, (calculateDailyNutrients().fat / 70) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>0</span>
                          <span>Target: 50-70g</span>
                          <span>100g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Meal Composition</h3>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Breakfast</span>
                        <span className="text-sm font-bold">
                          {days[currentDayIndex].breakfast ? `${days[currentDayIndex].breakfast.calories} kcal` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Lunch</span>
                        <span className="text-sm font-bold">
                          {days[currentDayIndex].lunch ? `${days[currentDayIndex].lunch.calories} kcal` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dinner</span>
                        <span className="text-sm font-bold">
                          {days[currentDayIndex].dinner ? `${days[currentDayIndex].dinner.calories} kcal` : 'Not set'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Snacks ({days[currentDayIndex].snacks.length})</span>
                        <span className="text-sm font-bold">
                          {days[currentDayIndex].snacks.length > 0 
                            ? `${days[currentDayIndex].snacks.reduce((sum, snack) => sum + snack.calories, 0)} kcal` 
                            : '0 kcal'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Day Status</h3>
                    <div className="rounded-md bg-muted p-4">
                      <div className="mb-2 flex items-center">
                        {days[currentDayIndex].breakfast && days[currentDayIndex].lunch && days[currentDayIndex].dinner ? (
                          <div className="flex items-center text-nutrition-green-600">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            <span className="font-medium">Main meals complete</span>
                          </div>
                        ) : (
                          <div className="text-yellow-600">
                            <span className="font-medium">Missing main meals</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {days[currentDayIndex].breakfast === null && "Missing breakfast. "}
                        {days[currentDayIndex].lunch === null && "Missing lunch. "}
                        {days[currentDayIndex].dinner === null && "Missing dinner. "}
                        {days[currentDayIndex].breakfast && days[currentDayIndex].lunch && days[currentDayIndex].dinner &&
                          `All main meals are set. ${days[currentDayIndex].snacks.length} snacks added.`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Plan Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Days Completed</h3>
                      <div className="grid grid-cols-7 gap-1">
                        {days.map((day, index) => {
                          const isComplete = day.breakfast && day.lunch && day.dinner;
                          return (
                            <button
                              key={index}
                              className={`rounded p-2 text-center text-xs ${
                                isComplete 
                                  ? 'bg-nutrition-green-100 text-nutrition-green-800' 
                                  : index === currentDayIndex 
                                    ? 'bg-muted font-bold' 
                                    : 'bg-muted/50'
                              }`}
                              onClick={() => setCurrentDayIndex(index)}
                            >
                              {index + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Plan Completeness</h3>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-nutrition-green-500"
                          style={{ 
                            width: `${(days.filter(day => day.breakfast && day.lunch && day.dinner).length / days.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <p className="mt-2 text-center text-sm text-muted-foreground">
                        {days.filter(day => day.breakfast && day.lunch && day.dinner).length} of {days.length} days complete
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("details")}>
                    Back to Details
                  </Button>
                  <Button onClick={saveMealPlan}>Save Plan</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealPlanCreator;
