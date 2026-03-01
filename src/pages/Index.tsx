import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import Achievements from "@/components/sections/Achievements";
import ResultsAnalytics from "@/components/sections/ResultsAnalytics";
import WardTracker from "@/components/sections/WardTracker";
import MediaPress from "@/components/sections/MediaPress";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Achievements />
      <ResultsAnalytics />
      <WardTracker />
      <MediaPress />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
