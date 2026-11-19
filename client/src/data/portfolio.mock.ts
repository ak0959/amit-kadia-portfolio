/**
 * Central content source for the redesigned portfolio page.
 *
 * - Project entries come from ./projects (single source of truth for those items).
 * - Everything else lives here so the copy can be refined without touching UI code.
 * - Items flagged `verified: false` come from the design mockup and need confirmation.
 * - Asset paths point at the prepared retro asset library in /images/portfolio-retro/.
 */
import { PROJECTS_DATA } from "@/data/projects";
import type { ProjectItem } from "@/types/portfolio";

const IMG = "/images/portfolio-retro";
export const asset = (path: string) => `${IMG}/${path}`;

export type IconKey = string;

export interface NavItem { label: string; href: string }
export interface HeroBadge { label: string; kind: "availability" | "credential"; icon?: IconKey }
export interface HeroAction { label: string; href: string; variant: "primary" | "outline"; icon: IconKey; external?: boolean; download?: boolean }
export interface Highlight { id: string; value: string; label: string; icon: IconKey; tone: string; verified: boolean }
export interface SkillTile { label: string; icon: IconKey; tone: string }
export interface ToolCard {
  id: string;
  name: string;
  icon: IconKey;
  description: string; // what the tool is used for / how it is used (tooltip + screen readers)
  knowledgeLevel: string; // short secondary line shown on the card
  tone: string;
}
export interface RoleSlide {
  kind: "role";
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  monogram: string;
  accent: string;
  bullets: string[];
}
export interface EarlierEntry { company: string; title: string; period: string; summary: string }
export interface EarlierSlide {
  kind: "earlier";
  id: string;
  label: string;
  period: string;
  accent: string;
  entries: EarlierEntry[];
}
export type ExperienceSlide = RoleSlide | EarlierSlide;
export type CredentialArtwork =
  | { type: "image"; src: string; alt: string }
  | { type: "text"; title: string; subtitle?: string };
/** Anything the certificate viewer can open. */
export interface ViewableDocument { id: string; displayName: string; issuer: string; pdfUrl: string }
export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  detail: string; // location or study mode
  dates: string;
  pdfUrl: string;
  tone: string; // pastel tone class suffix (see .t-* in retro.css)
  officialQualification?: string;
  officialInstitution?: string;
  specialization?: string;
}
export interface CertificationDisc extends ViewableDocument { artwork: CredentialArtwork }
export interface ProjectCard extends ProjectItem { summary: string; icon: IconKey }

export const profile = {
  name: "Amit Kadia",
  initials: "AK",
  headline: "Senior Program, Delivery & Transformation Leader",
  sinceLabel: "Since 2004",
  location: "Vadodara, Gujarat, India",
};

export const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Credentials", href: "#credentials" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export const resume = {
  heading: "Download My Resume",
  description:
    "One unified resume covering my career history, programme delivery leadership, skills and credentials.",
  cardTitle: "Amit Kadia — Resume",
  cardDescription: "Full career history, delivery leadership and professional credentials.",
  buttonLabel: "Download PDF",
  href: "/documents/resume/Amit-Kadia-Resume-2026.pdf",
  downloadName: "Amit-Kadia-Resume.pdf",
};

export const contact = {
  email: "adi209@gmail.com",
  phone: "+91 96381 80959",
  phoneHref: "tel:+919638180959",
  whatsappHref: "https://wa.me/919638180959",
  linkedinLabel: "linkedin.com/in/amit-kadia",
  linkedinHref: "https://www.linkedin.com/in/amit-kadia",
  location: profile.location,
};

export const hero = {
  taglines: ["Program Delivery", "Digital Transformation", "AI & Analytics"],
  title: profile.headline,
  // Years figure comes from the existing site copy ("20+ years").
  intro:
    "My journey with technology goes back to the days of dial-up internet, desktop computers and software that came on CDs. Over the years, I’ve watched technology evolve and built my career alongside it — from enterprise delivery and programme management to digital transformation and today’s AI-driven world. With 19 years of professional experience across India, the UAE and the US, I bring that same curiosity and adaptability to everything I do.",
  badges: [
    { label: "Open to remote opportunities", kind: "availability", icon: "check" },
    { label: "India · UAE · US experience", kind: "availability", icon: "globe" },
  ] as HeroBadge[],
  actions: [
    { label: "Download CV", href: resume.href, variant: "primary", icon: "download", download: true },
    { label: "Contact Me", href: "#contact", variant: "outline", icon: "mail" },
    { label: "LinkedIn", href: contact.linkedinHref, variant: "outline", icon: "linkedin", external: true },
  ] as HeroAction[],
  portrait: {
    src: asset("hero/portrait.webp"),
    src2x: asset("hero/portrait@2x.webp"),
    width: 400,
    height: 416,
    alt: "Portrait of Amit Kadia",
  },
  cassetteLabel: "AK / Career Mixtape",
  cassetteCaption: "Delivery • Transformation • AI",
};

