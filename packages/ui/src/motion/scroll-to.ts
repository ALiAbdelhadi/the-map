"use client";

import type { MouseEvent } from "react";

import { figmaEase } from "./figma-easing";
import { gsap, MOTION_OK } from "./gsap";

const MIN_DURATION = 0.6;
const MAX_DURATION = 1.2;
const PER_SCREEN = 0.1;

export const SECTION_SCROLL_EVENT = "themap:section-scroll";

let active: gsap.core.Tween | null = null;

function announce(id: string | null) {
  window.dispatchEvent(new CustomEvent<string | null>(SECTION_SCROLL_EVENT, { detail: id }));
}

function arrive(section: HTMLElement, hash: string) {
  if (window.location.hash !== hash) {
    window.history.pushState(window.history.state, "", hash);
  }
  if (!section.hasAttribute("tabindex")) {
    section.setAttribute("tabindex", "-1");
    section.classList.add("focus:outline-none");
  }
  section.focus({ preventScroll: true });
}

export function scrollToSection(id: string): boolean {
  const section = document.getElementById(id);
  if (!section) return false;

  const hash = `#${id}`;
  active?.kill();
  active = null;

  const distance = Math.abs(section.getBoundingClientRect().top);
  const screens = distance / Math.max(window.innerHeight, 1);
  const duration = window.matchMedia(MOTION_OK).matches
    ? Math.min(MAX_DURATION, Math.max(MIN_DURATION, MIN_DURATION + screens * PER_SCREEN))
    : 0;

  if (duration === 0) {
    gsap.set(window, { scrollTo: { y: section } });
    arrive(section, hash);
    return true;
  }

  announce(id);
  active = gsap.to(window, {
    scrollTo: {
      y: section,
      autoKill: true,
      onAutoKill: () => {
        active = null;
        announce(null);
      },
    },
    duration,
    ease: figmaEase("UI_IN_OUT"),
    onComplete: () => {
      active = null;
      announce(null);
      arrive(section, hash);
    },
  });
  return true;
}

export function onHashLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const href = event.currentTarget.getAttribute("href");
  if (!href?.startsWith("#") || href.length < 2) return;
  if (scrollToSection(decodeURIComponent(href.slice(1)))) event.preventDefault();
}
