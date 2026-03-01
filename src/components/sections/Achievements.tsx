import { motion } from "framer-motion";
import { achievements, iconMap } from "@/lib/data/achievements";

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-secondary">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
            Key <span className="text-accent">Achievements</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            A proven track record of impact across education, healthcare, and community development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  {Icon && <Icon className="text-primary" size={24} />}
                </div>
                <span className="font-stats text-4xl text-accent block mb-1">{item.number}</span>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
