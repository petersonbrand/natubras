import type { ReactNode } from "react";

export function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-name">
        Natubras<span className="brand-period">.</span>
      </span>
      <span className="brand-descriptor">Pescados Ltda.</span>
    </span>
  );
}
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light";
  external?: boolean;
}) {
  return (
    <a
      className={`button button-${variant}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowIcon />
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
