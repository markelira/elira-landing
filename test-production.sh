#!/bin/bash

echo "🎯 Production Testing Options"
echo "============================="
echo ""
echo "Choose your testing method:"
echo "1) Local Production Build (port 3001)"
echo "2) Vercel Preview Deployment"
echo "3) Firebase Preview Channel"
echo "4) Build Only (no server)"
echo ""
read -p "Enter choice (1-4): " choice

case $choice in
  1)
    echo "🔨 Building production version..."
    npm run build
    
    echo "🚀 Starting local production server on http://localhost:3001"
    echo "✅ This is completely isolated from your live site"
    PORT=3001 npm start
    ;;
    
  2)
    echo "🚀 Deploying to Vercel Preview..."
    echo "This will create a unique URL without affecting production"
    npx vercel --no-clipboard
    ;;
    
  3)
    echo "🔥 Deploying to Firebase Preview Channel..."
    npm run build
    
    # Generate unique channel name with timestamp
    CHANNEL_NAME="test-$(date +%Y%m%d-%H%M%S)"
    firebase hosting:channel:deploy $CHANNEL_NAME --expires 24h
    
    echo "✅ Preview URL created (expires in 24 hours)"
    ;;
    
  4)
    echo "🔨 Building production version only..."
    npm run build
    echo "✅ Build complete in .next directory"
    echo "📝 You can now inspect the build or deploy manually"
    ;;
    
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac