import Stripe from 'stripe';

// Initialize Stripe with API key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  console.warn('Stripe not configured - payment processing disabled');
}

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-07-30.basil',
}) : null;

// Course configuration
export const COURSE_CONFIG = {
  price: 9990, // HUF
  currency: 'HUF',
  title: 'AI-alapú piac-kutatásos copywriting',
  description: 'Teljes copywriting kurzus AI-alapú piackutatással és gyakorlatokkal',
  // Stripe product and price IDs for the course
  stripePriceId: process.env.STRIPE_PRICE_ID || 'price_1S0MvyHhqyKpFIBMQdiSPodM',
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

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
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
      },
      customer_email: email,
      billing_address_collection: 'required',
      payment_intent_data: {
        metadata: {
          userId: userId,
          courseId: courseId || 'default-course',
          courseAccess: 'true'
        }
      },
      allow_promotion_codes: true, // Allow discount codes
      automatic_tax: {
        enabled: true // Enable automatic tax calculation
      }
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
}

// Helper function to verify webhook signature
export function verifyWebhookSignature(body: string, signature: string): Stripe.Event | null {
  if (!stripe || !stripeWebhookSecret) return null;

  try {
    const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
    return event;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
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