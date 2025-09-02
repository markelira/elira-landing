import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { verifyWebhookSignature } from './services/stripe';

// Initialize Firebase Admin if not already done
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT || 'elira-landing-ce927',
    storageBucket: 'elira-landing-ce927.firebasestorage.app'
  });
}

const db = admin.firestore();

// Dedicated webhook function that preserves raw body
export const webhook = onRequest(
  {
    region: 'europe-west1',
    cors: false, // Webhooks don't need CORS
    secrets: [
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'SENDGRID_API_KEY'
    ]
  },
  async (req, res) => {
    console.log('🪝 Dedicated webhook function called');
    
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }
    
    try {
      const signature = req.headers['stripe-signature'] as string;
      
      if (!signature) {
        console.error('🚨 Missing stripe-signature header');
        res.status(400).json({ error: 'Missing stripe-signature header' });
        return;
      }

      // Get raw body directly from Cloud Functions request
      const rawBody = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);
      
      console.log('📦 Direct webhook body:', {
        hasRawBody: !!req.rawBody,
        bodyType: typeof req.body,
        rawBodyLength: rawBody.length,
        bodyPreview: rawBody.substring(0, 100)
      });
      
      // Verify webhook signature
      const event = verifyWebhookSignature(rawBody, signature);
      if (!event) {
        console.error('🚨 Invalid webhook signature');
        res.status(400).json({ error: 'Invalid signature' });
        return;
      }
      
      console.log('✅ Webhook signature verified!', event.type);
      
      // Process webhook events
      if (event.type === 'checkout.session.completed') {
        console.log('💳 Processing checkout completed...');
        
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const courseId = session.metadata?.courseId || 'default-course';
        
        console.log('💳 CHECKOUT COMPLETED:', {
          sessionId: session.id,
          userId,
          courseId,
          customerEmail: session.customer_details?.email,
          amount: session.amount_total,
          metadata: session.metadata
        });
        
        if (!userId) {
          console.error('🚨 No userId in session metadata');
          res.json({ received: true });
          return;
        }
        
        // Use predictable document ID that matches enrollment check expectations
        const enrollmentId = `${userId}_${courseId}`;
        
        // Check if enrollment already exists to prevent duplicates
        const existingEnrollment = await db.collection('enrollments').doc(enrollmentId).get();

        if (existingEnrollment.exists) {
          console.log(`⚠️ Enrollment already exists:`, {
            enrollmentId,
            userId,
            courseId,
            documentPath: `enrollments/${enrollmentId}`
          });
        } else {
          // Create proper enrollment record with predictable ID
          const enrollmentData = {
            userId,
            courseId,
            courseTitle: courseId === 'ai-copywriting-course' ? 'AI Copywriting Mastery Kurzus' : 'Unknown Course',
            status: 'active',
            enrolledAt: admin.firestore.FieldValue.serverTimestamp(),
            completedLessons: [],
            totalLessons: 12, // Default for ai-copywriting-course
            progressPercentage: 0,
            lastAccessedAt: admin.firestore.FieldValue.serverTimestamp()
          };

          // Create enrollment with predictable document ID
          await db.collection('enrollments').doc(enrollmentId).set(enrollmentData);
          console.log(`✅ Enrollment created:`, {
            enrollmentId,
            userId,
            courseId,
            documentPath: `enrollments/${enrollmentId}`
          });
        }

        // Update user document for backward compatibility
        const userUpdateData: any = {
          lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
          enrolledCourses: admin.firestore.FieldValue.arrayUnion(courseId)
        };

        // For backward compatibility, still set courseAccess for default course
        if (courseId === 'default-course' || courseId === 'ai-copywriting-course') {
          userUpdateData.courseAccess = true;
          userUpdateData.courseAccessGrantedAt = admin.firestore.FieldValue.serverTimestamp();
        }

        await db.collection('users').doc(userId).update(userUpdateData);
        console.log(`✅ User document updated for ${userId}`);
      }
      
      res.json({ received: true });
    } catch (error) {
      console.error('🚨 Webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  }
);