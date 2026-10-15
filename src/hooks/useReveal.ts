import type { RefObject } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Section entrances. Inside `scope`:
 * - `[data-split]` headings rise line by line from a mask.
 * - `[data-reveal]` parts rise 24px and fade in, staggered 70ms, once.
 * Content is visible in CSS; the hidden state is only set by script.
 */
export function useReveal(scope: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)", ok: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const reduce = Boolean(ctx.conditions?.reduce);

          if (!reduce) {
            gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
              SplitText.create(el, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1,
                    ease: "expo.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: el, start: "top 88%", once: true },
                  }),
              });
            });
          }

          const parts = gsap.utils.toArray<HTMLElement>("[data-reveal]");
          if (!parts.length) return;
          gsap.set(parts, { opacity: 0, y: reduce ? 0 : 24 });
          ScrollTrigger.batch(parts, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, overwrite: true }),
          });
        },
      );
    },
    { scope },
  );
}
