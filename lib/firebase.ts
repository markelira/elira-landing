import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCzHstrXjJjSAomfNUXNW3qdNeY8y614DI",
  authDomain: "elira-landing.firebaseapp.com",
  projectId: "elira-landing",
  storageBucket: "elira-landing.firebasestorage.app",
  messagingSenderId: "651802555158",
  appId: "1:651802555158:web:73d3c330615f0a02c89637",
  measurementId: "G-62PNN5TT2Q"
};

// Initialize Firebase only if it hasn't been initialized already
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (client-side only)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;