import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import KoiPond from "@/components/three/KoiPond";

interface PageTitleProps {
  title: string;
  intro: ReactNode;
}

/** Sub-page header: the page's word set as a monument over a quiet pond. */
export function PageTitle({ title, intro }: PageTitleProps) {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ptitle__word", { yPercent: 100, duration: 1.2, ease: "expo.out", delay: 0.35 });
        gsap.from(".ptitle__intro", { y: 24, opacity: 0, duration: 0.9, delay: 0.6 });
        gsap.to(".ptitle__word", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      gsap.to(progress, {
        current: 0.6,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <header ref={root} className="ptitle" data-ground="dark">
      <KoiPond className="ptitle__pond" count={5} depth={() => progress.current} />
      <p className="ptitle__intro lead">{intro}</p>
      <div className="ptitle__crop">
        <h1 className="ptitle__word display">{title}</h1>
      </div>
    </header>
  );
}
