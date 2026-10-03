"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { SECTION_SCROLL_EVENT, onHashLinkClick } from "../motion/scroll-to";
import { prototype } from "../motion/tokens";
import { GradientBorder } from "./gradient-border";

export type NavLinkProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  current?: boolean;
  className?: string;
};

function useSectionInView(href: string) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!href.startsWith("#") || href.length < 2) return;
    const section = document.getElementById(href.slice(1));
    if (!section) return;

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
        "desktop:relative desktop:min-h-0 desktop:gap-[calc(8*var(--scale-landscape))] desktop:px-[calc(16*var(--scale-landscape))] desktop:py-[calc(4*var(--scale-landscape))] desktop:text-[length:calc(24*var(--scale-landscape))]",
        "desktop:before:absolute desktop:before:inset-x-0 desktop:before:top-1/2 desktop:before:h-11 desktop:before:-translate-y-1/2",
        "hover:bg-primary-400",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        isCurrent && "inset-ring inset-ring-white",
        className,
      )}
    >
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
