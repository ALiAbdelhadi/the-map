import { ar } from "./ar";
import { en } from "./en";
import type { SiteContent } from "./types";

const CONTENT = { en, ar } as const;

export type Locale = keyof typeof CONTENT;

export const LOCALES = Object.keys(CONTENT) as Locale[];

export function hasLocale(value: string): value is Locale {
  return value in CONTENT;
}

export function getContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}
