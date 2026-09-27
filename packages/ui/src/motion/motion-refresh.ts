"use client";

import { useEffect } from "react";

import { ScrollTrigger } from "./gsap";

/**
 * Keeps every ScrollTrigger's start/end in step with the page's real layout.
 *
 * ScrollTrigger measures positions once (at creation, DOMContentLoaded, window load
 * and on resize). Anything that moves sections afterwards — web fonts swapping in,
 * images decoding, a component changing layout on mount (the 1440 provider stage),
 * a breakpoint change handled by gsap.matchMedia, a back/forward-cache restore or a
 * client navigation — would otherwise leave a trigger firing too early, too late or
 * never, and a once-on-scroll reveal would stay hidden. This refreshes (debounced) on
 * each of those. Mounted once in the locale layout; renders nothing.
 *
 * Breakpoints mirror `--breakpoint-tablet/desktop/wide` in theme.css.
 */
const BREAKPOINTS = ["(min-width: 48rem)", "(min-width: 63.9375rem)", "(min-width: 90rem)"];
const DEBOUNCE_MS = 150;

let timer: number | undefined;

function scheduleRefresh() {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, DEBOUNCE_MS);
}

/** `routeKey`: anything that changes on a client navigation (the locale layout passes `lang`). */
export function MotionRefresh({ routeKey }: { routeKey?: string }) {
  useEffect(() => {
    // Phones: the URL bar showing/hiding is not a layout change worth a refresh.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const cleanups: (() => void)[] = [];
    const on = (target: EventTarget, type: string, fn: EventListener) => {
      target.addEventListener(type, fn);
      cleanups.push(() => {
        target.removeEventListener(type, fn);
      });
    };

    if (document.readyState !== "complete") on(window, "load", scheduleRefresh);
    on(window, "pageshow", (event) => {
      if ((event as PageTransitionEvent).persisted) scheduleRefresh();
    });

    if ("fonts" in document) {
      void document.fonts.ready.then(scheduleRefresh);
      on(document.fonts, "loadingdone", scheduleRefresh);
    }

    // Late images, fonts and components that change layout after mount all show up
    // as a change in the page's height.
    let height = document.body.scrollHeight;
    const observer = new ResizeObserver(() => {
      const next = document.body.scrollHeight;
      if (Math.abs(next - height) < 1) return;
      height = next;
      scheduleRefresh();
    });
    observer.observe(document.body);
    cleanups.push(() => {
      observer.disconnect();
    });

    // After gsap.matchMedia has swapped a component's setup for the new breakpoint.
    for (const query of BREAKPOINTS) {
      const list = window.matchMedia(query);
      const change = () => {
        requestAnimationFrame(scheduleRefresh);
      };
      list.addEventListener("change", change);
      cleanups.push(() => {
        list.removeEventListener("change", change);
      });
    }

    return () => {
      window.clearTimeout(timer);
      for (const cleanup of cleanups) cleanup();
    };
  }, []);

  // Client navigation (a language switch keeps the page's hash): new content, new layout.
  useEffect(() => {
    scheduleRefresh();
  }, [routeKey]);

  return null;
}
