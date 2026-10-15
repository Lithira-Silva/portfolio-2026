import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onBooted } from "@/lib/boot";

let instance: Lenis | null = null;

/** The shared Lenis instance, or null before mount / under reduced motion. */
export const getLenis = () => instance;

/** One smooth-scroll instance for the app, driven by the GSAP ticker. Held still until the intro ends. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenis.stop();
    const off = onBooted(() => {
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
      ScrollTrigger.refresh();
    });

    return () => {
      off();
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);
}

export function scrollToTop() {
  if (instance) instance.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

/** Smooth-scroll to an in-page section, leaving room for the nav bar. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { duration: 1.4, offset: -16 });
  else el.scrollIntoView({ behavior: "smooth" });
}
