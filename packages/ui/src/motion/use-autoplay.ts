"use client";

import { type RefObject, useEffect, useRef } from "react";

import { gsap, MOTION_OK } from "./gsap";

export type AutoplayOptions = {
  /** The current state. Any change rebuilds the timer, so it starts again from zero. */
  step: unknown;
  /** Seconds before `next` runs. */
  seconds: number;
  /**
   * The progress line's fill for the current step, if it shows one. Its width grows
   * from 0 to 100 % over `seconds`; that tween is the timer. Without a fill the timer
   * is an invisible tween of the same length.
   */
  fill?: (root: HTMLElement) => Element | null | undefined;
  /** True while a change is still animating; `next` then waits for it to end. */
  busy?: (root: HTMLElement) => boolean;
  /** Moves on to the next step. */
  next: () => void;
  /** Freeze while a mouse is over `root` or keyboard focus is inside it (default true). */
  pauseOnInteraction?: boolean;
};

/**
 * Autoplay shared by the stepper and Why Choose Us (owner-approved 2026-09-26 and
 * 2026-09-29, docs/figma-gaps.md D1).
 *
 * Every `seconds` the component moves on through the same path a click takes. The
 * count freezes, and resumes where it stopped, while a mouse is over `root`, keyboard
 * focus (`:focus-visible`) is inside it, the tab is hidden, or less than half of
 * `root` is in view. A mouse click's focus does not pause it: hover already covers
 * that, and leaving it would stop autoplay for good after one click. Under reduced
 * motion there is no autoplay (and the component hides its line).
 */
export function useAutoplay(ref: RefObject<HTMLElement | null>, options: AutoplayOptions) {
  const latest = useRef(options);
  // Kept across rebuilds: the mouse is often still inside when a change (its own
  // click) restarts the timer, and no new `pointerenter` will say so.
  const mouseInside = useRef(false);
  useEffect(() => {
    latest.current = options;
  });

  const { step, seconds } = options;
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia(MOTION_OK).matches) return;

    const wait = {
      pointer: mouseInside.current,
      focus: false,
      hidden: document.hidden,
      away: true,
    };
    const ctx = gsap.context(() => {}, root);
    let progress: gsap.core.Tween | undefined;
    const waiting = () =>
      (latest.current.pauseOnInteraction !== false && (wait.pointer || wait.focus)) ||
      wait.hidden ||
      wait.away;

    const next = () => {
      // Never cut into a change still animating (it cannot be, `seconds` after the
      // last change, but a retry costs nothing), and a retry still honours a pause.
      if (latest.current.busy?.(root) || waiting()) {
        ctx.add(() => gsap.delayedCall(0.1, next));
        return;
      }
      latest.current.next();
    };

    ctx.add(() => {
      const fill = latest.current.fill?.(root);
      progress = fill
        ? gsap.fromTo(
            fill,
            { width: "0%" },
            { width: "100%", duration: seconds, ease: "none", paused: true, onComplete: next },
          )
        : gsap.to({}, { duration: seconds, paused: true, onComplete: next });
    });

    const sync = () => {
      progress?.paused(waiting());
    };

    const offs: Array<() => void> = [];
    const on = (target: EventTarget, type: string, handler: EventListener) => {
      target.addEventListener(type, handler);
      offs.push(() => {
        target.removeEventListener(type, handler);
      });
    };
    on(root, "pointerenter", (event) => {
      if ((event as PointerEvent).pointerType !== "mouse") return;
      wait.pointer = mouseInside.current = true;
      sync();
    });
    on(root, "pointerleave", (event) => {
      if ((event as PointerEvent).pointerType !== "mouse") return;
      wait.pointer = mouseInside.current = false;
      sync();
    });
    on(root, "focusin", (event) => {
      wait.focus = event.target instanceof Element && event.target.matches(":focus-visible");
      sync();
    });
    on(root, "focusout", (event) => {
      const to = (event as FocusEvent).relatedTarget;
      wait.focus = to instanceof Element && root.contains(to) && to.matches(":focus-visible");
      sync();
    });
    on(document, "visibilitychange", () => {
      wait.hidden = document.hidden;
      sync();
    });
    const watch = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        wait.away = entry.intersectionRatio < 0.5;
        sync();
      },
      { threshold: [0, 0.5, 1] },
    );
    watch.observe(root);

    // Focus can already be inside (keyboard focus made the change).
    wait.focus = root.contains(document.activeElement) && root.matches(":has(:focus-visible)");
    sync();
    return () => {
      watch.disconnect();
      offs.forEach((off) => {
        off();
      });
      ctx.revert();
    };
  }, [ref, step, seconds]);
}
