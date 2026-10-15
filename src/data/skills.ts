import type { Skill } from "@/types/content";
import { projects } from "./projects";

// `logo` is a file in public/media/tech/ (without .svg). `color` is the brand colour used for the tile's glow.
const core: Skill[] = [
  { group: "Languages", name: "TypeScript", logo: "typescript", color: "#3178C6" },
  { group: "Languages", name: "JavaScript", logo: "javascript", color: "#F7DF1E" },
  { group: "Languages", name: "Java", logo: "java", color: "#E76F00" },
  { group: "Languages", name: "Python", logo: "python", color: "#3776AB" },
  { group: "Languages", name: "C++", logo: "cplusplus", color: "#659AD2" },
  { group: "Languages", name: "Kotlin", logo: "kotlin", color: "#7F52FF" },
  { group: "Languages", name: "HTML5", logo: "html5", color: "#E34F26" },
  { group: "Languages", name: "CSS3", logo: "css3", color: "#1572B6" },
  { group: "Front-end", name: "React", logo: "react", color: "#61DAFB" },
  { group: "Front-end", name: "Next.js", logo: "si-nextdotjs", color: "#FFFFFF" },
  { group: "Front-end", name: "Tailwind CSS", logo: "tailwindcss", color: "#38BDF8" },
  { group: "Front-end", name: "Vite", logo: "vitejs", color: "#BD34FE" },
  { group: "Front-end", name: "Three.js", logo: "si-threedotjs", color: "#FFFFFF" },
  { group: "Front-end", name: "Framer Motion", logo: "si-framer", color: "#0055FF" },
  { group: "Front-end", name: "GSAP", logo: "custom-gsap", color: "#88CE02" },
  { group: "Front-end", name: "Zustand", logo: "custom-zustand", color: "#C9A16B" },
  { group: "Back-end", name: "Node.js", logo: "nodejs", color: "#5FA04E" },
  { group: "Back-end", name: "Express.js", logo: "si-express", color: "#FFFFFF" },
  { group: "Back-end", name: "Spring Boot", logo: "spring", color: "#6DB33F" },
  { group: "Back-end", name: "Socket.IO", logo: "si-socketdotio", color: "#FFFFFF" },
  { group: "Back-end", name: "Supabase", logo: "supabase", color: "#3ECF8E" },
  { group: "Data", name: "MongoDB", logo: "mongodb", color: "#47A248" },
  { group: "Data", name: "PostgreSQL", logo: "postgresql", color: "#4169E1" },
  { group: "Data", name: "MySQL", logo: "si-mysql", color: "#4479A1" },
  { group: "Mobile", name: "Android SDK", logo: "android", color: "#3DDC84" },
  { group: "AI", name: "OpenAI and ChatGPT", logo: "si-openai", color: "#10A37F" },
  { group: "AI", name: "Prompt engineering", logo: "custom-prompt", color: "#B48CFF", note: "Udemy certificate" },
  { group: "Cloud", name: "AWS", logo: "si-amazonwebservices", color: "#FF9900", note: "AWS DevOps certificate" },
  { group: "Cloud", name: "DevOps and CI/CD", logo: "custom-devops", color: "#3CC7B4", note: "AWS DevOps certificate" },
  { group: "Cloud", name: "Docker", logo: "docker", color: "#2496ED" },
  { group: "Cloud", name: "GitHub Actions", logo: "githubactions", color: "#2088FF" },
  { group: "Cloud", name: "Vercel", logo: "si-vercel", color: "#FFFFFF" },
  { group: "Tools", name: "Git", logo: "git", color: "#F05032" },
  { group: "Tools", name: "GitHub", logo: "si-github", color: "#FFFFFF" },
  { group: "Tools", name: "VS Code", logo: "vscode", color: "#007ACC" },
  { group: "Design", name: "Figma", logo: "figma", color: "#F24E1E" },
  { group: "Design", name: "Adobe XD", logo: "xd", color: "#FF61F6" },
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
