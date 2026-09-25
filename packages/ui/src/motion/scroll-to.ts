"use client";

import type { MouseEvent } from "react";

import { figmaEase } from "./figma-easing";
import { gsap, MOTION_OK } from "./gsap";

/**
 * Smooth scrolling for in-page links (`href="#section"`).
 *
 * Not in Figma (its prototype jumps between frames). The page glides to the section
 * with the site's move curve, `UI_IN_OUT` (figma-easing.ts), for a time that grows with
 * the distance: 0.6 s plus 0.1 s per screen travelled, capped at 1.2 s, so a hop to
 * the next section and a trip across the whole page both read as one deliberate move.
 * With reduced motion the page jumps. Without JavaScript the plain `href` still jumps.
 *
 * When the move ends the hash is written to the address bar (the language switch
 * carries `location.hash` across) and focus moves to the section, so keyboard and
 * screen-reader users continue from where the page now is. Wheel or touch input
 * during the move cancels it (`autoKill`) and leaves the page where the visitor took it.
 *
 * The header floats over the hero (absolute, not sticky), so no offset is needed.
 */
const MIN_DURATION = 0.6;
const MAX_DURATION = 1.2;
const PER_SCREEN = 0.1;

/**
 * Fired on `window` when a smooth scroll starts (`detail` = target id) and when it
 * ends or is cancelled (`detail` = null). The header's scroll-spy follows the target
 * instead of every section the page passes on the way.
 */
export const SECTION_SCROLL_EVENT = "themap:section-scroll";

let active: gsap.core.Tween | null = null;

function announce(id: string | null) {
  window.dispatchEvent(new CustomEvent<string | null>(SECTION_SCROLL_EVENT, { detail: id }));
}

function arrive(section: HTMLElement, hash: string) {
  if (window.location.hash !== hash) {
    // Keep Next's router state on the entry; only the fragment changes.
    window.history.pushState(window.history.state, "", hash);
  }
  if (!section.hasAttribute("tabindex")) {
    section.setAttribute("tabindex", "-1");
    // The section is a focus target for assistive tech, not a control: no ring.
    section.classList.add("focus:outline-none");
  }
  section.focus({ preventScroll: true });
}

/** Scroll the window to the element with this id. Returns false if there is none. */
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

/** onClick for an in-page link: plain left clicks glide; anything else is left to the browser. */
export function onHashLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const href = event.currentTarget.getAttribute("href");
  if (!href?.startsWith("#") || href.length < 2) return;
  if (scrollToSection(decodeURIComponent(href.slice(1)))) event.preventDefault();
}
