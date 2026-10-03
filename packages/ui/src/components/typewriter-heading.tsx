"use client";

import { useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { revealOnce } from "../motion/reveal";
import { prototype } from "../motion/tokens";

export type TypewriterHeadingProps = {
  children: string;
  className?: string;
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
    { scope: ref, dependencies: [children], revertOnUpdate: true },
  );

  const typed = count === null ? children : pieces.slice(0, count).join("");

  return (
    <h2 ref={ref} aria-label={children} className={cn("flex justify-center", className)}>
      <span aria-hidden="true" className={cn("grid", textClassName)}>
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
