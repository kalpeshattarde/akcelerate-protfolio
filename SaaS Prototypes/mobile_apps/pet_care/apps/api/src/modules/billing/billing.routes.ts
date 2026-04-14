import { Router } from "express";
import { z } from "zod";
import { BillingService } from "./billing.service.js";
import { env } from "../../config/env.js";

const service = new BillingService();
export const billingRouter = Router();

billingRouter.post("/checkout-session", async (req, res) => {
  const body = z.object({ priceId: z.string().optional() }).parse(req.body);
  res.json(await service.createCheckoutSession(body.priceId || env.STRIPE_PRICE_ID_PRO || "price_demo"));
});

billingRouter.post("/portal-session", async (req, res) => {
  const body = z.object({ customerId: z.string().min(1) }).parse(req.body);
  res.json(await service.createCustomerPortalSession(body.customerId));
});

billingRouter.get("/subscription", (_req, res) => {
  res.json({ provider: "stripe", status: "active", planName: "pro" });
});

billingRouter.post("/webhook", (req, res) => {
  const signature = req.headers["stripe-signature"];
  const result = service.verifyWebhook(
    Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body)),
    typeof signature === "string" ? signature : undefined
  );
  res.json({ received: true, event: result });
});
