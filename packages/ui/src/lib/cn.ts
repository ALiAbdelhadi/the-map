/** Joins class names, dropping anything falsy. No dependency, no merge magic. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
