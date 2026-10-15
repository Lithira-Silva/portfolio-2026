import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site, climb } from "@/data/site";
import KoiPond from "@/components/three/KoiPond";
import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/hooks/useLenis";
import { onBooted } from "@/lib/boot";

const chapterKanji = ["流", "滝", "龍"];

/**
 * The pinned story. The name is split to two corners and holds there for three
 * screens while the pond, the falls and the climb pass between the halves.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const depth = useRef(0);
  const [first, second] = site.nameSplit;

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
        // Hold the entrance until the preloader has handed over.
        const intro = gsap.timeline({ paused: true });
        intro
          .from(".pond-cover", { opacity: 1, duration: 1.6, ease: "power2.inOut" })
          .from(".corner--tl .corner__in", { yPercent: 105, duration: 1.4, ease: "expo.out" }, 0.3)
          .from(".corner--br .corner__in", { yPercent: -105, duration: 1.4, ease: "expo.out" }, 0.45)
          .from(".hero__intro > *", { y: 32, opacity: 0, stagger: 0.1, duration: 1 }, 0.8)
          .from(".hero__foot > *", { opacity: 0, y: 12, stagger: 0.1, duration: 0.8 }, 1.2);
        const off = onBooted(() => intro.play());

        gsap.to(".hero__intro", {
          yPercent: -40,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".panel--pond", start: "top top", end: "60% top", scrub: true },
        });

        gsap.utils.toArray<HTMLElement>(".panel--chapter").forEach((panel) => {
          const img = panel.querySelector(".chapter__img");
          const frame = panel.querySelector(".chapter__frame");
          if (img && frame) {
            gsap.fromTo(
              img,
              { yPercent: -10, scale: 1.2 },
              {
                yPercent: 10,
                scale: 1.04,
                ease: "none",
                scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
            gsap.from(frame, {
              clipPath: "inset(100% 0% 0% 0% round 28px)",
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: { trigger: panel, start: "top 65%", once: true },
            });
          }
          gsap.from(panel.querySelectorAll(".chapter__text > *"), {
            y: 36,
            opacity: 0,
            stagger: 0.09,
            duration: 1,
            scrollTrigger: { trigger: panel, start: "top 55%", once: true },
          });
          gsap.fromTo(
            panel.querySelector(".chapter__kanji"),
            { yPercent: 30 },
            {
              yPercent: -30,
              ease: "none",
              scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.to(".climb__meter-fill", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: true },
        });
        return off;
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
          <span className="corner corner--tl display" aria-hidden="true">
            <span className="corner__in">{first}</span>
          </span>
          <span className="corner corner--br display" aria-hidden="true">
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
          <p className="hero__status small">
            <span className="pulse" aria-hidden="true" />
            {site.availability}
          </p>
          <p className="hero__lead">{site.intro}</p>
          <div className="hero__actions">
            <Button
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("work");
              }}
            >
              See the work
            </Button>
            <Button to="/contact" tone="ghost">
              Get in touch
            </Button>
          </div>
        </div>
        <div className="hero__foot small">
          <span>Tap the water to feed the koi</span>
          <span className="hero__scroll">
            Scroll to dive <span className="hero__scroll-line" aria-hidden="true" />
          </span>
        </div>
      </div>

      {climb.slice(1).map((c, i) => (
        <div key={c.title} className={`panel panel--chapter chapter chapter--${i % 2 ? "left" : "right"}`}>
          <span className="chapter__kanji" aria-hidden="true">
            {chapterKanji[i + 1]}
          </span>
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
