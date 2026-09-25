"use client";

import { type ReactNode, useEffect, useState } from "react";

import { cn } from "../lib/cn";

/**
 * Header / drawer navigation item.
 *
 * Figma `Header action` — Default `870:18939`, Hover `870:18938`, choose `870:18937`.
 * px 16, py 4, radius 38, gap 8, icon 24, label 24 px regular, colour Natural/BG.
 * Hover fills primary/400; the "choose" (current) state draws a 1 px white border
 * (header `888:20482` shows it on "About"). Figma's stroke sits inside the pill, so it
 * is drawn as an inset ring and choosing an item never shifts its neighbours.
 *
 * The current item follows the page: an in-page link (`#id`) is "choose" while its
 * section crosses the middle of the viewport, and is announced with
 * `aria-current="location"`.
 */
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

export function NavLink({ href, children, icon, current, className }: NavLinkProps) {
  const inView = useSectionInView(href);
  const isCurrent = current ?? inView;

  return (
    <a
      href={href}
      aria-current={isCurrent ? "location" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-nav px-4 py-1 text-24 font-regular text-bg",
        "hover:bg-primary-400",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        isCurrent && "inset-ring inset-ring-white",
        className,
      )}
    >
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      {children}
    </a>
  );
}
