import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hminjbdbqffrdrgenwpw.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'www.assnat.cm',
         pathname: '/**',
      },
    ],
  },  /* config options here */
};

export default nextConfig;
