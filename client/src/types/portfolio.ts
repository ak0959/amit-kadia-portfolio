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
