import { motion } from "framer-motion";
import { achievements, iconMap } from "@/lib/data/achievements";

// Rotating brand color pattern for visual variety
const cardVariants = [
  "bento-card-primary",   // Deep Green
  "bento-card",           // Default White
  "bento-card-accent",    // Warm Gold
  "bento-card-tint",      // Soft Green Tint
  "bento-card-dark",      // Deep Charcoal
  "bento-card-warm",      // Warm Cream
];

// Cards with dark/colored backgrounds need white icons instead of green
const isDarkVariant = (variant: string) =>
  ["bento-card-primary", "bento-card-accent", "bento-card-dark"].includes(variant);

const Achievements = () => {
  return (
    <section id="achievements" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="section-divider absolute top-0 left-0 w-full" />
      <div className="section-divider absolute bottom-0 left-0 w-full" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-flex">Track Record</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.05]">
            Key <span className="text-[#C5A54B]">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-[1.7]">
            A proven track record of impact across education, healthcare, and community development.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((item, i) => {
            const Icon = iconMap[item.icon];
            const variant = cardVariants[i % cardVariants.length];
            const dark = isDarkVariant(variant);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`${variant} group`}
              >
                {/* Hover glow — only on light cards */}
                {!dark && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                )}

                <div className="relative z-10">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-300 ${
                      dark
                        ? "bg-white/15 group-hover:bg-white/20"
                        : "bg-primary/10 group-hover:bg-primary/15"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={dark ? "text-white" : "text-primary"}
                        size={20}
                      />
                    )}
                  </div>
                  <span className="font-stats text-[3.2rem] block leading-none mb-3">
                    {item.number}
                  </span>
                  <h3 className="font-heading text-base font-semibold mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
