import crypto from "crypto";
import Razorpay from "razorpay";
import { env } from "../../config/env.js";

const razorpay = env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET })
  : null;

export class RazorpayAdapter {
  async createOrder(input: { amount: number; currency?: string; receipt?: string }) {
    if (!razorpay) {
      return {
        provider: "razorpay",
        mode: "mock",
        id: `order_${Date.now()}`,
        amount: input.amount,
        currency: input.currency || "INR",
        receipt: input.receipt || `rcpt_${Date.now()}`
      };
    }

    const order = await razorpay.orders.create({
      amount: input.amount,
      currency: input.currency || "INR",
      receipt: input.receipt || `rcpt_${Date.now()}`
    });

    return {
      provider: "razorpay",
      mode: "live",
      ...order
    };
  }

  verifyWebhook(signature?: string, payload?: string) {
    if (!env.RAZORPAY_WEBHOOK_SECRET || !signature || !payload) {
      return { provider: "razorpay", verified: false, mode: "mock" };
    }

    const expected = crypto
      .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    return {
      provider: "razorpay",
      verified: expected === signature,
      mode: "live"
    };
  }
}
