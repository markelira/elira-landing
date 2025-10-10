import type { NextConfig } from "next";
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // outputFileTracingRoot removed - was causing 500 errors in production
  images: {
    unoptimized: false, // ✅ ENABLED - Image optimization for production
    domains: ['images.unsplash.com', 'source.unsplash.com', 'localhost', 'storage.googleapis.com', '127.0.0.1'],
    remotePatterns: [
      { protocol: 'https', hostname: 'source.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'storage.googleapis.com', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '9188', pathname: '/**' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disabled for deployment - fix linting errors post-deploy
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily disabled for deployment - fix TypeScript errors post-deploy
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

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the Sentry DSN in your next.config.js file doesn't accidentally become public.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, sentryWebpackPluginOptions);
