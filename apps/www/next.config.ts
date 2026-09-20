import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // packages/ui ships TypeScript source (just-in-time package), so the app compiles it.
  transpilePackages: ["@themap/ui"],
};

export default nextConfig;
