import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { analyticsMetrics, iconMap, type MetricCard } from "@/lib/data/analytics";
import { Quote } from "lucide-react";

/* ── Animated counter hook ── */
const useCountUp = (target: number, duration = 2, inView = false) => {
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
  return count;
};

/* ── Stat Card ── */
const StatCard = ({ card, index }: { card: MetricCard; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const numericValue = parseInt(card.value?.replace(/[^0-9]/g, "") || "0");
  const count = useCountUp(numericValue, 2, inView);
  const Icon = card.icon ? iconMap[card.icon] : null;

  const displayValue = card.value?.includes("₦")
    ? `₦${count}M`
    : card.value?.includes(",")
      ? count.toLocaleString()
      : count.toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
      className={`${card.span} group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
            <Icon className="text-primary" size={20} />
          </div>
        )}
        <p className="text-muted-foreground text-xs font-body font-medium uppercase tracking-wider mb-2">{card.label}</p>
        <span className="font-stats text-5xl text-foreground block leading-none">
          {displayValue}
          {card.suffix && <span className="text-accent text-3xl">{card.suffix}</span>}
        </span>
        {card.trend && (
          <p className="text-primary text-xs font-body mt-3 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {card.trend}
          </p>
        )}
      </div>
    </motion.div>
  );
};

/* ── Progress Card ── */
const ProgressCard = ({ card, index }: { card: MetricCard; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = card.icon ? iconMap[card.icon] : null;
  const progressWidth = inView ? card.progress || 0 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
      className={`${card.span} group relative bg-card rounded-2xl p-6 border border-border hover:border-accent/40 transition-all duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-3">
            <Icon className="text-accent" size={20} />
          </div>
        )}
        <p className="text-muted-foreground text-xs font-body font-medium uppercase tracking-wider mb-1">{card.label}</p>
        <span className="font-stats text-4xl text-foreground block leading-none mb-1">
          {card.value}{card.suffix}
        </span>
        {card.description && <p className="text-muted-foreground text-xs font-body mb-4">{card.description}</p>}
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: inView ? `${progressWidth}%` : "0%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ── Highlight Card ── */
const HighlightCard = ({ card, index }: { card: MetricCard; index: number }) => {
  const colorBorder = card.color === "accent" ? "hover:border-accent/50" : "hover:border-primary/50";
  const colorGlow = card.color === "accent" ? "from-accent/8" : "from-primary/8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
      className={`${card.span} group relative bg-card rounded-2xl p-6 border border-border ${colorBorder} transition-all duration-300 overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colorGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10 flex flex-col h-full justify-center">
        <p className="text-muted-foreground text-xs font-body font-medium uppercase tracking-wider mb-2">{card.label}</p>
        <span className="font-stats text-6xl sm:text-7xl text-accent block leading-none mb-3">{card.value}</span>
        {card.description && (
          <p className="text-muted-foreground text-sm font-body leading-relaxed">{card.description}</p>
        )}
      </div>
    </motion.div>
  );
};

/* ── Chart Card ── */
const ChartCard = ({ card, index }: { card: MetricCard; index: number }) => {
  const Icon = card.icon ? iconMap[card.icon] : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`${card.span} group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Icon className="text-primary" size={20} />
            </div>
          )}
          <div>
            <p className="text-foreground text-sm font-body font-semibold">{card.label}</p>
            {card.description && <p className="text-muted-foreground text-xs font-body">{card.description}</p>}
          </div>
        </div>
        <div className="flex-1 min-h-[180px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={card.chartData}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(146, 64%, 29%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(146, 64%, 29%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(215, 12%, 55%)", fontSize: 11, fontFamily: "DM Sans" }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(215, 22%, 11%)",
                  border: "1px solid hsl(215, 18%, 18%)",
                  borderRadius: "8px",
                  fontFamily: "DM Sans",
                  fontSize: "12px",
                  color: "hsl(210, 20%, 90%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(146, 64%, 29%)"
                strokeWidth={2}
                fill="url(#chartGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Quote Card ── */
const QuoteCard = ({ card, index }: { card: MetricCard; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    className={`${card.span} relative bg-gradient-to-br from-primary/10 via-card to-accent/5 rounded-2xl p-8 border border-primary/20 overflow-hidden`}
  >
    <Quote className="absolute top-4 right-4 text-accent/20" size={48} />
    <div className="relative z-10">
      <p className="text-foreground font-heading text-lg sm:text-xl italic leading-relaxed mb-4">
        "{card.description}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-0.5 bg-accent rounded-full" />
        <span className="text-accent text-sm font-body font-semibold">{card.label}</span>
      </div>
    </div>
  </motion.div>
);

/* ── Main Section ── */
const ResultsAnalytics = () => {
  const renderCard = (card: MetricCard, index: number) => {
    switch (card.type) {
      case "stat": return <StatCard key={card.id} card={card} index={index} />;
      case "progress": return <ProgressCard key={card.id} card={card} index={index} />;
      case "highlight": return <HighlightCard key={card.id} card={card} index={index} />;
      case "chart": return <ChartCard key={card.id} card={card} index={index} />;
      case "quote": return <QuoteCard key={card.id} card={card} index={index} />;
      default: return null;
    }
  };

  return (
    <section id="results" className="py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-body font-semibold uppercase tracking-widest mb-4 border border-accent/20"
          >
            Data-Driven Leadership
          </motion.span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Results & <span className="text-accent">Analytics</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto text-base sm:text-lg">
            Transparent, measurable impact. Every initiative tracked, every outcome verified.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-12 origin-left"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {analyticsMetrics.map((card, i) => renderCard(card, i))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm font-body mb-4">
            More detailed reports, PDFs, and video evidence coming soon.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 rounded-full bg-card border border-border text-xs font-body text-muted-foreground">
              📊 PDF Reports
            </span>
            <span className="px-4 py-2 rounded-full bg-card border border-border text-xs font-body text-muted-foreground">
              🎥 Video Evidence
            </span>
            <span className="px-4 py-2 rounded-full bg-card border border-border text-xs font-body text-muted-foreground">
              📈 Live Dashboards
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsAnalytics;
