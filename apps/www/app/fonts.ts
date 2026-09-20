import { Baloo_2, Baloo_Bhaijaan_2 } from "next/font/google";

/**
 * Baloo 2 is the only family in the Figma file (node 853:18553).
 *
 * Baloo 2 has no Arabic glyphs, so the Arabic frames in Figma render with a
 * fallback rather than a chosen typeface. Baloo Bhaijaan 2 — the Arabic sibling
 * from the same superfamily — was approved for Arabic. See docs/figma-gaps.md T1.
 */
export const baloo2 = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baloo-2",
});

export const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-baloo-bhaijaan-2",
});
