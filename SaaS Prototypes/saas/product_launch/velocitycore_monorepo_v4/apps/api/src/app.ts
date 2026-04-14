import dotenv from "dotenv";
import express from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { billingRouter } from "./modules/billing/billing.routes.js";
import { razorpayRouter } from "./modules/billing/razorpay.routes.js";
import { emailRouter } from "./modules/email/email.routes.js";
import { messagingRouter } from "./modules/messaging/messaging.routes.js";
import { socialRouter } from "./modules/social/social.routes.js";
import { workflowsRouter } from "./modules/workflows/workflows.routes.js";
import { automationMakerRouter } from "./modules/workflows/automation-maker.routes.js";
import { agentsRouter } from "./modules/agents/agents.routes.js";
import { analyticsRouter } from "./modules/analytics/analytics.routes.js";

dotenv.config();

export const app = express();

app.use("/api/v1/billing/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/billing", billingRouter);
app.use("/api/v1/razorpay", razorpayRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/messages", messagingRouter);
app.use("/api/v1/social", socialRouter);
app.use("/api/v1/workflows", workflowsRouter);
app.use("/api/v1/automation", automationMakerRouter);
app.use("/api/v1/agents", agentsRouter);
app.use("/api/v1/analytics", analyticsRouter);
