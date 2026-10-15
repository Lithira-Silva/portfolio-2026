export type Ratio = "3/2" | "4/5" | "16/9";

export interface Social {
  label: string;
  href: string;
}

export interface Site {
  name: string;
  nameSplit: [string, string];
  role: string;
  intro: string;
  location: string;
  timezone: string;
  email: string;
  phone?: string;
  availability: string;
  resumeUrl?: string;
  siteUrl: string;
  socials: Social[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  year: number;
  role: string;
  stack: string[];
  image: string;
  alt: string;
  ratio: Ratio;
  live?: string;
  repo?: string;
  featured?: boolean;
}

export type SkillLevel = "Daily" | "Often" | "Learning";

export interface Skill {
  group: string;
  name: string;
  level: SkillLevel;
  years: number;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  id?: string;
  url?: string;
}

export interface RecordLine {
  name: string;
  detail: string;
  year: string;
}
