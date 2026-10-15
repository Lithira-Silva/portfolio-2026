import type { Project } from "@/types/content";

// Images are placeholders: replace with real screenshots in public/media/work/.
// Add `live` and `repo` URLs when you have them.
export const projects: Project[] = [
  {
    slug: "construction-platform",
    title: "Construction Bidding Platform",
    summary:
      "Construction management platform with advanced bidding systems and automated project oversight.",
    year: 2025,
    role: "Full-stack",
    stack: [],
    image: "/media/work/water-637.jpg",
    alt: "Metal ladder at the edge of a wooden dock over still water at dusk",
    ratio: "3/2",
    featured: true,
  },
  {
    slug: "fitgeek",
    title: "FitGeek",
    summary:
      "Premium fitness and wellness website for gym centres: services, membership packages, trainer profiles and an integrated contact system.",
    year: 2025,
    role: "Front-end",
    status: "Live",
    stack: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "EmailJS", "React Router"],
    image: "/media/work/fitgeek.jpg",
    screenshot: "1905 / 900",
    alt: "FitGeek home page: hero headline Transform Your Wellness Journey beside a photo of a woman training on a mat",
    ratio: "4/5",
    featured: true,
  },
  {
    slug: "nexto",
    title: "NexTo",
    summary:
      "AI-powered task manager with natural-language parsing, priority detection and personal productivity insights.",
    year: 2025,
    role: "Full-stack",
    status: "In progress",
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Zustand", "Supabase", "PostgreSQL"],
    image: "/media/work/water-124.jpg",
    alt: "Small red boat on clear turquoise water, seen from above",
    ratio: "16/9",
    featured: true,
  },
];
