export type WardStatus = "Strong" | "Target" | "Engaging";

export interface Ward {
  name: string;
  status: WardStatus;
  engagement: number;    // 0-100 engagement percentage
  population: string;    // estimated population
  projects: number;      // active projects count
  keyFocus: string;      // primary initiative focus area
}

export const wards: Ward[] = [
  { name: "Ake I", status: "Strong", engagement: 92, population: "18,400", projects: 6, keyFocus: "Education" },
  { name: "Ake II", status: "Strong", engagement: 88, population: "15,200", projects: 5, keyFocus: "Healthcare" },
  { name: "Ago-Oba", status: "Target", engagement: 54, population: "12,800", projects: 3, keyFocus: "Youth Empowerment" },
  { name: "Ijeun-Titun", status: "Engaging", engagement: 41, population: "9,600", projects: 2, keyFocus: "Infrastructure" },
  { name: "Ibara I", status: "Strong", engagement: 95, population: "22,100", projects: 7, keyFocus: "Agritech Training" },
  { name: "Ibara II", status: "Target", engagement: 58, population: "14,300", projects: 3, keyFocus: "Skills Development" },
  { name: "Isale-Ake", status: "Strong", engagement: 87, population: "16,700", projects: 5, keyFocus: "Healthcare" },
  { name: "Imo", status: "Engaging", engagement: 38, population: "8,900", projects: 2, keyFocus: "Community Outreach" },
  { name: "Itoku", status: "Strong", engagement: 91, population: "20,500", projects: 6, keyFocus: "Market Development" },
  { name: "Kobiti", status: "Target", engagement: 62, population: "11,200", projects: 4, keyFocus: "Education" },
  { name: "Lantoro I", status: "Target", engagement: 49, population: "13,600", projects: 3, keyFocus: "Youth Empowerment" },
  { name: "Lantoro II", status: "Engaging", engagement: 35, population: "10,100", projects: 2, keyFocus: "Infrastructure" },
  { name: "Oke-Ijeun", status: "Strong", engagement: 86, population: "17,800", projects: 5, keyFocus: "Education" },
  { name: "Sapon", status: "Engaging", engagement: 43, population: "11,900", projects: 2, keyFocus: "Skilled Trade" },
  { name: "Sodeke", status: "Strong", engagement: 93, population: "19,200", projects: 6, keyFocus: "Agritech Training" },
];

export const statusColors: Record<WardStatus, string> = {
  Strong: "bg-primary text-primary-foreground",
  Target: "bg-accent text-accent-foreground",
  Engaging: "bg-muted text-muted-foreground",
};
