import { useRef, type ReactNode, type PointerEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/hooks/useReveal";

interface SectionProps {
  id: string;
  /** One or two kanji set vertically in the panel's corner. */
  kanji: string;
  kanjiMeaning: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * A framed panel: its own border, radius, padding and margin, a spotlight that
 * follows the pointer, and an entrance that lifts the whole panel into place.
 */
export function Section({ id, kanji, kanjiMeaning, title, intro, aside, className = "", children }: SectionProps) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        // Clip, never transform: a moved panel would throw off every trigger measured inside it.
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0% 4% 0% 4% round 48px)", opacity: 0.5 },
          {
            clipPath: "inset(0% 0% 0% 0% round 32px)",
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 60%", scrub: 0.5 },
          },
        );
        gsap.from(".shell__kanji", {
          yPercent: 40,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={root} id={id} className={`shell ${className}`} aria-labelledby={`${id}-title`} onPointerMove={onMove}>
      <span className="shell__kanji" aria-hidden="true" title={kanjiMeaning}>
        {kanji}
      </span>
      <header className="shell__head">
        <h2 id={`${id}-title`} className="shell__title head" data-split>
          {title}
        </h2>
        {(intro || aside) && (
          <div className="shell__side" data-reveal>
            {intro && <p className="shell__intro">{intro}</p>}
            {aside}
          </div>
        )}
      </header>
      {children}
    </section>
  );
}
