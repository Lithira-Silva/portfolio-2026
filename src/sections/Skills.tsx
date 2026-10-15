import { useRef, useState } from "react";
import { skills, skillGroups } from "@/data/skills";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/ui/Button";

interface SkillsProps {
  limit?: number;
}

const filters = ["All", ...skillGroups];

/** Statement, table pushed right. Rows are grouped by space, never lines. */
export function Skills({ limit }: SkillsProps) {
  const root = useRef<HTMLElement>(null);
  const [group, setGroup] = useState("All");
  useReveal(root);

  const rows = skills.filter((s) => group === "All" || s.group === group).slice(0, limit);

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
            <div className="skills__filters" role="group" aria-label="Filter by area" data-reveal>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`chip ${group === f ? "is-on" : ""}`}
                  aria-pressed={group === f}
                  onClick={() => setGroup(f)}
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
                <span className="skills__level">{s.usedIn?.length ? `In ${s.usedIn.join(", ")}` : s.note ?? ""}</span>
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
