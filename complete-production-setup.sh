#!/bin/bash
set -e

echo "🚀 Complete Production Setup for Elira Landing"
echo "==============================================="

echo ""
echo "📋 Step 1: Adding all required environment variables to Vercel..."

# Get values from .env.local
AUTH_DOMAIN=$(grep NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN .env.local | cut -d'=' -f2)
STORAGE_BUCKET=$(grep NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET .env.local | cut -d'=' -f2)
MESSAGING_SENDER_ID=$(grep NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID .env.local | cut -d'=' -f2)
APP_ID=$(grep NEXT_PUBLIC_FIREBASE_APP_ID .env.local | cut -d'=' -f2)
MEASUREMENT_ID=$(grep NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID .env.local | cut -d'=' -f2)
CLIENT_EMAIL=$(grep FIREBASE_CLIENT_EMAIL .env.local | cut -d'=' -f2)
PRIVATE_KEY=$(grep FIREBASE_PRIVATE_KEY .env.local | cut -d'=' -f2-)
SENDGRID_API_KEY=$(grep SENDGRID_API_KEY .env.local | cut -d'=' -f2)
SENDGRID_FROM_EMAIL=$(grep SENDGRID_FROM_EMAIL .env.local | cut -d'=' -f2)
STRIPE_WEBHOOK_SECRET=$(grep STRIPE_WEBHOOK_SECRET .env.local | cut -d'=' -f2)
MUX_TOKEN_ID=$(grep MUX_TOKEN_ID .env.local | cut -d'=' -f2)
MUX_TOKEN_SECRET=$(grep MUX_TOKEN_SECRET .env.local | cut -d'=' -f2)

# Add Firebase environment variables
echo "Adding Firebase environment variables..."
echo "$AUTH_DOMAIN" | npx vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
echo "$STORAGE_BUCKET" | npx vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production
echo "$MESSAGING_SENDER_ID" | npx vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production
echo "$APP_ID" | npx vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production
echo "$MEASUREMENT_ID" | npx vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production
echo "$CLIENT_EMAIL" | npx vercel env add FIREBASE_CLIENT_EMAIL production
echo "$PRIVATE_KEY" | npx vercel env add FIREBASE_PRIVATE_KEY production

# Add service environment variables
echo "Adding service environment variables..."
echo "$SENDGRID_API_KEY" | npx vercel env add SENDGRID_API_KEY production
echo "$SENDGRID_FROM_EMAIL" | npx vercel env add SENDGRID_FROM_EMAIL production
echo "$STRIPE_WEBHOOK_SECRET" | npx vercel env add STRIPE_WEBHOOK_SECRET production
echo "$MUX_TOKEN_ID" | npx vercel env add MUX_TOKEN_ID production
echo "$MUX_TOKEN_SECRET" | npx vercel env add MUX_TOKEN_SECRET production

echo ""
echo "🔧 Step 2: Testing Firebase Functions..."
curl -s "https://api-5k33v562ya-ew.a.run.app/api/health" | jq .

echo ""
echo "📚 Step 3: Creating course data..."
curl -X POST "https://api-5k33v562ya-ew.a.run.app/api/seed-course-data" -H "Content-Type: application/json"

echo ""
echo "🏗️ Step 4: Building and deploying to Vercel..."
npm run build
npx vercel --prod

echo ""
echo "✅ Production setup complete!"
echo "🌐 Your app should now be fully functional at: https://elira-landing.vercel.app"
echo ""
echo "🧪 Test checklist:"
echo "- ✅ Layout and CSS working"
echo "- ⚠️ Authentication (requires env vars)"
echo "- ⚠️ Payment flow (requires env vars + Stripe config)"
echo "- ⚠️ Course access (requires payment completion)"
echo ""
echo "🔑 Don't forget to:"
echo "1. Configure Stripe webhook endpoint in Stripe dashboard"
echo "2. Test authentication flow"
echo "3. Test payment flow end-to-end"