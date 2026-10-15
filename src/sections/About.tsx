import { useRef } from "react";
import { facts, story } from "@/data/site";
import { experience, education } from "@/data/experience";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/ui/Button";

interface AboutProps {
  full?: boolean;
}

/** Side facts, wide paragraph; then the record in two lists. */
export function About({ full = false }: AboutProps) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="about" className="about wrap" aria-labelledby="about-title">
      <h2 id="about-title" className="sr-only">
        About
      </h2>
      <div className="about__row">
        <dl className="about__facts">
          {facts.map((f) => (
            <div key={f.label} data-reveal>
              <dt className="muted">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="about__body">
          <p className="about__story" data-split>
            {story}
          </p>
          {!full && (
            <div data-reveal>
              <ArrowLink to="/about">More about me</ArrowLink>
            </div>
          )}
        </div>
      </div>

      <div className="about__row about__row--record">
        <h3 className="about__label">Record</h3>
        <div className="about__lists">
          <ul className="record" data-reveal>
            {experience.map((r) => (
              <li key={r.name}>
                <span>
                  {r.name} <span className="muted">· {r.detail}</span>
                </span>
                <span className="muted tabular">{r.year}</span>
              </li>
            ))}
          </ul>
          <ul className="record" data-reveal>
            {education.map((r) => (
              <li key={r.name}>
                <span>
                  {r.name} <span className="muted">· {r.detail}</span>
                </span>
                <span className="muted tabular">{r.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
