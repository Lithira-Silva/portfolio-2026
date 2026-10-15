import { useRef, type AnchorHTMLAttributes, type ReactNode, type PointerEvent } from "react";
import { TLink } from "@/components/layout/Transition";
import { gsap } from "@/lib/gsap";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
  tone?: "accent" | "ghost" | "light";
  children: ReactNode;
}

/** Magnetic pull toward the pointer; snaps back with a little spring. */
function useMagnet(strength = 0.3) {
  const ref = useRef<HTMLSpanElement>(null);
  const onPointerMove = (e: PointerEvent) => {
    if (!ref.current || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const onPointerLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  };
  return { ref, onPointerMove, onPointerLeave };
}

/** The one button: a full pill with a sliding fill, an arrow, and a magnetic pull. */
export function Button({ to, href, tone = "accent", children, className = "", ...rest }: ButtonProps) {
  const magnet = useMagnet();
  const cls = `btn btn--${tone} ${className}`;
  const inner = (
    <span ref={magnet.ref} className="btn__inner">
      <span className="btn__label">{children}</span>
      <span className="btn__icon">
        <Arrow />
      </span>
    </span>
  );
  const handlers = { onPointerMove: magnet.onPointerMove, onPointerLeave: magnet.onPointerLeave };
  if (to)
    return (
      <TLink to={to} className={cls} {...handlers}>
        {inner}
      </TLink>
    );
  return (
    <a href={href} className={cls} {...handlers} {...rest}>
      {inner}
    </a>
  );
}

export function ArrowLink({ to, href, children, className = "", ...rest }: Omit<ButtonProps, "tone">) {
  const cls = `arrow-link ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <Arrow />
    </>
  );
  if (to) return <TLink to={to} className={cls}>{inner}</TLink>;
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

export function Arrow({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small koi glyph used as a separator. */
export function KoiGlyph({ className = "koi-glyph" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 20" width="40" height="20" aria-hidden="true">
      <path d="M2 10c6-7 18-9 27-3l7-5-2 8 2 8-7-5C20 19 8 17 2 10z" fill="currentColor" />
      <circle cx="9" cy="9" r="1.4" fill="var(--bg)" />
    </svg>
  );
}
