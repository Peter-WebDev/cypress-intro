import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === 'test' ? '.next-test' : '.test',
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
