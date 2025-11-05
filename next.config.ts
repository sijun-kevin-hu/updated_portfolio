import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {},
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
