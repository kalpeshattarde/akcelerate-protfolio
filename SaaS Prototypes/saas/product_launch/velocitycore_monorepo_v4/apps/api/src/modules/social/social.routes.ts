import { Router } from "express";
import { z } from "zod";
import { SocialPublisherAdapter } from "./publisher.adapter.js";

export const socialRouter = Router();
const publisher = new SocialPublisherAdapter();

socialRouter.get("/oauth/:provider/start", (req, res) => {
  const provider = z.enum(["linkedin", "facebook", "instagram", "x"]).parse(req.params.provider);
  res.json({ provider, url: `https://example.com/oauth/${provider}` });
});

socialRouter.get("/oauth/:provider/callback", (req, res) => {
  res.json({ linked: true, provider: req.params.provider, code: req.query.code || null });
});

socialRouter.post("/posts", (req, res) => {
  const body = z.object({
    provider: z.string().min(1),
    content: z.string().min(1),
    scheduledAt: z.string().optional()
  }).parse(req.body);

  res.status(201).json({
    id: "social_post_demo",
    status: body.scheduledAt ? "scheduled" : "draft",
    ...body
  });
});

socialRouter.post("/posts/:id/publish", async (req, res) => {
  const body = z.object({
    provider: z.string().default("linkedin"),
    content: z.string().default("Demo content")
  }).parse(req.body ?? {});
  const published = await publisher.publish(body);
  res.json({ id: req.params.id, ...published });
});
