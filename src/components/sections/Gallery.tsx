import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { galleryItems } from "@/lib/data/gallery";

const Gallery = () => {
  return (
    <section id="gallery" className="py-40 relative overflow-hidden">
      {/* Ambient Mesh Glows removed to enforce solid ash background */}
      
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 px-4"
        >
          <div className="max-w-2xl">
            <span className="section-badge mb-6 inline-flex border-primary/20 bg-primary/5 text-primary">The Art of Impact</span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight mb-4 leading-[1.05]">
              Moments of <span className="text-primary font-serif italic tracking-normal">Action</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-[1.7]">
              Every policy, every outreach, every handshake is a stroke on the canvas of a better Abeokuta South. Dive into the visual story.
            </p>
          </div>
          <Link 
            to="/gallery"
            className="btn-pill-outline shrink-0 self-start md:self-auto hidden sm:flex items-center gap-2"
          >
            View Full Archive
          </Link>
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
                      src={item.image} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover object-center -z-10 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0"
                      loading="lazy"
                    />
                    {/* Cinematic Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} -z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-card border border-border/80 -z-20 shadow-sm" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                    {/* Abstract Grid Overlays for non-image cards */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10 pointer-events-none opacity-50" />
                  </>
                )}

                {/* Inner White Border strictly for non-image cards or soft blend */}
                {!item.hasImage && (
                  <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] border border-white/60 pointer-events-none z-10 mix-blend-overlay" />
                )}
                {item.hasImage && (
                  <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] border border-white/10 pointer-events-none z-10" />
                )}

                {/* Content Overlay */}
                <div className="relative z-20 flex flex-col items-start gap-4">
                  {/* Floating Icon Badge */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-sm transition-transform duration-500 group-hover:-translate-y-1 ${
                    item.hasImage ? "bg-white/10 border border-white/20 text-white" : "bg-card/80 border border-border/50 text-primary"
                  }`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  {/* Storytelling Text */}
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
        
        <div className="mt-10 sm:hidden flex justify-center">
          <Link 
            to="/gallery"
            className="btn-pill-outline"
          >
            View Full Archive
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
