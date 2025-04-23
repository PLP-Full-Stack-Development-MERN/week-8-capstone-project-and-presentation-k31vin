
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import NutritionistDashboard from "@/components/dashboard/NutritionistDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If not authenticated, the useEffect will redirect to login
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          {user.role === "client" && <ClientDashboard />}
          {user.role === "nutritionist" && <NutritionistDashboard />}
          {user.role === "admin" && <AdminDashboard />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
