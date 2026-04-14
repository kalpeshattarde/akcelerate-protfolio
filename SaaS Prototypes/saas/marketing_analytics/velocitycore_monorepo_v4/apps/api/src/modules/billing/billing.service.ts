import Stripe from "stripe";
import { env } from "../../config/env.js";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY) : null;

export class BillingService {
  async createCheckoutSession(priceId: string) {
    if (!stripe) {
      return { mode: "mock", checkoutUrl: "https://example.com/mock-checkout", priceId };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${env.APP_URL}/billing?success=1`,
      cancel_url: `${env.APP_URL}/billing?canceled=1`
    });

    return { mode: "live", id: session.id, checkoutUrl: session.url };
  }

  async createCustomerPortalSession(customerId: string) {
    if (!stripe) {
      return { mode: "mock", url: env.STRIPE_PORTAL_RETURN_URL, customerId };
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: env.STRIPE_PORTAL_RETURN_URL
    });

    return { mode: "live", url: session.url };
  }

  verifyWebhook(body: Buffer, signature?: string) {
    if (!stripe || !env.STRIPE_WEBHOOK_SECRET || !signature) {
      return { type: "mock.webhook", payloadLength: body.length };
    }

    const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
    return {
      id: event.id,
      type: event.type,
      livemode: event.livemode
    };
  }
}
