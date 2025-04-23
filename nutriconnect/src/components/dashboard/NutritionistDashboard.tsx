
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, Calendar, MessageCircle, FilePlus, UserCircle, Bell, ArrowUpRight, 
  AlertTriangle, CheckCircle 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const NutritionistDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for nutritionist dashboard
  const mockClients = [
    {
      id: "1",
      name: "Emma Thompson",
      status: "active",
      condition: "Pregnancy (2nd Trimester)",
      lastContact: "2 days ago",
      alerts: [
        { type: "warning", message: "Blood pressure slightly elevated" }
      ],
      avatar: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      status: "active",
      condition: "Gestational Diabetes",
      lastContact: "Today",
      alerts: [
        { type: "alert", message: "Missed logging meals for 3 days" }
      ],
      avatar: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Rebecca Wilson",
      status: "active",
      condition: "Pregnancy (3rd Trimester)",
      lastContact: "Yesterday",
      alerts: [],
      avatar: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Melissa Parker",
      status: "inactive",
      condition: "Post-partum",
      lastContact: "5 days ago",
      alerts: [],
      avatar: "/placeholder.svg"
    }
  ];

  const mockAppointments = [
    {
      id: "1",
      client: "Emma Thompson",
      date: "Today, 2:00 PM",
      type: "Follow-up",
      status: "upcoming"
    },
    {
      id: "2",
      client: "Sarah Johnson",
      date: "Today, 4:30 PM",
      type: "Meal Plan Review",
      status: "upcoming"
    },
    {
      id: "3",
      client: "Rebecca Wilson",
      date: "Tomorrow, 10:00 AM",
      type: "Initial Consultation",
      status: "upcoming"
    }
  ];

  const mockAlerts = [
    {
      id: "1",
      type: "warning",
      message: "Emma Thompson's blood pressure readings are trending upward",
      timestamp: "2 hours ago",
      client: "Emma Thompson"
    },
    {
      id: "2",
      type: "alert",
      message: "Sarah Johnson has missed logging meals for 3 consecutive days",
      timestamp: "6 hours ago",
      client: "Sarah Johnson"
    },
    {
      id: "3",
      type: "info",
      message: "New client request from Jessica Adams pending approval",
      timestamp: "Yesterday",
      client: "Jessica Adams"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold">Nutritionist Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your clients and monitor their progress
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={() => navigate("/meal-plans/create")} className="flex items-center gap-2">
            <FilePlus size={16} />
            Create Meal Plan
          </Button>
          <Button onClick={() => navigate("/clients")} variant="outline" className="flex items-center gap-2">
            <Users size={16} />
            View All Clients
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{mockClients.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {mockAppointments.filter(a => a.date.includes("Today")).length}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">5</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-muted-foreground" />
              <div className="text-2xl font-bold">{mockAlerts.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Client Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Client Alerts</CardTitle>
            <CardDescription>
              Recent notifications requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-4 rounded-md border p-4"
                >
                  {alert.type === "warning" ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  ) : alert.type === "alert" ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Bell className="h-5 w-5 text-blue-500" />
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{alert.message}</p>
                    <div className="flex items-center pt-2">
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      <span className="px-1 text-muted-foreground">•</span>
                      <p className="text-xs font-medium text-primary">{alert.client}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              Upcoming consultations for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments
                .filter((appt) => appt.date.includes("Today"))
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between space-x-4 rounded-md border p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <UserCircle className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{appointment.client}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-muted-foreground">{appointment.date}</p>
                          <span className="px-1 text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
              {mockAppointments.filter((appt) => appt.date.includes("Today")).length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-2 text-lg font-medium">No Appointments Today</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You have no scheduled appointments for today.
                  </p>
                  <Button className="mt-4" onClick={() => navigate("/appointments")}>
                    Schedule Appointment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle>Clients Overview</CardTitle>
          <CardDescription>
            Manage and monitor your client list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.condition}</TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "default" : "outline"}>
                      {client.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.lastContact}</TableCell>
                  <TableCell>
                    {client.alerts.length > 0 ? (
                      <div className="flex space-x-1">
                        {client.alerts.map((alert, index) => (
                          <AlertTriangle
                            key={index}
                            className={`h-4 w-4 ${
                              alert.type === "warning" ? "text-yellow-500" : "text-red-500"
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <CheckCircle className="h-4 w-4 text-nutrition-green-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/clients/${client.id}`)}>
                        Profile
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/meal-plans/client/${client.id}`)}>
                        Meal Plan
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => navigate("/clients")}>
            View All Clients
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NutritionistDashboard;
