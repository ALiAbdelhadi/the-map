import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // packages/ui ships TypeScript source (just-in-time package), so the app compiles it.
  transpilePackages: ["@themap/ui"],
  // The rasters are already encoded at high quality from the Figma sources; the
  // optimizer's default of 75 re-compresses them a second time and visibly blurs
  // them. Every <Image> resolves to the closest configured quality.
  images: { qualities: [90] },
  // The site lives under a locale segment; the bare root goes to English.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
