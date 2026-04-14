import { Router } from "express";
import { z } from "zod";
import { ResendAdapter } from "./resend.adapter.js";

export const emailRouter = Router();
const resend = new ResendAdapter();

emailRouter.post("/send", async (req, res) => {
  const body = z.object({
    to: z.string().email(),
    subject: z.string().min(1),
    html: z.string().min(1)
  }).parse(req.body);

  res.status(202).json(await resend.send(body));
});
