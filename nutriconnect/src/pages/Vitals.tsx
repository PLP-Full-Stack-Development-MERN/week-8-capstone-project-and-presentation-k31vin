
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VitalsTracker from "@/components/vitals/VitalsTracker";

const Vitals = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          <VitalsTracker />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vitals;
