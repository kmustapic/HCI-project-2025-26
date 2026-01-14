import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
<<<<<<< HEAD
=======
      {
        protocol: 'https',
        hostname: 'ihzsvzzmtbzeqmkokhwo.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
>>>>>>> 019dc6f... Added final project version
    ],
  },
};

export default nextConfig;
