
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResourceLibrary from "@/components/resources/ResourceLibrary";

const Resources = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          <ResourceLibrary />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
