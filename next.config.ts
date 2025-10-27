import type { NextConfig } from "next";

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL?.replace(/^https?:\/\//, '') || 'localhost:1337';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: cmsUrl.split(':')[0],
        port: cmsUrl.split(':')[1] || '',
        pathname: '/uploads/**',
      }
    ],
  },
};

export default nextConfig;
