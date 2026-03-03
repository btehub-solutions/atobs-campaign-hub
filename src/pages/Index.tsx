import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import ResultsAnalytics from "@/components/sections/ResultsAnalytics";
import WardTracker from "@/components/sections/WardTracker";
import MediaPress from "@/components/sections/MediaPress";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer/Footer";

import Publications from "@/components/sections/Publications";
import AIAssistant from "@/components/ui/AIAssistant";

const Index = () => {
  const { scrollYProgress } = useScroll();
  
  // Spring configuration for a smooth, premium parallax feel
  const springConfig = { stiffness: 50, damping: 30, restDelta: 0.001 };
  
  // Parallax translation for the background rock - moves downwards slightly as you scroll down
  const rockY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "20%"]), springConfig);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* GLOBAL BACKGROUND LAYER: Olumo Rock Parallax Overlay */}
      <motion.div 
        className="fixed inset-0 w-full h-[120vh] z-0 pointer-events-none opacity-[0.08]"
        style={{ 
          y: rockY,
          backgroundImage: "url('/parallax/rock.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Blend masks to ensure the rock image seamlessly blends with the dark background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-background/30 via-transparent to-background/90" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,hsl(var(--background))_100%)] opacity-80" />

      {/* MAIN PAGE CONTENT */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Publications />
        <Achievements />
        <ResultsAnalytics />
        <WardTracker />
        <MediaPress />
        <Testimonials />
        <Gallery />
        <Contact />
        <Footer />
      </div>

      <AIAssistant />
    </div>
  );
};

export default Index;
