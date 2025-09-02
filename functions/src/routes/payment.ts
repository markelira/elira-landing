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
import { CreateSessionRequest, CreateSessionResponse, PaymentStatusResponse } from '../../../types/payment';

const db = admin.firestore();

// Create checkout session
export const createSessionHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('[Payment] Creating session with body:', req.body);
    
    if (!stripe) {
      console.error('[Payment] Stripe not configured');
      res.status(503).json({
        success: false,
        error: 'Payment processing is currently unavailable'
      });
      return;
    }

    const { uid, email, successUrl, cancelUrl, courseId, stripePriceId }: CreateSessionRequest = req.body;
    console.log('[Payment] Session params:', { uid, email, courseId, stripePriceId });

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

    // Get course data if courseId is provided
    let courseData = null;
    if (courseId && courseId !== 'default-course') {
      try {
        const courseDoc = await db.collection('courses').doc(courseId).get();
        if (courseDoc.exists) {
          const course = courseDoc.data();
          courseData = {
            title: course?.title || COURSE_CONFIG.title,
            price: course?.price || COURSE_CONFIG.price,
            currency: course?.currency || COURSE_CONFIG.currency,
            description: course?.shortDescription || course?.description || COURSE_CONFIG.description
          };
        }
      } catch (error) {
        console.warn('Failed to fetch course data, using defaults:', error);
      }
    }

    // Create checkout session
    const session = await createCheckoutSession(
      customerId,
      uid,
      email,
      successUrl,
      cancelUrl,
      courseId,
      stripePriceId,
      courseData || undefined
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
      courseId: courseId || 'default-course',
      stripeSessionId: session.id,
      stripeCustomerId: customerId,
      amount: courseData?.price || COURSE_CONFIG.price,
      currency: (courseData?.currency || COURSE_CONFIG.currency).toUpperCase(),
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
  console.log('🔥 STRIPE WEBHOOK HANDLER CALLED!');
  try {
    console.log('🪝 WEBHOOK RECEIVED:', {
      method: req.method,
      url: req.url,
      originalUrl: req.originalUrl,
      path: req.path,
      headers: Object.keys(req.headers),
      hasBody: !!req.body,
      bodyType: typeof req.body,
      bodyIsBuffer: req.body instanceof Buffer,
      bodyLength: req.body instanceof Buffer ? req.body.length : (req.body ? JSON.stringify(req.body).length : 0),
      contentType: req.headers['content-type'],
      userAgent: req.headers['user-agent'],
      forwardedFor: req.headers['x-forwarded-for']
    });
    
    const signature = req.headers['stripe-signature'] as string;
    
    console.log('🔑 SIGNATURE DETAILS:', {
      hasSignature: !!signature,
      signatureLength: signature?.length,
      signaturePreview: signature?.substring(0, 50) + '...'
    });
    
    if (!signature) {
      console.error('🚨 Missing stripe-signature header');
      res.status(400).json({ error: 'Missing stripe-signature header' });
      return;
    }

    // Get raw body for signature verification
    let rawBody: string;
    if (req.body instanceof Buffer) {
      rawBody = req.body.toString('utf8');
      console.log('📦 Using Buffer body (expected for webhooks)');
    } else if (req.body && typeof req.body === 'string') {
      rawBody = req.body;
      console.log('📦 Using string body');
    } else {
      rawBody = JSON.stringify(req.body);
      console.log('📦 Using stringified JSON body (fallback - signature will fail)');
    }
    
    console.log('📦 BODY PROCESSING:', {
      originalBodyType: typeof req.body,
      isBuffer: req.body instanceof Buffer,
      rawBodyLength: rawBody.length,
      rawBodyPreview: rawBody.substring(0, 100) + '...',
      secretConfigured: !!process.env.STRIPE_WEBHOOK_SECRET,
      secretSource: process.env.STRIPE_WEBHOOK_SECRET ? 'env' : 'missing'
    });
    
    // Verify webhook signature
    const event = verifyWebhookSignature(rawBody, signature);
    if (!event) {
      console.error('🚨 Invalid webhook signature');
      res.status(400).json({ error: 'Invalid signature' });
      return;
    }

    console.log('🎯 Processing Stripe webhook:', event.type);

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
    const courseId = session.metadata?.courseId || 'default-course';

    console.log('💳 CHECKOUT COMPLETED:', {
      sessionId,
      userId,
      courseId,
      customerEmail: session.customer_details?.email,
      amount: session.amount_total,
      metadata: session.metadata
    });

    if (!userId) {
      console.error('🚨 No userId in session metadata');
      return;
    }

    console.log(`✅ Processing completed checkout for user ${userId}, session ${sessionId}, course ${courseId}`);

    // Update payment record
    await db.collection('payments').doc(sessionId).update({
      status: 'completed',
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Grant course access to user
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

    // Initialize course progress for the user
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    // Create user progress document
    await db.collection('user-progress').doc(userId).set({
      userId,
      totalCoursesEnrolled: 1,
      totalLessonsCompleted: 0,
      totalWatchTime: 0,
      coursesInProgress: 1,
      coursesCompleted: 0,
      lastActivityAt: timestamp
    }, { merge: true });

    // Create enrollment record
    await db.collection('enrollments').add({
      userId,
      courseId,
      enrolledAt: timestamp,
      status: 'ACTIVE',
      paymentSessionId: sessionId,
      progress: 0,
      completedLessons: [],
      lastAccessedAt: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp
    });

    // Get course data to determine lesson count
    let totalLessons = 12; // Default fallback
    try {
      const courseDoc = await db.collection('courses').doc(courseId).get();
      if (courseDoc.exists) {
        const courseData = courseDoc.data();
        totalLessons = courseData?.totalLessons || 12;
        
        // Update course enrollment count
        await db.collection('courses').doc(courseId).update({
          enrollmentCount: admin.firestore.FieldValue.increment(1),
          updatedAt: timestamp
        });
      }
    } catch (error) {
      console.warn('Failed to fetch course data for lesson count:', error);
    }

    // Create course-specific progress
    await db
      .collection('user-progress')
      .doc(userId)
      .collection('courses')
      .doc(courseId)
      .set({
        courseId,
        userId,
        overallProgress: 0,
        completedLessons: [],
        totalLessons,
        enrolledAt: timestamp,
        lastAccessedAt: timestamp
      }, { merge: true });

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

// Get session details with checkout URL
export const getSessionDetailsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      res.status(400).json({
        success: false,
        error: 'Missing session ID'
      });
      return;
    }

    if (!stripe) {
      res.status(503).json({
        success: false,
        error: 'Payment processing is currently unavailable'
      });
      return;
    }

    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      res.status(404).json({
        success: false,
        error: 'Session not found'
      });
      return;
    }

    res.json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
      status: session.status
    });
  } catch (error) {
    console.error('Get session details error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get session details'
    });
  }
};

