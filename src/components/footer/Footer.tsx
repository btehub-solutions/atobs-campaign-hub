import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="font-stats text-3xl text-accent tracking-wider block mb-2">ATOBS 2026</span>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              Hon. Lukmon Olajide Atobatele — Candidate for Abeokuta South Constituency 1, Ogun State House of Assembly.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              {["Achievements", "Wards", "Media", "Gallery", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" }); }}
                    className="hover:text-accent transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-3">Contact</h4>
            <ul className="space-y-3 text-sm font-body text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Abeokuta South, Ogun State</li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-primary" /> +234 xxx xxx xxxx</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-primary" /> contact@atobs2026.ng</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground font-body">
            © 2026 ATOBS Campaign. All rights reserved. — APC, Ogun State.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
