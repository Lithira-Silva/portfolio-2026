import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/ui/Button";

interface ProjectsProps {
  featuredOnly?: boolean;
  showTitle?: boolean;
}

/** Loose scatter with pauses: one project at a time, each at its own width and side. */
export function Projects({ featuredOnly = false, showTitle = true }: ProjectsProps) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const list = featuredOnly ? projects.filter((p) => p.featured) : projects;

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".work__item").forEach((item) => {
          const img = item.querySelector("img");
          gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
          gsap.from(item.querySelector(".work__frame"), {
            clipPath: "inset(12% 12% 12% 12%)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="work wrap" aria-labelledby="work-title">
      <h2 id="work-title" className={showTitle ? "work__title head" : "sr-only"} data-split={showTitle || undefined}>
        Work
      </h2>
      <ol className="work__list">
        {list.map((p, i) => (
          <Fragment key={p.slug}>
          <li className={`work__item work__item--${i % 3}`}>
            <p className="work__name small muted" data-reveal>
              {p.title} · {p.year}
              {p.status && ` · ${p.status}`}
            </p>
            <a
              className="work__frame"
              href={p.live ?? p.repo ?? "#work"}
              target={p.live || p.repo ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={`${p.title}: open project`}
              style={{ aspectRatio: p.ratio }}
            >
              <span className="work__zoom">
                <img src={p.image} alt={p.alt} width={1600} height={1066} loading="lazy" />
              </span>
            </a>
            <div className="work__meta" data-reveal>
              <p>{p.summary}</p>
              <p className="small muted">
                {p.role}
                {p.stack.length > 0 && ` · ${p.stack.join(", ")}`}
              </p>
              <p className="work__links small">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer">
                    Live site
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    Source
                  </a>
                )}
              </p>
            </div>
          </li>
          {i === 1 && (
            <li className="work__remark lead" data-reveal>
              I learn by building: each project here pushed me into a new part of the stack.
            </li>
          )}
          </Fragment>
        ))}
      </ol>
      {featuredOnly && (
        <div className="work__more" data-reveal>
          <ArrowLink to="/projects">Project details</ArrowLink>
        </div>
      )}
    </section>
  );
}
