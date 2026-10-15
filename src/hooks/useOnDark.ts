import { useLocation } from "react-router-dom";
import type { RefObject } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Toggles `on-dark` on a fixed/sticky element while any `[data-ground="dark"]`
 * section passes under the line `y` pixels from the top of the viewport.
 * Keeps type legible without blend modes.
 */
export function useOnDark(target: RefObject<HTMLElement>, y: () => number) {
  const { pathname } = useLocation();
  useGSAP(
    () => {
      const el = target.current;
      if (!el) return;
      const sections = document.querySelectorAll<HTMLElement>('[data-ground="dark"]');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: () => `top ${y()}px`,
          end: () => `bottom ${y()}px`,
          toggleClass: { targets: el, className: "on-dark" },
          invalidateOnRefresh: true,
        });
      });
      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );
}
