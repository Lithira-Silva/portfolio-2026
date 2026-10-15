import type { CSSProperties } from "react";
import { skills, skillGroups, logoSkills } from "@/data/skills";
import type { Skill } from "@/types/content";
import { Section } from "@/components/ui/Section";
import { Marquee } from "@/components/ui/Marquee";
import { ArrowLink } from "@/components/ui/Button";
import { useTilt } from "@/hooks/useTilt";

interface SkillsProps {
  /** Show the "where it is used" table under the toolbox. */
  withTable?: boolean;
  compact?: boolean;
}

type CSSVars = CSSProperties & Record<`--${string}`, string>;

const brand = (skill: Skill): CSSVars => ({ "--brand": skill.color ?? "#ff6b3d" });

function Logo({ skill, size = 40 }: { skill: Skill; size?: number }) {
  return (
    <img className="logo-img" src={`/media/tech/${skill.logo}.svg`} alt="" width={size} height={size} loading="lazy" decoding="async" />
  );
}

/** A squircle icon on a soft glow in the brand's own colour. */
function Icon({ skill, size = 34 }: { skill: Skill; size?: number }) {
  return (
    <span className="icon" style={brand(skill)} aria-hidden="true">
      <span className="icon__glow" />
      <Logo skill={skill} size={size} />
    </span>
  );
}

function Tile({ skill }: { skill: Skill }) {
  const tilt = useTilt(12);
  return (
    <li className="tile" style={brand(skill)} {...tilt}>
      <Icon skill={skill} />
      <span className="tile__name">{skill.name}</span>
    </li>
  );
}

export function Skills({ withTable = false, compact = false }: SkillsProps) {
  const groups = compact ? skillGroups.slice(0, 4) : skillGroups;

  return (
    <Section
      id="skills"
      kanji="技"
      kanjiMeaning="waza: technique"
      title={
"The toolbox"
      }
      intro="Languages, frameworks and platforms I build with, from the first commit to the cloud."
      aside={compact ? <ArrowLink to="/skills">The full toolbox</ArrowLink> : undefined}
      className="skills"
    >
      <div className="skills__marquees" aria-label={`Technologies: ${logoSkills.map((s) => s.name).join(", ")}`}>
        <Marquee speed={40}>
          {logoSkills.slice(0, Math.ceil(logoSkills.length / 2)).map((s) => (
            <span key={s.name} className="logo-pill" style={brand(s)}>
              <Logo skill={s} size={22} />
              {s.name}
            </span>
          ))}
        </Marquee>
        <Marquee speed={46} reverse>
          {logoSkills.slice(Math.ceil(logoSkills.length / 2)).map((s) => (
            <span key={s.name} className="logo-pill" style={brand(s)}>
              <Logo skill={s} size={22} />
              {s.name}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="bento">
        {groups.map((g) => {
          const items = skills.filter((s) => s.group === g);
          return (
            <div key={g} className={`bento__card bento__card--span${items.length >= 6 ? 3 : items.length >= 4 ? 2 : 1}`} data-reveal>
              <h3 className="bento__title">
                {g}
                <span className="muted tabular">{items.length}</span>
              </h3>
              <ul className="tiles">
                {items.map((s) => (
                  <Tile key={s.name} skill={s} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {withTable && (
        <table className="skills-table">
          <caption className="about__sub">Where each one shows up</caption>
          <thead>
            <tr>
              <th scope="col">Skill</th>
              <th scope="col">Area</th>
              <th scope="col">Proof</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s.name} data-reveal>
                <td>
                  <span className="skills-table__name">
                    <Icon skill={s} size={20} />
                    {s.name}
                  </span>
                </td>
                <td className="muted">{s.group}</td>
                <td className="muted">{s.usedIn?.length ? s.usedIn.join(", ") : s.note ?? "Coursework and practice"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Section>
  );
}
