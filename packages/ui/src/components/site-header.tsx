import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { GlassCard } from "./glass-card";

/**
 * Site header.
 *
 * Figma `Header` `888:20297` / instance `888:20482` (1357x88 on the 1440 frame),
 * Arabic mirror `1028:25400`: fill rgb(53 150 253 / .2), padding 20, radius 80,
 * gap 38 between the logo and the nav, nav item gap 8.
 *
 * The nav collapses into the drawer below the tablet breakpoint, matching the
 * 375 and 768 frames, which show a hamburger instead of the inline nav.
 */
export type SiteHeaderProps = {
  /** Logo artwork, 178x40 in Figma. */
  logo: ReactNode;
  /** Link to the home page, wrapped around the logo. */
  homeHref: string;
  homeLabel: string;
  /** Inline navigation for the desktop frame. */
  nav: ReactNode;
  /** Locale switch. */
  languageSwitch: ReactNode;
  /** Drawer for the mobile and tablet frames. */
  drawer: ReactNode;
  className?: string;
};

export function SiteHeader({
  logo,
  homeHref,
  homeLabel,
  nav,
  languageSwitch,
  drawer,
  className,
}: SiteHeaderProps) {
  return (
    <GlassCard surface="header" as="header" className={cn("w-full", className)}>
      <div className="flex items-center gap-9.5">
        <a
          href={homeHref}
          className="flex h-10 w-44.5 shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg"
        >
          {logo}
          <span className="sr-only">{homeLabel}</span>
        </a>

        <nav aria-label="Main" className="hidden flex-1 items-center gap-2 desktop:flex">
          {nav}
          {languageSwitch}
        </nav>

        <div className="ms-auto desktop:hidden">{drawer}</div>
      </div>
    </GlassCard>
  );
}
