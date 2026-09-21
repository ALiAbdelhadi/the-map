"use client";

import { type RefObject, useEffect, useRef } from "react";

import { gsap } from "./gsap";

/**
 * Figma's "After delay" trigger.
 *
 * Calls `onFire` once `wait` seconds have passed since `key` last changed — `wait`
 * being the incoming transition plus Figma's delay, because Figma starts the timer
 * when a state has finished arriving. Every change of `key` restarts it, so a click
 * that jumps to another state starts that state's own timer, as in Figma.
 *
 * The web page adds what a prototype does not need:
 * - nothing runs under `prefers-reduced-motion: reduce`;
 * - the timer waits while the element is off-screen or the tab is hidden;
 * - it waits while keyboard focus is inside the element (WCAG 2.2.2), and, with
 *   `pauseOnHover`, while the pointer is over it.
 */
export function useAfterDelay(
  scope: RefObject<HTMLElement | null>,
  {
    key,
    wait,
    onFire,
    enabled = true,
    pauseOnHover = false,
  }: {
    key: unknown;
    wait: number;
    onFire: () => void;
    enabled?: boolean;
    pauseOnHover?: boolean;
  },
) {
  const fire = useRef(onFire);
  fire.current = onFire;

  useEffect(() => {
    const element = scope.current;
    if (!enabled || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let call: gsap.core.Tween | null = null;
    let visible = false;
    let focused = false;
    let hovered = false;

    const stop = () => {
      call?.kill();
      call = null;
    };
    const start = () => {
      stop();
      if (!visible || focused || hovered || document.hidden) return;
      call = gsap.delayedCall(wait, () => {
        fire.current();
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      start();
    });
    observer.observe(element);

    const onVisibility = () => {
      start();
    };
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      focused = target?.matches(":focus-visible") ?? false;
      start();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!element.contains(event.relatedTarget as Node | null)) focused = false;
      start();
    };
    const onEnter = () => {
      hovered = true;
      start();
    };
    const onLeave = () => {
      hovered = false;
      start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    element.addEventListener("focusin", onFocusIn);
    element.addEventListener("focusout", onFocusOut);
    if (pauseOnHover) {
      element.addEventListener("pointerenter", onEnter);
      element.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      element.removeEventListener("focusin", onFocusIn);
      element.removeEventListener("focusout", onFocusOut);
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [scope, key, wait, enabled, pauseOnHover]);
}
