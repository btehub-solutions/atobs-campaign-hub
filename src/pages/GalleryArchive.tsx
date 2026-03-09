import { motion } from "framer-motion";
import { galleryItems } from "@/lib/data/gallery";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";

const GalleryArchive = () => {
  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      {/* ─── GLOBAL ARTISTRY CANVAS ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#F4F5F7]">
        <div className="absolute inset-0 micro-grid opacity-50" />
        <div className="animated-noise" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-40">
        <div className="section-container max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 px-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
              <Link 
                to="/#gallery" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:shadow-[0_4px_20px_hsl(152_62%_42%/0.3)] transition-all group px-5 py-2.5 bg-primary rounded-full border border-primary/20 w-fit hover:-translate-y-0.5"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              
              <span className="section-badge inline-flex border-primary/20 bg-primary/5 text-primary w-fit">The Art of Impact</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
              Moments of <span className="text-primary font-serif italic tracking-normal">Action</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
              Every policy, every outreach, every handshake is a stroke on the canvas of a better Abeokuta South. Dive into the visual story.
            </p>
          </motion.div>

          {/* Asymmetric Artistry Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[280px] sm:auto-rows-[300px] gap-4 md:gap-5 px-2 sm:px-0">
            {galleryItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className={`group relative overflow-hidden rounded-[24px] sm:rounded-[32px] cursor-pointer flex flex-col justify-end p-6 sm:p-8 isolation-isolate shadow-sm ${item.className}`}
                >
                  {/* Background Layer */}
                  {item.hasImage ? (
                    <>
                      <div className="absolute inset-0 bg-neutral-900 -z-20" />
                      <img 
                        src={(item as any).image} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-center -z-10 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} -z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-card border border-border/80 -z-20 shadow-sm" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none opacity-50" />
                    </>
                  )}

                  <div className="relative z-20 flex flex-col items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-sm transition-transform duration-500 group-hover:-translate-y-1 ${
                      item.hasImage ? "bg-white/10 border border-white/20 text-white" : "bg-card/80 border border-border/50 text-primary"
                    }`}>
                      <Icon size={22} strokeWidth={2} />
                    </div>

                    <div>
                       <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block ${
                         item.hasImage ? "text-primary-foreground/80" : "text-primary/80"
                       }`}>
                         {item.tag}
                       </span>
                       <h3 className={`font-heading text-xl sm:text-2xl font-bold mb-2 group-hover:-translate-y-1 transition-transform duration-500 ${
                         item.hasImage ? "text-white drop-shadow-md" : "text-foreground"
                       }`}>
                         {item.title}
                       </h3>
                       <p className={`text-sm sm:text-[15px] leading-relaxed max-w-[90%] opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 ${
                         item.hasImage ? "text-white/80" : "text-muted-foreground"
                       }`}>
                         {item.desc}
                       </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GalleryArchive;
