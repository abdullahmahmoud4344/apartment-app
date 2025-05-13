import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(process.env.NEXT_PUBLIC_API_URL + "/**"),
      new URL(
        process.env.NEXT_PUBLIC_API_URL!.replace("api", "localhost") + "/**"
      ),
    ],
  },
};

export default nextConfig;
