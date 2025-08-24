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
  price: 7990, // HUF
  currency: 'huf',
  title: 'AI-alapú piac-kutatásos copywriting',
  description: 'Teljes copywriting kurzus AI-alapú piackutatással és gyakorlatokkal'
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
  cancelUrl: string
): Promise<Stripe.Checkout.Session | null> {
  if (!stripe) return null;

  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: COURSE_CONFIG.currency,
            product_data: {
              name: COURSE_CONFIG.title,
              description: COURSE_CONFIG.description,
              images: ['https://elira.hu/course-preview.jpg'], // We'll add this later
            },
            unit_amount: COURSE_CONFIG.price * 100, // Stripe expects amount in smallest currency unit
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
        courseAccess: 'true',
        source: 'elira-course-platform'
      },
      customer_email: email,
      billing_address_collection: 'required',
      payment_intent_data: {
        metadata: {
          userId: userId,
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