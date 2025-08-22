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

// Mount routes
app.post('/api/subscribe', subscribeHandler);

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