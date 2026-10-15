import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Seconds the first-load intro takes; the hero waits this long before its own entrance. */
export const PRELOAD_SECONDS = 2.1;

let played = false;
export const preloaderPlayed = () => played;

/** First visit only: the koi kanji is drawn, a counter fills, the water parts. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(played);

  useGSAP(
    () => {
      if (played) return;
      played = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDone(true);
        return;
      }
      const n = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => setDone(true) });
      tl.from(".pre__kanji", { yPercent: 30, opacity: 0, duration: 0.9, ease: "expo.out" })
        .to(n, {
          v: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
          },
        }, 0.1)
        .to(".pre__bar-fill", { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.1)
        .to(".pre__inner", { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" }, 1.35)
        .to(".pre__half--top", { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, 1.45)
        .to(".pre__half--bottom", { yPercent: 100, duration: 0.8, ease: "expo.inOut" }, 1.45);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="pre" aria-hidden="true">
      <div className="pre__half pre__half--top" />
      <div className="pre__half pre__half--bottom" />
      <div className="pre__inner">
        <span className="pre__kanji">鯉</span>
        <div className="pre__bar">
          <span className="pre__bar-fill" />
        </div>
        <span className="pre__count tabular" ref={count}>
          000
        </span>
      </div>
    </div>
  );
}
