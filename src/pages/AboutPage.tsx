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
      <figure className="plate wrap">
        <img
          src="/media/prints/hokkei-giant-carp.jpg"
          alt="Woodblock print by Totoya Hokkei of a boy riding a giant carp through swirling water"
          width={1920}
          height={1108}
          loading="lazy"
        />
        <figcaption className="small muted">
          Totoya Hokkei, Oniwakamaru and the giant carp, around 1830. The Met, public domain.
        </figcaption>
      </figure>
      <Skills limit={10} />
    </>
  );
}
