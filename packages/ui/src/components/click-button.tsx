import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Primary call-to-action.
 *
 * Figma `Click here` — Default `996:20963`, Hover `997:21147`.
 * 165x58, px 20, py 8, radius 12, gap 7, label 24 px semibold,
 * trailing arrow 17x26. Default bg Secondary/500, hover bg primary/500.
 */
export type ClickButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  /** Trailing arrow, 17x26 in Figma. */
  arrow?: ReactNode;
};

export function ClickButton({
  children,
  arrow,
  className,
  type = "button",
  ...props
}: ClickButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-14.5 items-center justify-center gap-1.75 overflow-hidden rounded-button bg-secondary-500 px-5 py-2",
        "text-24 font-semibold text-bg",
        "hover:bg-primary-500",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className,
      )}
      {...props}
    >
      {children}
      {arrow ? <span className="flex h-6.5 w-4.25 shrink-0 items-center">{arrow}</span> : null}
    </button>
  );
}
