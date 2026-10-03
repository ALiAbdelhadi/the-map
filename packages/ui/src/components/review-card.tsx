import type { ReactNode } from "react";

import { cn } from "../lib/cn";

export type ReviewCardProps = {
  id: string;
  name: string;

  rating: string;

  quote: string;

  photo: ReactNode;

  ratingIcon: ReactNode;

  quoteMark?: ReactNode;

  expanded: boolean;
  onExpand: () => void;

  className?: string;
};

export function ReviewCard({
  id,
  name,
  rating,
  quote,
  photo,
  ratingIcon,
  quoteMark,
  expanded,
  onExpand,
  className,
}: ReviewCardProps) {
  return (
    <div
      data-review={id}
      className={cn(
        "relative h-52.75 shrink-0 overflow-hidden rounded-review border border-primary-300 desktop:h-review-h",
        "bg-primary-50",
        expanded
          ? "w-78.75 shadow-review desktop:w-review-open"
          : "w-22 shadow-click desktop:w-review-closed",
        className,
      )}
    >
      <button
        type="button"
        data-review-photo=""
        aria-label={name}
        aria-expanded={expanded}
        onClick={onExpand}
        className={cn(
          "absolute inset-y-0 start-0 overflow-hidden rounded-review select-none",
          "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-500",
          expanded
            ? "w-28.25 cursor-default border border-primary-500 bg-white shadow-click desktop:w-review-photo"
            : "w-full cursor-pointer",
        )}
      >
        {photo}
      </button>

      <figure
        data-review-text=""
        aria-hidden={!expanded}
        className={cn(
          "absolute inset-y-0 start-31.75 flex w-32.75 flex-col justify-center gap-3 desktop:start-review-text-start desktop:w-review-text desktop:gap-review-text-gap",
          expanded ? "" : "invisible opacity-0",
        )}
      >
        <figcaption className="flex flex-col gap-2 desktop:gap-review-caption-gap">
          <span className="text-start text-24 font-regular whitespace-nowrap text-primary-400 desktop:text-review-body">
            {name}
          </span>

          <span className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center">{ratingIcon}</span>

            <span className="text-16 font-regular text-natural-600">{rating}</span>
          </span>
        </figcaption>

        <blockquote className="text-justify text-14 font-regular text-primary-950 [text-align-last:center] desktop:text-review-body">
          {quote}
        </blockquote>

        {quoteMark ? (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -inset-e-11.25 bottom-0 flex size-9",
              "desktop:static desktop:mt-2 desktop:size-9 desktop:self-end",
              "desktop:rtl:mt-2",
            )}
          >
            <span className="flex size-full items-center justify-center">{quoteMark}</span>
          </span>
        ) : null}
      </figure>
    </div>
  );
}
