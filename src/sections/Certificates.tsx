import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certificates } from "@/data/certificates";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLink } from "@/components/ui/Button";

interface CertificatesProps {
  withIndex?: boolean;
}

/**
 * Small frames, wide space. Each credential is set like a woodblock cartouche,
 * signed with a red seal the way the prints on this site are.
 */
export function Certificates({ withIndex = false }: CertificatesProps) {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLUListElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cert", {
          x: 140,
          opacity: 0,
          stagger: 0.06,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: strip.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  // Drag to scroll on desktop.
  const drag = useRef({ down: false, x: 0, left: 0 });
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !strip.current) return;
    drag.current = { down: true, x: e.clientX, left: strip.current.scrollLeft };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.down || !strip.current) return;
    strip.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const onUp = () => (drag.current.down = false);

  return (
    <section ref={root} id="certificates" className="certs" aria-labelledby="certs-title">
      <h2 id="certs-title" className="certs__title wrap">
        Certificates <span className="muted tabular">{certificates.length}</span>
      </h2>
      <ul
        ref={strip}
        className="certs__strip"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        tabIndex={0}
        aria-label="Certificates, scroll sideways"
      >
        {certificates.map((c) => (
          <li key={c.title} className="cert">
            <a href={c.url} target="_blank" rel="noreferrer" className="cert__face" draggable={false}>
              <span className="cert__name display">{c.title}</span>
              <span className="cert__foot">
                <span className="small">
                  <span className="cert__issuer">{c.issuer}</span>
                  <br />
                  <span className="tabular">{c.date}</span>
                </span>
                <span className="cert__seal" aria-hidden="true">
                  {c.issuer.charAt(0)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {withIndex ? (
        <div className="certs__index wrap">
          <table>
            <caption className="sr-only">All certificates</caption>
            <thead>
              <tr>
                <th scope="col">Certificate</th>
                <th scope="col">Issuer</th>
                <th scope="col">Year</th>
                <th scope="col">
                  <span className="sr-only">Link</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c) => (
                <tr key={c.title} data-reveal>
                  <td>{c.title}</td>
                  <td className="muted">{c.issuer}</td>
                  <td className="tabular">{c.date}</td>
                  <td>
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noreferrer" className="arrow-link">
                        Verify
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="certs__more wrap" data-reveal>
          <ArrowLink to="/certificates">Every credential, with links</ArrowLink>
        </div>
      )}
    </section>
  );
}
