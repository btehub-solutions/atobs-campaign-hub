import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { achievements, iconMap } from "@/lib/data/achievements";

// ── Count-up hook ──
const useCountUp = (target: number, suffix: string, duration = 2, inView = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, duration, inView]);

  // Format: add commas for numbers >= 1000
  const formatted = count >= 1000 ? count.toLocaleString() : count.toString();
  return `${formatted}${suffix}`;
};

// Parse "1,500+" → { numeric: 1500, suffix: "+" }
const parseNumber = (str: string) => {
  const numeric = parseInt(str.replace(/[^0-9]/g, "") || "0");
  const suffix = str.replace(/[0-9,.\s]/g, ""); // e.g. "+"
  return { numeric, suffix };
};

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

const AchievementCard = ({ item, index }: { item: typeof achievements[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = iconMap[item.icon];
  const variant = cardVariants[index % cardVariants.length];
  const dark = isDarkVariant(variant);
  const { numeric, suffix } = parseNumber(item.number);
  const displayValue = useCountUp(numeric, suffix, 2, inView);

  return (
    <motion.div
      ref={ref}
      key={item.title}
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${variant} group`}
    >
      {/* Hover glow — only on light cards */}
      {!dark && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      )}

      <div className="relative z-10 text-center">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-all duration-300 ${
            dark
              ? "bg-white/15 group-hover:bg-white/20"
              : "bg-primary/10 group-hover:bg-primary/15"
          }`}
        >
          {Icon && (
            <Icon
              className={dark ? "text-white" : "text-primary"}
              size={22}
            />
          )}
        </div>
        <span className="font-stats text-[3.5rem] sm:text-[4rem] block leading-none mb-4 tracking-tight">
          {displayValue}
        </span>
        <h3 className="font-heading text-base font-semibold mb-2.5">
          {item.title}
        </h3>
        <p className="text-[13px] leading-[1.7] max-w-[28ch] mx-auto">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-40 relative overflow-hidden">
      {/* Background */}
      <div className="section-divider absolute top-0 left-0 w-full" />
      <div className="section-divider absolute bottom-0 left-0 w-full" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