// Figures are taken from the existing hero copy and experience bullets.
export const highlights: Highlight[] = [
  { id: "years", value: "20+", label: "Years of Professional Experience", icon: "trophy", tone: "#F4B183", verified: true },
  { id: "markets", value: "3", label: "Global Markets: India, UAE & US", icon: "globe", tone: "#E8553E", verified: true },
  { id: "leadership", value: "10+", label: "Years in Programme & Delivery Leadership", icon: "chart", tone: "#E8553E", verified: true },
];

export interface Achievement { id: string; value: string; label: string; icon: IconKey; tone: string }

export const experienceAchievements: Achievement[] = [
  { id: "peak-budget", value: "~$300K", label: "Peak Monthly Programme Budget Managed", icon: "wallet", tone: "#E8553E" },
  { id: "sprint-spillovers", value: "~25%", label: "Reduction in Sprint Spillovers", icon: "trendingdown", tone: "#2F9E8F" },
  { id: "on-time", value: "~94%", label: "On-Time Delivery Achieved", icon: "target", tone: "#F2993A" },
  { id: "rework", value: "~20%", label: "Reduction in Rework", icon: "refresh", tone: "#6C5BB5" },
  { id: "bug-turnaround", value: "~30%", label: "Faster Bug Turnaround", icon: "zap", tone: "#E8553E" },
];
export const experienceAchievementsMeta = {
  heading: "Selected Delivery & Operational Outcomes",
  note: "Approximate figures reflecting selected programme and delivery outcomes over the course of my career.",
};

export const about = {
  label: "About Me",
  title: "From Analog to Digital",
  // Narrative copy comes from the approved mockup (not a factual claim set) — confirm wording.
  paragraphs: [
    "By the mid-2010s, technology had moved well beyond desktop computers and standalone applications. Enterprise platforms, cloud-based solutions, SaaS products and Agile ways of working were changing how businesses operated. My career evolved alongside these changes, taking me from project coordination into managing complex technology deliveries, leading cross-functional teams and working with clients across international markets.",
    "As the 2020s unfolded, my focus expanded towards programme leadership, financial oversight, delivery governance and digital transformation. Today, I combine those years of hands-on experience with a growing understanding of AI and analytics, bringing together people, technology and business priorities to deliver meaningful outcomes.",
  ],
  image: asset("about/retro-composition.svg"),
  imageAlt:
    "Illustration of a retro computer, CD, stacked cassettes and a game controller",
};

