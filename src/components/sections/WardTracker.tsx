import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { wards, type WardStatus } from "@/lib/data/wards";
import { MapPin, ChevronRight, Users, FolderKanban, Target, TrendingUp } from "lucide-react";

const filters: (WardStatus | "All")[] = ["All", "Strong", "Target", "Engaging"];

const statusBg: Record<WardStatus, string> = {
  Strong: "bg-primary/10 text-primary border-primary/15",
  Target: "bg-accent/10 text-accent border-accent/15",
  Engaging: "bg-muted/60 text-muted-foreground border-border/60",
};

const progressColor: Record<WardStatus, string> = {
  Strong: "from-primary to-primary/70",
  Target: "from-accent to-accent/70",
  Engaging: "from-muted-foreground/50 to-muted-foreground/30",
};

/* ── Animated progress bar ── */
const EngagementBar = ({ value, status, inView }: { value: number; status: WardStatus; inView: boolean }) => (
  <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: inView ? `${value}%` : "0%" }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      className={`h-full rounded-full bg-gradient-to-r ${progressColor[status]}`}
    />
  </div>
);

const WardTracker = () => {
  const [filter, setFilter] = useState<WardStatus | "All">("All");
  const filtered = filter === "All" ? wards : wards.filter((w) => w.status === filter);
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-50px" });

  // Summary stats
  const totalProjects = wards.reduce((sum, w) => sum + w.projects, 0);
  const avgEngagement = Math.round(wards.reduce((sum, w) => sum + w.engagement, 0) / wards.length);
  const strongCount = wards.filter((w) => w.status === "Strong").length;

  return (
    <section id="wards" className="py-32 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-6 inline-flex">Constituency Coverage</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.05]">
            Ward <span className="text-[#C5A54B]">Tracker</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-[1.7]">
            Monitoring progress and engagement across all 15 wards in Abeokuta South Constituency 1.
          </p>
        </motion.div>

        {/* Summary stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {[
            { icon: MapPin, value: "15", label: "Total Wards", color: "text-primary", bg: "bg-primary/8" },
            { icon: Target, value: `${strongCount}`, label: "Strong Holds", color: "text-primary", bg: "bg-primary/8" },
            { icon: FolderKanban, value: `${totalProjects}`, label: "Active Projects", color: "text-accent", bg: "bg-accent/8" },
            { icon: TrendingUp, value: `${avgEngagement}%`, label: "Avg. Engagement", color: "text-primary", bg: "bg-primary/8" },
          ].map((stat) => (
            <div key={stat.label} className="bento-card !p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={stat.color} size={18} />
              </div>
              <div>
                <span className="font-stats text-2xl sm:text-3xl text-foreground block leading-none">{stat.value}</span>
                <span className="text-[9px] text-muted-foreground mt-0.5 block uppercase tracking-wider font-medium">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                filter === f
                  ? "bg-foreground text-background shadow-[0_2px_12px_hsl(0_0%_0%/0.1)]"
                  : "bg-white border border-border text-muted-foreground hover:text-foreground hover:border-foreground/15 shadow-sm"
              }`}
            >
              {f}
              {f !== "All" && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({wards.filter((w) => w.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <AnimatePresence mode="popLayout">
            {filtered.map((ward, i) => (
              <motion.div
                key={ward.name}
                layout
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.025, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bento-card !p-5 !rounded-xl group cursor-pointer"
              >
                {/* Top row: Name + Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-300">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <span className="font-heading font-medium text-[13px] text-foreground">{ward.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full border ${statusBg[ward.status]}`}>
                      {ward.status}
                    </span>
                    <ChevronRight size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Engagement progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Engagement</span>
                    <span className="text-xs text-foreground font-semibold">{ward.engagement}%</span>
                  </div>
                  <EngagementBar value={ward.engagement} status={ward.status} inView={inView} />
                </div>

                {/* Bottom row: Meta info */}
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-2 border-t border-border/20">
                  <span className="flex items-center gap-1">
                    <Users size={10} />
                    {ward.population}
                  </span>
                  <span className="flex items-center gap-1">
                    <FolderKanban size={10} />
                    {ward.projects} projects
                  </span>
                  <span className="ml-auto text-primary/70 font-medium">{ward.keyFocus}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WardTracker;
