import { motion } from "framer-motion";
import { ArrowUpRight, Award, Users, Handshake, Star, Heart, Landmark, Zap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements removed to enforce solid ash background */}
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10 w-full px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Main Split Section: Image & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
          
          {/* Presidential Image Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl group ring-1 ring-border">
              {/* Glassmorphism overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay" />
              
              <img 
                src="/candidate-hero-5.jpg" 
                alt="Hon. Lukmon Olajide Atobatele" 
                className="w-full h-full object-cover object-top scale-[1.02] group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
                decoding="async"
              />
              
              {/* Decorative glows */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[50px]" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[50px]" />
            </div>

            {/* Experience Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              className="absolute -bottom-6 -right-2 sm:-right-6 md:-right-8 bg-card/90 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-4 sm:p-5 flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="text-primary w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="pr-2">
                <p className="text-3xl sm:text-4xl font-stats font-bold text-foreground leading-none">20+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-widest mt-1">Years of Experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Professional Biography Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2"
          >
            <span className="section-badge mb-6 inline-flex self-start">About The Principal</span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight mb-8 leading-[1.05]">
              Leadership <span className="text-primary font-serif italic font-normal tracking-normal text-[1.1em]">Rooted in</span><br />
              <span className="relative inline-block">
                Compassion
                <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full text-accent/30 -z-10" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M2.5 9.5C65.5 -1.5 240.5 -1.5 297.5 9.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/></svg>
              </span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground text-base sm:text-lg leading-[1.8] mb-10">
              <p>
                <span className="text-foreground font-semibold">Hon. Lukmon Atobatele</span> stands as a beacon of progressive leadership and unwavering dedication to the people of Ogun State. With over two decades of corporate experience and comprehensive legislative engagement, he represents a vanguard of transformative governance and grassroots-responsive leadership.
              </p>
              <p>
                As the visionary behind the <span className="text-foreground font-semibold">Lukmon Atobatele Development Foundation (LADEF)</span>, he has pioneered vital initiatives that stimulate massive economic empowerment, deliver critical healthcare interventions, and provide life-changing capacity-building opportunities to countless youth and families.
              </p>
              <blockquote className="border-l-[3px] border-primary/50 pl-6 my-8 py-2">
                <p className="font-display text-xl sm:text-2xl italic text-foreground/90 font-medium leading-relaxed">
                  "As his projects continue to expand in scope and impact, Hon. Atobatele's story stands as a testament to what purposeful leadership, driven by service and accountability, can achieve at the grassroots and beyond."
                </p>
              </blockquote>
            </div>
            
            <div className="flex flex-wrap gap-5 items-center">
              <motion.a 
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                href="#vision" 
                className="btn-pill-primary group h-12 px-8 text-[15px]"
                onClick={(e) => { e.preventDefault(); document.querySelector("#vision")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Discover His Vision
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
                <Star className="w-5 h-5 text-[#C5A54B] fill-[#C5A54B]" />
                <span className="text-sm font-semibold tracking-wide text-foreground uppercase">LADEF Principal</span>
              </div>
            </div>
          </motion.div>
          
        </div>

        {/* Impact Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 auto-rows-[160px] md:auto-rows-[180px]">
          
          {/* Core Focus Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 row-span-2 bento-card-primary group cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center p-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <Landmark className="text-white w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="text-[10px] text-white/70 font-bold tracking-[0.25em] uppercase block mb-3">Governance</span>
              <h3 className="font-heading text-2xl font-bold mb-3">People-Centric</h3>
              <p className="text-sm leading-relaxed max-w-[220px]">Formulating policies and interventions that place human capital development at the core.</p>
            </div>
          </motion.div>

          {/* Stat card 1 - Lives Impacted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="col-span-1 row-span-1 bento-card-warm flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col justify-between h-full p-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="text-primary w-5 h-5" />
              </div>
              <div>
                <span className="font-stats text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold text-foreground block leading-none mb-1 shadow-sm">500k+</span>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Lives Impacted</span>
              </div>
            </div>
          </motion.div>

          {/* Stat card 2 - Grassroots Reach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="col-span-1 row-span-1 bento-card-accent flex flex-col justify-between group"
          >
            <div className="relative z-10 flex flex-col justify-between h-full p-2">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Heart className="text-white w-5 h-5" />
              </div>
              <div>
                <span className="font-stats text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold block leading-none mb-1">236</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider">Wards Reached</span>
              </div>
            </div>
          </motion.div>

          {/* Vision alignment card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="col-span-2 row-span-1 bento-card-dark group cursor-pointer flex items-center gap-5 sm:gap-6 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ml-2">
              <Zap className="text-[#C5A54B] w-7 h-7" />
            </div>
            <div>
              <span className="text-[#C5A54B] text-[11px] font-bold uppercase tracking-widest block mb-1.5">Actionable Vision</span>
              <span className="text-[15px] sm:text-base font-bold block mb-1">Economic Prosperity</span>
              <span className="text-xs sm:text-sm leading-snug">Spurring wealth creation through mechanized agriculture and tech innovation.</span>
            </div>
          </motion.div>

          {/* Leadership icon card (Small) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="col-span-1 row-span-1 bento-card-tint group cursor-pointer flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
              <Star className="text-primary w-6 h-6" />
            </div>
            <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Excellence</span>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="col-span-2 sm:col-span-3 lg:col-span-1 row-span-1 bento-card flex flex-col justify-between group bg-primary/[0.04] border border-primary/20 hover:border-primary/40 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <div className="relative z-20 flex flex-col justify-between h-full p-1 lg:p-0">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <Handshake className="text-primary" size={24} />
              </div>
              <div className="mt-auto">
                <span className="text-[15px] sm:text-base font-bold text-foreground block mb-1.5 leading-tight">Join the Movement</span>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-1.5 text-primary text-[13px] font-semibold group-hover:gap-2.5 transition-all duration-300 hover:text-primary/80"
                >
                  Get Involved <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Community outreach card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="col-span-2 row-span-1 bento-card-primary group cursor-pointer flex items-center gap-5 sm:gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 ml-2">
              <Handshake className="text-white w-7 h-7" />
            </div>
            <div>
              <span className="text-[15px] sm:text-base font-bold block mb-1.5">Grassroots Empowerment</span>
              <span className="text-xs sm:text-sm leading-snug pr-4">Building a self-sustaining ecosystem of skilled youth and empowered women.</span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
