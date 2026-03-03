export interface Testimonial {
  id: string;
  name: string;
  role: string;
  ward: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Chief Mrs. Folake Adeyemi",
    role: "Community Leader",
    ward: "Ake I",
    quote: "Hon. Atobatele's scholarship program changed the trajectory of my grandchildren's lives. He doesn't just promise — he delivers with compassion and consistency.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Engr. Tunde Bakare",
    role: "Youth Coordinator",
    ward: "Ibara I",
    quote: "The Agritech training program gave over 500 young people in our community real, marketable skills. This is the kind of empowerment we've been waiting for.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Alhaja Muinat Ogunleye",
    role: "Market Women Leader",
    ward: "Itoku",
    quote: "When my daughter needed surgery and we had no hope, LADEF foundation stepped in. He is a leader who feels our pain and acts on it.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Pastor David Oladipo",
    role: "Ward Chairman",
    ward: "Sodeke",
    quote: "In 15 years of grassroots politics, I have never seen anyone as committed to the people as Hon. Lukmon. He is present, accountable, and transformative.",
    rating: 5,
  },
  {
    id: "t5",
    name: "Barrister Aisha Bello",
    role: "Legal Practitioner",
    ward: "Isale-Ake",
    quote: "His approach to governance is data-driven and transparent. The ward tracker and public reporting set a new standard for constituency representation.",
    rating: 5,
  },
  {
    id: "t6",
    name: "Mr. Kehinde Afolabi",
    role: "School Principal",
    ward: "Ago-Oba",
    quote: "The educational interventions in our ward — from scholarships to school renovations — have given our students renewed hope. LADEF truly invests in the future.",
    rating: 5,
  },
];
