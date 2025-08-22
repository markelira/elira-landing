# Elira Landing Page

Modern landing page for Elira's coaching services, built with Next.js and Firebase.

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Functions, Hosting)
- **Email**: SendGrid
- **Analytics**: Google Tag Manager
- **Deployment**: Firebase Hosting

## 📦 Features

- ✅ Responsive design with mobile-first approach
- ✅ Real-time statistics and activity feed
- ✅ Email capture with SendGrid integration
- ✅ Discord webhook notifications
- ✅ PDF lead magnets with selector modal
- ✅ Cookie consent banner
- ✅ Exit intent popup
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized with Open Graph tags
- ✅ TypeScript for type safety

## 🛠️ Setup

1. Clone the repository:
```bash
git clone https://github.com/markelira/elira-landing.git
cd elira-landing
```

2. Install dependencies:
```bash
npm install
cd functions && npm install && cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure Firebase:
```bash
firebase use --add
firebase deploy
```

## 🔧 Environment Variables

Create `.env.local` with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin SDK
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# SendGrid
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Discord
DISCORD_WEBHOOK_URL=

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=
```

## 📝 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Deploy to Firebase
firebase deploy
```

## 🔄 Firebase Functions

Functions are deployed to `europe-west1` region and include:
- `/api/health` - Health check endpoint
- `/api/subscribe` - Email subscription endpoint

## 📊 Firestore Collections

- `stats` - Global statistics (subscribers, discord members, etc.)
- `leads` - Email subscribers
- `activities` - Real-time activity feed
- `resources` - PDF resources metadata

## 🚢 Deployment

The site is automatically deployed to Firebase Hosting:
- Production: https://elira-landing-ce927.web.app

## 📄 License

All rights reserved. This is proprietary software for Elira's coaching business.

## 👤 Contact

For questions or support, contact: info@elira.hu