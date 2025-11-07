import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // ảnh random avatar
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // ảnh random demo
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net", // Facebook avatar (nếu có)
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com", // Google avatar
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com", // GitHub avatar
      },
      {
        protocol: "https",
        hostname: "**.imgur.com", // Imgur (nếu dùng)
      },
    ],
  },
};

export default nextConfig;
