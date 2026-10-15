import { useRef, useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import { Arrow, Button } from "@/components/ui/Button";

interface ContactProps {
  withComposer?: boolean;
}

/** Address in display rows. No form backend: the composer writes an email for you. */
export function Contact({ withComposer = false }: ContactProps) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const subject = encodeURIComponent(name ? `Hello from ${name}` : "Hello");
  const mail = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(message)}`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = mail;
  };

  const rows = [
    { text: site.email, href: `mailto:${site.email}` },
    site.phone ? { text: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` } : null,
    { text: site.location },
    { text: `Replies within a day, ${site.timezone}` },
    { text: site.availability },
  ].filter(Boolean) as Array<{ text: string; href?: string }>;

  return (
    <section ref={root} id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>
      <ul className="contact__rows">
        {rows.map((r) => (
          <li key={r.text} className="contact__row" data-reveal>
            {r.href ? (
              <a href={r.href} className="contact__text display">
                {r.text}
              </a>
            ) : (
              <span className="contact__text display">{r.text}</span>
            )}
          </li>
        ))}
        <li className="contact__row contact__row--hello" data-reveal>
          <a href={mail} className="contact__text display contact__hello">
            Say hello
            <span className="contact__round" aria-hidden="true">
              <Arrow />
            </span>
          </a>
        </li>
      </ul>

      {withComposer && (
        <form className="composer wrap" onSubmit={onSubmit} aria-label="Write me an email">
          <p className="lead" data-reveal>
            Rather write it here? This opens your email app with the message filled in.
          </p>
          <label data-reveal>
            <span className="small">Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
          <label data-reveal>
            <span className="small">What are you building?</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} />
          </label>
          <div data-reveal>
            <Button href={mail} onClick={(e) => { e.preventDefault(); window.location.href = mail; }}>
              Open in my email
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
