import { Router } from "express";
import { z } from "zod";
import { RazorpayAdapter } from "./razorpay.adapter.js";

export const razorpayRouter = Router();
const razorpay = new RazorpayAdapter();

razorpayRouter.post("/order", async (req, res) => {
  const body = z.object({
    amount: z.number().int().positive(),
    currency: z.string().optional(),
    receipt: z.string().optional()
  }).parse(req.body);

  res.status(201).json(await razorpay.createOrder(body));
});

razorpayRouter.post("/webhook", (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const payload = JSON.stringify(req.body ?? {});
  res.json(razorpay.verifyWebhook(typeof signature === "string" ? signature : undefined, payload));
});
