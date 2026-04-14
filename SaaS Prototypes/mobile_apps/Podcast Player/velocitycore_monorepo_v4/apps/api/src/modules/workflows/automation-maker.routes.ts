import { Router } from "express";
import { z } from "zod";
import { AutomationMakerService } from "./automation-maker.service.js";

export const automationMakerRouter = Router();
const service = new AutomationMakerService();

automationMakerRouter.get("/providers", (_req, res) => {
  res.json({ items: service.listProviders() });
});

automationMakerRouter.post("/builder", (req, res) => {
  const body = z.object({
    name: z.string().min(1),
    triggerKey: z.string().min(1),
    provider: z.enum(["n8n", "zapier"]),
    steps: z.array(z.object({
      type: z.string().min(1),
      config: z.record(z.unknown())
    }))
  }).parse(req.body);

  res.status(201).json(service.createAutomation(body));
});

automationMakerRouter.post("/builder/trigger", async (req, res) => {
  const body = z.object({
    automationId: z.string().optional(),
    key: z.string().optional(),
    payload: z.record(z.unknown()).default({})
  }).parse(req.body);

  res.status(202).json(await service.triggerAutomation(body));
});
