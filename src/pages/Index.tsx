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

  // Scroll-driven background color shift
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["hsl(40, 20%, 98%)", "hsl(210, 20%, 98%)", "hsl(210, 30%, 95%)"]
  );

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      
      {/* ─── GLOBAL ARTISTRY CANVAS (SHOPIFY STYLE BGS) ─── */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden transition-colors duration-700"
        style={{ backgroundColor }}
      >
        
        {/* Micro Grid Overlay for structural depth */}
        <div className="absolute inset-0 micro-grid opacity-[0.03]" />

        {/* Spotlight Vignette to soften edges and focus center */}
        <div className="absolute inset-0 spotlight-vignette opacity-60" />

        {/* Abstract animated gradient orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] mix-blend-multiply opacity-60" 
        />
        
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute top-[30%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent/15 blur-[130px] mix-blend-multiply opacity-50" 
        />

        <motion.div 
          animate={{ x: [0, 60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vw] rounded-full bg-[hsl(210_40%_85%)] blur-[150px] mix-blend-multiply opacity-70" 
        />
        
        {/* Animated Cinematic Grain replacing static noise */}
        <div className="animated-noise" />

        {/* Parallax Rock Watermark - Extremely subtle, blended into the artistic background */}
        <motion.div 
          className="absolute inset-0 mix-blend-color-burn opacity-[0.02]"
          style={{ 
            y: rockY,
            backgroundImage: "url('/parallax/rock.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat"
          }}
        />
      </motion.div>

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
