#!/bin/bash

# Firebase Migration Script
# This script helps migrate from elira-landing to a new Firebase project

set -e

echo "Firebase Project Migration Script"
echo "================================="
echo ""

# Check if new project name is provided
if [ -z "$1" ]; then
    echo "Usage: ./migrate-firebase.sh <new-project-id>"
    echo "Example: ./migrate-firebase.sh elira-landing-v2"
    exit 1
fi

NEW_PROJECT_ID=$1
OLD_PROJECT_ID="elira-landing"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="firebase-backup-$TIMESTAMP"

echo "Migrating from: $OLD_PROJECT_ID"
echo "Migrating to: $NEW_PROJECT_ID"
echo ""

# Step 1: Create backup directory
echo "Step 1: Creating backup directory..."
mkdir -p $BACKUP_DIR

# Step 2: Backup current configuration
echo "Step 2: Backing up current configuration..."
cp .firebaserc $BACKUP_DIR/.firebaserc.backup
cp firebase.json $BACKUP_DIR/firebase.json.backup
if [ -f .env.local ]; then
    cp .env.local $BACKUP_DIR/.env.local.backup
fi
echo "✓ Configuration backed up to $BACKUP_DIR"

# Step 3: Export Firestore data
echo ""
echo "Step 3: Exporting Firestore data..."
echo "Run this command in Google Cloud Console:"
echo "gcloud firestore export gs://$OLD_PROJECT_ID.appspot.com/firestore-backup-$TIMESTAMP --project=$OLD_PROJECT_ID"
echo ""
read -p "Press Enter after export is complete..."

# Step 4: Update .firebaserc
echo ""
echo "Step 4: Updating .firebaserc..."
cat > .firebaserc << EOF
{
  "projects": {
    "default": "$NEW_PROJECT_ID"
  }
}
EOF
echo "✓ Updated .firebaserc"

# Step 5: Create environment variable template
echo ""
echo "Step 5: Creating new environment variable template..."
cat > .env.local.new << EOF
# Firebase Configuration - UPDATE THESE VALUES
NEXT_PUBLIC_FIREBASE_API_KEY=your-new-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEW_PROJECT_ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEW_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEW_PROJECT_ID.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-new-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-new-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-new-measurement-id

# Firebase Admin SDK - UPDATE FROM SERVICE ACCOUNT
FIREBASE_PROJECT_ID=$NEW_PROJECT_ID
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="your-private-key"

# Keep these the same
SENDGRID_API_KEY=$(grep SENDGRID_API_KEY .env.local 2>/dev/null | cut -d '=' -f2- || echo "your-sendgrid-key")
DISCORD_WEBHOOK_URL=$(grep DISCORD_WEBHOOK_URL .env.local 2>/dev/null | cut -d '=' -f2- || echo "your-discord-webhook")
EOF
echo "✓ Created .env.local.new - Please update with values from new Firebase project"

# Step 6: Import instructions
echo ""
echo "Step 6: Import Firestore data to new project"
echo "Run this command after creating the new project:"
echo "gcloud firestore import gs://$OLD_PROJECT_ID.appspot.com/firestore-backup-$TIMESTAMP --project=$NEW_PROJECT_ID"
echo ""

# Step 7: Final steps
echo "================================="
echo "Migration Preparation Complete!"
echo "================================="
echo ""
echo "Next steps:"
echo "1. Create new Firebase project at https://console.firebase.google.com"
echo "   - Name: $NEW_PROJECT_ID"
echo "   - Location: europe-west"
echo "   - Enable billing with working account"
echo ""
echo "2. Enable these APIs in Google Cloud Console:"
echo "   - Compute Engine API"
echo "   - Cloud Functions API"
echo "   - Cloud Build API"
echo "   - Artifact Registry API"
echo ""
echo "3. Get Firebase config from Project Settings and update .env.local.new"
echo ""
echo "4. Create service account and download JSON key:"
echo "   - Go to IAM & Admin > Service Accounts"
echo "   - Create service account with Firebase Admin role"
echo "   - Download JSON key and update .env.local.new"
echo ""
echo "5. Rename .env.local.new to .env.local"
echo ""
echo "6. Deploy to new project:"
echo "   firebase use $NEW_PROJECT_ID"
echo "   firebase deploy"
echo ""
echo "Backup stored in: $BACKUP_DIR"