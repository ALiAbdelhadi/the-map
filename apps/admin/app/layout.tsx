import type { Metadata } from "next";

import { Sidebar } from "../components/sidebar";
import { bagelFatOne, baloo2 } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Map Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${baloo2.variable} ${bagelFatOne.variable}`}>
      <body className="flex bg-neutral-50 font-sans text-primary-950 antialiased">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </body>
    </html>
  );
}
