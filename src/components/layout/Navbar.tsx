import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { TLink } from "./Transition";
import { useOnDark } from "@/hooks/useOnDark";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";

const links = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/certificates", label: "Certificates" },
];

export function Navbar() {
  const nav = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useOnDark(nav, () => 32);

  useEffect(() => setOpen(false), [pathname]);

  // A plain bar that steps aside while reading down and returns on the way up.
  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const el = nav.current;
        if (!el) return;
        const y = self.scroll();
        el.classList.toggle("is-scrolled", y > 80);
        el.classList.toggle("is-hidden", self.direction === 1 && y > 240);
      },
    });
  });

  return (
    <header ref={nav} className={`nav ${pathname === "/" ? "nav--home" : ""} ${open ? "is-open" : ""}`}>
      <TLink to="/" className="nav__mark display" aria-label={`${site.name}, home`}>
        {site.name}
      </TLink>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav id="nav-links" className="nav__links" aria-label="Main">
        {links.map((l) => (
          <TLink key={l.to} to={l.to} className={`nav__link ${pathname === l.to ? "is-current" : ""}`} aria-current={pathname === l.to ? "page" : undefined}>
            {l.label}
          </TLink>
        ))}
        <TLink to="/contact" className="nav__cta">
          Contact
        </TLink>
      </nav>
    </header>
  );
}
