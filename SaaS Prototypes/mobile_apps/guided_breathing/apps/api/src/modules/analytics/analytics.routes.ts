import { Router } from "express";

export const analyticsRouter = Router();

analyticsRouter.get("/overview", (_req, res) => {
  res.json({
    mrr: 12000,
    activeWorkflows: 5,
    queuedAgentRuns: 2
  });
});
