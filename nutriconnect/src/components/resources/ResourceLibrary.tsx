
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  BookOpen,
  Clock,
  FileText,
  ChefHat,
  GraduationCap,
  Heart,
  Utensils,
  AlarmClock,
  PieChart,
  Bookmark,
  Star,
  User,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "recipe" | "guide" | "video";
  category: string;
  thumbnail: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime?: string;
  prepTime?: string;
  tags: string[];
  favorited: boolean;
  featured?: boolean;
}

const ResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Mock resource data
  const resources: Resource[] = [
    {
      id: "r1",
      title: "Essential Nutrients During Pregnancy",
      description: "Learn about the key nutrients needed for a healthy pregnancy and how to incorporate them into your diet.",
      type: "article",
      category: "pregnancy",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Dr. Jennifer Lee",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "April 5, 2025",
      readTime: "5 min read",
      tags: ["pregnancy", "nutrition", "iron", "folate", "calcium"],
      favorited: false,
      featured: true
    },
    {
      id: "r2",
      title: "Managing Gestational Diabetes Through Diet",
      description: "Practical strategies to control blood sugar levels through smart food choices during pregnancy.",
      type: "guide",
      category: "diabetes",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Dr. Michael Chen",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "April 2, 2025",
      readTime: "8 min read",
      tags: ["gestational diabetes", "blood sugar", "diet", "pregnancy"],
      favorited: true
    },
    {
      id: "r3",
      title: "Iron-Rich Breakfast Bowl",
      description: "A delicious and nutritious breakfast recipe packed with iron, perfect for expectant mothers.",
      type: "recipe",
      category: "meals",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Sarah Williams",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 28, 2025",
      prepTime: "15 min prep",
      tags: ["breakfast", "iron-rich", "quick", "spinach", "eggs"],
      favorited: false
    },
    {
      id: "r4",
      title: "Healthy Hydration During Pregnancy",
      description: "Understanding your increased water needs during pregnancy and tips to stay well-hydrated.",
      type: "article",
      category: "pregnancy",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Dr. Jennifer Lee",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 25, 2025",
      readTime: "4 min read",
      tags: ["hydration", "pregnancy", "water", "electrolytes"],
      favorited: false
    },
    {
      id: "r5",
      title: "Mediterranean Diet for Maternal Health",
      description: "How following Mediterranean dietary patterns can benefit both mother and baby during pregnancy.",
      type: "guide",
      category: "diets",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Dr. Robert Johnson",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 20, 2025",
      readTime: "10 min read",
      tags: ["mediterranean", "olive oil", "omega-3", "whole grains"],
      favorited: true
    },
    {
      id: "r6",
      title: "Protein-Packed Lentil Soup",
      description: "A hearty soup recipe rich in plant-based protein and iron, perfect for a nutritious lunch or dinner.",
      type: "recipe",
      category: "meals",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Sarah Williams",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 18, 2025",
      prepTime: "30 min prep",
      tags: ["soup", "lentils", "plant-protein", "iron", "dinner"],
      favorited: false
    },
    {
      id: "r7",
      title: "Postpartum Nutrition Essentials",
      description: "Nutritional guidance for recovery and breastfeeding after giving birth.",
      type: "article",
      category: "postpartum",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Dr. Jennifer Lee",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 15, 2025",
      readTime: "7 min read",
      tags: ["postpartum", "breastfeeding", "recovery", "nutrition"],
      favorited: false
    },
    {
      id: "r8",
      title: "Managing Morning Sickness Through Diet",
      description: "Dietary strategies to help alleviate nausea and morning sickness during early pregnancy.",
      type: "guide",
      category: "pregnancy",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Dr. Michael Chen",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 10, 2025",
      readTime: "6 min read",
      tags: ["morning sickness", "nausea", "first trimester", "ginger"],
      favorited: false
    },
    {
      id: "r9",
      title: "Calcium-Rich Smoothie Bowl",
      description: "A simple and delicious smoothie bowl packed with calcium for bone health during pregnancy.",
      type: "recipe",
      category: "meals",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Sarah Williams",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 8, 2025",
      prepTime: "10 min prep",
      tags: ["smoothie", "calcium", "breakfast", "yogurt", "quick"],
      favorited: true
    },
    {
      id: "r10",
      title: "Understanding Food Aversions During Pregnancy",
      description: "The science behind pregnancy food aversions and strategies to ensure proper nutrition despite them.",
      type: "article",
      category: "pregnancy",
      thumbnail: "/placeholder.svg",
      author: {
        name: "Dr. Robert Johnson",
        role: "Nutritionist",
        avatar: "/placeholder.svg"
      },
      date: "March 5, 2025",
      readTime: "5 min read",
      tags: ["food aversions", "pregnancy", "first trimester", "nutrition"],
      favorited: false
    }
  ];

  const categories = [
    { id: "all", name: "All Resources", icon: BookOpen },
    { id: "pregnancy", name: "Pregnancy", icon: Heart },
    { id: "diabetes", name: "Gestational Diabetes", icon: PieChart },
    { id: "diets", name: "Diets & Plans", icon: FileText },
    { id: "meals", name: "Meal Ideas", icon: Utensils },
    { id: "postpartum", name: "Postpartum", icon: Calendar },
  ];

  // Filter resources based on search term and active category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Separate featured resources from the rest
  const featuredResources = filteredResources.filter(resource => resource.featured);
  const regularResources = filteredResources.filter(resource => !resource.featured);

  // Split resources by type for the tabs
  const articles = filteredResources.filter(resource => resource.type === "article");
  const recipes = filteredResources.filter(resource => resource.type === "recipe");
  const guides = filteredResources.filter(resource => resource.type === "guide");

  // Helper function to render resource cards
  const renderResourceCard = (resource: Resource) => (
    <Card key={resource.id} className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="h-48 w-full object-cover"
        />
        <div className="absolute right-2 top-2">
          <Badge
            variant="outline"
            className={`${
              resource.type === "article"
                ? "bg-nutrition-blue-100 text-nutrition-blue-800"
                : resource.type === "recipe"
                ? "bg-nutrition-green-100 text-nutrition-green-800"
                : "bg-nutrition-peach-100 text-nutrition-peach-800"
            } capitalize`}
          >
            {resource.type}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 bottom-2 transition-all ${
            resource.favorited
              ? "text-yellow-500 hover:text-yellow-600"
              : "text-muted-foreground/50 hover:text-muted-foreground"
          }`}
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {resource.type === "article" || resource.type === "guide" ? (
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>{resource.readTime}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <AlarmClock className="mr-1 h-3 w-3" />
              <span>{resource.prepTime}</span>
            </div>
          )}
          {resource.category && (
            <>
              <span>•</span>
              <span className="capitalize">{resource.category}</span>
            </>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-lg">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-muted/50 text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 3 && (
            <Badge variant="outline" className="bg-muted/50 text-xs font-normal">
              +{resource.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 pt-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={resource.author.avatar} alt={resource.author.name} />
              <AvatarFallback>{resource.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-medium">{resource.author.name}</p>
              <p className="text-muted-foreground">{resource.author.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-xs"
          >
            <span>Read</span>
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold">Resource Library</h2>
          <p className="text-muted-foreground">
            Browse our collection of articles, guides, and recipes for nutrition and wellness
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-10 flex flex-col gap-4 bg-background pb-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="h-8 gap-1.5"
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Featured resources section */}
      {featuredResources.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            <h3 className="text-xl font-semibold">Featured Resources</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map(renderResourceCard)}
          </div>
        </div>
      )}

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" className="gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>All ({filteredResources.length})</span>
          </TabsTrigger>
          <TabsTrigger value="articles" className="gap-1.5">
            <FileText className="h-4 w-4" />
            <span>Articles ({articles.length})</span>
          </TabsTrigger>
          <TabsTrigger value="recipes" className="gap-1.5">
            <ChefHat className="h-4 w-4" />
            <span>Recipes ({recipes.length})</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="gap-1.5">
            <GraduationCap className="h-4 w-4" />
            <span>Guides ({guides.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredResources.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regularResources.map(renderResourceCard)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No resources found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm
                  ? `No resources match the search term "${searchTerm}"`
                  : "No resources available in this category"}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="articles" className="mt-6">
          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map(renderResourceCard)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No articles found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ? `Try a different search term` : "No articles available in this category"}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recipes" className="mt-6">
          {recipes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map(renderResourceCard)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <ChefHat className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No recipes found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ? `Try a different search term` : "No recipes available in this category"}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="guides" className="mt-6">
          {guides.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map(renderResourceCard)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <GraduationCap className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No guides found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ? `Try a different search term` : "No guides available in this category"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceLibrary;
