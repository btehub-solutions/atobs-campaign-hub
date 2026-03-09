import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Search, Command, ArrowRight } from "lucide-react";
import { knowledgeBase } from "@/lib/knowledge";

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
  const [cmdOpen, setCmdOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (cmdOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  }, [cmdOpen]);

  const allSearchResults = [
    ...navLinks.map(l => ({ title: l.label, type: 'Page Section', url: l.href })),
    ...knowledgeBase.filter(k => k.actionLink).map(k => ({ title: k.category.charAt(0).toUpperCase() + k.category.slice(1), type: 'AI Topic', url: k.actionLink!.url }))
  ];
  
  // Remove duplicates by URL
  const uniqueResults = Array.from(new Map(allSearchResults.map(item => [item.url, item])).values());
  const filteredResults = uniqueResults.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

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
    setCmdOpen(false);
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

            {/* Smart Search Trigger */}
            <button
               onClick={() => setCmdOpen(true)}
               className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 hover:bg-muted/80 text-muted-foreground transition-colors border border-border/50 text-[11px] font-medium"
            >
               <Search size={14} />
               <span>Search</span>
               <kbd className="hidden lg:inline-flex ml-1 h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                 <Command size={10} /> K
               </kbd>
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
      {/* Command Center Modal */}
      <AnimatePresence>
        {cmdOpen && (
          <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm p-4 sm:p-6 pt-[15vh]">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setCmdOpen(false)}
               className="absolute inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="relative mx-auto max-w-xl bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden flex flex-col"
            >
              <div className="flex items-center px-4 py-3 border-b border-border/30">
                <Search size={18} className="text-muted-foreground shrink-0 mr-3" />
                <input
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search manifesto, achievements, wards..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base mr-3"
                />
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground mr-1">
                  ESC
                </kbd>
                <button onClick={() => setCmdOpen(false)} className="p-1 rounded-md hover:bg-muted text-muted-foreground"><X size={16}/></button>
              </div>

              <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-border/50">
                {filteredResults.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Suggested Results
                    </div>
                    {filteredResults.map((result) => (
                      <button
                        key={result.url + result.title}
                        onClick={() => scrollTo(result.url)}
                        className="flex items-center justify-between w-full px-3 py-3 sm:py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors text-left group"
                      >
                         <div className="flex flex-col">
                           <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{result.title}</span>
                           <span className="text-[10px] text-muted-foreground">{result.type}</span>
                         </div>
                         <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-muted/30 p-2 sm:px-4 flex items-center justify-between border-t border-border/30">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-primary/30 bg-primary/10">
                    <img src="/ladef-logo-trimmed.png" alt="LADEF" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">LADEF Smart Input</span>
                </div>
                <div className="hidden sm:flex text-[10px] text-muted-foreground items-center gap-2">
                   <span>Use <kbd className="border border-border/50 rounded px-1 ml-0.5">↑</kbd> <kbd className="border border-border/50 rounded px-1">↓</kbd> to navigate</span>
                   <span><kbd className="border border-border/50 rounded px-1">Enter</kbd> to select</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
