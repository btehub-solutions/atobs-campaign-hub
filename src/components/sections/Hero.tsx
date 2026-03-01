import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "513", label: "Agritech Graduates" },
  { value: "1,500+", label: "Students Supported" },
  { value: "91", label: "Surgery Families" },
];

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Abeokuta cityscape at dusk" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>

      <div className="section-container relative z-10 pt-20 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-body font-medium mb-6 border border-primary/30">
              APC — Abeokuta South Constituency 1
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
          >
            Hon. Lukmon Olajide{" "}
            <span className="text-accent">Atobatele</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-stats text-2xl sm:text-3xl tracking-wider text-primary mb-4"
          >
            Tested. Trusted. Ready.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-muted-foreground text-lg font-body mb-8 max-w-xl italic"
          >
            "Let's build our future together — now and beyond."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#achievements"
              onClick={(e) => { e.preventDefault(); document.querySelector("#achievements")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-6 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Achievements
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-6 py-3 border border-accent text-accent font-body font-semibold rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-stats text-4xl sm:text-5xl text-accent block">{stat.value}</span>
                <span className="text-muted-foreground text-sm font-body">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
