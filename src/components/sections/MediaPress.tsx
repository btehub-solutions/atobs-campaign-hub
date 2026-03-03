import { motion } from "framer-motion";
import { mediaItems } from "@/lib/data/media";
import { ArrowUpRight } from "lucide-react";

const categoryStyles: Record<string, string> = {
  Empowerment: "bg-primary/8 text-primary border-primary/15",
  Healthcare: "bg-destructive/8 text-destructive border-destructive/15",
  Education: "bg-accent/8 text-accent border-accent/15",
  Governance: "bg-muted/60 text-muted-foreground border-border/50",
  Politics: "bg-primary/8 text-primary border-primary/15",
  Economy: "bg-accent/8 text-accent border-accent/15",
};

const MediaPress = () => {
  return (
    <section id="media" className="py-32 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="section-badge mb-6 inline-flex">Press Coverage</span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.05]">
              Media & <span className="text-[#C5A54B]">Press</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-[1.7]">
              Coverage and recognition from Nigeria's leading media outlets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button className="btn-pill-outline text-xs">
              View All Coverage
              <ArrowUpRight size={13} />
            </button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mediaItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`bento-card group cursor-pointer flex flex-col ${
                i === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-5">
                  <span className={`text-[10px] font-semibold px-3 py-1 rounded-full border ${categoryStyles[item.category] || "bg-muted/60 text-muted-foreground border-border/50"}`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto font-medium">{item.date}</span>
                </div>

                <h3 className="font-heading text-[17px] font-semibold mb-3 leading-snug text-foreground group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-[13px] leading-[1.7] mb-6 flex-1">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{item.source}</span>
                  <div className="w-7 h-7 rounded-full bg-foreground/[0.04] flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                    <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPress;
