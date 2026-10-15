import type { PointerEvent } from "react";
import { gsap } from "@/lib/gsap";

const fine = () => window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

/**
 * 3D tilt toward the pointer, with a glare position in CSS vars (--gx, --gy).
 * Spread the returned handlers onto the element.
 */
export function useTilt(max = 10) {
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(el, {
      rotateY: (px - 0.5) * max,
      rotateX: (0.5 - py) * max,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power3.out",
    });
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const onPointerLeave = (e: PointerEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
  };
  return { onPointerMove, onPointerLeave };
}
