import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Certificates } from "@/sections/Certificates";
import { Contact } from "@/sections/Contact";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function HomePage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <About />
      <Projects featuredOnly />
      <Skills limit={8} />
      <Certificates />
      <Contact />
    </>
  );
}
