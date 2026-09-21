"use client";

import { type RefObject } from "react";

import { type FigmaTransition, figmaTween } from "./figma-easing";
import { gsap, MOTION_OK, useGSAP } from "./gsap";

/**
 * Figma's "While hovering → Change to" with a Smart Animate transition: tweens the
 * element's own CSS properties to `hover` on pointer enter and back on leave.
 * Colour values may be token references (`var(--color-…)`). Under reduced motion
 * the change is instant.
 */
export function useHoverTween(
  scope: RefObject<HTMLElement | null>,
  hover: Record<string, string>,
  transition: FigmaTransition,
) {
  useGSAP(
    () => {
      const element = scope.current;
      if (!element) return;
      const root = getComputedStyle(document.documentElement);
      const resolve = (value: string) => {
        const token = /^var\((--[^)]+)\)$/.exec(value)?.[1];
        return token ? root.getPropertyValue(token).trim() : value;
      };
      const style = getComputedStyle(element);
      const rest = Object.fromEntries(
        Object.keys(hover).map((key) => [
          key,
          style.getPropertyValue(key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)),
        ]),
      );
      const target = Object.fromEntries(
        Object.entries(hover).map(([key, value]) => [key, resolve(value)]),
      );
      const timing = () =>
        window.matchMedia(MOTION_OK).matches ? figmaTween(transition) : { duration: 0 };

      const enter = () => {
        gsap.to(element, { ...target, ...timing(), overwrite: "auto" });
      };
      const leave = () => {
        gsap.to(element, { ...rest, ...timing(), overwrite: "auto" });
      };
      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointerenter", enter);
        element.removeEventListener("pointerleave", leave);
      };
    },
    { scope },
  );
}
