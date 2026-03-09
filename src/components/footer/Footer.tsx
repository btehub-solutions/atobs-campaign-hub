import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const quickLinks = ["About", "Achievements", "Impact", "Wards", "Media", "Gallery", "Contact"];

const Footer = () => {
  const scrollTo = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Top divider */}
      <div className="section-divider" />

      {/* CTA band */}
      <div className="py-12 sm:py-24 relative">
        <div className="section-container relative z-10 text-center">
          <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.05]">
            Ready to build <span className="gradient-text">together?</span>
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 leading-[1.7]">
            Join the movement for a better Abeokuta South. Your voice matters.
          </p>
          <button
            onClick={() => scrollTo("contact")}
            className="btn-pill-primary"
          >
            Get in Touch
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>

      {/* Footer content */}
      <div className="border-t border-border/30 py-10 sm:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4 sm:mb-5 relative h-10 sm:h-12 w-full flex items-center">
                <img 
                  src="/ladef-logo-trimmed.png" 
                  alt="LADEF Logo" 
                  className="absolute left-0 h-full w-auto max-w-none object-contain origin-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  loading="lazy"
                />
              </div>
              <p className="text-muted-foreground text-[13px] leading-[1.7]">
                Hon. Lukmon Olajide Atobatele — APC candidate for Abeokuta South Constituency 1, Ogun State House of Assembly.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-foreground text-[11px] font-semibold mb-4 sm:mb-5 uppercase tracking-[0.2em]">Navigate</h4>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-4 sm:flex sm:flex-col sm:space-y-3">
                {quickLinks.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => scrollTo(l.toLowerCase())}
                      className="text-muted-foreground text-[13px] hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {l}
                      <ArrowUpRight size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-foreground text-[11px] font-semibold mb-4 sm:mb-5 uppercase tracking-[0.2em]">Contact</h4>
              <ul className="space-y-3 text-[13px] text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Abeokuta South, Ogun State</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>+234 xxx xxx xxxx</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>contact@ladef2026.ng</span>
                </li>
              </ul>
            </div>

            {/* Party */}
            <div>
              <h4 className="text-foreground text-[11px] font-semibold mb-4 sm:mb-5 uppercase tracking-[0.2em]">Party</h4>
              <p className="text-muted-foreground text-[13px] leading-[1.7] mb-4">
                All Progressives Congress (APC), Ogun State Chapter.
              </p>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Campaign Active
              </span>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 sm:pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-[11px] text-muted-foreground">
              © 2026 LADEF Campaign. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Accessibility"].map((link) => (
                <button key={link} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
