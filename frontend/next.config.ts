import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
      "@/pages-section": path.join(__dirname, "src/pages-section"),
      "@/components": path.join(__dirname, "src/components"),
      "@/types": path.join(__dirname, "src/types"),
      "@/services": path.join(__dirname, "src/services"),
      "@/hooks": path.join(__dirname, "src/hooks"),
      "@/utils": path.join(__dirname, "src/utils"),
    };
    return config;
  },
  reactStrictMode: true,
  /* config options here */
  experimental: {
    turbo: {
      rules: {},
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
