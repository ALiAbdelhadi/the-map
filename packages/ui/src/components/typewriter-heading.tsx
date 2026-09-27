"use client";

import { useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { revealOnce } from "../motion/reveal";
import { prototype } from "../motion/tokens";

/**
 * Heading that types itself once, when it scrolls into view.
 *
 * Figma `Trust Built on Real Reviews` (`1028:23286`) is a typewriter. Approved
 * 2026-09-22: it types once rather than looping, one character every 45 ms behind a
 * caret that fades away when the line is complete.
 *
 * The full heading is laid out invisibly underneath, so the line keeps its final
 * width and position while it types — nothing re-centres or jumps — and the
 * gradient spans the whole heading from the first letter. Typing grows the visible
 * text by whole grapheme clusters from a substring, so Arabic letters stay joined.
 * The full heading is the accessible name throughout; before JavaScript runs and
 * under reduced motion it is simply shown complete.
 */
export type TypewriterHeadingProps = {
  children: string;
  className?: string;
  /** Classes for the text itself — where the gradient goes. */
  textClassName?: string;
};

function graphemes(text: string): string[] {
  const Segmenter = (Intl as { Segmenter?: typeof Intl.Segmenter }).Segmenter;
  if (!Segmenter) return Array.from(text);
  return Array.from(
    new Segmenter(undefined, { granularity: "grapheme" }).segment(text),
    (s) => s.segment,
  );
}

export function TypewriterHeading({ children, className, textClassName }: TypewriterHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  // null: show everything (server render, reduced motion, finished).
  const [count, setCount] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const pieces = graphemes(children);

  useGSAP(
    () => {
      const heading = ref.current;
      if (!heading) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        setCount(0);
        const progress = { value: 0 };
        let caretFade: gsap.core.Tween | undefined;
        const finish = () => {
          setCount(null);
          setTyping(false);
        };
        const tween = gsap.to(progress, {
          value: pieces.length,
          duration: pieces.length * prototype.typewriter.perChar,
          ease: "none",
          paused: true,
          onStart: () => {
            setTyping(true);
          },
          onUpdate: () => {
            setCount(Math.round(progress.value));
          },
          onComplete: () => {
            setCount(null);
            // Only this heading's caret; the fade is killed with the rest on revert.
            caretFade = gsap.to(heading.querySelector("[data-caret]"), {
              opacity: 0,
              ...figmaTween(prototype.typewriter.caret),
              delay: 0.4,
              onComplete: () => {
                setTyping(false);
              },
            });
          },
        });
        // revealOnce: if the page loaded or jumped past the heading, it is shown
        // complete at once rather than typing off-screen.
        const trigger = revealOnce({
          trigger: heading,
          start: "top 85%",
          reveal: (instant) => {
            if (instant) finish();
            else tween.play();
          },
        });
        return () => {
          trigger.kill();
          tween.kill();
          caretFade?.kill();
          finish();
        };
      });
      return () => {
        mm.revert();
      };
    },
    // Revert on every change of text, so a stale trigger or tween never outlives it.
    { scope: ref, dependencies: [children], revertOnUpdate: true },
  );

  const typed = count === null ? children : pieces.slice(0, count).join("");

  return (
    <h2 ref={ref} aria-label={children} className={cn("flex justify-center", className)}>
      <span aria-hidden="true" className={cn("grid", textClassName)}>
        {/* The finished heading, invisible, holds the line's width and place. */}
        <span className="invisible col-start-1 row-start-1">{children}</span>
        <span className="col-start-1 row-start-1 text-start">
          {typed}
          {typing ? (
            <span
              data-caret=""
              className="ms-0.5 -me-1.25 inline-block h-[0.9em] w-0.75 translate-y-[0.1em] rounded-full bg-primary-500 align-baseline"
            />
          ) : null}
        </span>
      </span>
    </h2>
  );
}
