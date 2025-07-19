import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  experimental: {
    turbo: {
      rules: {},
    },
  },
};

export default nextConfig;