// Content below is taken from the updated resume (Amit-Kadia-Resume-2026.pdf), work-experience section.
export const experience = {
  label: "Experience",
  title: "A Proven Track Record in Enterprise Delivery",
  carouselLabel: "Work experience",
  items: [
    {
      kind: "role",
      id: "horizontal-integration",
      company: "Horizontal Integration India Pvt. Ltd.",
      title: "Senior Project Delivery Manager",
      period: "Aug 2024 – Jun 2026",
      location: "India",
      monogram: "HI",
      accent: "#4F4A8A",
      bullets: [
        "Engineered 2–3 concurrent digital transformation and enterprise implementation programs across Sitecore platforms, directing teams across India, UAE, and US time zones while administering monthly budgets of $165K–$295K USD (45–80 lakhs INR / 600K–1.1M AED).",
        "Owned end-to-end delivery lifecycles including planning, execution, UAT, go-live, and post-deployment stabilization for large-scale enterprise programs, maintaining zero client escalations for 6 consecutive months.",
        "Recovered 12–15% of at-risk project margins ($65K–$80K USD) through dependency mapping, RAID governance, and capacity balancing, while accelerating on-time delivery from 72% to 94%.",
        "Decreased sprint spillover by 25% within 8 weeks and cycle time variability by 18% by restructuring backlog hygiene, capacity planning, and velocity tracking using Jira and Confluence.",
        "Guided engineering, QA, and BA teams across time zones, eliminating handoff inefficiencies and lifting utilization accuracy from 70% to 90% through structured delivery workflows.",
      ],
    },
    {
      kind: "role",
      id: "civica",
      company: "CIVICA Resource India Pvt. Ltd.",
      title: "Delivery Manager",
      period: "Apr 2022 – Jun 2024",
      location: "India",
      monogram: "CV",
      accent: "#4F8C8A",
      bullets: [
        "Directed delivery operations for an entire business unit, overseeing quarterly forecasting, utilization planning, and performance reviews across Scrum teams while governing project budgets of $110K–$220K USD (30–60 lakhs INR / 400K–800K AED).",
        "Accelerated enterprise technology initiatives 3–4 weeks ahead of schedule by removing cross-functional bottlenecks and sharpening coordination across product, engineering, and QA divisions.",
        "Improved budget predictability by 25% through structured forecasting, vendor coordination, and utilization governance, strengthening PMO-level delivery transparency.",
        "Reduced rework by 20–22% and defect leakage by 15% by refining acceptance criteria, QA alignment protocols, and test-planning frameworks, establishing quality gates adopted as standard practice.",
      ],
    },
    {
      kind: "role",
      id: "exxat",
      company: "Exxat Systems",
      title: "Senior Project Manager",
      period: "Oct 2018 – Mar 2022",
      location: "India",
      monogram: "EX",
      accent: "#627FA3",
      bullets: [
        "Led delivery of healthcare software product modules for US-based clients, synchronizing 3–4 cross-functional squads across release cycles while tracking sprint velocity, defect trends, and customer satisfaction metrics.",
        "Elevated client satisfaction scores from 3.8 to 4.5/5 within 12 months by stabilizing release cadences, implementing risk mitigation, and establishing predictable delivery patterns across product modules.",
        "Compressed bug turnaround time by 30% through priority-based workflow restructuring and tighter alignment with centralized development teams using Jira.",
      ],
    },
    {
      kind: "earlier",
      id: "earlier-career",
      label: "Earlier Career",
      period: "Apr 2004 – Aug 2018",
      accent: "#C97872",
      entries: [
        { company: "Panamax Infotech Ltd.", title: "Assistant Project Manager", period: "Apr 2016 – Aug 2018", summary: "Directed Fintech product delivery for telecom clients across APAC, Africa, and the Middle East, coordinating feature-level issue resolution, post-launch reviews, and WBS maintenance across teams." },
        { company: "IndiaNIC Infotech Ltd.", title: "Project Support Executive", period: "Feb 2014 – Dec 2015", summary: "Facilitated PMO support including project plan maintenance, weekly/monthly status reporting, closure meeting facilitation, and project accounting with client payment follow-ups." },
        { company: "Vodafone India Services Pvt. Ltd.", title: "Executive", period: "Feb 2012 – Feb 2014", summary: "Executed bulk data updates with 98–99% accuracy while meeting daily TAT targets in a high-volume operational environment." },
        { company: "ICICI Prudential Life Insurance", title: "Customer Service Associate", period: "Feb 2007 – Aug 2010", summary: "Delivered customer service excellence while supporting branch audits, Insurance Underwriting, compliance documentation, and sales retention initiatives." },
        { company: "Motif India Infotech Pvt. Ltd.", title: "Process Specialist", period: "Apr 2004 – Jan 2007", summary: "Mitigated process deviations by 15% through documentation improvements, training material creation, and quality calibration between client and QA teams." },
      ],
    },
  ] as ExperienceSlide[],
};

