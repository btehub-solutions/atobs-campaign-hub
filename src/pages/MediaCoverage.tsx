import { motion } from "framer-motion";
import { mediaItems } from "@/lib/data/media";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";

const categoryStyles: Record<string, string> = {
  Empowerment: "bg-primary/8 text-primary border-primary/15",
  Healthcare: "bg-destructive/8 text-destructive border-destructive/15",
  Education: "bg-accent/8 text-accent border-accent/15",
  Governance: "bg-muted/60 text-muted-foreground border-border/50",
  Politics: "bg-primary/8 text-primary border-primary/15",
  Economy: "bg-accent/8 text-accent border-accent/15",
};

const MediaCoverage = () => {
  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      {/* ─── GLOBAL ARTISTRY CANVAS ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#F4F5F7]">
        <div className="absolute inset-0 micro-grid opacity-50" />
        <div className="animated-noise" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-32 pb-40">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
              <Link 
                to="/#media" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:shadow-[0_4px_20px_hsl(152_62%_42%/0.3)] transition-all group px-5 py-2.5 bg-primary rounded-full border border-primary/20 w-fit hover:-translate-y-0.5"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              
              <span className="section-badge inline-flex w-fit">Press Center</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
              Media <span className="text-[#C5A54B]">&</span> Coverage
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
              Explore the latest news, press releases, and media coverage of Hon. Lukmon Atobatele's initiatives and impact.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item, i) => {
              const variantPatterns = [
                "bento-card-primary", // Deep Green
                "bento-card-warm",    // Warm Cream
                "bento-card-tint",    // Soft Green
                "bento-card-dark",    // Charcoal
                "bento-card-accent",  // Warm Gold
                "bento-card"          // Default Ash
              ];
              const variant = variantPatterns[i % variantPatterns.length];
              const dark = ["bento-card-primary", "bento-card-dark", "bento-card-accent"].includes(variant);

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={`${variant} group cursor-pointer flex flex-col p-8 rounded-3xl relative overflow-hidden h-full`}
                >
                  {!dark && (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  )}
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${categoryStyles[item.category] || "bg-muted/60 text-muted-foreground border-border/50"}`}>
                        {item.category}
                      </span>
                      <span className={`text-[10px] ml-auto font-bold uppercase tracking-widest ${dark ? "text-white/70" : "text-muted-foreground"}`}>{item.date}</span>
                    </div>

                    <h3 className={`font-heading text-xl font-bold mb-4 leading-snug transition-colors duration-300 ${dark ? "text-white" : "text-foreground group-hover:text-accent"}`}>
                      {item.title}
                    </h3>

                    <p className={`text-[14px] leading-relaxed mb-8 flex-1 ${dark ? "text-white/80" : "text-muted-foreground"}`}>
                      {item.excerpt}
                    </p>

                    <div className={`flex items-center justify-between pt-6 border-t ${dark ? "border-white/10" : "border-border/20"}`}>
                      <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${dark ? "text-white/60" : "text-muted-foreground"}`}>{item.source}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${dark ? "bg-white/10 group-hover:bg-white/20" : "bg-foreground/[0.04] group-hover:bg-accent/10"}`}>
                        <ArrowUpRight size={16} className={dark ? "text-white" : "text-muted-foreground group-hover:text-accent"} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MediaCoverage;
