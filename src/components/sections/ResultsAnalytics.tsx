import { useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { analyticsMetrics, iconMap, type MetricCard } from "@/lib/data/analytics";
import { Quote } from "lucide-react";

/* ── Animated counter ── */
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

  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={(node) => {
        // @ts-ignore - Handle dual refs
        ref.current = node;
        // @ts-ignore
        cardRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${card.span} bento-card group relative overflow-hidden`}
    >
      {/* Smart Hover Spotlight */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.1), transparent 40%)`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="relative z-10">
        {Icon && (
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/14 group-hover:scale-105 transition-all duration-300">
            <Icon className="text-primary" size={20} />
          </div>
        )}
        <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">{card.label}</p>
        <div className="font-stats text-4xl sm:text-5xl lg:text-6xl text-foreground flex flex-wrap items-baseline gap-1 leading-none">
          <span>{displayValue}</span>
          {card.suffix && <span className="text-accent text-2xl sm:text-3xl">{card.suffix}</span>}
        </div>
        {card.trend && (
          <p className="text-primary text-[11px] mt-4 flex items-center gap-2 font-medium">
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
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`${card.span} bento-card group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="relative z-10">
        {Icon && (
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/14 group-hover:scale-105 transition-all duration-300">
            <Icon className="text-accent" size={20} />
          </div>
        )}
        <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] mb-2">{card.label}</p>
        <div className="font-stats text-4xl sm:text-5xl text-foreground flex flex-wrap items-baseline gap-1 leading-none mb-1 text-balance">
          <span>{card.value}</span>
          {card.suffix && <span className="text-accent text-xl sm:text-3xl">{card.suffix}</span>}
        </div>
        {card.description && <p className="text-muted-foreground text-[11px] mb-5">{card.description}</p>}
        <div className="w-full h-1 rounded-full bg-muted/60 overflow-hidden">
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`${card.span} bento-card group gradient-border`}
    >
      <div className="relative z-10 flex flex-col h-full justify-center">
        <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">{card.label}</p>
        <span className="font-stats text-6xl sm:text-7xl lg:text-8xl text-[#C5A54B] block leading-none mb-4">{card.value}</span>
        {card.description && (
          <p className="text-muted-foreground text-[13px] leading-[1.7]">{card.description}</p>
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
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`${card.span} bento-card group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="text-primary" size={18} />
            </div>
          )}
          <div>
            <p className="text-foreground text-sm font-semibold">{card.label}</p>
            {card.description && <p className="text-muted-foreground text-[11px]">{card.description}</p>}
          </div>
        </div>
        <div className="flex-1 min-h-[180px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={card.chartData}>
              <defs>
                <linearGradient id="chartGradientPremium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152, 62%, 42%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(152, 62%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(0, 0%, 45%)", fontSize: 10, fontFamily: "Inter" }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 5%)",
                  border: "1px solid hsl(0, 0%, 14%)",
                  borderRadius: "12px",
                  fontFamily: "Inter",
                  fontSize: "11px",
                  color: "hsl(0, 0%, 98%)",
                  padding: "8px 14px",
                  boxShadow: "0 8px 32px hsl(0 0% 0% / 0.5)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(152, 62%, 42%)"
                strokeWidth={1.5}
                fill="url(#chartGradientPremium)"
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
    initial={{ opacity: 0, y: 25, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    className={`${card.span} bento-card gradient-border overflow-hidden`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02] rounded-2xl" />
    <Quote className="absolute top-6 right-6 text-accent/[0.06]" size={56} />
    <div className="relative z-10">
      <p className="font-display text-lg sm:text-xl italic text-foreground/90 leading-[1.6] mb-5">
        "{card.description}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-0.5 bg-gradient-to-r from-accent to-accent/20 rounded-full" />
        <span className="text-accent text-xs font-semibold">{card.label}</span>
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
    <section id="results" className="py-32 relative overflow-hidden">
      {/* Background - Smart Data Nodes Aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />
      
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-[20%] w-[60%] aspect-square rounded-full border border-primary/10 border-dashed pointer-events-none opacity-50" 
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -left-[20%] w-[60%] aspect-square rounded-full border border-accent/10 border-dashed pointer-events-none opacity-50" 
      />

      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-4"
        >
          <span className="section-badge mb-6 inline-flex">Data-Driven Leadership</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.05]">
            Results & <span className="text-[#C5A54B]">Analytics</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-[1.7]">
            Transparent, measurable impact. Every initiative tracked, every outcome verified.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-20 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-16 origin-left"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-auto">
          {analyticsMetrics.map((card, i) => renderCard(card, i))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-[13px] mb-6">
            More detailed reports, PDFs, and video evidence coming soon.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {["PDF Reports", "Video Evidence", "Live Dashboards"].map((label) => (
              <span key={label} className="px-5 py-2.5 rounded-full bg-card border border-border/40 text-[11px] text-muted-foreground font-medium hover:border-primary/20 hover:text-foreground transition-all duration-300 cursor-pointer">
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsAnalytics;
