#!/bin/bash

echo "🚀 Deploying to Vercel Preview Environment..."
echo "This will create a unique preview URL without affecting production"

# Deploy to preview (not production)
# This creates a unique URL like: elira-landing-abc123.vercel.app
npx vercel --no-clipboard

# Or if you want to specify a name for the preview:
# npx vercel --no-clipboard --name elira-test-$(date +%s)

echo "✅ Preview deployment complete!"
echo "📝 Note: This URL is separate from your production deployment"