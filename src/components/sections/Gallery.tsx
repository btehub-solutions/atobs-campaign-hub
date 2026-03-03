import { motion } from "framer-motion";
import { Camera, Image, Users, HeartHandshake, GraduationCap, Landmark, Megaphone, TreePine } from "lucide-react";

const galleryItems = [
  { icon: Users, label: "Community Engagement", desc: "Grassroots outreach events", color: "from-primary/[0.08] to-primary/[0.02]" },
  { icon: GraduationCap, label: "Education Program", desc: "Scholarship & training initiatives", color: "from-accent/[0.08] to-accent/[0.02]" },
  { icon: HeartHandshake, label: "Ward Consultation", desc: "Direct community dialogues", color: "from-primary/[0.06] to-accent/[0.03]" },
  { icon: Landmark, label: "Leadership Summit", desc: "Strategic governance forums", color: "from-accent/[0.06] to-primary/[0.02]" },
  { icon: Megaphone, label: "Town Hall Meeting", desc: "Open civic participation", color: "from-primary/[0.08] to-primary/[0.02]" },
  { icon: Camera, label: "Constituency Visit", desc: "On-ground project inspections", color: "from-accent/[0.08] to-accent/[0.02]" },
  { icon: TreePine, label: "Community Outreach", desc: "Environmental & social programs", color: "from-primary/[0.06] to-accent/[0.03]" },
  { icon: Image, label: "Youth Empowerment", desc: "Skills & capacity building", color: "from-accent/[0.06] to-primary/[0.02]" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-32 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-flex">Moments</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.05]">
            Photo <span className="text-[#C5A54B]">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-[1.7]">
            Moments from community engagements, empowerment programs, and constituency outreach.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryItems.map((item, i) => {
            const isLarge = i === 0 || i === 4;
            const isMedium = i === 2 || i === 6;
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`group cursor-pointer rounded-2xl overflow-hidden relative border border-border/40 bg-gradient-to-br ${item.color} bg-card
                  ${isLarge ? "row-span-2" : ""}
                  ${isMedium ? "md:col-span-2 lg:col-span-1" : ""}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`${isLarge ? "aspect-[3/5]" : "aspect-[4/3]"} w-full flex flex-col items-center justify-center gap-4 p-6 relative z-10`}>
                  <div className="w-14 h-14 rounded-2xl bg-card/80 border border-border/30 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/20 transition-all duration-400">
                    <Icon className="text-primary" size={26} />
                  </div>
                  <div className="text-center">
                    <span className="text-foreground/80 text-sm font-medium block mb-0.5">{item.label}</span>
                    <span className="text-muted-foreground text-xs">{item.desc}</span>
                  </div>
                </div>
                {/* Hover border */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/15 transition-colors duration-400 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
