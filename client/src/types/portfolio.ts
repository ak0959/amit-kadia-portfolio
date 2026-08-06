export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  bullets: string[];
  accentColor?: string;
  groupedRoles?: { role: string; company: string; period: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  accentClass: string;
  projectUrl?: string;
  githubUrl?: string;
  statusText?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  items: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  provider: string;
  image: string;
  pdfUrl: string;
  description?: string;
  accentColor?: string;
}

export interface AboutCardItem {
  title: string;
  desc: string;
  accentColor?: string;
}
