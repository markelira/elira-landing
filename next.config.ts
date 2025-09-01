import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'source.unsplash.com', 'localhost', 'storage.googleapis.com', '127.0.0.1'],
    remotePatterns: [
      { protocol: 'https', hostname: 'source.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '9188', pathname: '/**' },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@hookform/resolvers',
      'react-hook-form',
      '@mux/mux-player-react',
      '@tanstack/react-query'
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};

export default nextConfig;
