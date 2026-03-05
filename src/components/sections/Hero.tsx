import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Play, ChevronDown, Sun, Moon, Sunrise } from "lucide-react";

// Magnetic Button Component for 2026 aesthetics
const MagneticButton = ({ children, className, ...props }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);

  const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

  // Time-based greeting logic
  const [greeting, setGreeting] = useState("Welcome");
  const [TimeIcon, setTimeIcon] = useState<any>(Sun);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
      setTimeIcon(() => Sunrise);
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
      setTimeIcon(() => Sun);
    } else {
      setGreeting("Good Evening");
      setTimeIcon(() => Moon);
    }
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ─── Background Layers ─── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Subtle landmark silhouette background — faded */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: `url('/hero-green.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)",
          }}
        />
        {/* Artistic blended meshes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,hsl(152_62%_42%/0.12),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,hsl(45_80%_58%/0.08),transparent)] pointer-events-none" />
        {/* Soft white base overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] pointer-events-none" />

        {/* Mobile Candidate Background Layer (Behind text) */}
        <div className="absolute inset-0 lg:hidden pointer-events-none select-none opacity-[0.35]">
          <div 
            className="absolute inset-0 bg-cover bg-top grayscale-[50%]"
            style={{ 
              backgroundImage: `url('')`,
              maskImage: 'linear-gradient(to bottom, black 15%, transparent 85%)', 
              WebkitMaskImage: 'linear-gradient(to bottom, black 15%, transparent 85%)' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background opacity-100" />
        </div>
      </motion.div>

      {/* Refined Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(152 62% 42% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(152 62% 42% / 0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dynamic Ambient orbs for storytelling light bleed */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/[0.08] blur-[150px] pointer-events-none mix-blend-multiply" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-accent/[0.08] blur-[160px] pointer-events-none mix-blend-multiply" 
      />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none mix-blend-multiply" />

      {/* ─── Main Content ─── */}
      <motion.div
        className="section-container relative z-10 pt-28 pb-20 lg:pt-32 lg:pb-24"
        style={{ opacity, scale }}
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* ─── Left Column: Text ─── */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Dynamic Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: easeOut }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
               <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-foreground shadow-sm whitespace-nowrap">
                 <TimeIcon size={12} className="text-primary" />
                 {greeting}, Abeokuta South
               </span>
            </motion.div>

            {/* Name — Large display typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: easeOut }}
              className="mb-7"
            >
              <span className="block font-display italic !text-[#C5A54B] font-bold text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.9] tracking-tight">
                Hon. Lukmon
              </span>
              <span className="block font-heading font-bold text-foreground text-[3rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.5rem] leading-[0.95] tracking-tight">
                Atobatele
              </span>
            </motion.h1>

            {/* Quote / Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: easeOut }}
              className="relative pl-5 border-l-2 border-primary/40 mb-8 max-w-lg"
            >
              <p className="text-muted-foreground text-[15px] sm:text-base leading-[1.8] font-light">
                Building a transformative legacy for Abeokuta South — empowering
                education, healthcare, and grassroots development across all 15
                wards. Let us build together.
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: easeOut }}
              className="mb-10"
            >
              <span className="font-display italic text-primary/80 text-2xl sm:text-3xl tracking-wide">
                L. Atobatele
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: easeOut }}
              className="flex flex-wrap gap-3"
            >
              <MagneticButton
                href="#achievements"
                onClick={(e: any) => {
                  e.preventDefault();
                  document
                    .querySelector("#achievements")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-pill-primary cursor-pointer border border-primary/50 shadow-lg"
              >
                View Achievements
                <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton
                href="#contact"
                onClick={(e: any) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-pill-outline cursor-pointer bg-white/70 backdrop-blur-md shadow-sm border-white/40 hover:bg-white"
              >
                <Play size={13} className="ml-0.5" />
                Our Vision
              </MagneticButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7, ease: easeOut }}
              className="flex gap-10 mt-14 mb-8 lg:mb-0 pt-7 border-t border-border/40"
            >
              {[
                { value: "513", label: "Agritech Graduates" },
                { value: "1,500+", label: "Students Supported" },
                { value: "91", label: "Surgery Families" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-stats text-4xl sm:text-5xl text-foreground block leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground mt-1.5 block tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right Column: Candidate Photo ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: easeOut }}
            className="hidden lg:flex lg:col-span-6 xl:col-span-6 relative justify-center items-center"
          >
            <div className="relative w-full max-w-[480px]">
              {/* Decorative glow behind photo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="absolute w-[120%] h-[120%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, hsl(152 62% 42% / 0.05) 0%, transparent 65%)",
                  }}
                />
                {/* Dotted pattern overlay */}
                <div
                  className="absolute top-[5%] right-[-8%] w-[65%] h-[85%] rounded-3xl opacity-[0.05]"
                  style={{
                    backgroundImage: `radial-gradient(hsl(152 62% 48%) 1px, transparent 1px)`,
                    backgroundSize: "14px 14px",
                  }}
                />
              </div>

              {/* Green accent bar — top decorative */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: easeOut }}
                className="absolute top-0 left-[10%] right-[10%] h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left rounded-full z-20"
              />

              {/* Candidate Image Container */}
              <div className="relative z-10">
                {/* Outer ring — premium border effect */}
                <div className="rounded-2xl p-[1px] bg-gradient-to-b from-border via-border/50 to-transparent shadow-[0_20px_40px_-12px_hsl(0_0%_0%/0.12)]">
                  <div className="relative rounded-[15px] overflow-hidden aspect-[4/5] bg-white ring-1 ring-border shadow-inner">
                    {/* Candidate portrait */}
                    <img
                      src=""
                      alt="Hon. Lukmon Atobatele — Candidate for Abeokuta South Constituency 1"
                      className="w-full h-full object-cover object-center"
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                      style={{
                        imageRendering: "auto",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                    />

                    {/* Very subtle bottom vignette — keeps image clear */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none mix-blend-multiply" />


                  </div>
                </div>

                {/* Floating achievement card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, x: -30 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                  className="absolute -bottom-4 -left-6 z-20 glass-card rounded-2xl p-4 max-w-[200px]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center">
                      <span className="text-primary font-bold text-xs">
                        LA
                      </span>
                    </div>
                    <div>
                      <span className="text-foreground text-xs font-semibold block leading-tight">
                        Community Leader
                      </span>
                      <span className="text-primary text-[10px] font-medium">
                        15 Wards
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full bg-primary/60"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Floating LADEF badge — top right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.4,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="absolute -top-3 -right-3 z-20"
                >
                  <div className="w-24 h-24 rounded-2xl glass-card flex items-center justify-center border border-primary/20 shadow-[0_0_40px_hsl(152_62%_42%/0.15)]">
                    <img
                      src=""
                      alt=""
                      className="w-16 h-16 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Decorative floating rings */}
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full border border-primary/[0.08] animate-float" />
              <div
                className="absolute top-1/2 -right-5 w-14 h-14 rounded-full border border-accent/[0.08] animate-float"
                style={{ animationDelay: "3s" }}
              />
              <div
                className="absolute -bottom-5 right-1/4 w-20 h-20 rounded-full border border-primary/[0.06] animate-float"
                style={{ animationDelay: "5s" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer group"
          onClick={() =>
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-[9px] font-medium tracking-[0.35em] uppercase group-hover:text-foreground transition-colors">
            Scroll
          </span>
          <ChevronDown
            size={14}
            className="group-hover:text-foreground transition-colors"
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
