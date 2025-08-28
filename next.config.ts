import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === 'test' ? '.next-test' : '.test',
  turbopack: {
    root: path.join(__dirname, '..'),
  },
};

export default nextConfig;
