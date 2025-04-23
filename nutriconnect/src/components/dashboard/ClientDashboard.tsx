
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CalendarClock, Activity, Apple, MessageCircle, BookOpen, ArrowRight, BarChart
} from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for client dashboard
  const mockData = {
    stats: {
      completedMeals: 19,
      totalMeals: 21,
      waterIntake: 6,
      waterGoal: 8,
      weeklyProgress: 72,
      unreadMessages: 3,
    },
    nextAppointment: "April 15, 2025 10:30 AM",
    recentVitals: {
      weight: "65 kg",
      bloodPressure: "118/76",
      bloodSugar: "95 mg/dL"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">
            Track your nutrition progress and access personalized resources
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={() => navigate("/vitals/track")} className="flex items-center gap-2">
            <Activity size={16} />
            Log Vitals
          </Button>
          <Button onClick={() => navigate("/meal-plans")} variant="outline" className="flex items-center gap-2">
            <Apple size={16} />
            View Meal Plan
          </Button>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Meal Plan Adherence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{Math.round((mockData.stats.completedMeals / mockData.stats.totalMeals) * 100)}%</div>
              <Apple className="h-5 w-5 text-nutrition-green-500" />
            </div>
            <Progress value={(mockData.stats.completedMeals / mockData.stats.totalMeals) * 100} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {mockData.stats.completedMeals} of {mockData.stats.totalMeals} meals completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Water Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockData.stats.waterIntake}/{mockData.stats.waterGoal} glasses</div>
              <BarChart className="h-5 w-5 text-nutrition-blue-500" />
            </div>
            <Progress value={(mockData.stats.waterIntake / mockData.stats.waterGoal) * 100} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              {mockData.stats.waterGoal - mockData.stats.waterIntake} more glasses to go today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockData.stats.weeklyProgress}%</div>
              <Activity className="h-5 w-5 text-nutrition-peach-500" />
            </div>
            <Progress value={mockData.stats.weeklyProgress} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              You're doing great! Keep it up.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Vitals</CardTitle>
            <CardDescription>
              Your latest health measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="nutrition-stat">
                <div className="mb-1 text-sm font-medium">Weight</div>
                <div className="text-lg font-bold">{mockData.recentVitals.weight}</div>
              </div>
              <div className="nutrition-stat">
                <div className="mb-1 text-sm font-medium">Blood Pressure</div>
                <div className="text-lg font-bold">{mockData.recentVitals.bloodPressure}</div>
              </div>
              <div className="nutrition-stat">
                <div className="mb-1 text-sm font-medium">Blood Sugar</div>
                <div className="text-lg font-bold">{mockData.recentVitals.bloodSugar}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/vitals")}>
              View All Vitals
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutritionist Contact</CardTitle>
            <CardDescription>
              Your upcoming appointments and messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <CalendarClock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Next Appointment</p>
                <p className="text-sm text-muted-foreground">{mockData.nextAppointment}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Messages</p>
                <p className="text-sm text-muted-foreground">
                  {mockData.stats.unreadMessages > 0 
                    ? `${mockData.stats.unreadMessages} unread messages`
                    : "No unread messages"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/messages")}>
              Messages
            </Button>
            <Button onClick={() => window.open("https://calendly.com", "_blank", "noopener,noreferrer")}>
              Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Resources Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Nutritional Resources</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/resources")} className="gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:bg-muted/50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span className="nutrition-badge nutrition-badge-green">Article</span>
                <span className="text-xs text-muted-foreground">5 min read</span>
              </div>
              <CardTitle className="text-base">Nutrition Essentials for Pregnancy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn about the essential nutrients needed during pregnancy and how to incorporate them into your diet.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate("/resources/article/1")}>
                Read More
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:bg-muted/50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span className="nutrition-badge nutrition-badge-blue">Recipe</span>
                <span className="text-xs text-muted-foreground">15 min prep</span>
              </div>
              <CardTitle className="text-base">Iron-Rich Breakfast Bowl</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A delicious breakfast bowl packed with iron-rich ingredients perfect for expectant mothers.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate("/resources/recipe/1")}>
                View Recipe
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:bg-muted/50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span className="nutrition-badge nutrition-badge-peach">Guide</span>
                <span className="text-xs text-muted-foreground">3 min read</span>
              </div>
              <CardTitle className="text-base">Managing Gestational Diabetes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Practical tips for managing gestational diabetes through diet and lifestyle changes.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate("/resources/guide/1")}>
                Read Guide
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
