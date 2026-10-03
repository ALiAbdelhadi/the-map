"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";

export type MobileMenuProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  className?: string;
};

const DESKTOP = "(min-width: 63.9375rem)";

export function MobileMenu({ icon, label, children, className }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const close = () => {
    const panel = panelRef.current;
    if (closing.current) return;
    if (!panel || !window.matchMedia(MOTION_OK).matches) {
      setOpen(false);
      return;
    }
    closing.current = true;
    gsap.to(panel, {
      opacity: 0,
      scale: 0.95,
      y: -6,
      ...figmaTween(prototype.menu),
      overwrite: true,
      onComplete: () => {
        closing.current = false;
        setOpen(false);
      },
    });
  };

  const reopen = () => {
    closing.current = false;
    gsap.to(panelRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      ...figmaTween(prototype.menu),
      overwrite: true,
    });
  };

  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia(DESKTOP);
    const onChange = () => {
      if (!query.matches) return;
      closing.current = false;
      gsap.killTweensOf(panelRef.current);
      setOpen(false);
    };
    onChange();
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, [open]);

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
          transformOrigin: "top right",
        },
        { opacity: 1, scale: 1, y: 0, ...figmaTween(prototype.menu), overwrite: true },
      );
    },
    { dependencies: [open] },
  );

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
    <div className={className}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        onClick={() => {
          if (!open) setOpen(true);
          else if (closing.current) reopen();
          else close();
        }}
        className={cn(
          "-m-1.5 flex size-11 select-none items-center justify-center rounded-full",
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
        onClickCapture={(event) => {
          if (!(event.target as HTMLElement).closest("a")) return;
          document.documentElement.classList.remove("overflow-hidden");
          setOpen(false);
        }}
        className="absolute inset-x-0 top-full z-10 mt-2 flex flex-col items-start gap-2 overflow-hidden rounded-button bg-surface-header p-5 shadow-glass-edge backdrop-blur-glass"
      >
        {children}
      </div>
    </div>
  );
}
