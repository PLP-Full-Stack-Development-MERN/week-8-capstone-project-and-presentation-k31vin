
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MealPlanView from "@/components/mealplan/MealPlanView";
import MealPlanCreator from "@/components/mealplan/MealPlanCreator";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FilePlus, FileCheck, ArrowRight } from "lucide-react";

const MealPlans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"view" | "create">("view");

  // If this is a nutritionist and they were directed to create a meal plan
  const isCreating = user?.role === "nutritionist" && window.location.pathname.includes("/meal-plans/create");

  if (isCreating || mode === "create") {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1 py-8">
          <div className="container max-w-7xl">
            <MealPlanCreator />
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          {user?.role === "client" ? (
            <MealPlanView />
          ) : (
            <>
              <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="text-3xl font-bold">Meal Plans</h2>
                  <p className="text-muted-foreground">
                    Create and manage meal plans for your clients
                  </p>
                </div>
                <div>
                  <Button onClick={() => setMode("create")} className="flex items-center gap-2">
                    <FilePlus size={16} />
                    Create New Plan
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Active Plans</span>
                  </TabsTrigger>
                  <TabsTrigger value="drafts" className="flex items-center gap-2">
                    <FilePlus className="h-4 w-4" />
                    <span>Drafts</span>
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    <span>Approved</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        id: "mp1",
                        title: "Second Trimester Balanced Nutrition Plan",
                        client: "Emma Thompson",
                        startDate: "April 10, 2025",
                        endDate: "April 17, 2025"
                      },
                      {
                        id: "mp2",
                        title: "Low Glycemic Diet for Gestational Diabetes",
                        client: "Sarah Johnson",
                        startDate: "April 8, 2025",
                        endDate: "April 15, 2025"
                      },
                      {
                        id: "mp3",
                        title: "Third Trimester Iron-Rich Diet Plan",
                        client: "Rebecca Wilson",
                        startDate: "April 12, 2025",
                        endDate: "April 19, 2025"
                      }
                    ].map((plan) => (
                      <Card key={plan.id} className="transition-all hover:shadow-md">
                        <CardHeader>
                          <CardTitle className="line-clamp-1">{plan.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Client:</span>
                              <span className="font-medium">{plan.client}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Duration:</span>
                              <span className="font-medium">{plan.startDate} - {plan.endDate}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => navigate(`/meal-plans/${plan.id}`)} className="w-full gap-1">
                            <span>View Plan</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="drafts" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        id: "draft1",
                        title: "Post-Partum Recovery Diet",
                        client: "Jessica Adams",
                        lastEdited: "April 11, 2025"
                      }
                    ].map((plan) => (
                      <Card key={plan.id} className="transition-all hover:shadow-md">
                        <CardHeader>
                          <CardTitle className="line-clamp-1">{plan.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Client:</span>
                              <span className="font-medium">{plan.client}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Edited:</span>
                              <span className="font-medium">{plan.lastEdited}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" onClick={() => setMode("create")} className="w-full gap-1">
                            <span>Continue Editing</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="approved" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        id: "app1",
                        title: "First Trimester Nausea Management Diet",
                        client: "Amanda Martin",
                        approvedDate: "April 3, 2025",
                        endDate: "April 10, 2025"
                      },
                      {
                        id: "app2",
                        title: "High Protein Pregnancy Plan",
                        client: "Laura Stevens",
                        approvedDate: "April 1, 2025",
                        endDate: "April 8, 2025"
                      }
                    ].map((plan) => (
                      <Card key={plan.id} className="transition-all hover:shadow-md">
                        <CardHeader>
                          <CardTitle className="line-clamp-1">{plan.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Client:</span>
                              <span className="font-medium">{plan.client}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Approved:</span>
                              <span className="font-medium">{plan.approvedDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">End Date:</span>
                              <span className="font-medium">{plan.endDate}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => navigate(`/meal-plans/${plan.id}`)} className="w-full gap-1">
                            <span>View Plan</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MealPlans;
