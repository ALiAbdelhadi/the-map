import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { GlassCard } from "./glass-card";

export type SiteHeaderProps = {
  logo: ReactNode;
  homeHref: string;
  homeLabel: string;
  nav: ReactNode;
  mainNavLabel: string;
  languageSwitch: ReactNode;
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
