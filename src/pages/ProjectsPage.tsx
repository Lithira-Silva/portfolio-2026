import { PageTitle } from "@/components/layout/PageTitle";
import { Projects } from "@/sections/Projects";
import { usePageTitle } from "@/hooks/usePageTitle";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  usePageTitle("Projects");
  return (
    <>
      <PageTitle title="Projects" intro={`${projects.length} things I designed, built and shipped, newest first.`} />
      <Projects showTitle={false} />
    </>
  );
}
