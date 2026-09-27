import { notFound } from "next/navigation";

export function assertDevPage() {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ENABLE_DEV_PAGES !== "1") {
    notFound();
  }
}
