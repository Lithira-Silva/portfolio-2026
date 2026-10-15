import { useRef, useState } from "react";
import { skills } from "@/data/skills";
import type { SkillLevel } from "@/types/content";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/ui/Button";

interface SkillsProps {
  limit?: number;
}

const filters: Array<SkillLevel | "All"> = ["All", "Daily", "Often", "Learning"];

/** Statement, table pushed right. Rows are grouped by space, never lines. */
export function Skills({ limit }: SkillsProps) {
  const root = useRef<HTMLElement>(null);
  const [level, setLevel] = useState<SkillLevel | "All">("All");
  useReveal(root);

  const rows = skills.filter((s) => level === "All" || s.level === level).slice(0, limit);

  return (
    <section ref={root} id="skills" className="skills wrap" aria-labelledby="skills-title">
      <h2 id="skills-title" className="skills__title head" data-split>
        Tools for
        <br />
        strong currents
      </h2>

      <div className="skills__body">
        <figure className="skills__figure" data-reveal>
          <img
            src="/media/prints/zeshin-carp.jpg"
            alt="Woodblock print of a carp splashing upstream, by Shibata Zeshin"
            width={1600}
            height={1198}
            loading="lazy"
          />
        </figure>

        <div className="skills__table">
          {!limit && (
            <div className="skills__filters" role="group" aria-label="Filter by how often I use it" data-reveal>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`chip ${level === f ? "is-on" : ""}`}
                  aria-pressed={level === f}
                  onClick={() => setLevel(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
          <p className="skills__label">Stack</p>
          <ul>
            {rows.map((s, i) => (
              <li
                key={s.name}
                className={`skills__row ${i > 0 && rows[i - 1].group !== s.group ? "is-group" : ""}`}
                data-reveal
              >
                <span className="muted">{s.group}</span>
                <span className="skills__name">{s.name}</span>
                <span className="skills__level tabular">
                  {s.level} · {s.years} {s.years === 1 ? "yr" : "yrs"}
                </span>
              </li>
            ))}
          </ul>
          {limit && (
            <div className="skills__more" data-reveal>
              <ArrowLink to="/skills">All {skills.length} skills</ArrowLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