export const skills = {
  label: "Skills",
  title: "A Well-Rounded Delivery & Transformation Toolkit",
  tiles: [
    { label: "Program & Project Management", icon: "briefcase", tone: "peach" },
    { label: "Digital Transformation, AI & Analytics", icon: "layers", tone: "mint" },
    { label: "PMO Governance & RAID Management", icon: "shield", tone: "lilac" },
    { label: "Budget Management, Forecasting & Cost Control", icon: "coins", tone: "butter" },
    { label: "Agile Delivery (Scrum & Kanban)", icon: "refresh", tone: "teal" },
    { label: "Stakeholder & Client Relationship Management", icon: "users", tone: "lilac" },
    { label: "Vendor Management & Cross-Functional Leadership", icon: "network", tone: "mint" },
    { label: "KPI Dashboards & Performance Reporting", icon: "chart", tone: "butter" },
    { label: "UAT, Release & Go-Live", icon: "rocket", tone: "sky" },
  ] as SkillTile[],
  toolsHeading: "Tools",
  skillsHeading: "Skills",
  tools: [
    { id: "jira", name: "Jira", icon: "kanban", tone: "sky", knowledgeLevel: "Professional use", description: "Professional use for sprint, backlog and delivery tracking." },
    { id: "confluence", name: "Confluence", icon: "book", tone: "teal", knowledgeLevel: "Professional use", description: "Professional use for delivery documentation and team collaboration." },
    { id: "azure-devops", name: "Azure DevOps", icon: "pullrequest", tone: "lilac", knowledgeLevel: "Professional use", description: "Professional use for work-item and release tracking." },
    { id: "microsoft-365-google-sheets", name: "Microsoft 365 & Google Sheets", icon: "grid", tone: "peach", knowledgeLevel: "Professional use / Working knowledge", description: "Microsoft 365: professional use of the productivity suite. Google Sheets: working knowledge for tracking and reporting." },
    { id: "python-sql", name: "Python & SQL", icon: "terminal", tone: "butter", knowledgeLevel: "Practical, AI-assisted", description: "Practical knowledge through AI-assisted development (vibe coding)." },
    { id: "github-vs-code", name: "GitHub & VS Code", icon: "github", tone: "lilac", knowledgeLevel: "Practical, AI-assisted", description: "GitHub: practical knowledge through AI-assisted development (vibe coding). VS Code: AI-assisted workflows and development tooling." },
    { id: "streamlit", name: "Streamlit", icon: "linechart", tone: "pink", knowledgeLevel: "Practical, AI-assisted", description: "Practical knowledge through AI-assisted development (vibe coding)." },
    { id: "chatgpt", name: "ChatGPT", icon: "chat", tone: "mint", knowledgeLevel: "AI-assisted workflows", description: "AI-assisted workflows and development tooling." },
    { id: "claude-code", name: "Claude Code", icon: "sparkles", tone: "sky", knowledgeLevel: "AI-assisted workflows", description: "AI-assisted workflows and development tooling." },
  ] as ToolCard[],
};

export const credentials = {
  label: "Credentials",
  title: "Education & Professional Certifications",
  description:
    "Academic qualifications and professional certifications supporting my journey in technology, delivery leadership and digital transformation.",
  instruction:
    "Click on any education folder or certification badge to view the certificate.",
  notice:
    "Certificates are displayed solely for professional verification. Copying, altering or misrepresenting any credential is prohibited.",
  educationHeading: "Education",
  certificationsHeading: "Professional Certifications",
  education: [
    {
      id: "bsc-statistics", qualification: "BSc. in Statistics", institution: "Gujarat University",
      detail: "Ahmedabad, Gujarat, India", dates: "1997–2002",
      pdfUrl: "/documents/education/bsc-statistics-gujarat-university.pdf", tone: "peach",
    },
    {
      id: "pgd-marketing", qualification: "PG Diploma in Marketing Management", institution: "Centennial College",
      detail: "Toronto, Canada", dates: "2010–2011",
      pdfUrl: "/documents/education/pg-diploma-marketing-centennial.pdf", tone: "mint",
    },
    {
      id: "pgp-data-science", qualification: "PGP in Data Science", institution: "Hero Vired",
      detail: "Online", dates: "2025–2026",
      pdfUrl: "/documents/education/pgp-data-science-ai-ml.pdf", tone: "lilac",
      officialQualification: "PGP in Data Science with Specialization in AI & ML",
      officialInstitution: "Hero Vired",
      specialization: "AI & ML",
    },
    {
      id: "executive-diploma-iiitb",
      qualification: "Executive Diploma in Data Science & AI",
      institution: "IIIT Bangalore",
      detail: "",
      dates: "2026",
      pdfUrl: "/documents/education/executive-diploma-data-science-ai-iiitb.pdf",
      tone: "butter",
      officialQualification: "Executive Diploma in Data Science & Artificial Intelligence",
      officialInstitution: "International Institute of Information Technology Bangalore (IIIT-B)",
      specialization: "Business Intelligence & Data Analytics",
    },
  ] as EducationItem[],
  certifications: [
    {
      id: "pmp", displayName: "Project Management Professional (PMP)®", issuer: "Project Management Institute",
      pdfUrl: "/documents/certificates/project-management-professional-pmp.pdf",
      artwork: { type: "image", src: "/images/portfolio-retro/credentials/pmp-badge.png", alt: "Project Management Professional (PMP)® badge" },
    },
    {
      id: "csm", displayName: "Certified ScrumMaster® (CSM®)", issuer: "Scrum Alliance",
      pdfUrl: "/documents/certificates/certified-scrummaster-csm.pdf",
      artwork: { type: "image", src: "/images/portfolio-retro/credentials/csm-badge.png", alt: "Certified ScrumMaster® (CSM®) badge" },
    },
    {
      id: "itil4", displayName: "ITIL® 4 Foundation", issuer: "PeopleCert / AXELOS",
      pdfUrl: "/documents/certificates/itil4-foundation.pdf",
      artwork: { type: "image", src: "/images/portfolio-retro/credentials/itil4-badge.png", alt: "ITIL® 4 Foundation certification badge" },
    },
    {
      id: "odoo19", displayName: "Odoo 19 Functional Certification", issuer: "Odoo Middle East DWC-LLC",
      pdfUrl: "/documents/certificates/odoo-19-functional-certification.pdf",
      artwork: { type: "image", src: "/images/portfolio-retro/credentials/odoo-badge.svg", alt: "Odoo 19 Functional Certification logo" },
    },
  ] as CertificationDisc[],
};

