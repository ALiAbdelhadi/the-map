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
 * The nav collapses into the drawer below the desktop breakpoint (1023), matching the
 * 375 and 768 frames, which show a hamburger instead of the inline nav. From 1023 the
 * full row is shown (owner, 2026-09-26: landscape iPad must look like the desktop
 * design): every length is the 1440 value times `--scale-landscape`, so nothing is
 * hidden and the row keeps Figma's proportions — at 1023 it is 1.7 % narrower than
 * the bar. Labels stay ≥ 16.7 px; hit areas stay 44 px (see NavLink, LanguageSwitch).
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
    <GlassCard surface="header" as="header" className={cn("relative w-full", className)}>
      {/*
        Figma keeps the logo on the left and the language switch on the right in
        both frames; only the nav items reverse for Arabic. So the outer row stays
        visually LTR (row-reverse under rtl) while the nav keeps the page direction.
      */}
      <div className="flex items-center gap-2 desktop:gap-[calc(8*var(--scale-landscape))] rtl:flex-row-reverse">
        <div className="flex min-w-0 flex-1 items-center gap-9.5 desktop:gap-[calc(38*var(--scale-landscape))] rtl:flex-row-reverse">
          <a
            href={homeHref}
            className="flex h-4.25 w-19 shrink-0 select-none items-center tablet:h-10 tablet:w-44.5 desktop:h-[calc(40*var(--scale-landscape))] desktop:w-[calc(178*var(--scale-landscape))] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg"
          >
            {logo}
            <span className="sr-only">{homeLabel}</span>
          </a>

          <nav
            aria-label={mainNavLabel}
            className="hidden flex-1 items-center gap-2 desktop:flex desktop:gap-[calc(8*var(--scale-landscape))]"
          >
            {nav}
          </nav>
        </div>
        <div className="hidden shrink-0 desktop:block">{languageSwitch}</div>

        <div className="ms-auto desktop:hidden rtl:ms-0 rtl:me-auto">{drawer}</div>
      </div>
    </GlassCard>
  );
}
