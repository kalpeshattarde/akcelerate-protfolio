import { Router } from "express";
import { z } from "zod";

export const agentsRouter = Router();

agentsRouter.post("/run", (req, res) => {
  const body = z.object({
    agentType: z.enum(["planner", "executor", "analyst", "reviewer", "integration"]),
    input: z.record(z.unknown()).default({})
  }).parse(req.body);

  res.status(202).json({
    id: "agent_run_demo",
    agentType: body.agentType,
    status: "queued"
  });
});
