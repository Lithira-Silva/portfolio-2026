import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { Section } from "@/components/ui/Section";
import { Arrow, Button } from "@/components/ui/Button";

interface ContactProps {
  withComposer?: boolean;
}

/** A big invitation, the ways to reach me, and a composer that writes the email for you. */
export function Contact({ withComposer = true }: ContactProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const subject = encodeURIComponent(name ? `Hello from ${name}` : "Hello Lithira");
  const mail = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(message)}`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = mail;
  };

  const rows = [
    { label: "Email", text: site.email, href: `mailto:${site.email}` },
    ...site.socials.map((s) => ({ label: s.label, text: s.href.replace(/^https?:[/][/]/, ""), href: s.href })),
    { label: "Based in", text: `${site.location}, ${site.timezone}` },
  ];

  return (
    <Section
      id="contact"
      kanji="連絡"
      kanjiMeaning="renraku: contact"
      title={
        <>
          Let&rsquo;s build
          <br />
          something
        </>
      }
      intro={site.availability + ". Internships, collaborations or a question about the koi."}
      className="contact"
    >
      <div className="contact__grid">
        <ul className="contact__rows">
          {rows.map((r) => (
            <li key={r.label} data-reveal>
              {r.href ? (
                <a className="contact__row" href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className="small muted">{r.label}</span>
                  <span className="contact__value">{r.text}</span>
                  <span className="contact__go" aria-hidden="true">
                    <Arrow />
                  </span>
                </a>
              ) : (
                <div className="contact__row">
                  <span className="small muted">{r.label}</span>
                  <span className="contact__value">{r.text}</span>
                </div>
              )}
            </li>
          ))}
        </ul>

        {withComposer && (
          <form className="composer" onSubmit={onSubmit} aria-label="Write me an email" data-reveal>
            <p className="small muted">This opens your email app with the message filled in.</p>
            <label>
              <span className="small">Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Jane from Acme" />
            </label>
            <label>
              <span className="small">What are you building?</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="A few lines about the project or role"
              />
            </label>
            <Button
              href={mail}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = mail;
              }}
            >
              Open in my email
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}
