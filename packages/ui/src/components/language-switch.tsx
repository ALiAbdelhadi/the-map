"use client";

import type { MouseEvent, ReactNode } from "react";

import { cn } from "../lib/cn";

function preserveHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (typeof window === "undefined") return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return;
  const hash = window.location.hash;
  if (!hash) return;
  event.preventDefault();
  window.location.href = `${href}${hash}`;
}

export type LanguageSwitchProps = {
  englishFlag: ReactNode;
  arabicFlag: ReactNode;
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
    <div
      dir="ltr"
      className={cn(
        "flex select-none items-center gap-2 rounded-nav px-4 py-2 desktop:gap-[calc(8*var(--scale-landscape))] desktop:px-[calc(16*var(--scale-landscape))] desktop:py-[calc(8*var(--scale-landscape))]",
        className,
      )}
    >
      <a
        href={englishHref}
        hrefLang="en"
        aria-current={current === "en" ? "true" : undefined}
        onClick={(event) => preserveHash(event, englishHref)}
        className="-m-1.5 flex size-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-bg desktop:-m-[calc((44px-32*var(--scale-landscape))/2)]"
      >
        <span className="flex size-8 items-center justify-center *:size-full desktop:size-[calc(32*var(--scale-landscape))]">
          {englishFlag}
        </span>
        <span className="sr-only">{englishLabel}</span>
      </a>
      <a
        href={targetHref}
        hrefLang={targetLang}
        onClick={(event) => preserveHash(event, targetHref)}
        className="-my-2.5 flex h-11 w-14.75 shrink-0 cursor-pointer items-center justify-center rounded-full text-bg focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-bg desktop:-my-[calc((44px-24*var(--scale-landscape))/2)] desktop:w-[calc(59*var(--scale-landscape))]"
      >
        <span className="flex h-6 w-14.75 *:size-full desktop:h-[calc(24*var(--scale-landscape))] desktop:w-[calc(59*var(--scale-landscape))]">
          {toggle}
        </span>
        <span className="sr-only">{targetLabel}</span>
      </a>
      <a
        href={arabicHref}
        hrefLang="ar"
        aria-current={current === "ar" ? "true" : undefined}
        onClick={(event) => preserveHash(event, arabicHref)}
        className="-m-1.5 flex size-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-bg desktop:-m-[calc((44px-32*var(--scale-landscape))/2)]"
      >
        <span className="flex size-8 items-center justify-center overflow-hidden rounded-full *:size-full desktop:size-[calc(32*var(--scale-landscape))]">
          {arabicFlag}
        </span>
        <span className="sr-only">{arabicLabel}</span>
      </a>
    </div>
  );
}
