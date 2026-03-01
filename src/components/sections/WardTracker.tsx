import { useState } from "react";
import { motion } from "framer-motion";
import { wards, statusColors, type WardStatus } from "@/lib/data/wards";
import { MapPin } from "lucide-react";

const filters: (WardStatus | "All")[] = ["All", "Strong", "Target", "Engaging"];

const WardTracker = () => {
  const [filter, setFilter] = useState<WardStatus | "All">("All");
  const filtered = filter === "All" ? wards : wards.filter((w) => w.status === filter);

  return (
    <section id="wards" className="py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Ward <span className="text-accent">Tracker</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Monitoring progress and engagement across all 15 wards in Abeokuta South Constituency 1.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ward, i) => (
            <motion.div
              key={ward.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              layout
              className="bg-card rounded-lg p-5 border border-border flex items-center justify-between hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span className="font-body font-medium">{ward.name}</span>
              </div>
              <span className={`text-xs font-body font-semibold px-3 py-1 rounded-full ${statusColors[ward.status]}`}>
                {ward.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WardTracker;
