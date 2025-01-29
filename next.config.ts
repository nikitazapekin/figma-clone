import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};



module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },
};



export default nextConfig;
