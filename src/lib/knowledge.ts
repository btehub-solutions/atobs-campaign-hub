export interface KnowledgeItem {
  category: string;
  keywords: string[];
  content: string;
  actionLink?: { label: string; url: string };
  componentType?: "Map" | "Stats" | "Video" | "Contact";
}

export const knowledgeBase: KnowledgeItem[] = [
  {
    category: "wards",
    keywords: ["wards", "map", "tracker", "engagement", "strongholds", "target", "progress"],
    content: "We are actively monitoring and engaging all 15 wards in Abeokuta South Constituency 1. Here is a live look at our grassroots engagement tracker.",
    actionLink: { label: "View All Wards", url: "#wards" },
    componentType: "Map"
  },
  {
    category: "vision",
    keywords: ["vision", "plan", "future", "manifesto", "promises", "agenda", "ladef 2026", "what will he do"],
    content: "Hon. Lukmon Atobatele's vision through LADEF 2026 is centered on transforming Abeokuta South via accessible healthcare, youth empowerment, technology, and strategic educational support. We focus on people-centric, grassroots-driven economic prosperity.",
    actionLink: { label: "Discover His Vision", url: "#vision" }
  },
  {
    category: "about",
    keywords: ["who", "lukmon", "atobatele", "background", "profile", "about", "bio", "principal"],
    content: "Hon. Lukmon Atobatele stands as a beacon of progressive leadership in Ogun State. Through LADEF, he has pioneered initiatives that stimulate grassroots economic empowerment and provide life-changing opportunities.",
    actionLink: { label: "Read Biography", url: "#about" }
  },
  {
    category: "medical",
    keywords: ["medical", "health", "hospital", "surgery", "outreach", "sick", "doctors", "clinic", "wellness"],
    content: "Healthcare is a top priority! LADEF recently organized a massive Medical & Surgical Outreach across all 15 wards of Abeokuta South, providing free consultations, surgeries, and medications to thousands of residents.",
    actionLink: { label: "Watch Medical Outreach", url: "#media" },
    componentType: "Video"
  },
  {
    category: "volunteer",
    keywords: ["volunteer", "join", "help", "support", "member", "participate", "contribute"],
    content: "We welcome passionate individuals! You can join the movement to transform Abeokuta South by filling out the Contact form or attending our upcoming ward consultations. Together we can build a better society.",
    actionLink: { label: "Get Involved", url: "#contact" },
    componentType: "Contact"
  },
  {
    category: "achievements",
    keywords: ["achieve", "done", "records", "track", "projects", "success", "results", "impact", "built", "past"],
    content: "Over the years, Hon. Atobatele's leadership has impacted over 500,000 lives, reaching all wards with a focus on education, healthcare, and infrastructure. Explore our achievements section for the exact data and figures.",
    actionLink: { label: "View Track Record", url: "#achievements" },
    componentType: "Stats"
  },
  {
    category: "publications",
    keywords: ["magazine", "pdf", "read", "document", "book", "publication", "download", "manifesto document"],
    content: "We have comprehensive chronicles of Hon. Lukmon Atobatele's achievements available in the LADEF Magazine Vol 3. You can download and read both Part 1 and Part 2 in our Digital Library.",
    actionLink: { label: "View Digital Library", url: "#publications" }
  },
  {
    category: "contact",
    keywords: ["contact", "message", "email", "phone", "talk", "reach", "office", "address", "meet"],
    content: "We would love to hear from you directly! The best way to reach Hon. Lukmon Atobatele or the LADEF team is by sending a secure message through our Contact hub.",
    actionLink: { label: "Go to Contact Me", url: "#contact" },
    componentType: "Contact"
  },
  {
    category: "greeting",
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    content: "Hello there! I'm the LADEF AI Assistant. I can tell you all about Hon. Lukmon Atobatele's vision, his recent massive medical outreach, or how you can get involved. How can I assist you today?",
  }
];
