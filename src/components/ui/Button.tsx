import type { AnchorHTMLAttributes, ReactNode } from "react";
import { TLink } from "@/components/layout/Transition";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
  tone?: "accent" | "ink" | "light";
  children: ReactNode;
}

/** The one button shape: square corners, flat fill, 48px tall. */
export function Button({ to, href, tone = "accent", children, className = "", ...rest }: ButtonProps) {
  const cls = `btn btn--${tone} ${className}`;
  const inner = (
    <>
      <span className="btn__label">{children}</span>
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
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
