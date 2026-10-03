"use client";

import { useEffect } from "react";

import { ScrollTrigger } from "./gsap";

const BREAKPOINTS = ["(min-width: 48rem)", "(min-width: 63.9375rem)", "(min-width: 90rem)"];
const DEBOUNCE_MS = 150;

let timer: number | undefined;

function scheduleRefresh() {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, DEBOUNCE_MS);
}

export function MotionRefresh({ routeKey }: { routeKey?: string }) {
  useEffect(() => {
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

  useEffect(() => {
    scheduleRefresh();
  }, [routeKey]);

  return null;
}