// ==============================
// ADMIN PAYMENT MANAGEMENT
// ==============================

// Get all payments with filtering for admin dashboard
export const getAdminPaymentsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, dateRange, limit = 50, offset = 0 } = req.query;

    let query: any = db.collection('payments');

    // Apply status filter
    if (status && status !== 'all') {
      query = query.where('status', '==', status);
    }

    // Apply date range filter
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      let startDate: Date;

      switch (dateRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          const currentQuarter = Math.floor(now.getMonth() / 3);
          startDate = new Date(now.getFullYear(), currentQuarter * 3, 1);
          break;
        default:
          startDate = new Date(0);
      }

      query = query.where('createdAt', '>=', admin.firestore.Timestamp.fromDate(startDate));
    }

    // Order by creation date (most recent first)
    query = query.orderBy('createdAt', 'desc');

    // Apply pagination
    if (offset) {
      query = query.offset(Number(offset));
    }
    if (limit) {
      query = query.limit(Number(limit));
    }

    const paymentsSnapshot = await query.get();
    const payments = [];

    for (const doc of paymentsSnapshot.docs) {
      const paymentData = doc.data();
      
      // Get user details for customer information
      let customerName = 'Unknown Customer';
      let customerEmail = paymentData.email || 'Unknown Email';
      let courseName = 'AI Copywriting Course';

      if (paymentData.userId) {
        try {
          const userDoc = await db.collection('users').doc(paymentData.userId).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            customerName = `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim();
            customerEmail = userData?.email || customerEmail;
          }
        } catch (error) {
          console.warn('Failed to fetch user data for payment:', paymentData.userId);
        }
      }

      // Get Stripe payment details if available
      let paymentMethod = 'Card';
      let transactionId = paymentData.stripeSessionId || doc.id;

      if (stripe && paymentData.stripeSessionId) {
        try {
          const session = await stripe.checkout.sessions.retrieve(paymentData.stripeSessionId);
          if (session.payment_intent) {
            const paymentIntent: any = await stripe.paymentIntents.retrieve(session.payment_intent as string);
            if (paymentIntent.charges && paymentIntent.charges.data?.length > 0) {
              const charge = paymentIntent.charges.data[0];
              paymentMethod = charge.payment_method_details?.card?.brand?.toUpperCase() || 'Card';
              transactionId = charge.id;
            }
          }
        } catch (stripeError) {
          console.warn('Failed to fetch Stripe details for payment:', paymentData.stripeSessionId);
        }
      }

      const payment = {
        id: doc.id,
        orderId: doc.id.slice(0, 8).toUpperCase(),
        transactionId,
        customerName: customerName || 'Unknown Customer',
        customerEmail,
        courseName,
        amount: paymentData.amount || 0,
        currency: paymentData.currency || 'usd',
        status: paymentData.status || 'pending',
        paymentMethod,
        createdAt: paymentData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        completedAt: paymentData.completedAt?.toDate?.()?.toISOString(),
        failedAt: paymentData.failedAt?.toDate?.()?.toISOString(),
        stripeSessionId: paymentData.stripeSessionId,
        userId: paymentData.userId
      };

      // Apply search filter if provided
      if (search) {
        const searchTerm = search.toString().toLowerCase();
        const searchableText = `${payment.customerName} ${payment.customerEmail} ${payment.orderId} ${payment.courseName}`.toLowerCase();
        if (searchableText.includes(searchTerm)) {
          payments.push(payment);
        }
      } else {
        payments.push(payment);
      }
    }

    res.json(payments);
  } catch (error) {
    console.error('Get admin payments error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get payments'
    });
  }
};

// Get payment statistics for admin dashboard
export const getAdminPaymentStatsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Get all payments
    const allPaymentsSnapshot = await db.collection('payments').get();
    const completedPaymentsSnapshot = await db.collection('payments')
      .where('status', '==', 'completed').get();
    const pendingPaymentsSnapshot = await db.collection('payments')
      .where('status', '==', 'pending').get();
    const failedPaymentsSnapshot = await db.collection('payments')
      .where('status', '==', 'failed').get();

    // Calculate total revenue
    let totalRevenue = 0;
    let monthlyRevenue = 0;
    let pendingAmount = 0;

    completedPaymentsSnapshot.docs.forEach(doc => {
      const payment = doc.data();
      const amount = payment.amount || 0;
      totalRevenue += amount;

      // Calculate monthly revenue
      const paymentDate = payment.completedAt?.toDate() || payment.createdAt?.toDate();
      if (paymentDate && paymentDate >= startOfMonth) {
        monthlyRevenue += amount;
      }
    });

    // Calculate pending amount
    pendingPaymentsSnapshot.docs.forEach(doc => {
      const payment = doc.data();
      pendingAmount += payment.amount || 0;
    });

    // Calculate average order value
    const totalTransactions = allPaymentsSnapshot.docs.length;
    const successfulTransactions = completedPaymentsSnapshot.docs.length;
    const failedTransactions = failedPaymentsSnapshot.docs.length;
    const averageOrderValue = successfulTransactions > 0 ? totalRevenue / successfulTransactions : 0;

    const stats = {
      totalRevenue: Math.round(totalRevenue * 100) / 100, // Round to 2 decimal places
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
      pendingAmount: Math.round(pendingAmount * 100) / 100,
      totalTransactions,
      successfulTransactions,
      failedTransactions,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100
    };

    res.json(stats);
  } catch (error) {
    console.error('Get admin payment stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get payment statistics'
    });
  }
};