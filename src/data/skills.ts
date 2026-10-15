import type { Skill } from "@/types/content";
import { projects } from "./projects";

const core: Skill[] = [
  { group: "Languages", name: "TypeScript" },
  { group: "Languages", name: "JavaScript" },
  { group: "Languages", name: "Java" },
  { group: "Languages", name: "Python" },
  { group: "Languages", name: "C++" },
  { group: "Languages", name: "Kotlin" },
  { group: "Languages", name: "HTML5 and CSS3" },
  { group: "Front-end", name: "React" },
  { group: "Front-end", name: "Next.js" },
  { group: "Front-end", name: "Tailwind CSS" },
  { group: "Front-end", name: "Vite" },
  { group: "Front-end", name: "Three.js" },
  { group: "Front-end", name: "GSAP and Framer Motion" },
  { group: "Front-end", name: "Zustand" },
  { group: "Back-end", name: "Node.js" },
  { group: "Back-end", name: "Express.js" },
  { group: "Back-end", name: "Spring Boot and Spring Security" },
  { group: "Back-end", name: "Socket.IO" },
  { group: "Back-end", name: "Supabase" },
  { group: "Data", name: "MongoDB and Mongoose" },
  { group: "Data", name: "PostgreSQL" },
  { group: "Data", name: "MySQL" },
  { group: "Mobile", name: "Android SDK" },
  { group: "AI", name: "OpenAI and ChatGPT APIs" },
  { group: "AI", name: "Prompt engineering", note: "Udemy certificate" },
  { group: "Cloud", name: "AWS", note: "AWS DevOps certificate" },
  { group: "Cloud", name: "DevOps and CI/CD", note: "AWS DevOps certificate" },
  { group: "Cloud", name: "Docker" },
  { group: "Cloud", name: "GitHub Actions" },
  { group: "Cloud", name: "Vercel" },
  { group: "Tools", name: "Git and GitHub" },
  { group: "Tools", name: "VS Code" },
  { group: "Design", name: "Figma" },
  { group: "Design", name: "Adobe XD" },
];

/** Projects whose stack mentions this skill, e.g. "React" matches "React 18". */
const usedIn = (name: string) => {
  const first = name.split(" and ")[0].toLowerCase();
  return projects.filter((p) => p.stack.some((s) => s.toLowerCase().startsWith(first))).map((p) => p.title);
};

export const skills = core.map((s) => ({ ...s, usedIn: usedIn(s.name) }));

export const skillGroups = Array.from(new Set(skills.map((s) => s.group)));
