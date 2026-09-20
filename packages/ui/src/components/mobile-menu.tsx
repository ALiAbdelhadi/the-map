"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import { cn } from "../lib/cn";

/**
 * Drawer navigation for the 375 and 768 frames.
 *
 * Figma `menu` — closed `1038:26943` (Natural/BG circle, padding 12, radius 39,
 * 24 px glyph), open `1038:26926` (primary/500 circle plus a panel filled
 * rgb(53 150 253 / .2), padding 20, radius 12, item gap 8).
 *
 * Keyboard behaviour is not in Figma and is required for the control to work:
 * Escape closes, focus moves into the panel on open and back to the toggle on
 * close, and focus is kept inside the panel while it is open.
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

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button, input")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
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
          setOpen((value) => !value);
        }}
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-toggle p-3",
          open ? "bg-primary-500 text-bg" : "bg-bg text-primary-500",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        )}
      >
        <span className="flex size-6 items-center justify-center">{icon}</span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute end-0 top-16 z-10 flex flex-col items-start gap-2 overflow-hidden rounded-button bg-surface-header p-5"
      >
        {children}
      </div>
    </div>
  );
}
