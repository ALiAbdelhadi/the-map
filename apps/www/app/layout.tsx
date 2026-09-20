import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "The Map",
  description: "Your smart way to explore everything around you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
