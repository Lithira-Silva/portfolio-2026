import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { ArrowLink } from "@/components/ui/Button";

interface ProjectsProps {
  featuredOnly?: boolean;
}

/** Find a logo for a stack entry such as "React 18" or "Next.js 14". */
const logoFor = (entry: string) =>
  skills.find((s) => s.logo && entry.toLowerCase().startsWith(s.name.split(" ")[0].toLowerCase()));

/** Stacking cards: each project pins under the next, shrinking back as it is covered. */
export function Projects({ featuredOnly = false }: ProjectsProps) {
  const list = featuredOnly ? projects.filter((p) => p.featured) : projects;
  const stack = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference) and (min-width: 761px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card");
        cards.forEach((card, i) => {
          const inner = card.querySelector(".work-card__inner");
          if (i === cards.length - 1 || !inner) return;
          gsap.to(inner, {
            scale: 0.92,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 20%", scrub: true },
          });
        });
        cards.forEach((card) => {
          const img = card.querySelector(".browser__shot:not(.is-shot) img");
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: stack },
  );

  return (
    <Section
      id="work"
      kanji="作品"
      kanjiMeaning="sakuhin: works"
      title="Selected work"
      intro="I learn by building: each project here pushed me into a new part of the stack."
      aside={featuredOnly ? <ArrowLink to="/projects">All project details</ArrowLink> : undefined}
    >
      <ol ref={stack} className="work-stack">
        {list.map((p, i) => (
          <li key={p.slug} className="work-card" style={{ top: `calc(var(--nav-h) + ${i * 22}px)` }}>
            <article className="work-card__inner">
              <div className="work-card__info">
                <p className="work-card__meta small">
                  <span className="tabular">{String(p.year)}</span>
                  <span>{p.role}</span>
                  {p.status && (
                    <span className={`status status--${p.status === "Live" ? "live" : "wip"}`}>{p.status}</span>
                  )}
                </p>
                <h3 className="work-card__title display">{p.title}</h3>
                <p className="work-card__summary">{p.summary}</p>
                {p.stack.length > 0 && (
                  <ul className="stack-chips" aria-label="Built with">
                    {p.stack.map((s) => {
                      const logo = logoFor(s);
                      return (
                        <li key={s} className="stack-chip small">
                          {logo && (
                            <img
                              src={`/media/tech/${logo.logo}.svg`}
                              alt=""
                              width={16}
                              height={16}
                              loading="lazy"
                            />
                          )}
                          {s}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <p className="work-card__links">
                  {p.live && (
                    <ArrowLink href={p.live} target="_blank" rel="noreferrer">
                      Live site
                    </ArrowLink>
                  )}
                  {p.repo && (
                    <ArrowLink href={p.repo} target="_blank" rel="noreferrer">
                      Source code
                    </ArrowLink>
                  )}
                  {!p.live && !p.repo && <span className="small muted">Links coming soon</span>}
                </p>
              </div>

              <div className="browser" data-cursor="View">
                <div className="browser__bar" aria-hidden="true">
                  <span className="browser__dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="browser__url small">{p.live ? p.live.replace(/^https?:[/][/]/, "") : `${p.slug}.app`}</span>
                </div>
                <div
                  className={`browser__shot ${p.screenshot ? "is-shot" : ""}`}
                  style={p.screenshot ? { aspectRatio: p.screenshot } : undefined}
                >
                  <img src={p.image} alt={p.alt} width={1600} height={1000} loading="lazy" />
                  <span className="browser__index display" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
