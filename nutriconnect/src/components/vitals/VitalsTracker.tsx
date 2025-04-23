
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Activity, TrendingUp, Weight, Heart, Droplets, Scale } from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const VitalsTracker = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("record");
  
  // Form state
  const [weight, setWeight] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [waterIntake, setWaterIntake] = useState<number[]>([5]);

  // Mock historical data
  const mockWeightData = [
    { date: "Apr 1", value: 64.3 },
    { date: "Apr 3", value: 64.5 },
    { date: "Apr 5", value: 64.2 },
    { date: "Apr 7", value: 64.4 },
    { date: "Apr 10", value: 64.1 },
    { date: "Apr 12", value: 64.0 }
  ];

  const mockBPData = [
    { date: "Apr 1", systolic: 118, diastolic: 76 },
    { date: "Apr 3", systolic: 120, diastolic: 78 },
    { date: "Apr 5", systolic: 116, diastolic: 74 },
    { date: "Apr 7", systolic: 119, diastolic: 77 },
    { date: "Apr 10", systolic: 121, diastolic: 79 },
    { date: "Apr 12", systolic: 117, diastolic: 75 }
  ];

  const mockBloodSugarData = [
    { date: "Apr 1", value: 98 },
    { date: "Apr 3", value: 103 },
    { date: "Apr 5", value: 95 },
    { date: "Apr 7", value: 99 },
    { date: "Apr 10", value: 97 },
    { date: "Apr 12", value: 94 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to the backend
    toast({
      title: "Vitals recorded successfully",
      description: "Your health data has been saved.",
    });
    
    // Reset form
    setWeight("");
    setSystolic("");
    setDiastolic("");
    setBloodSugar("");
    setWaterIntake([5]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Vitals Tracker</h2>
        <p className="text-muted-foreground">
          Record and monitor your health metrics
        </p>
      </div>

      <Tabs defaultValue="record" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Record Vitals</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>History & Trends</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="record" className="mt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="h-5 w-5" />
                    Weight
                  </CardTitle>
                  <CardDescription>
                    Record your current weight
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 65.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Blood Pressure
                  </CardTitle>
                  <CardDescription>
                    Record your blood pressure readings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="systolic">Systolic (mmHg)</Label>
                      <Input
                        id="systolic"
                        type="number"
                        placeholder="e.g., 120"
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                      <Input
                        id="diastolic"
                        type="number"
                        placeholder="e.g., 80"
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    Blood Sugar
                  </CardTitle>
                  <CardDescription>
                    Record your blood glucose level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                    <Input
                      id="bloodSugar"
                      type="number"
                      placeholder="e.g., 95"
                      value={bloodSugar}
                      onChange={(e) => setBloodSugar(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    Water Intake
                  </CardTitle>
                  <CardDescription>
                    Record today's water consumption
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Glasses of water</Label>
                      <span className="text-xl font-bold">{waterIntake[0]}</span>
                    </div>
                    <Slider
                      defaultValue={[5]}
                      max={12}
                      step={1}
                      value={waterIntake}
                      onValueChange={setWaterIntake}
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>6</span>
                      <span>12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button type="submit" size="lg">
                Save Vitals
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Weight className="h-5 w-5" />
                  Weight History
                </CardTitle>
                <CardDescription>
                  Your weight measurements over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockWeightData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Weight (kg)"
                        stroke="#0e9f6e"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Average</p>
                    <p className="text-xl font-bold">
                      {(mockWeightData.reduce((sum, item) => sum + item.value, 0) / mockWeightData.length).toFixed(1)} kg
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Change</p>
                    <p className="text-xl font-bold text-nutrition-green-500">
                      {(mockWeightData[mockWeightData.length - 1].value - mockWeightData[0].value).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Blood Pressure History
                </CardTitle>
                <CardDescription>
                  Your blood pressure readings over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockBPData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[60, 140]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="systolic"
                        name="Systolic"
                        stroke="#3f83f8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="diastolic"
                        name="Diastolic"
                        stroke="#e65a4d"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Average</p>
                    <p className="text-xl font-bold">
                      {Math.round(mockBPData.reduce((sum, item) => sum + item.systolic, 0) / mockBPData.length)}/
                      {Math.round(mockBPData.reduce((sum, item) => sum + item.diastolic, 0) / mockBPData.length)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Reading</p>
                    <p className="text-xl font-bold">
                      {mockBPData[mockBPData.length - 1].systolic}/{mockBPData[mockBPData.length - 1].diastolic}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Blood Sugar History
                </CardTitle>
                <CardDescription>
                  Your blood glucose measurements over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockBloodSugarData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[80, 120]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Blood Sugar (mg/dL)"
                        stroke="#9061f9"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Average</p>
                    <p className="text-xl font-bold">
                      {Math.round(mockBloodSugarData.reduce((sum, item) => sum + item.value, 0) / mockBloodSugarData.length)} mg/dL
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Latest</p>
                    <p className="text-xl font-bold">
                      {mockBloodSugarData[mockBloodSugarData.length - 1].value} mg/dL
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => setActiveTab("record")}>
              Record New Reading
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VitalsTracker;
