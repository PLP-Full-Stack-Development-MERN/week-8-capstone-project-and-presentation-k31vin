
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, CheckCircle, Users, FileCheck, UserCog, PieChart, 
  Briefcase, UserPlus 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for admin dashboard
  const mockStats = {
    totalClients: 126,
    totalNutritionists: 8,
    pendingApprovals: 5,
    mealPlansCreated: 94,
    systemHealth: 98,
  };

  const mockNutritionists = [
    {
      id: "1",
      name: "Dr. Jennifer Lee",
      specialty: "Prenatal Nutrition",
      clientCount: 23,
      rating: 4.9,
      status: "active",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Gestational Diabetes",
      clientCount: 18,
      rating: 4.7,
      status: "active",
    },
    {
      id: "3",
      name: "Dr. Sarah Williams",
      specialty: "High-Risk Pregnancy",
      clientCount: 15,
      rating: 4.8,
      status: "active",
    },
    {
      id: "4",
      name: "Dr. Robert Johnson",
      specialty: "Postpartum Nutrition",
      clientCount: 20,
      rating: 4.6,
      status: "inactive",
    }
  ];

  const mockPendingApprovals = [
    {
      id: "1",
      type: "meal_plan",
      nutritionist: "Dr. Jennifer Lee",
      client: "Emma Thompson",
      title: "Third Trimester Meal Plan",
      submittedAt: "2 hours ago",
    },
    {
      id: "2",
      type: "nutritionist",
      name: "Dr. Kevin Wilson",
      specialty: "Clinical Nutrition",
      submittedAt: "1 day ago",
    },
    {
      id: "3",
      type: "meal_plan",
      nutritionist: "Dr. Michael Chen",
      client: "Sarah Johnson",
      title: "Low Glycemic Index Diet Plan",
      submittedAt: "4 hours ago",
    },
    {
      id: "4",
      type: "client_complaint",
      client: "Rebecca Wilson",
      nutritionist: "Dr. Sarah Williams",
      description: "Unresolved questions about meal plan",
      submittedAt: "Yesterday",
    },
    {
      id: "5",
      type: "nutritionist",
      name: "Dr. Maria Garcia",
      specialty: "Maternal Health Nutrition",
      submittedAt: "3 days ago",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor system activity and manage users
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={() => navigate("/admin/nutritionists/new")} className="flex items-center gap-2">
            <UserPlus size={16} />
            Add Nutritionist
          </Button>
          <Button onClick={() => navigate("/admin/reports")} variant="outline" className="flex items-center gap-2">
            <PieChart size={16} />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockStats.totalClients}</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-nutrition-green-500" />
              <span className="text-nutrition-green-500">+5.2%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Nutritionists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockStats.totalNutritionists}</div>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-nutrition-green-500" />
              <span className="text-nutrition-green-500">+1</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockStats.pendingApprovals}</div>
              <UserCog className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Requires your attention
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Meal Plans Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockStats.mealPlansCreated}</div>
              <FileCheck className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-nutrition-green-500" />
              <span className="text-nutrition-green-500">+12</span>
              <span>this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{mockStats.systemHealth}%</div>
              <CheckCircle className="h-5 w-5 text-nutrition-green-500" />
            </div>
            <Progress value={mockStats.systemHealth} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>
              Items requiring administrator approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between rounded-md border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.type === "meal_plan" && (
                        <Badge variant="secondary">Meal Plan</Badge>
                      )}
                      {item.type === "nutritionist" && (
                        <Badge variant="outline">Nutritionist</Badge>
                      )}
                      {item.type === "client_complaint" && (
                        <Badge variant="destructive">Complaint</Badge>
                      )}
                      <p className="text-xs text-muted-foreground">{item.submittedAt}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {item.type === "meal_plan" && item.title}
                      {item.type === "nutritionist" && `New Nutritionist: ${item.name}`}
                      {item.type === "client_complaint" && item.description}
                    </p>
                    <div className="pt-1 text-xs text-muted-foreground">
                      {item.type === "meal_plan" && (
                        <span>
                          By {item.nutritionist} for {item.client}
                        </span>
                      )}
                      {item.type === "nutritionist" && (
                        <span>Specialty: {item.specialty}</span>
                      )}
                      {item.type === "client_complaint" && (
                        <span>
                          From {item.client} regarding {item.nutritionist}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      Reject
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/admin/approvals")}>
              View All Pending Approvals
            </Button>
          </CardFooter>
        </Card>

        {/* Nutritionists */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Nutritionist Overview</CardTitle>
            <CardDescription>
              Monitor your nutrition professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Clients</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockNutritionists.map((nutritionist) => (
                  <TableRow key={nutritionist.id}>
                    <TableCell className="font-medium">{nutritionist.name}</TableCell>
                    <TableCell>{nutritionist.specialty}</TableCell>
                    <TableCell>{nutritionist.clientCount}</TableCell>
                    <TableCell>{nutritionist.rating}/5.0</TableCell>
                    <TableCell>
                      <Badge variant={nutritionist.status === "active" ? "default" : "outline"}>
                        {nutritionist.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/nutritionists/${nutritionist.id}`)}>
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/admin/nutritionists")}>
              Manage Nutritionists
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
