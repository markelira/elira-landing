import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Static export for Firebase Hosting
  images: {
    unoptimized: true, // Required for static export
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: true, // Better for static hosting
  
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Compression
  compress: true,
  
  // Experimental optimizations (disabled for build stability)
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@hookform/resolvers',
      'react-hook-form'
    ],
  },
  
  // Bundle analyzer (conditional)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config: any, { isServer }: { isServer: boolean }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        );
      }
      return config;
    },
  }),
  
  // Headers not supported with static export
};

export default nextConfig;
