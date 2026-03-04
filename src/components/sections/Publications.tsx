import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

// The PDF assets
const magazines: any[] = [];

// Clean, Professional Document Card Component
const DocumentCard = ({ magazine, index }: { magazine: typeof magazines[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative z-10 w-full"
    >
      <div className="group relative w-full bg-card rounded-2xl border border-border/40 hover:border-border/80 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col h-full">
        {/* Top Accent Bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${magazine.coverColor} opacity-70`} />
        
        <div className="p-8 flex-1 flex flex-col bg-white">
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-sm">
              <FileText size={28} strokeWidth={1.5} />
            </div>
            <span className="inline-flex px-3 py-1 rounded-full bg-muted/60 text-xs font-semibold text-muted-foreground border border-border/50 uppercase tracking-widest">
              {magazine.issue}
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground leading-[1.2] mb-3 group-hover:text-primary transition-colors duration-300">
            {magazine.title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-[1.6] flex-1">
            {magazine.description}
          </p>
        </div>

        {/* Action Bottom Bar */}
        <div className="p-6 border-t border-border/60 bg-muted/30 flex items-center gap-4">
           <a
             href={magazine.href}
             target="_blank"
             rel="noopener noreferrer"
             className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground hover:bg-foreground/90 text-background text-sm font-semibold transition-all shadow-md hover:shadow-lg"
           >
             View Document
           </a>
           <a
             href={magazine.href}
             download
             className="flex items-center justify-center w-12 h-12 rounded-xl bg-card border border-border/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
             title="Download PDF"
             aria-label="Download Document"
           >
             <Download size={20} />
           </a>
        </div>
      </div>
    </motion.div>
  );
};

const Publications = () => {
  return (
    <section id="publications" className="py-32 relative overflow-hidden bg-white">
      {/* Background aesthetics */}
      <div className="section-divider absolute top-0 left-0 w-full" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <span className="section-badge mb-6 inline-flex">Digital Library</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 leading-[1.05]">
            Campaign <span className="text-[#C5A54B]">Publications</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-[1.7]">
            Immerse yourself in the comprehensive chronicles of Hon. Lukmon Atobatele's achievements and the ambitious LADEF 2026 manifesto.
          </p>
        </motion.div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          {magazines.map((mag, i) => (
            <DocumentCard key={i} magazine={mag} index={i} />
          ))}
        </div>

        {/* Optional small footnote about viewing */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="mt-16 text-center"
        >
          <p className="text-[13px] text-muted-foreground">
             Documents open in a new secure tab. Best viewed on modern browsers.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
