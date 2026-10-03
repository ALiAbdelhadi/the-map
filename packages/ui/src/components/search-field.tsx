import type { ReactNode } from "react";

import { cn } from "../lib/cn";
import { prototype } from "../motion/tokens";
import { BlinkingCaret } from "./blinking-caret";
import { GradientBorder } from "./gradient-border";

export type SearchFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  icon: ReactNode;
  actionIcon: ReactNode;
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
        "relative flex h-16.25 items-center gap-3 rounded-search bg-surface-field px-6 text-bg tablet:h-auto tablet:p-6",
        className,
      )}
    >
      <GradientBorder
        mode="hover"
        width="p-0.75"
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
        <input
          id={id}
          name={name}
          type="search"
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="peer -my-1 min-w-0 flex-1 bg-transparent py-1 text-ellipsis text-24 font-regular rtl:text-20 tablet:rtl:text-24 text-bg caret-bg outline-none placeholder:text-bg focus:placeholder:text-transparent focus:placeholder-shown:caret-transparent"
        />
        <BlinkingCaret className="absolute start-0 hidden peer-placeholder-shown:peer-focus:block" />
      </span>
      <button
        type="submit"
        aria-label={actionLabel}
        className={cn(
          "relative flex size-9 shrink-0 items-center justify-center rounded-full bg-bg p-1 select-none",
          "before:absolute before:-inset-1 before:rounded-full",
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
