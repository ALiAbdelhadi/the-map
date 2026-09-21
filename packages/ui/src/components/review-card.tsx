import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * A single review.
 *
 * Figma `Real Reviews` `1015:20919` (variants `1015:20916`–`1015:20919`).
 * - expanded: 415 wide, primary/50 fill, 1 px primary/300 border, radius 17,
 *   pe 24, Reviews shadow; 107x307 photo with a 1 px primary/500 border and the
 *   Click-here shadow; name 24 px primary/400, rating 16 px Natural/600,
 *   body 24 px primary/950, quote mark 53 px.
 * - collapsed: 210x307 photo card, white fill, 1 px primary/300 border, radius 17.
 */
export type ReviewCardProps = {
  name: string;
  /** Rating as written in Figma, e.g. "5/5". */
  rating: string;
  quote: string;
  /** Portrait, rendered by the caller (next/image in the app). */
  photo: ReactNode;
  /** 24x24 rating icon. */
  ratingIcon: ReactNode;
  /** 53x53 decorative quote mark. */
  quoteMark?: ReactNode;
  expanded: boolean;
  onExpand?: () => void;
  /** Shared by both states so a Flip can animate one into the other. */
  flipId?: string;
  className?: string;
};

export function ReviewCard({
  name,
  rating,
  quote,
  photo,
  ratingIcon,
  quoteMark,
  expanded,
  onExpand,
  flipId,
  className,
}: ReviewCardProps) {
  if (!expanded) {
    return (
      <button
        type="button"
        data-flip-id={flipId}
        onClick={onExpand}
        aria-label={name}
        aria-expanded={false}
        className={cn(
          "h-76.75 w-full max-w-52.5 shrink-0 overflow-hidden rounded-review border border-primary-300 bg-white shadow-click",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          className,
        )}
      >
        {photo}
      </button>
    );
  }

  return (
    <figure
      data-review-expanded=""
      data-flip-id={flipId}
      className={cn(
        "flex w-full max-w-103.75 shrink-0 items-center gap-3.5 overflow-hidden rounded-review border border-primary-300 bg-primary-50 pe-6 shadow-review",
        className,
      )}
    >
      <div className="h-76.75 w-26.75 shrink-0 overflow-hidden rounded-review border border-primary-500 bg-white shadow-click">
        {photo}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 py-4">
        <figcaption className="flex flex-col gap-3.75">
          <span className="text-center text-24 font-regular text-primary-400">{name}</span>
          <span className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center">{ratingIcon}</span>
            <span className="text-16 font-regular text-natural-600">{rating}</span>
          </span>
        </figcaption>
        <blockquote className="text-center text-24 font-regular text-primary-950">
          {quote}
        </blockquote>
        {quoteMark ? (
          <span aria-hidden="true" className="flex size-13.25 self-end">
            {quoteMark}
          </span>
        ) : null}
      </div>
    </figure>
  );
}
