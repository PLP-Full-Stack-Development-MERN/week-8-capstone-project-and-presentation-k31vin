import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { 
  HeartPulse, 
  Apple, 
  MessageCircle, 
  BookOpen, 
  UserPlus, 
  FileCheck, 
  BarChart, 
  LineChart, 
  ChevronRight, 
  CheckCircle,
  Clock
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("client");
  const [floatingItems, setFloatingItems] = useState<{ id: number; x: number; y: number; size: number; speed: number; icon: string }[]>([]);

  useEffect(() => {
    const items = [];
    const icons = ["🥗", "🍎", "🥑", "🥕", "🥦", "💧", "❤️"];
    
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.8,
        speed: (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        icon: icons[Math.floor(Math.random() * icons.length)]
      });
    }
    
    setFloatingItems(items);
    
    const interval = setInterval(() => {
      setFloatingItems(prevItems => 
        prevItems.map(item => ({
          ...item,
          y: (item.y + item.speed * 0.1) % 100,
          x: (item.x + Math.sin(item.y / 10) * 0.1) % 100
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="relative border-b bg-muted/30 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {floatingItems.map((item) => (
              <div
                key={item.id}
                className="absolute opacity-20 transition-transform"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  fontSize: `${item.size}rem`,
                  transform: `translate(-50%, -50%) rotate(${item.id * 30}deg)`,
                }}
              >
                {item.icon}
              </div>
            ))}
          </div>
          
          <div className="container max-w-6xl space-y-8 text-center relative z-10">
            <div className="mx-auto max-w-3xl space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Personalized Nutrition for <span className="text-primary">Expectant Mothers</span>
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Connect with professional nutritionists for personalized guidance, meal plans and ongoing support throughout your pregnancy journey.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" onClick={() => navigate("/register")} className="gap-2">
                <UserPlus size={20} />
                <span>Create Your Account</span>
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/resources")} className="gap-2">
                <BookOpen size={20} />
                <span>Browse Resources</span>
              </Button>
            </div>
            
            <div className="mx-auto max-w-5xl rounded-xl border bg-card/50 p-4 shadow-sm backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg bg-background p-3">
                  <HeartPulse className="mb-2 h-8 w-8 text-primary" />
                  <h3 className="text-center text-sm font-medium sm:text-base">Track Health Vitals</h3>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-background p-3">
                  <Apple className="mb-2 h-8 w-8 text-nutrition-green-500" />
                  <h3 className="text-center text-sm font-medium sm:text-base">Personalized Meal Plans</h3>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-background p-3">
                  <MessageCircle className="mb-2 h-8 w-8 text-nutrition-blue-500" />
                  <h3 className="text-center text-sm font-medium sm:text-base">Expert Nutritionist Chat</h3>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-background p-3">
                  <LineChart className="mb-2 h-8 w-8 text-nutrition-peach-500" />
                  <h3 className="text-center text-sm font-medium sm:text-base">Progress Monitoring</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How NutriConnect Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform connects you with nutrition experts for personalized guidance
              </p>
            </div>

            <Tabs
              defaultValue="client"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="mb-8 flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="client">For Clients</TabsTrigger>
                  <TabsTrigger value="nutritionist">For Nutritionists</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="client" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <UserPlus size={24} />
                      </div>
                      <CardTitle>Create Your Profile</CardTitle>
                      <CardDescription>
                        Register and share your health information, dietary preferences, and pregnancy stage.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Apple size={24} />
                      </div>
                      <CardTitle>Receive Personalized Plans</CardTitle>
                      <CardDescription>
                        Get customized meal plans and nutritional guidelines based on your specific needs.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MessageCircle size={24} />
                      </div>
                      <CardTitle>Ongoing Support</CardTitle>
                      <CardDescription>
                        Track your progress, communicate with your nutritionist, and adjust your plan as needed.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <div className="mx-auto max-w-3xl rounded-lg border bg-muted/50 p-6">
                  <h3 className="mb-4 text-xl font-semibold">Client Benefits</h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Personalized nutrition advice for your pregnancy stage",
                      "Track health vitals like weight, blood pressure, and blood sugar",
                      "24/7 access to your meal plans and resources",
                      "Direct messaging with certified nutritionists",
                      "Dietary adjustments for gestational diabetes and other conditions",
                      "Educational resources on maternal nutrition"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-nutrition-green-500" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-center">
                    <Button onClick={() => navigate("/register")}>
                      Get Started Today
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nutritionist" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <FileCheck size={24} />
                      </div>
                      <CardTitle>Register as a Nutritionist</CardTitle>
                      <CardDescription>
                        Join our platform with your credentials and areas of specialization.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Apple size={24} />
                      </div>
                      <CardTitle>Create Meal Plans</CardTitle>
                      <CardDescription>
                        Design personalized nutrition plans for your clients based on their needs.
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BarChart size={24} />
                      </div>
                      <CardTitle>Monitor Progress</CardTitle>
                      <CardDescription>
                        Track client vitals, adherence to plans, and provide ongoing guidance.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <div className="mx-auto max-w-3xl rounded-lg border bg-muted/50 p-6">
                  <h3 className="mb-4 text-xl font-semibold">Nutritionist Benefits</h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Dedicated dashboard to manage multiple clients efficiently",
                      "Meal planning tools with nutritional analysis",
                      "Real-time alerts for concerning client vitals",
                      "Secure messaging system for client communication",
                      "Access to medical history and client preferences",
                      "Resources library to share with clients"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-nutrition-blue-500" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-center">
                    <Button onClick={() => navigate("/register")}>
                      Join as a Nutritionist
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-16">
          <div className="container max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by Expectant Mothers
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See how Nutriconnect has helped women during their pregnancy journey
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  quote: "The personalized meal plans helped me manage my gestational diabetes without feeling deprived. My nutritionist was always responsive and supportive throughout my pregnancy.",
                  name: "Emma S.",
                  role: "Mother of 1",
                  avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNtaWxpbmclMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=60"
                },
                {
                  quote: "I was struggling with food aversions in my first trimester, and my nutritionist provided creative alternatives to ensure I got all the nutrients I needed. The tracking features are excellent!",
                  name: "Jessica T.",
                  role: "Expecting Mother",
                  avatar: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1vdGhlciUyMGFuZCUyMGJhYnl8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60"
                },
                {
                  quote: "As someone with special dietary needs, finding a nutritionist who understood my requirements was challenging. Nutriconnect matched me with the perfect expert who created balanced plans for me and my baby.",
                  name: "Michelle K.",
                  role: "Mother of 2",
                  avatar: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1vdGhlciUyMGFuZCUyMGJhYnl8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-base">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t bg-muted/50 pt-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 text-center shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Start Your Nutritional Journey Today
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Join NutriConnect and connect with nutrition experts for personalized guidance throughout your pregnancy.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" onClick={() => navigate("/register")}>
                  Create Your Account
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-16">
          <div className="container max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Nutrition Resources
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Educational content to support your health journey
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate("/resources")} className="gap-1">
                View Library
                <ChevronRight size={16} />
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Essential Nutrients During Pregnancy",
                  description: "Learn about the key nutrients needed for a healthy pregnancy and how to incorporate them into your diet.",
                  type: "Article",
                  time: "5 min read",
                  image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Iron-Rich Breakfast Bowl",
                  description: "A delicious and nutritious breakfast recipe packed with iron, perfect for expectant mothers.",
                  type: "Recipe",
                  time: "15 min prep",
                  image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJyZWFrZmFzdCUyMGJhYnl8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=80"
                },
                {
                  title: "Managing Gestational Diabetes",
                  description: "Practical strategies to control blood sugar levels through smart food choices during pregnancy.",
                  type: "Guide",
                  time: "8 min read",
                  image: "https://images.unsplash.com/photo-1616279969702-21dbdadefb3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRpYWJldGVzJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=80"
                }
              ].map((resource, index) => (
                <Card key={index} className="group overflow-hidden transition-all hover:shadow-md">
                  <div className="relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute right-2 top-2">
                      <Badge
                        variant="outline"
                        className={`${
                          resource.type === "Article"
                            ? "bg-nutrition-blue-100 text-nutrition-blue-800"
                            : resource.type === "Recipe"
                            ? "bg-nutrition-green-100 text-nutrition-green-800"
                            : "bg-nutrition-peach-100 text-nutrition-peach-800"
                        }`}
                      >
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{resource.time}</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-1">{resource.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full gap-1"
                      onClick={() => navigate("/resources")}
                    >
                      <span>Read More</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
