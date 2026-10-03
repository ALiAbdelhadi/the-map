"use client";

import { type ReactNode, useRef } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { IconBadge } from "./icon-badge";

export type FeatureItemProps = {
  children: ReactNode;
  icon: ReactNode;
  selected?: boolean;
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
        "group relative flex items-center gap-6 rounded-row py-3 ps-3 pe-6 text-start text-24 font-regular text-bg select-none tablet:py-1 tablet:pe-5 tablet:text-40",
        "aria-selected:text-bg! aria-selected:[&_[data-hover-fill]]:opacity-0! aria-selected:[&_[data-chip]>span]:bg-primary-400!",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-hover-fill=""
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-primary-500 to-white opacity-0"
      />
      {selected ? (
        <span
          aria-hidden="true"
          data-selected-ring=""
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-primary-500 to-white p-1 [mask:linear-gradient(black,black)_content-box_exclude,linear-gradient(black,black)]"
        />
      ) : null}
      <span data-chip="" className="relative">
        <IconBadge>{icon}</IconBadge>
      </span>
      <span className="relative tablet:leading-row">{children}</span>
    </button>
  );
}
