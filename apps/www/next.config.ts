import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // packages/ui ships TypeScript source (just-in-time package), so the app compiles it.
  transpilePackages: ["@themap/ui"],
  // The site lives under a locale segment; the bare root goes to English.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
