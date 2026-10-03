import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export type SocialLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function SocialLink({ href, label, children, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      rel="noreferrer"
      target="_blank"
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-social select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className,
      )}
    >
      {children}
    </a>
  );
}
