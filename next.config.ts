import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tlthxybcabesrvkkduuw.supabase.co",
        pathname: "/storage/v1/object/public/berita/**",
      },
      {
        protocol: "https",
        hostname: "tlthxybcabesrvkkduuw.supabase.co",
        pathname: "/storage/v1/object/public/banner/**",
      },
    ],
  },
};

export default nextConfig;
