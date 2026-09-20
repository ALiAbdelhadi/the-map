import type { ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Service-areas location search.
 *
 * Figma `Search by location` — default `984:20301`, focus `984:20300`,
 * typing `984:20299`. Fill rgb(5 35 76 / .5), padding 24, radius 50,
 * leading icon 24, placeholder 24 px regular Natural/BG, trailing 36 px
 * circular Natural/BG button holding a 24 px icon. The focus and typing
 * variants add a 3 px primary/500 border, which is reproduced with
 * :focus-within so the same element covers both states.
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
        "flex items-center gap-3 rounded-search border-3 border-transparent bg-surface-field p-6 text-bg",
        "focus-within:border-primary-500",
        className,
      )}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
      <input
        id={id}
        name={name}
        type="search"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="min-w-0 flex-1 bg-transparent text-24 font-regular text-bg caret-bg outline-none placeholder:text-bg"
      />
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
