import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Locale switch.
 *
 * Figma `language` `888:18665`: px 16, py 8, radius 38, gap 8, two 32 px flags
 * with the 59x24 `languageToogle` artwork between them — EN `888:18953`,
 * Ar `888:18954`. The track is Figma artwork, not a drawn control.
 *
 * Implemented as two links rather than a stateful switch: changing locale is a
 * navigation, so it works without JavaScript and announces correctly.
 */
export type LanguageSwitchProps = {
  /** 32x32 flag artwork. */
  englishFlag: ReactNode;
  arabicFlag: ReactNode;
  /** The 59x24 toggle artwork for the active locale. */
  toggle: ReactNode;
  englishHref: string;
  arabicHref: string;
  englishLabel: string;
  arabicLabel: string;
  current: "en" | "ar";
  className?: string;
};

export function LanguageSwitch({
  englishFlag,
  arabicFlag,
  toggle,
  englishHref,
  arabicHref,
  englishLabel,
  arabicLabel,
  current,
  className,
}: LanguageSwitchProps) {
  return (
    <div className={cn("flex items-center gap-2 rounded-nav px-4 py-2", className)}>
      <a
        href={englishHref}
        hrefLang="en"
        aria-current={current === "en" ? "true" : undefined}
        className="flex size-8 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg"
      >
        {englishFlag}
        <span className="sr-only">{englishLabel}</span>
      </a>
      <span aria-hidden="true" className="flex h-6 w-14.75 shrink-0 items-center text-bg">
        {toggle}
      </span>
      <a
        href={arabicHref}
        hrefLang="ar"
        aria-current={current === "ar" ? "true" : undefined}
        className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg"
      >
        {arabicFlag}
        <span className="sr-only">{arabicLabel}</span>
      </a>
    </div>
  );
}
