"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";

/**
 * Drawer navigation for the 375 and 768 frames.
 *
 * Figma `menu` — closed `1038:26943` (Natural/BG circle, padding 12, radius 39,
 * 24 px glyph), open `1038:26926` (primary/500 circle plus a panel filled
 * rgb(53 150 253 / .2), padding 20, radius 12, item gap 8). The panel carries the same
 * GLASS effect as the bar: its 1 px edge, plus the glass blur so the items stay legible
 * over the orbit behind them (Figma renders it over a flat backdrop).
 *
 * Keyboard behaviour is not in Figma and is required for the control to work:
 * Escape closes, focus moves into the panel on open and back to the toggle on
 * close, and focus is kept inside the panel while it is open.
 *
 * The header keeps the toggle at the right-hand end in both languages (see SiteHeader),
 * so the panel hangs from the right edge in Arabic too — `start-0` under rtl.
 *
 * Motion: the panel opens out of the toggle — from 95 % and 6 px up, fading in
 * (0.25 s ease-out) — and closes the same way; it never grows from nothing.
 */
export type MobileMenuProps = {
  /** 24x24 menu glyph. */
  icon: ReactNode;
  /** Accessible name for the toggle, e.g. "Menu". */
  label: string;
  children: ReactNode;
  className?: string;
};

export function MobileMenu({ icon, label, children, className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Grow the panel out of the toggle on open; shrink it back before hiding it.
  const close = () => {
    const panel = panelRef.current;
    if (!panel || !window.matchMedia(MOTION_OK).matches) {
      setOpen(false);
      return;
    }
    gsap.to(panel, {
      opacity: 0,
      scale: 0.95,
      y: -6,
      ...figmaTween(prototype.menu),
      onComplete: () => {
        setOpen(false);
      },
    });
  };

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!open || !panel || !window.matchMedia(MOTION_OK).matches) return;
      gsap.fromTo(
        panel,
        {
          opacity: 0,
          scale: 0.95,
          y: -6,
          // The toggle sits at the right-hand end of the bar in both languages.
          transformOrigin: "top right",
        },
        { opacity: 1, scale: 1, y: 0, ...figmaTween(prototype.menu) },
      );
    },
    { dependencies: [open] },
  );

  // While the drawer is open the page behind it does not scroll.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("overflow-hidden");
    return () => {
      root.classList.remove("overflow-hidden");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button, input")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={cn("relative", className)}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        onClick={() => {
          if (open) close();
          else setOpen(true);
        }}
        className={cn(
          // 44 px hit area around Figma's 32 px circle; the negative margin keeps the
          // bar's layout at the 32 px Figma draws.
          "-m-1.5 flex size-11 items-center justify-center rounded-full",
          "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary-500",
        )}
      >
        <span
          className={cn(
            "flex size-8 items-center justify-center overflow-hidden rounded-toggle",
            open ? "bg-primary-500 text-bg" : "bg-bg text-primary-500",
          )}
        >
          <span className="flex size-4.5 items-center justify-center">{icon}</span>
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        onClick={(event) => {
          // Following a link closes the drawer at once — the page is about to move.
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute end-0 top-16 rtl:end-auto rtl:start-0 z-10 flex flex-col items-start gap-2 overflow-hidden rounded-button bg-surface-header p-5 shadow-glass-edge backdrop-blur-glass"
      >
        {children}
      </div>
    </div>
  );
}
