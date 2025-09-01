#!/bin/bash

# Elira Production Deployment Script
set -e

echo "🚀 Starting Elira production deployment..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out public/_next public/*.html public/*.js public/*.css

# Build the application
echo "🔨 Building Next.js application..."
NODE_ENV=production npm run build

# Copy static assets to public directory
echo "📁 Copying static assets..."
cp -r .next/static public/_next/ 2>/dev/null || echo "No static directory found"
cp -r .next/server/app/* public/ 2>/dev/null || echo "No server app directory found"

# Deploy to Firebase
echo "🔥 Deploying to Firebase..."
firebase deploy --force

echo "✅ Deployment complete!"
echo "🌐 Production URL: https://elira-landing-ce927.web.app"
echo "🌐 Custom Domain: https://elira.hu"