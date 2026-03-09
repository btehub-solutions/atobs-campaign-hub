import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";

const MediaCoverage = lazy(() => import("./pages/MediaCoverage"));
const GalleryArchive = lazy(() => import("./pages/GalleryArchive"));
import ScrollToTop from "./components/ui/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/media" 
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F4F5F7]"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"/></div>}>
                <MediaCoverage />
              </Suspense>
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F4F5F7]"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"/></div>}>
                <GalleryArchive />
              </Suspense>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
