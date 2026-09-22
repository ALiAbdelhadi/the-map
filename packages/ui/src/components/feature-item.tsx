"use client";

import { type ReactNode, useRef } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { IconBadge } from "./icon-badge";

/**
 * Why Choose Us feature row.
 *
 * Figma `Why Choose features` — Defult `911:19599`, hover `911:19598`,
 * Select `911:19597`. gap 24, px 20, py 4, label 40 px regular.
 * - default: no background, chip primary/400, label Natural/BG
 * - hover: gradient primary/500 -> white, chip primary/600, label Secondary/500, radius 56
 * - select: 4 px primary/500 → white gradient stroke, radius 56, chip primary/400,
 *   label Natural/BG. The stroke sits inside the row, so selecting never moves it.
 *
 * The hover gradient fades in and out (0.25 s) on a mouse pointer only — a tap on a
 * touch screen selects without leaving a stuck hover state.
 */
export type FeatureItemProps = {
  children: ReactNode;
  /** 32x32 icon. */
  icon: ReactNode;
  selected?: boolean;
  /** In the tab order — the selected row, or the first when none is selected. */
  focusable?: boolean;
  onSelect?: () => void;
  id?: string;
  controls?: string;
  className?: string;
};

export function FeatureItem({
  children,
  icon,
  selected = false,
  focusable = selected,
  onSelect,
  id,
  controls,
  className,
}: FeatureItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const row = ref.current;
      if (!row) return;
      const fill = row.querySelector("[data-hover-fill]");
      const chip = row.querySelector("[data-chip] > span");
      const root = getComputedStyle(document.documentElement);
      const color = (token: string) => root.getPropertyValue(token).trim();
      const timing = () =>
        window.matchMedia(MOTION_OK).matches ? figmaTween(prototype.hover.card) : { duration: 0 };
      const enter = (event: PointerEvent) => {
        // The selected row keeps its stroke and no hover fill.
        if (event.pointerType !== "mouse" || row.getAttribute("aria-selected") === "true") return;
        gsap.to(fill, { opacity: 1, ...timing(), overwrite: "auto" });
        gsap.to(row, { color: color("--color-secondary-500"), ...timing(), overwrite: "auto" });
        gsap.to(chip, {
          backgroundColor: color("--color-primary-600"),
          ...timing(),
          overwrite: "auto",
        });
      };
      const leave = () => {
        gsap.to(fill, { opacity: 0, ...timing(), overwrite: "auto" });
        gsap.to(row, { color: color("--color-bg"), ...timing(), overwrite: "auto" });
        gsap.to(chip, {
          backgroundColor: color("--color-primary-400"),
          ...timing(),
          overwrite: "auto",
        });
      };
      row.addEventListener("pointerenter", enter);
      row.addEventListener("pointerleave", leave);
      // Selecting clears the hover fill so the selected state reads cleanly.
      row.addEventListener("click", leave);
      return () => {
        row.removeEventListener("pointerenter", enter);
        row.removeEventListener("pointerleave", leave);
        row.removeEventListener("click", leave);
      };
    },
    { scope: ref },
  );

  return (
    <button
      ref={ref}
      type="button"
      id={id}
      role="tab"
      aria-selected={selected}
      aria-controls={controls}
      tabIndex={focusable ? 0 : -1}
      onClick={onSelect}
      className={cn(
        "group relative flex items-center gap-6 rounded-row border-4 border-transparent px-5 py-1 text-24 font-regular text-bg tablet:text-32 desktop:text-40",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-hover-fill=""
        className="pointer-events-none absolute inset-0 -m-1 rounded-[inherit] bg-gradient-to-r from-primary-500 to-white opacity-0"
      />
      {selected ? (
        <span
          aria-hidden="true"
          data-selected-ring=""
          className="pointer-events-none absolute inset-0 -m-1 rounded-[inherit] bg-gradient-to-r from-primary-500 to-white p-1 [mask:linear-gradient(black,black)_content-box_exclude,linear-gradient(black,black)]"
        />
      ) : null}
      <span data-chip="" className="relative">
        <IconBadge>{icon}</IconBadge>
      </span>
      <span className="relative">{children}</span>
    </button>
  );
}
