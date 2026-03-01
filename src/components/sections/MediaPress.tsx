import { motion } from "framer-motion";
import { mediaItems } from "@/lib/data/media";
import { ExternalLink } from "lucide-react";

const categoryColors: Record<string, string> = {
  Empowerment: "bg-primary/20 text-primary",
  Healthcare: "bg-destructive/20 text-destructive",
  Education: "bg-accent/20 text-accent",
  Governance: "bg-muted text-muted-foreground",
  Politics: "bg-primary/20 text-primary",
  Economy: "bg-accent/20 text-accent",
};

const MediaPress = () => {
  return (
    <section id="media" className="py-20 bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Media & <span className="text-accent">Press</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Coverage and recognition from Nigeria's leading media outlets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-body font-semibold px-2.5 py-1 rounded-full ${categoryColors[item.category] || "bg-muted text-muted-foreground"}`}>
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground font-body ml-auto">{item.date}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 leading-snug">{item.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 flex-1">{item.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-body">{item.source}</span>
                <ExternalLink size={14} className="text-muted-foreground" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPress;
