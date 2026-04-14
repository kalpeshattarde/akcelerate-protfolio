import { Router } from "express";
import { z } from "zod";

export const workflowsRouter = Router();

workflowsRouter.post("/trigger", (req, res) => {
  const body = z.object({
    key: z.string().min(1),
    input: z.record(z.unknown()).default({})
  }).parse(req.body);

  res.status(202).json({ workflowKey: body.key, provider: "n8n", status: "queued" });
});
