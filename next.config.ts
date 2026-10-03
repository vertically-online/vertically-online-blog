import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vertically.online" }],
        destination: "https://vertically.online/:path*",
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
