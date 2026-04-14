import { Router } from "express";
import { z } from "zod";
import { TwilioAdapter } from "./twilio.adapter.js";

export const messagingRouter = Router();
const twilio = new TwilioAdapter();

messagingRouter.post("/send", async (req, res) => {
  const body = z.object({
    channel: z.enum(["sms", "whatsapp"]),
    to: z.string().min(3),
    body: z.string().min(1)
  }).parse(req.body);

  const result = body.channel === "sms"
    ? await twilio.sendSms({ to: body.to, body: body.body })
    : await twilio.sendWhatsapp({ to: body.to, body: body.body });

  res.status(202).json(result);
});
