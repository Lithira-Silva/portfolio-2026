import { PageTitle } from "@/components/layout/PageTitle";
import { Skills } from "@/sections/Skills";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function SkillsPage() {
  usePageTitle("Skills");
  return (
    <>
      <PageTitle title="Skills" intro="The languages, frameworks and tools I build with." />
      <Skills withTable />
    </>
  );
}
