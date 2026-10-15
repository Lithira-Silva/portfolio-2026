import type { Skill } from "@/types/content";
import { projects } from "./projects";

// `logo` is a file in public/media/tech/ (without .svg). `mono` inverts dark logos on the dark theme.
const core: Skill[] = [
  { group: "Languages", name: "TypeScript", logo: "typescript" },
  { group: "Languages", name: "JavaScript", logo: "javascript" },
  { group: "Languages", name: "Java", logo: "java" },
  { group: "Languages", name: "Python", logo: "python" },
  { group: "Languages", name: "C++", logo: "cplusplus" },
  { group: "Languages", name: "Kotlin", logo: "kotlin" },
  { group: "Languages", name: "HTML5", logo: "html5" },
  { group: "Languages", name: "CSS3", logo: "css3" },
  { group: "Front-end", name: "React", logo: "react" },
  { group: "Front-end", name: "Next.js", logo: "nextjs", mono: true },
  { group: "Front-end", name: "Tailwind CSS", logo: "tailwindcss" },
  { group: "Front-end", name: "Vite", logo: "vitejs" },
  { group: "Front-end", name: "Three.js", logo: "threejs", mono: true },
  { group: "Front-end", name: "Framer Motion", logo: "framermotion", mono: true },
  { group: "Front-end", name: "GSAP" },
  { group: "Front-end", name: "Zustand" },
  { group: "Back-end", name: "Node.js", logo: "nodejs" },
  { group: "Back-end", name: "Express.js", logo: "express", mono: true },
  { group: "Back-end", name: "Spring Boot", logo: "spring" },
  { group: "Back-end", name: "Socket.IO", logo: "socketio", mono: true },
  { group: "Back-end", name: "Supabase", logo: "supabase" },
  { group: "Data", name: "MongoDB", logo: "mongodb" },
  { group: "Data", name: "PostgreSQL", logo: "postgresql" },
  { group: "Data", name: "MySQL", logo: "mysql", mono: true },
  { group: "Mobile", name: "Android SDK", logo: "android" },
  { group: "AI", name: "OpenAI and ChatGPT", logo: "openai" },
  { group: "AI", name: "Prompt engineering", note: "Udemy certificate" },
  { group: "Cloud", name: "AWS", logo: "amazonwebservices", mono: true, note: "AWS DevOps certificate" },
  { group: "Cloud", name: "DevOps and CI/CD", note: "AWS DevOps certificate" },
  { group: "Cloud", name: "Docker", logo: "docker" },
  { group: "Cloud", name: "GitHub Actions", logo: "githubactions" },
  { group: "Cloud", name: "Vercel", logo: "vercel", mono: true },
  { group: "Tools", name: "Git", logo: "git" },
  { group: "Tools", name: "GitHub", logo: "github", mono: true },
  { group: "Tools", name: "VS Code", logo: "vscode" },
  { group: "Design", name: "Figma", logo: "figma" },
  { group: "Design", name: "Adobe XD", logo: "xd" },
];

/** Projects whose stack mentions this skill, e.g. "React" matches "React 18". */
const usedIn = (name: string) => {
  const first = name.split(" and ")[0].toLowerCase();
  return projects.filter((p) => p.stack.some((s) => s.toLowerCase().startsWith(first))).map((p) => p.title);
};

export const skills = core.map((s) => ({ ...s, usedIn: usedIn(s.name) }));

export const skillGroups = Array.from(new Set(skills.map((s) => s.group)));

/** Logos only, for the marquee. */
export const logoSkills = skills.filter((s) => s.logo);
