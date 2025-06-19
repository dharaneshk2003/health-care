import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },/* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // or '10mb' depending on your image sizes
    },
  },
};

export default nextConfig;
