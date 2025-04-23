
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MessageCenter from "@/components/messaging/MessageCenter";

const Messages = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl">
          <h2 className="mb-6 text-3xl font-bold">Messages</h2>
          <MessageCenter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
