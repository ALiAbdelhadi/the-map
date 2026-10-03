import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "../lib/cn";

export type ClickButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
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
        "text-24 font-semibold text-bg select-none",
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
