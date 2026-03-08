import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Achievements", href: "#achievements" },
  { label: "Impact", href: "#results" },
  { label: "Wards", href: "#wards" },
  { label: "Media", href: "#media" },
  { label: "Gallery", href: "#gallery" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    
    // Slight delay to allow the mobile drawer to start closing before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offset = 70; // Account for fixed navbar height
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        });
      }
    }, 50);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "py-2"
          : "py-4"
      }`}
    >
      <div className={`section-container transition-all duration-700 ${
        scrolled
          ? "bg-card/80 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-[0_8px_30px_hsl(0_0%_0%/0.04)] mx-6 sm:mx-8 lg:mx-auto max-w-[1240px] px-6"
          : ""
      }`}>
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          >
            <div className="flex items-center">
              <img 
                src="/ladef-logo-trimmed.png" 
                alt="LADEF Logo" 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
              />
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-foreground/[0.06] rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-primary-foreground transition-all duration-300
                bg-gradient-to-r from-primary to-primary/90
                hover:shadow-[0_4px_20px_hsl(152_62%_42%/0.3)] hover:-translate-y-0.5"
            >
              Get in Touch
              <ArrowUpRight size={13} />
            </button>

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-foreground/[0.06] text-foreground hover:bg-foreground/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-card/95 backdrop-blur-3xl border-t border-border/30 overflow-hidden mt-2 mx-6 rounded-2xl border border-border/40"
          >
            <div className="p-5 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`block text-left text-sm font-medium py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeSection === link.href.slice(1)
                      ? "text-foreground bg-foreground/[0.06]"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                  }`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-border/30 mt-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#contact");
                  }}
                  className="btn-pill-primary w-full justify-center text-sm cursor-pointer"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  Get in Touch
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
