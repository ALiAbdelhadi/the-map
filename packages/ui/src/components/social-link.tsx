import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Footer social link.
 *
 * Figma `social media` `1023:20845`, `instagram` `1023:20892`, `X` `1023:20941`,
 * `linkedin` `1023:20998`. Each mark is 48x48 and ships as artwork; the X mark's
 * hover variant sits on a primary/500 tile with radius 8.
 */
export type SocialLinkProps = {
  href: string;
  /** Accessible name, e.g. "Facebook". */
  label: string;
  /** 48x48 mark. */
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
        "inline-flex size-12 shrink-0 items-center justify-center rounded-social",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className,
      )}
    >
      {children}
    </a>
  );
}
