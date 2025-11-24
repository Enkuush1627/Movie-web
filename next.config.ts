import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    TMDB_IMAGE_SERVICE_URL: process.env.TMDB_IMAGE_SERVICE_URL,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
