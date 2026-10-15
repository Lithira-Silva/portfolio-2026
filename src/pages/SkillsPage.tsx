import { PageTitle } from "@/components/layout/PageTitle";
import { Skills } from "@/sections/Skills";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function SkillsPage() {
  usePageTitle("Skills");
  return (
    <>
      <PageTitle title="Skills" intro="What I use every day, what I use often, and what I am learning right now." />
      <Skills />
    </>
  );
}
