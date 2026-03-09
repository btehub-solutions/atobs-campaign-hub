import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";

// Lazy load all sections below the fold for extreme performance
const About = lazy(() => import("@/components/sections/About"));
const Achievements = lazy(() => import("@/components/sections/Achievements"));
const ResultsAnalytics = lazy(() => import("@/components/sections/ResultsAnalytics"));
const WardTracker = lazy(() => import("@/components/sections/WardTracker"));
const MediaPress = lazy(() => import("@/components/sections/MediaPress"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const Gallery = lazy(() => import("@/components/sections/Gallery"));
const Contact = lazy(() => import("@/components/sections/Contact"));
const Footer = lazy(() => import("@/components/footer/Footer"));
const Publications = lazy(() => import("@/components/sections/Publications"));
const AIAssistant = lazy(() => import("@/components/ui/AIAssistant"));

const Index = () => {
  const { scrollYProgress } = useScroll();

  // Scroll-driven background color shift
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["hsl(220, 14%, 96%)", "hsl(220, 14%, 94%)", "hsl(220, 14%, 92%)"]
  );

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      
      {/* ─── GLOBAL ARTISTRY CANVAS (SHOPIFY STYLE BGS) ─── */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden transition-colors duration-700"
        style={{ backgroundColor }}
      >
        
        {/* Micro Grid Overlay for structural depth */}
        <div className="absolute inset-0 micro-grid opacity-[0.35]" />

        {/* Spotlight Vignette to soften edges and focus center removed to keep pure ash */}
        
        {/* Animated Cinematic Grain replacing static noise */}
        <div className="animated-noise" />
      </motion.div>

      {/* MAIN PAGE CONTENT */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center opacity-50"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"/></div>}>
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
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
    </div>
  );
};

export default Index;
