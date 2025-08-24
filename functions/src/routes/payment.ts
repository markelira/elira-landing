import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { 
  stripe, 
  createOrGetStripeCustomer, 
  createCheckoutSession, 
  verifyWebhookSignature,
  COURSE_CONFIG 
} from '../services/stripe';
import { sendLeadMagnetEmail } from '../services/sendgrid';
import { CreateSessionRequest, CreateSessionResponse, PaymentStatusResponse } from '../../../src/types/payment';

const db = admin.firestore();

// Create checkout session
export const createSessionHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!stripe) {
      res.status(503).json({
        success: false,
        error: 'Payment processing is currently unavailable'
      });
      return;
    }

    const { uid, email, successUrl, cancelUrl }: CreateSessionRequest = req.body;

    if (!uid || !email || !successUrl || !cancelUrl) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
      return;
    }

    // Get user document to get name
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    const userData = userDoc.data();
    if (!userData) {
      res.status(404).json({
        success: false,
        error: 'User data not found'
      });
      return;
    }

    // Check if user already has course access
    if (userData.courseAccess) {
      res.status(400).json({
        success: false,
        error: 'User already has course access'
      });
      return;
    }

    // Create or get Stripe customer
    const customerName = `${userData.firstName} ${userData.lastName}`;
    const customerId = await createOrGetStripeCustomer(email, customerName);

    if (!customerId) {
      res.status(500).json({
        success: false,
        error: 'Failed to create customer'
      });
      return;
    }

    // Create checkout session
    const session = await createCheckoutSession(
      customerId,
      uid,
      email,
      successUrl,
      cancelUrl
    );

    if (!session) {
      res.status(500).json({
        success: false,
        error: 'Failed to create checkout session'
      });
      return;
    }

    // Store payment record in Firestore
    const paymentData = {
      userId: uid,
      stripeSessionId: session.id,
      stripeCustomerId: customerId,
      amount: COURSE_CONFIG.price,
      currency: COURSE_CONFIG.currency,
      status: 'pending' as const,
      courseAccess: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection('payments').doc(session.id).set(paymentData);

    // Update user's stripeCustomerId if not already set
    if (!userData.stripeCustomerId) {
      await db.collection('users').doc(uid).update({
        stripeCustomerId: customerId
      });
    }

    const response: CreateSessionResponse = {
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url || ''
    };

    res.json(response);
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment session'
    });
  }
};

// Stripe webhook handler
export const stripeWebhookHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    
    if (!signature) {
      res.status(400).json({ error: 'Missing stripe-signature header' });
      return;
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(req.body, signature);
    if (!event) {
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }

    console.log('Processing Stripe webhook:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        console.log('Invoice payment succeeded:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// Handle successful checkout
async function handleCheckoutCompleted(session: any): Promise<void> {
  try {
    const sessionId = session.id;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error('No userId in session metadata');
      return;
    }

    console.log(`Processing completed checkout for user ${userId}, session ${sessionId}`);

    // Update payment record
    await db.collection('payments').doc(sessionId).update({
      status: 'completed',
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Grant course access to user
    await db.collection('users').doc(userId).update({
      courseAccess: true,
      courseAccessGrantedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });

    // Get user data for email
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (userData) {
      // Send course access confirmation email
      try {
        await sendLeadMagnetEmail(
          userData.email,
          userData.firstName,
          'course-access'
        );
        console.log(`Course access email sent to ${userData.email}`);
      } catch (emailError) {
        console.error('Failed to send course access email:', emailError);
      }

      // Log activity
      await db.collection('activities').add({
        user: `${userData.firstName} ${userData.lastName.charAt(0)}.`,
        action: 'megvásárolta a kurzust 🎉',
        platform: 'discord',
        type: 'achievement',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    console.log(`Course access granted to user ${userId}`);
  } catch (error) {
    console.error('Error handling checkout completed:', error);
  }
}

// Handle successful payment
async function handlePaymentSucceeded(paymentIntent: any): Promise<void> {
  try {
    const userId = paymentIntent.metadata?.userId;
    
    if (!userId) {
      console.error('No userId in payment intent metadata');
      return;
    }

    console.log(`Payment succeeded for user ${userId}`);
    
    // Update payment status if needed (usually already handled by checkout.session.completed)
    const paymentsQuery = await db.collection('payments')
      .where('userId', '==', userId)
      .where('status', '==', 'pending')
      .get();

    if (!paymentsQuery.empty) {
      const batch = db.batch();
      paymentsQuery.docs.forEach(doc => {
        batch.update(doc.ref, {
          status: 'completed',
          completedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });
      await batch.commit();
    }
  } catch (error) {
    console.error('Error handling payment succeeded:', error);
  }
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent: any): Promise<void> {
  try {
    const userId = paymentIntent.metadata?.userId;
    
    if (!userId) {
      console.error('No userId in payment intent metadata');
      return;
    }

    console.log(`Payment failed for user ${userId}`);

    // Update payment status
    const paymentsQuery = await db.collection('payments')
      .where('userId', '==', userId)
      .where('status', '==', 'pending')
      .get();

    if (!paymentsQuery.empty) {
      const batch = db.batch();
      paymentsQuery.docs.forEach(doc => {
        batch.update(doc.ref, {
          status: 'failed',
          failedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });
      await batch.commit();
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

// Get payment status
export const getPaymentStatusHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      res.status(400).json({
        success: false,
        error: 'Missing session ID'
      });
      return;
    }

    // Get payment record
    const paymentDoc = await db.collection('payments').doc(sessionId).get();
    
    if (!paymentDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'Payment session not found'
      });
      return;
    }

    const paymentData = paymentDoc.data();
    if (!paymentData) {
      res.status(404).json({
        success: false,
        error: 'Payment data not found'
      });
      return;
    }

    const response: PaymentStatusResponse = {
      success: true,
      status: paymentData.status,
      courseAccess: paymentData.courseAccess || paymentData.status === 'completed'
    };

    res.json(response);
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get payment status'
    });
  }
};