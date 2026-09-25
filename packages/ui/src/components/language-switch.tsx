"use client";

import type { MouseEvent, ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Locale switch.
 *
 * Figma `language` `888:18665`: px 16, py 8, radius 38, gap 8, two 32 px flags
 * with the 59x24 `languageToogle` artwork between them — EN `888:18953`,
 * Ar `888:18954`. The track is Figma artwork, not a drawn control.
 *
 * Each flag link has a 44 px hit area around the 32 px flag; a negative margin keeps
 * the row at Figma's size. The track itself is also a real link, to the other
 * locale, with the same 44 px-tall hit area trick applied on the vertical axis
 * only (its 59 px width already exceeds 44 px) — otherwise clicking the switch
 * artwork itself, which is what it visually invites, does nothing.
 *
 * Implemented as three links rather than a stateful switch: changing locale is a
 * navigation, so it works without JavaScript and announces correctly. `onClick`
 * only re-appends the current `location.hash` so a section anchor survives the
 * locale switch (ids are identical in both locales); without JS the plain
 * `href` still navigates, just without carrying the hash.
 */
function preserveHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (typeof window === "undefined") return;
  // Leave modified clicks (new tab / new window) to the browser.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = window.location.hash;
  if (!hash) return;
  event.preventDefault();
  window.location.href = `${href}${hash}`;
}

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
  const targetHref = current === "en" ? arabicHref : englishHref;
  const targetLabel = current === "en" ? arabicLabel : englishLabel;
  const targetLang = current === "en" ? "ar" : "en";

  return (
    // Figma keeps English flag → toggle → Arabic flag left-to-right in both frames.
    <div dir="ltr" className={cn("flex items-center gap-2 rounded-nav px-4 py-2", className)}>
      <a
        href={englishHref}
        hrefLang="en"
        aria-current={current === "en" ? "true" : undefined}
        onClick={(event) => preserveHash(event, englishHref)}
        className="-m-1.5 flex size-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-bg"
      >
        {englishFlag}
        <span className="sr-only">{englishLabel}</span>
      </a>
      <a
        href={targetHref}
        hrefLang={targetLang}
        onClick={(event) => preserveHash(event, targetHref)}
        className="-my-2.5 flex h-11 w-14.75 shrink-0 cursor-pointer items-center justify-center rounded-full text-bg focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-bg"
      >
        {toggle}
        <span className="sr-only">{targetLabel}</span>
      </a>
      <a
        href={arabicHref}
        hrefLang="ar"
        aria-current={current === "ar" ? "true" : undefined}
        onClick={(event) => preserveHash(event, arabicHref)}
        className="-m-1.5 flex size-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-bg"
      >
        <span className="flex size-8 items-center justify-center overflow-hidden rounded-full">
          {arabicFlag}
        </span>
        <span className="sr-only">{arabicLabel}</span>
      </a>
    </div>
  );
}
