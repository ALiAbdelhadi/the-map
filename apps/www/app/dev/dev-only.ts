import { notFound } from "next/navigation";

/**
 * Dev pages (`/dev/*`) are review surfaces, not part of the site.
 *
 * They render in development, and in a production build only when
 * `NEXT_PUBLIC_ENABLE_DEV_PAGES=1` is set — which is how a preview deploy can
 * expose them for design review, and how they are checked in a real SSR build.
 * Otherwise they 404.
 */
export function assertDevPage() {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ENABLE_DEV_PAGES !== "1") {
    notFound();
  }
}
