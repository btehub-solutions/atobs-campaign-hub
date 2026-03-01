import { GraduationCap, Users, Heart, Building, BookOpen, Briefcase } from "lucide-react";

export interface Achievement {
  icon: string;
  number: string;
  title: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    icon: "GraduationCap",
    number: "513",
    title: "Agritech Graduates",
    description: "Trained and empowered over 500 youth in modern agricultural technology and entrepreneurship.",
  },
  {
    icon: "Users",
    number: "1,500+",
    title: "Students Supported",
    description: "Scholarship and educational support for students across Abeokuta South Constituency.",
  },
  {
    icon: "Heart",
    number: "91",
    title: "Surgery Families",
    description: "Sponsored life-saving surgical operations for families in need across the constituency.",
  },
  {
    icon: "Building",
    number: "15",
    title: "Wards Reached",
    description: "Active presence and community engagement across all 15 wards in the constituency.",
  },
  {
    icon: "BookOpen",
    number: "200+",
    title: "Empowerment Programs",
    description: "Vocational training, skill acquisition, and capacity-building programs for constituents.",
  },
  {
    icon: "Briefcase",
    number: "50+",
    title: "SME Grants",
    description: "Small and medium enterprise grants distributed to support local businesses and entrepreneurs.",
  },
];

export const iconMap: Record<string, React.ComponentType<any>> = {
  GraduationCap,
  Users,
  Heart,
  Building,
  BookOpen,
  Briefcase,
};
