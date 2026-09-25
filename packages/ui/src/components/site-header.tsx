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
  /** Accessible name for the `<nav>` landmark, content-driven (not from Figma). */
  mainNavLabel: string;
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
  mainNavLabel,
  languageSwitch,
  drawer,
  className,
}: SiteHeaderProps) {
  return (
    <GlassCard surface="header" as="header" className={cn("w-full", className)}>
      {/*
        Figma keeps the logo on the left and the language switch on the right in
        both frames; only the nav items reverse for Arabic. So the outer row stays
        visually LTR (row-reverse under rtl) while the nav keeps the page direction.
      */}
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <div className="flex min-w-0 flex-1 items-center gap-9.5 rtl:flex-row-reverse">
          <a
            href={homeHref}
            className="flex h-4.25 w-19 shrink-0 items-center tablet:h-10 tablet:w-44.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg"
          >
            {logo}
            <span className="sr-only">{homeLabel}</span>
          </a>

          <nav aria-label={mainNavLabel} className="hidden flex-1 items-center gap-2 desktop:flex">
            {nav}
          </nav>
        </div>
        <div className="hidden shrink-0 desktop:block">{languageSwitch}</div>

        <div className="ms-auto desktop:hidden rtl:ms-0 rtl:me-auto">{drawer}</div>
      </div>
    </GlassCard>
  );
}
