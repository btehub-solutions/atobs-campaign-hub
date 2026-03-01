export type WardStatus = "Strong" | "Target" | "Engaging";

export interface Ward {
  name: string;
  status: WardStatus;
}

export const wards: Ward[] = [
  { name: "Ake I", status: "Strong" },
  { name: "Ake II", status: "Strong" },
  { name: "Ago-Oba", status: "Target" },
  { name: "Ijeun-Titun", status: "Engaging" },
  { name: "Ibara I", status: "Strong" },
  { name: "Ibara II", status: "Target" },
  { name: "Isale-Ake", status: "Strong" },
  { name: "Imo", status: "Engaging" },
  { name: "Itoku", status: "Strong" },
  { name: "Kobiti", status: "Target" },
  { name: "Lantoro I", status: "Target" },
  { name: "Lantoro II", status: "Engaging" },
  { name: "Oke-Ijeun", status: "Strong" },
  { name: "Sapon", status: "Engaging" },
  { name: "Sodeke", status: "Strong" },
];

export const statusColors: Record<WardStatus, string> = {
  Strong: "bg-primary text-primary-foreground",
  Target: "bg-accent text-accent-foreground",
  Engaging: "bg-muted text-muted-foreground",
};
