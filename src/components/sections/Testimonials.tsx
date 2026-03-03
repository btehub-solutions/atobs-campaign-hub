import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data/testimonials";
import { Quote, ChevronLeft, ChevronRight, Star, MapPin, Play } from "lucide-react";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.97,
    }),
  };

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-6 inline-flex">Voices of the People</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.05]">
            Testimonials & <span className="gradient-text">Endorsements</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-[1.7]">
            Hear from the people across all 15 wards whose lives have been transformed.
          </p>
        </motion.div>

        {/* Main testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Large quote card */}
            <div className="bento-card gradient-border !p-0 overflow-hidden min-h-[320px] sm:min-h-[280px]">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02] rounded-2xl" />
              <Quote className="absolute top-8 right-8 text-primary/[0.06]" size={80} />
              <Quote className="absolute bottom-8 left-8 text-accent/[0.04] rotate-180" size={50} />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={t.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative z-10 p-8 sm:p-12 lg:p-14"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-display text-lg sm:text-xl lg:text-2xl italic text-foreground/90 leading-[1.6] mb-8 max-w-3xl">
                    "{t.quote}"
                  </p>

                  {/* Attribution */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    {/* Avatar circle */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/25 to-accent/15 border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_hsl(152_62%_42%/0.1)]">
                        <span className="font-heading font-bold text-sm text-foreground">
                          {t.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                      <div>
                        <span className="text-foreground font-semibold text-sm block leading-tight">
                          {t.name}
                        </span>
                        <span className="text-primary text-xs font-medium block mt-0.5">
                          {t.role}
                        </span>
                      </div>
                    </div>

                    {/* Ward badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border/40 w-fit">
                      <MapPin size={10} className="text-accent" />
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                        {t.ward} Ward
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between mt-8">
              {/* Dots indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      i === current
                        ? "w-8 h-2 bg-gradient-to-r from-primary to-accent"
                        : "w-2 h-2 bg-foreground/10 hover:bg-foreground/20"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl bg-card border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/15 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl bg-card border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/15 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Testimonial / Outreach Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-24 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-border/40 shadow-2xl relative bg-card"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-accent/[0.05] pointer-events-none" />
          <div className="aspect-video relative bg-muted/30 group">
            {/* Custom Video Thumbnail Overlay */}
            {!isVideoPlaying && (
              <div 
                className="absolute inset-0 z-20 cursor-pointer overflow-hidden transition-all duration-500 rounded-t-3xl sm:rounded-none"
                onClick={() => {
                  setIsVideoPlaying(true);
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('/images/video-thumbnail.jpg')` }}
                />
                
                {/* Fallback gradient if image fails/is missing */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 -z-10" />

                {/* Dark Gradient Overlay for cinematic feel and text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-shadow duration-500">
                      <Play className="text-primary-foreground fill-primary-foreground ml-1 w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                  </div>
                </div>
                
                {/* Optional: Duration Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">
                  Watch Video
                </div>
              </div>
            )}

            <video 
              ref={videoRef}
              controls 
              className="w-full h-full object-cover"
              poster="/images/video-thumbnail.jpg"
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src="/Video/LADEF Medical & Surgical Outrech 2 compressed.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-6 sm:p-8 text-center border-t border-border/20 relative z-10">
            <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-3">
              LADEF Medical & Surgical Outreach
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Watch the profound impact of our recent community healthcare initiatives across Abeokuta South, bringing essential medical services directly to the people.
            </p>
          </div>
        </motion.div>

        {/* Bottom trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-16 pt-10 border-t border-border/20"
        >
          {[
            { value: "4,200+", label: "Lives Impacted" },
            { value: "15", label: "Wards Reached" },
            { value: "98%", label: "Approval Rating" },
            { value: "12+", label: "Endorsements" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-stats text-3xl sm:text-4xl text-foreground block leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] text-muted-foreground mt-1.5 block tracking-wider uppercase font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
