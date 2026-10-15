import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, climb } from "@/data/site";
import KoiPond from "@/components/three/KoiPond";
import { Button } from "@/components/ui/Button";
import { useOnDark } from "@/hooks/useOnDark";
import { scrollToId } from "@/hooks/useLenis";

/**
 * The pinned story. The name is split to two corners and holds there for three
 * screens while the pond, the falls and the climb pass between the halves.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<HTMLSpanElement>(null);
  const br = useRef<HTMLSpanElement>(null);
  const depth = useRef(0);
  const [first, second] = site.nameSplit;

  useOnDark(tl, () => 48);
  useOnDark(br, () => window.innerHeight - 48);

  useGSAP(
    () => {
      // Dive into the pond as its panel scrolls away.
      gsap.to(depth, {
        current: 1,
        ease: "none",
        scrollTrigger: { trigger: ".panel--pond", start: "top top", end: "bottom top", scrub: 0.6 },
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Entrance: the halves slide in from their corners, then the sentence.
        const intro = gsap.timeline({ delay: 0.2 });
        intro
          .from(".pond-cover", { opacity: 1, duration: 1.4, ease: "power2.inOut" })
          .from(".corner--tl .corner__in", { yPercent: 105, duration: 1.3, ease: "expo.out" }, 0.35)
          .from(".corner--br .corner__in", { yPercent: -105, duration: 1.3, ease: "expo.out" }, 0.5)
          .from(".hero__intro > *", { y: 28, opacity: 0, stagger: 0.09, duration: 0.9 }, 0.9)
          .from(".hero__hint", { opacity: 0, duration: 0.8 }, 1.4);

        // The intro lifts and fades as the dive begins.
        gsap.to(".hero__intro", {
          yPercent: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".panel--pond", start: "top top", end: "60% top", scrub: true },
        });

        // Each chapter: the print rises and settles, the words follow.
        gsap.utils.toArray<HTMLElement>(".panel--chapter").forEach((panel) => {
          const img = panel.querySelector(".chapter__img");
          const frame = panel.querySelector(".chapter__frame");
          if (img && frame) {
            gsap.fromTo(
              img,
              { yPercent: -10, scale: 1.18 },
              {
                yPercent: 10,
                scale: 1.02,
                ease: "none",
                scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
            gsap.from(frame, {
              clipPath: "inset(100% 0% 0% 0%)",
              duration: 1.3,
              ease: "expo.out",
              scrollTrigger: { trigger: panel, start: "top 65%", once: true },
            });
          }
          gsap.from(panel.querySelectorAll(".chapter__text > *"), {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.9,
            scrollTrigger: { trigger: panel, start: "top 55%", once: true },
          });
        });

        // The chapter counter climbs with the scroll.
        gsap.to(".climb__meter-fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="climb" aria-label="Introduction">
      <div className="climb__track">
      <div className="climb__pin">
        <h1 className="sr-only">
          {site.name}, {site.role}
        </h1>
        <span ref={tl} className="corner corner--tl display" aria-hidden="true">
          <span className="corner__in">{first}</span>
        </span>
        <span ref={br} className="corner corner--br display" aria-hidden="true">
          <span className="corner__in">{second}</span>
        </span>
        <div className="climb__meter" aria-hidden="true">
          <span className="climb__meter-fill" />
        </div>
      </div>
      </div>

      <div className="panel panel--pond" data-ground="dark">
        <KoiPond className="pond" depth={() => depth.current} />
        <div className="pond-cover" aria-hidden="true" />
        <div className="hero__intro">
          <p className="lead">{site.intro}</p>
          <Button
            href="#work"
            tone="light"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("work");
            }}
          >
            See the work
          </Button>
        </div>
        <p className="hero__hint small">Tap the water to feed the koi</p>
      </div>

      {climb.slice(1).map((c, i) => (
        <div key={c.title} className={`panel panel--chapter chapter chapter--${i % 2 ? "left" : "right"}`}>
          <div className="chapter__text">
            <h2 className="head">{c.title}</h2>
            <p className="lead">{c.text}</p>
          </div>
          {c.image && (
            <figure className="chapter__frame">
              <img className="chapter__img" src={c.image} alt={c.alt} width={1200} height={1300} loading="lazy" />
            </figure>
          )}
        </div>
      ))}
    </section>
  );
}
