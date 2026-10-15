import { PageTitle } from "@/components/layout/PageTitle";
import { Projects } from "@/sections/Projects";
import { usePageTitle } from "@/hooks/usePageTitle";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  usePageTitle("Projects");
  return (
    <>
      <PageTitle title="Projects" intro={`${projects.length} projects, from a live fitness site to an AI task manager in progress.`} />
      <Projects />
    </>
  );
}
