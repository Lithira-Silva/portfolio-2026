import { PageTitle } from "@/components/layout/PageTitle";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function AboutPage() {
  usePageTitle("About");
  return (
    <>
      <PageTitle title="About" intro="IT student at SLIIT and full-stack developer, always learning the next thing." />
      <About full />
      <Skills compact />
    </>
  );
}
