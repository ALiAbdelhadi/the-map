"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { SECTION_SCROLL_EVENT, onHashLinkClick } from "../motion/scroll-to";
import { prototype } from "../motion/tokens";
import { GradientBorder } from "./gradient-border";

export type NavLinkProps = {
  href: string;
  children: ReactNode;
  /** 24x24 icon. */
  icon: ReactNode;
  /** Force Figma's "choose" variant. In-page links work it out from the scroll. */
  current?: boolean;
  className?: string;
};

/** Observe the section an in-page link points at; true while it holds the viewport's middle. */
function useSectionInView(href: string) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!href.startsWith("#") || href.length < 2) return;
    const section = document.getElementById(href.slice(1));
    if (!section) return;

    // A band at the middle of the viewport: exactly one section crosses it at a time.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, [href]);

  return inView;
}

/** The id a smooth scroll is heading for, or null when none is running. */
function useScrollTarget() {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    function onScroll(event: Event) {
      setTarget((event as CustomEvent<string | null>).detail);
    }
    window.addEventListener(SECTION_SCROLL_EVENT, onScroll);
    return () => {
      window.removeEventListener(SECTION_SCROLL_EVENT, onScroll);
    };
  }, []);

  return target;
}

export function NavLink({ href, children, icon, current, className }: NavLinkProps) {
  const inView = useSectionInView(href);
  const target = useScrollTarget();
  const isCurrent = current ?? (target === null ? inView : href === `#${target}`);

  return (
    <a
      href={href}
      onClick={href.startsWith("#") ? onHashLinkClick : undefined}
      aria-current={isCurrent ? "location" : undefined}
      className={cn(
        "relative inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-nav px-4 py-1 text-24 font-regular text-bg select-none",
        // Header row from 1023: the 1440 pill times `--scale-landscape` (theme.css). The
        // pill may then be shorter than 44 px (33 at 1023), so the 44 px hit area is a
        // centred pseudo-element instead of `min-h-11`, and the pill keeps its proportions.
        "desktop:relative desktop:min-h-0 desktop:gap-[calc(8*var(--scale-landscape))] desktop:px-[calc(16*var(--scale-landscape))] desktop:py-[calc(4*var(--scale-landscape))] desktop:text-[length:calc(24*var(--scale-landscape))]",
        "desktop:before:absolute desktop:before:inset-x-0 desktop:before:top-1/2 desktop:before:h-11 desktop:before:-translate-y-1/2",
        "hover:bg-primary-400",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        isCurrent && "inset-ring inset-ring-white",
        className,
      )}
    >
      {/*
        Gradient stroke (bg → primary/400), owner-approved deviation, hover-only —
        Figma's own pill has no border except the white 1 px ring above. Reuses
        `GradientBorder`, the same hover-stroke pattern as `benefit-pill.tsx` /
        `badge-border.tsx` / `search-field.tsx`, instead of a hand-rolled mask hack.
      */}
      <GradientBorder
        mode="hover"
        width="p-px"
        states={[
          null,
          [
            [0, "var(--color-bg)"],
            [1, "var(--color-primary-400)"],
          ],
        ]}
        steps={[prototype.hover.border, prototype.hover.border]}
      />
      <span className="flex size-6 shrink-0 items-center justify-center desktop:size-[calc(24*var(--scale-landscape))]">
        {icon}
      </span>
      {children}
    </a>
  );
}
