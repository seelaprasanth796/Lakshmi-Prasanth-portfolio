import medicinalLeafImg from "@/assets/project-medicinal-leaf.jpg";
import jarvisImg from "@/assets/project-jarvis.jpg";
import eventImg from "@/assets/project-event-management.jpg";

/**
 * Single source of truth for portfolio content.
 * Only facts supplied by Lakshmi Prasanth Seela belong here — no invented
 * metrics, repositories, demo links or proficiency levels.
 */

export const profile = {
  name: "Lakshmi Prasanth Seela",
  firstName: "Lakshmi Prasanth",
  lastName: "Seela",
  role: "Python Full Stack Developer | Data Analyst",
  tagline:
    "I build practical digital solutions by combining Python development, data analysis, and AI-driven technologies.",
  location: "Andhra Pradesh, India",
  email: "seelaprasanth796@gmail.com",
  phoneDisplay: "+91 8500093155",
  phoneHref: "tel:+918500093155",
  linkedin: "https://www.linkedin.com/in/prasanth-seela-a41867239",
  github: "https://github.com/seelaprasanth796",
} as const;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const heroStats = [
  { value: "1.8 yrs", label: "Vision AI data experience" },
  { value: "97%", label: "Data accuracy" },
  { value: "15,000+", label: "Frames annotated" },
] as const;

export const about = {
  paragraphs: [
    "I have 1.8 years of professional experience in computer vision annotation and data preparation for Vision AI applications.",
    "I achieved 97% data accuracy across 15,000+ retail video and image frames and improved labelling precision by 28%.",
    "I am currently pursuing Full Stack Python Developer training at Codegnan IT Solution.",
  ],
  facts: [
    { label: "Focus", value: "Python · Data · AI" },
    { label: "Based in", value: "Andhra Pradesh, India" },
    { label: "Currently", value: "Full Stack Python training" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  items: string[];
  current?: boolean;
};

export const skillGroups: SkillGroup[] = [
  { title: "Programming", items: ["Python", "JavaScript", "DSA"] },
  { title: "Web Development", items: ["HTML", "CSS", "Flask"] },
  { title: "Database", items: ["SQL"] },
  { title: "Data Analysis", items: ["MS Excel", "Data quality analysis"] },
  {
    title: "Computer Vision & AI",
    items: [
      "Video / image annotation",
      "Bounding-box annotation",
      "Polygon annotation",
      "AI/ML data preparation",
    ],
  },
  { title: "Current Learning", items: ["Full Stack Python Development"], current: true },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  kind: string;
  summary: string;
  highlights: string[];
  tech: string[];
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "medicinal-leaf",
    index: "01",
    title: "Automatic Detection of Medicinal Leaf using AI",
    shortTitle: "Medicinal Leaf AI",
    kind: "Final-year project",
    summary:
      "A final-year project focused on automatically detecting and classifying medicinal leaves using computer vision.",
    highlights: [
      "Automatic detection of medicinal leaves in images",
      "Classification of detected leaves",
      "Built on computer vision and AI techniques",
    ],
    tech: ["Python", "Computer Vision", "AI"],
    image: medicinalLeafImg,
    imageAlt:
      "Illustration of tulsi, neem and aloe leaves outlined with computer-vision detection boxes and polygon markers",
  },
  {
    id: "jarvis",
    index: "02",
    title: "J.A.R.V.I.S. AI Assistant",
    shortTitle: "J.A.R.V.I.S.",
    kind: "Personal project",
    summary: "A personal AI assistant project inspired by the J.A.R.V.I.S. concept.",
    highlights: [],
    tech: ["Python", "AI"],
    image: jarvisImg,
    imageAlt: "Abstract circular voice waveform interface representing an AI assistant",
  },
  {
    id: "event-management",
    index: "03",
    title: "Event Management System",
    shortTitle: "Event Manager",
    kind: "Python / SQL project",
    summary:
      "A Python and SQL application for managing events, participants, registrations and attendance.",
    highlights: ["Event management", "Participant records", "Registrations", "Attendance tracking"],
    tech: ["Python", "SQL"],
    image: eventImg,
    imageAlt:
      "Illustration of a calendar, attendee badges and a check-in grid connected to a database",
  },
];

export const experience = {
  role: "Data Analyst (Non-IT)",
  company: "Everseen Infotech Pvt Ltd",
  location: "Hyderabad",
  period: "September 2022 – April 2024",
  summary:
    "Computer vision annotation and data preparation for Vision AI applications on retail video and image data.",
  achievements: [
    { metric: "97%", text: "Data accuracy maintained across annotated frames" },
    { metric: "15,000+", text: "Frames annotated per quarter" },
    { metric: "28%", text: "Improvement in labelling precision" },
    { metric: "25%", text: "Increase in annotation throughput" },
    { metric: "30%", text: "Reduction in data discrepancy reports" },
    { metric: "5", text: "Standard operating procedures for a five-member team" },
    { metric: "2023", text: "Best Employee of the Month" },
  ],
} as const;

export type EducationItem = {
  title: string;
  org: string;
  period: string;
  detail?: string;
  type: "Degree" | "Training" | "Workshop";
  current?: boolean;
};

export const education: EducationItem[] = [
  {
    title: "Full Stack Python Developer Trainee",
    org: "Codegnan IT Solution",
    period: "Currently pursuing",
    type: "Training",
    current: true,
  },
  {
    title: "MCA",
    org: "V.S.M. Degree College, Andhra Pradesh",
    period: "2024 – 2026",
    detail: "CGPA 8.0",
    type: "Degree",
  },
  {
    title: "AI Tools and ChatGPT Workshop",
    org: "Workshop",
    period: "August 2025",
    type: "Workshop",
  },
  {
    title: "B.Sc. Computers",
    org: "V.S.M. Degree College",
    period: "2018 – 2021",
    detail: "CGPA 6.13 / 10",
    type: "Degree",
  },
];

export const achievements = [
  {
    title: "Best Employee of the Month",
    detail: "Recognised at Everseen Infotech in 2023.",
    tag: "2023",
  },
  {
    title: "97% data accuracy",
    detail: "Across 15,000+ retail video and image frames for Vision AI.",
    tag: "Quality",
  },
  {
    title: "28% better labelling precision",
    detail: "Plus a 25% increase in annotation throughput.",
    tag: "Precision",
  },
  {
    title: "30% fewer discrepancy reports",
    detail: "And standard operating procedures for a five-member team.",
    tag: "Process",
  },
] as const;
