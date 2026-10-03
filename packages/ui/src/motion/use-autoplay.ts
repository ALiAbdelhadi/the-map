"use client";

import { type RefObject, useEffect, useRef } from "react";

import { gsap, MOTION_OK } from "./gsap";

export type AutoplayOptions = {
  step: unknown;
  seconds: number;
  fill?: (root: HTMLElement) => Element | null | undefined;
  busy?: (root: HTMLElement) => boolean;
  next: () => void;
  pauseOnInteraction?: boolean;
};

export function useAutoplay(ref: RefObject<HTMLElement | null>, options: AutoplayOptions) {
  const latest = useRef(options);
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
