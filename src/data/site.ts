import type { Site } from "@/types/content";

// SAMPLE CONTENT — replace every value with your own before launch (docs/CONTENT.md).
export const site: Site = {
  name: "Lithira",
  nameSplit: ["LITH", "IRA"],
  role: "Full-stack developer",
  intro: "I build fast, careful web products, from the database schema to the last frame of motion.",
  location: "Colombo, Sri Lanka",
  timezone: "UTC+5:30",
  email: "hello@lithira.dev",
  phone: "+94 70 000 0000",
  availability: "Open to freelance and full-time roles",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://lithira.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],
};

export const facts = [
  { label: "Based in", value: site.location },
  { label: "Writing code", value: "Since 2019" },
  { label: "Working hours", value: `${site.timezone}, flexible` },
];

export const story =
  "I started by taking apart other people's websites to see how the motion worked. Now I build the whole thing: typed APIs, Postgres schemas that age well, interfaces that load in under a second and move like they mean it. I care about the parts nobody sees and the parts everybody feels.";

/** The three chapters of the climb, shown in the pinned hero story. */
export const climb = [
  {
    title: "The pond",
    text: "Every koi starts in still water. Mine was a school computer lab and a view-source button.",
  },
  {
    title: "The falls",
    text: "The legend says a carp that swims up the waterfall becomes a dragon. Shipping software feels the same: the current never stops, you keep swimming.",
    image: "/media/prints/gakutei-red-carp.jpg",
    alt: "Woodblock print of a red carp climbing a waterfall, by Yashima Gakutei",
  },
  {
    title: "The climb",
    text: "Six years, thirty-odd launches, one rule: make it fast, make it clear, make it move with purpose.",
    image: "/media/prints/hokusai-two-carp.jpg",
    alt: "Hokusai print of two carp swimming in a cascade",
  },
];