const PROJECT_SUMMARY: Record<string, { summary: string; icon: IconKey }> = {
  "smart-inventory": { summary: "Inventory analytics dashboard tracking stock levels, low-stock and overstock risks.", icon: "chart" },
  "expense-tracker": { summary: "Expense app that categorises spending and shows budget visibility and patterns.", icon: "wallet" },
  "tmdb-sentiment": { summary: "NLP and machine learning app that classifies movie-review sentiment.", icon: "message" },
  "nyc-taxi": { summary: "PySpark analysis of NYC Yellow Taxi data: demand patterns and fare prediction.", icon: "car" },
  "ipl-insights": { summary: "Streamlit and Plotly dashboard on toss strategy, venues and batting performance.", icon: "trophy" },
};

export const projects = {
  label: "Future Lab",
  title: "AI & Analytics Projects",
  description: "Practical projects that apply data, automation and AI to real-world business problems.",
  decoration: asset("decorations/skyline-palms-small.svg"),
  items: PROJECTS_DATA.map((p) => ({
    ...p,
    summary: PROJECT_SUMMARY[p.id]?.summary ?? p.description,
    icon: PROJECT_SUMMARY[p.id]?.icon ?? "chart",
  })) as ProjectCard[],
};

export const resumeSection = {
  ...resume,
  label: "Get My Resume",
  primaryDisk: asset("resume/floppy-teal.svg"),
};

export const contactSection = {
  label: "Let’s Connect",
  title: "Open to Senior Delivery, Program Management & Digital Transformation Opportunities",
  description: "Including international and remote delivery roles.",
  formTitle: "Send a Message",
  scene: asset("decorations/sunset-palms-scene.svg"),
  stickyNote: asset("decorations/sticky-note.svg"),
  // Wording from the mockup, softened to match the repository's stated availability.
  stickyText: "Open to international opportunities",
  ...contact,
};

export const footer = {
  taglines: ["Program Delivery", "Digital Transformation", "AI & Analytics"],
  backToTop: "Back to Top",
  copyright: `© ${new Date().getFullYear()} Amit Kadia. All rights reserved.`,
};

export const decorations = {
  pixelMosaic: asset("hero/pixel-mosaic.svg"),
  sunset: asset("hero/sunset.svg"),
  skyline: asset("hero/skyline.svg"),
  polaroid: asset("hero/polaroid-frame.svg"),
  cassette: asset("hero/cassette.svg"),
  gamepad: asset("decorations/gamepad-icon.svg"),
  washiTape: asset("decorations/washi-tape.svg"),
  sparkle: asset("decorations/sparkle.svg"),
};
