import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@/pages-section"] = path.join(
      __dirname,
      "src/pages-section"
    );
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
