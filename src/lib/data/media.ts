export interface MediaItem {
  title: string;
  source: string;
  category: string;
  excerpt: string;
  date: string;
  url?: string;
}

export const mediaItems: MediaItem[] = [
  {
    title: "Atobatele Empowers 513 Agritech Graduates in Abeokuta",
    source: "The Guardian Nigeria",
    category: "Empowerment",
    excerpt: "Hon. Lukmon Atobatele's agritech initiative has graduated over 500 youths, equipping them with skills in modern farming and agribusiness.",
    date: "2025-08-15",
  },
  {
    title: "APC Chieftain Funds 91 Surgeries Across Ogun Communities",
    source: "Punch Newspapers",
    category: "Healthcare",
    excerpt: "In a landmark healthcare intervention, ATOBS sponsored life-saving surgeries for 91 families, earning widespread praise from constituents.",
    date: "2025-06-22",
  },
  {
    title: "Over 1,500 Students Receive Scholarships from Atobatele Foundation",
    source: "Tribune Online",
    category: "Education",
    excerpt: "The Atobatele Foundation has extended educational support to over 1,500 students across Abeokuta South, covering tuition and learning materials.",
    date: "2025-09-10",
  },
  {
    title: "Atobatele Launches Ward-Level Development Tracker",
    source: "Vanguard News",
    category: "Governance",
    excerpt: "A first-of-its-kind digital ward tracker was unveiled to improve transparency and citizen engagement in constituency development.",
    date: "2025-11-02",
  },
  {
    title: "Youth Groups Endorse ATOBS for 2026 House of Assembly Race",
    source: "Premium Times",
    category: "Politics",
    excerpt: "Multiple youth organizations across Abeokuta South have declared support for Hon. Atobatele, citing his track record of grassroots impact.",
    date: "2025-12-18",
  },
  {
    title: "Atobatele's SME Grant Programme Creates 200+ Jobs",
    source: "BusinessDay",
    category: "Economy",
    excerpt: "Small business owners in the constituency have received grants and mentorship, resulting in the creation of over 200 new jobs.",
    date: "2026-01-05",
  },
];
