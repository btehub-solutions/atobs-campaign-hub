import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, ChevronRight, RefreshCcw, Play, Map, Phone, BarChart3 } from "lucide-react";

import { Message, generateAIResponse } from "@/lib/ai-engine";

const INITIAL_MESSAGE: Message = {
  id: "1",
  role: "ai",
  content: "Hello! I'm the LADEF Campaign Assistant. How can I help you learn about Hon. Lukmon Atobatele's vision for Abeokuta South?"
};

const SUGGESTIONS = [
  "What is the LADEF vision?",
  "Tell me about medical outreaches",
  "How can I volunteer?",
  "What are the achievements so far?"
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [currentSection, setCurrentSection] = useState("hero");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll observer for predictive hints
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "achievements", "results", "wards", "media", "gallery", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTooltipHint = () => {
    switch (currentSection) {
      case "about": return "Ask about Hon. Lukmon's background";
      case "achievements": return "See 500,000+ lives impacted";
      case "results": return "Explore grassroots analytics";
      case "wards": return "Live look at ward engagements";
      case "media": return "Watch the latest LADEF videos";
      case "publications": return "Download the digital library";
      default: return "Chat with LADEF AI";
    }
  };

  // Clear initial tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Clear hover tooltip after 5 seconds (especially useful for mobile tap-to-hover)
  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setIsHovered(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Listen for external analysis requests (2026 deeper functionality)
  useEffect(() => {
    const handleQuery = (e: any) => {
      setIsOpen(true);
      // We use a small timeout to ensure the state update for isOpen completes if needed
      // but mostly to feel natural
      setTimeout(() => handleSend(e.detail), 300);
    };
    window.addEventListener('ladef-ai-query', handleQuery);
    return () => window.removeEventListener('ladef-ai-query', handleQuery);
  }, []); // handleSend is stable enough here or we can just define it before

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Track scroll context for 2026 intelligence
    let currentContext = "hero";
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentContext = sec.id;
      }
    });

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newContext = [...messages, userMsg];
    setMessages(newContext);
    setInputValue("");

    // Add typing indicator
    const typingMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingMsgId, role: "ai", content: "", isTyping: true }]);

    // Simulate AI thinking and response
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(text, newContext, currentContext);
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== typingMsgId);
        return [...filtered, aiResponse];
      });
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_8px_30px_hsl(152_62%_42%/0.4)] transition-all duration-300 hover:scale-[1.05] border border-primary/20 pointer-events-auto"
            >
              <MessageSquare size={24} />
            </button>
            
            {/* Tooltip hint */}
            <AnimatePresence mode="wait">
              {(isInitialLoad || isHovered) && (
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute -top-12 right-0 whitespace-nowrap rounded-lg bg-card/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-lg backdrop-blur-sm border border-primary/20 pointer-events-none"
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={10} className="animate-pulse" />
                    {getTooltipHint()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/20 bg-gradient-to-r from-primary/[0.08] to-accent/[0.05] p-4 relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-primary/30 shadow-sm bg-card">
                  <img src="/ladef-logo-trimmed.png" alt="LADEF" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-foreground">LADEF Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={() => setMessages([INITIAL_MESSAGE])}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                  title="Restart Chat"
                >
                  <RefreshCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
                  title="Close Assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm border border-border/50 ${msg.role === "user" ? "bg-primary/5 text-primary" : "bg-card"}`}>
                    {msg.role === "user" ? <User size={14} /> : <img src="/ladef-logo-trimmed.png" alt="LADEF" className="h-full w-full object-cover" />}
                  </div>
                  
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm bg-muted/50 text-foreground border border-border/30 ${
                    msg.role === "user" 
                      ? "rounded-tr-sm" 
                      : "rounded-tl-sm"
                  }`}>
                    {msg.isTyping ? (
                      <div className="flex items-center h-5 gap-1 pt-1 opacity-70">
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        
                        {/* 2026 Generative UI Payloads */}
                        {msg.componentType === 'Video' && (
                          <div 
                            onClick={() => { setIsOpen(false); document.querySelector('#media')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="mt-2 group relative overflow-hidden rounded-xl border border-primary/20 bg-card cursor-pointer hover:border-primary/50 transition-colors"
                          >
                            <div className="aspect-video w-full bg-muted/50 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_hsl(152_62%_42%/0.4)] transition-transform group-hover:scale-110">
                                  <Play size={16} className="ml-0.5" />
                                </div>
                              </div>
                            </div>
                            <div className="bg-muted/30 p-2.5 flex items-center justify-between">
                              <span className="text-xs font-semibold text-foreground">Medical Outreach</span>
                              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Play Video</span>
                            </div>
                          </div>
                        )}
                        
                        {msg.componentType === 'Stats' && (
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
                              <BarChart3 size={16} className="mx-auto mb-1 text-primary opacity-80" />
                              <div className="text-lg font-bold text-foreground">500k+</div>
                              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Lives Impacted</div>
                            </div>
                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
                              <Map size={16} className="mx-auto mb-1 text-primary opacity-80" />
                              <div className="text-lg font-bold text-foreground">15</div>
                              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Wards Covered</div>
                            </div>
                          </div>
                        )}
                        
                        {msg.componentType === 'Contact' && (
                          <div className="mt-2 rounded-xl border border-border bg-card p-3 shadow-sm">
                            <div className="mb-2 text-xs font-semibold text-foreground">Direct Lines</div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone size={12} className="text-primary" /> +234 (0) 800 LADEF
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </div>
                                Support Team Online
                              </div>
                            </div>
                          </div>
                        )}

                        {msg.componentType === 'Map' && (
                           <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 p-3">
                             <div className="flex items-center justify-between mb-2">
                               <div className="flex items-center gap-2">
                                 <Map size={14} className="text-primary"/>
                                 <span className="text-xs font-semibold text-foreground">Ward Coverage</span>
                               </div>
                               <span className="text-[10px] font-bold text-primary">85%</span>
                             </div>
                             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                               <div className="h-full bg-primary w-[85%] rounded-full shadow-[0_0_10px_hsl(152_62%_42%/0.5)]" />
                             </div>
                           </div>
                        )}
                        {msg.action && (
                          <div className="pt-1">
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                document.querySelector(msg.action!.url)?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-xs rounded-full transition-colors border border-primary/20"
                            >
                              {msg.action.label} <ChevronRight size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions (only show if no user messages yet) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Suggested topics:</span>
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary/[0.03] px-3 py-1.5 text-xs text-foreground transition-all hover:bg-primary/10 hover:border-primary/30"
                    >
                      {suggestion} <ChevronRight size={10} className="opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-border/20 p-4 bg-card">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full rounded-full border border-border/40 bg-muted/30 py-3 pl-4 pr-12 text-sm text-foreground outline-none focus:border-primary/50 focus:bg-card transition-all"
                  disabled={messages[messages.length - 1]?.isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || messages[messages.length - 1]?.isTyping}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
              <div className="mt-2 text-center text-[9px] text-muted-foreground uppercase tracking-widest">
                Protected by LADEF Protocol
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
