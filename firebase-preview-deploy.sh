#!/bin/bash

echo "🔥 Deploying to Firebase Preview Channel..."
echo "This creates a temporary preview URL for testing"

# Build the production version
npm run build

# Deploy to a preview channel (expires in 7 days by default)
firebase hosting:channel:deploy preview-test --expires 7d

echo "✅ Preview deployment complete!"
echo "📝 Your preview URL will be displayed above"
echo "⏰ This preview expires in 7 days"

# To make it permanent preview:
# firebase hosting:channel:deploy staging