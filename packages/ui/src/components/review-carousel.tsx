"use client";

import { type ReactNode, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { figmaTween } from "../motion/figma-easing";
import { gsap, MOTION_OK, useGSAP } from "../motion/gsap";
import { prototype } from "../motion/tokens";
import { measureSizes, morphSizes, type Sizes } from "../motion/size-morph";
import { ReviewCard } from "./review-card";

export type Review = {
  id: string;
  name: string;
  rating: string;
  quote: string;
  photo: ReactNode;
};

export type ReviewCarouselProps = {
  reviews: Review[];
  ratingIcon: ReactNode;
  quoteMark?: ReactNode;
  label: string;
  className?: string;
};

export function ReviewCarousel({
  reviews,
  ratingIcon,
  quoteMark,
  label,
  className,
}: ReviewCarouselProps) {
  const [expandedId, setExpandedId] = useState(reviews[0]?.id ?? "");
  const ref = useRef<HTMLUListElement>(null);
  const before = useRef<{ sizes: Sizes; from: string } | null>(null);

  const expand = (id: string) => {
    if (id === expandedId || !ref.current) return;
    before.current = {
      sizes: measureSizes(ref.current.querySelectorAll("[data-review], [data-review-photo]")),
      from: expandedId,
    };
    setExpandedId(id);
  };

  useGSAP(
    () => {
      const root = ref.current;
      const saved = before.current;
      before.current = null;
      if (!root || !saved) return;

      const texts = root.querySelectorAll("[data-review-text]");
      const oldText = root.querySelector(`[data-review='${saved.from}'] [data-review-text]`);
      const newText = root.querySelector(`[data-review='${expandedId}'] [data-review-text]`);
      const inline = oldText instanceof HTMLElement ? oldText.style.opacity : "";
      const oldOpacity = inline === "" ? 1 : Number(inline);
      gsap.killTweensOf(texts);
      gsap.set(texts, { clearProps: "opacity,visibility,transform" });
      if (!window.matchMedia(MOTION_OK).matches) return;

      const move = figmaTween(prototype.reviews.click);
      morphSizes(saved.sizes, move, ["width"]);
      gsap.fromTo(
        oldText,
        { autoAlpha: oldOpacity },
        { autoAlpha: 0, duration: 0.15, ease: "none", clearProps: "opacity,visibility" },
      );
      gsap.fromTo(
        newText,
        { autoAlpha: 0, x: 12 },
        {
          autoAlpha: 1,
          x: 0,
          ...figmaTween(prototype.hover.border),
          delay: move.duration * 0.55,
          clearProps: "opacity,visibility,transform",
        },
      );
    },
    { scope: ref, dependencies: [expandedId] },
  );

  return (
    <ul
      ref={ref}
      aria-label={label}
      className={cn("flex list-none items-center gap-5 desktop:gap-review-gap", className)}
    >
      {reviews.map((review) => (
        <li key={review.id} className="contents">
          <ReviewCard
            id={review.id}
            name={review.name}
            rating={review.rating}
            quote={review.quote}
            photo={review.photo}
            ratingIcon={ratingIcon}
            {...(quoteMark ? { quoteMark } : {})}
            expanded={expandedId === review.id}
            onExpand={() => {
              expand(review.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
