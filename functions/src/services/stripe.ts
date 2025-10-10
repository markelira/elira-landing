import Stripe from 'stripe';

// Initialize Stripe with API key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

console.log('[Stripe Service] Initializing Stripe:', {
  hasSecretKey: !!stripeSecretKey,
  hasWebhookSecret: !!stripeWebhookSecret,
  secretKeyPrefix: stripeSecretKey?.substring(0, 8),
  environment: process.env.NODE_ENV
});

if (!stripeSecretKey) {
  console.error('[Stripe Service] CRITICAL: Stripe secret key not configured');
  console.error('[Stripe Service] Available env vars:', Object.keys(process.env).filter(key => key.includes('STRIPE')));
}

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-07-30.basil',
}) : null;

// Course configuration
export const COURSE_CONFIG = {
  price: 89990, // HUF
  currency: 'HUF',
  title: 'AI-alapú piac-kutatásos copywriting',
  description: 'Teljes copywriting kurzus AI-alapú piackutatással és gyakorlatokkal',
  // Stripe product and price IDs for the course
  stripePriceId: process.env.STRIPE_PRICE_ID || 'price_1SGGmxHhqyKpFIBM2f3kM13h',
  stripeProductId: 'prod_SwFQ50r0KCrxss'
};

// Helper function to create Stripe customer
export async function createOrGetStripeCustomer(email: string, name: string): Promise<string | null> {
  if (!stripe) return null;

  try {
    // Try to find existing customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0].id;
    }

    // Create new customer
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      metadata: {
        source: 'elira-course-platform'
      }
    });

    return customer.id;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return null;
  }
}

// Helper function to create checkout session
export async function createCheckoutSession(
  customerId: string,
  userId: string,
  email: string,
  successUrl: string,
  cancelUrl: string,
  courseId?: string,
  stripePriceId?: string,
  courseData?: { title: string; price: number; currency: string; description?: string }
): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) return null;

  try {
    // Use course-specific price ID if available, otherwise fallback to default
    const priceId = stripePriceId || COURSE_CONFIG.stripePriceId;
    const courseInfo = courseData || {
      title: COURSE_CONFIG.title,
      price: COURSE_CONFIG.price,
      currency: COURSE_CONFIG.currency,
      description: COURSE_CONFIG.description
    };
    
    const lineItems = priceId 
      ? [{
          price: priceId,
          quantity: 1,
        }]
      : [{
          price_data: {
            currency: courseInfo.currency.toLowerCase(),
            product_data: {
              name: courseInfo.title,
              description: courseInfo.description || 'Online kurzus',
              images: ['https://elira.hu/course-preview.jpg'], // We'll add this later
            },
            unit_amount: courseInfo.price * 100, // Stripe expects amount in smallest currency unit
          },
          quantity: 1,
        }];

    const sessionConfig: any = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
        courseId: courseId || 'default-course',
        courseAccess: 'true',
        source: 'elira-course-platform'
      }
    };

    // Use customer ID if available, otherwise use customer_email
    if (customerId) {
      sessionConfig.customer = customerId;
    } else {
      sessionConfig.customer_email = email;
    }

    // Add additional session configuration
    sessionConfig.payment_intent_data = {
      metadata: {
        userId: userId,
        courseId: courseId || 'default-course',
        courseAccess: 'true'
      }
    };
    sessionConfig.allow_promotion_codes = true;
    sessionConfig.customer_update = {
      address: 'auto',
      shipping: 'auto'
    };
    sessionConfig.billing_address_collection = 'required';
    sessionConfig.shipping_address_collection = {
      allowed_countries: ['HU', 'AT', 'DE', 'SK', 'RO', 'HR', 'SI', 'RS']
    };

    console.log('[Stripe] Creating session with config:', JSON.stringify(sessionConfig, null, 2));
    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log('[Stripe] Session created successfully:', session.id);

    return session;
  } catch (error: any) {
    console.error('[Stripe] Error creating checkout session:', error);
    console.error('[Stripe] Error details:', {
      message: error?.message,
      type: error?.type,
      code: error?.code,
      statusCode: error?.statusCode
    });
    return null;
  }
}

// Helper function to verify webhook signature
export function verifyWebhookSignature(body: string, signature: string): Stripe.Event | null {
  console.log('🔐 SIGNATURE VERIFICATION START:', {
    hasStripe: !!stripe,
    hasSecret: !!stripeWebhookSecret,
    // SECURITY: Never log secrets or secret previews
    bodyLength: body.length,
    signatureLength: signature.length
  });
  
  if (!stripe || !stripeWebhookSecret) {
    console.error('🚨 Stripe or webhook secret not configured:', {
      stripe: !!stripe,
      secret: !!stripeWebhookSecret
    });
    return null;
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
    console.log('✅ Webhook signature verified successfully');
    return event;
  } catch (error: any) {
    console.error('🚨 Webhook signature verification failed:', {
      errorMessage: error?.message,
      errorType: error?.type,
      errorCode: error?.code,
      bodyFirstChar: body.charAt(0),
      bodyLastChar: body.charAt(body.length - 1),
      expectedSignatureFormat: 't=timestamp,v1=signature'
    });
    return null;
  }
}

// Helper function to retrieve session
export async function retrieveSession(sessionId: string): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
}

// Helper function to create refund
export async function createRefund(paymentIntentId: string, amount?: number): Promise<Stripe.Refund | null> {
  if (!stripe) return null;

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount // If not specified, refunds the full amount
    });

    return refund;
  } catch (error) {
    console.error('Error creating refund:', error);
    return null;
  }
}