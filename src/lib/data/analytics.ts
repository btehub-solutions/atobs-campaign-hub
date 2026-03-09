import { TrendingUp, Users, GraduationCap, Heart, Target, BarChart3, Briefcase, MapPin } from "lucide-react";

export interface MetricCard {
  id: string;
  type: "stat" | "progress" | "chart" | "highlight" | "quote" | "video";
  span: string; // Tailwind grid span classes
  icon?: string;
  label: string;
  value?: string;
  suffix?: string;
  description?: string;
  progress?: number;
  trend?: string;
  chartData?: { name: string; value: number }[];
  color?: "primary" | "accent" | "destructive";
}

export const analyticsMetrics: MetricCard[] = [
  {
    id: "total-beneficiaries",
    type: "stat",
    span: "col-span-1 row-span-1",
    icon: "Users",
    label: "Total Beneficiaries",
    value: "4,200",
    suffix: "+",
    trend: "+18% this quarter",
    color: "primary",
  },
  {
    id: "ward-coverage",
    type: "progress",
    span: "col-span-1 row-span-1",
    icon: "MapPin",
    label: "Ward Coverage",
    value: "93",
    suffix: "%",
    progress: 93,
    description: "14 of 15 wards actively engaged",
    color: "primary",
  },
  {
    id: "constituency-impact",
    type: "highlight",
    span: "col-span-2 sm:col-span-2 row-span-1",
    label: "Constituency Impact Score",
    value: "A+",
    description: "Ranked among the top-performing constituency candidates in Ogun State based on verified grassroots impact metrics.",
    color: "accent",
  },
  {
    id: "education-reach",
    type: "chart",
    span: "col-span-2 sm:col-span-2 row-span-2",
    icon: "GraduationCap",
    label: "Education & Empowerment Reach",
    description: "Year-over-year growth in students and graduates supported",
    chartData: [
      { name: "2021", value: 120 },
      { name: "2022", value: 280 },
      { name: "2023", value: 450 },
      { name: "2024", value: 780 },
      { name: "2025", value: 1500 },
    ],
    color: "primary",
  },
  {
    id: "healthcare",
    type: "stat",
    span: "col-span-1 row-span-1",
    icon: "Heart",
    label: "Surgeries Funded",
    value: "91",
    trend: "Life-saving interventions",
    color: "destructive",
  },
  {
    id: "sme-grants",
    type: "stat",
    span: "col-span-1 row-span-1",
    icon: "Briefcase",
    label: "SME Grants Disbursed",
    value: "₦45M",
    suffix: "+",
    trend: "50+ businesses supported",
    color: "accent",
  },
  {
    id: "agritech",
    type: "progress",
    span: "col-span-1 row-span-1",
    icon: "TrendingUp",
    label: "Agritech Program Completion",
    value: "513",
    suffix: " graduates",
    progress: 100,
    description: "Target exceeded by 28%",
    color: "primary",
  },
  {
    id: "approval-rating",
    type: "highlight",
    span: "col-span-1 row-span-1",
    label: "Community Approval",
    value: "87%",
    description: "Based on grassroots ward-level engagement surveys",
    color: "primary",
  },
  {
    id: "quote",
    type: "quote",
    span: "col-span-2 sm:col-span-2 row-span-1",
    label: "Hon. Lukmon Atobatele",
    description: "Results are not just numbers on a page, they are families fed, students empowered, and communities transformed. Every metric here tells a human story.",
  },
  {
    id: "campaign-readiness",
    type: "progress",
    span: "col-span-2 sm:col-span-2 row-span-1",
    icon: "Target",
    label: "2026 Campaign Readiness",
    value: "78",
    suffix: "%",
    progress: 78,
    description: "Ward structures mobilized, stakeholder alignments secured, outreach programs scaling",
    color: "accent",
  },
];

export const iconMap: Record<string, React.ComponentType<any>> = {
  TrendingUp,
  Users,
  GraduationCap,
  Heart,
  Target,
  BarChart3,
  Briefcase,
  MapPin,
};
