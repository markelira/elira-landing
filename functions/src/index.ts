import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

// Initialize Firebase Admin
admin.initializeApp();

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Import route handlers
import { subscribeHandler } from './routes/subscribe';
import { initStats } from './routes/init-stats';
import { registerHandler, googleCallbackHandler, updateLoginHandler } from './routes/auth';
import { getProfileHandler, linkDownloadsHandler, updateProfileHandler } from './routes/user';
import { createSessionHandler, stripeWebhookHandler, getPaymentStatusHandler } from './routes/payment';

// Mount routes
app.post('/api/subscribe', subscribeHandler);
app.post('/api/init-stats', initStats);

// Auth routes
app.post('/api/auth/register', registerHandler);
app.post('/api/auth/google-callback', googleCallbackHandler);
app.post('/api/user/update-login', updateLoginHandler);

// User routes
app.get('/api/user/profile', getProfileHandler);
app.post('/api/user/link-downloads', linkDownloadsHandler);
app.put('/api/user/profile', updateProfileHandler);

// Payment routes
app.post('/api/payment/create-session', createSessionHandler);
app.post('/api/payment/webhook', stripeWebhookHandler);
app.get('/api/payment/status/:sessionId', getPaymentStatusHandler);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'elira-functions' 
  });
});

// Export as Firebase Function - deploy to europe-west1 to match App Engine region
export const api = onRequest(
  {
    region: 'europe-west1',
    cors: true
  },
  app
);