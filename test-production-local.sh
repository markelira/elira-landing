#!/bin/bash

echo "🔨 Building production version locally..."

# Build the production version
npm run build

echo "✅ Build complete!"
echo "🚀 Starting production server on port 3001..."

# Run production build on a different port to avoid conflicts
PORT=3001 npm start

# Alternative: You can also use serve package
# npx serve@latest out -p 3001