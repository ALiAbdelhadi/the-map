import type { Metadata } from "next";

import { baloo2 } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Map Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={baloo2.variable}>
      <body className="bg-neutral-50 font-sans text-primary-950 antialiased">{children}</body>
    </html>
  );
}
