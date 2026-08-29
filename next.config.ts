import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL('https://ac.goit.global/fullstack/career/campers/**'),
    ],
  },
};

export default nextConfig;
