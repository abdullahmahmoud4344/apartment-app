import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // devIndicators: { autoPrerender: false },
  images: {
    remotePatterns: [new URL("http://localhost:3001/**")],
  },
};

export default nextConfig;
