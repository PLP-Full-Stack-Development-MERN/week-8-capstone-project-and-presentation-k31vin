
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="mt-2 text-muted-foreground">
              Join NutriConnect to access personalized nutrition guidance
            </p>
          </div>
          
          <RegisterForm />
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
