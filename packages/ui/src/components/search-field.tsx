import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { prototype } from "../motion/tokens";
import { BlinkingCaret } from "./blinking-caret";
import { GradientBorder } from "./gradient-border";

/**
 * Service-areas location search.
 *
 * Figma `Search by location` — default `984:20301`, focus `984:20300`,
 * typing `984:20299`. Fill rgb(5 35 76 / .5), padding 24, radius 50,
 * leading icon 24, placeholder 24 px regular Natural/BG, trailing 36 px
 * circular Natural/BG button holding a 24 px icon. The focus and typing
 * variants add a 3 px primary/500 → white gradient stroke, faded in with a 1.022 s
 * `GENTLE` spring on hover or focus.
 * Phone (`1041:27905`): 341x65, the padding overflows and the row is centred.
 */
export type SearchFieldProps = {
  /** Field name submitted with the form. */
  name: string;
  /** Visible label text — rendered for assistive tech, matching Figma's placeholder. */
  label: string;
  placeholder: string;
  /** 24x24 leading icon. */
  icon: ReactNode;
  /** 24x24 icon inside the trailing button. */
  actionIcon: ReactNode;
  /** Accessible name for the trailing button (Figma shows a "use my location" target). */
  actionLabel: string;
  defaultValue?: string;
  className?: string;
};

export function SearchField({
  name,
  label,
  placeholder,
  icon,
  actionIcon,
  actionLabel,
  defaultValue,
  className,
}: SearchFieldProps) {
  const id = `search-${name}`;
  return (
    <div
      className={cn(
        "relative flex h-16.25 items-center gap-3 rounded-search border-3 border-transparent bg-surface-field px-6 text-bg tablet:h-auto tablet:p-6",
        className,
      )}
    >
      {/* Hover and focus variants (`984:20300`, `984:20299`): a 3 px gradient stroke. */}
      <GradientBorder
        mode="hover"
        width="-m-0.75 p-0.75"
        states={[
          null,
          [
            [0, "var(--color-primary-500)"],
            [1, "var(--color-white)"],
          ],
        ]}
        steps={[prototype.search.hover, prototype.search.hover]}
      />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      <span className="relative flex min-w-0 flex-1 items-center">
        {/*
          Typing variant (`984:20299`): the placeholder gives way to Figma's blinking
          cursor while the field is focused and empty; once there is text, the
          browser's own caret takes over.
        */}
        <input
          id={id}
          name={name}
          type="search"
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="peer min-w-0 flex-1 bg-transparent text-24 font-regular text-bg caret-bg outline-none placeholder:text-bg focus:placeholder:text-transparent focus:placeholder-shown:caret-transparent"
        />
        <BlinkingCaret className="absolute start-0 hidden peer-placeholder-shown:peer-focus:block" />
      </span>
      <button
        type="submit"
        aria-label={actionLabel}
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full bg-bg p-1",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg",
        )}
      >
        <span className="flex size-6 items-center justify-center text-primary-500">
          {actionIcon}
        </span>
      </button>
    </div>
  );
}
