import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { logger } from "./lib/logger.js";
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

// ============================================================================
// SECURITY MIDDLEWARE
// ============================================================================
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ============================================================================
// PARSING MIDDLEWARE - Order matters! Stripe webhook must use raw body
// ============================================================================
app.use("/api/v1/billing/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "10mb" }));
app.use(compression());

// ============================================================================
// REQUEST LOGGING
// ============================================================================
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      userId: (req as any).userId
    });
  });
  next();
});

// ============================================================================
// HEALTH CHECK
// ============================================================================
app.get("/health", (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// ============================================================================
// ROUTES
// ============================================================================
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

// ============================================================================
// ERROR HANDLING MIDDLEWARE (MUST BE LAST)
// ============================================================================
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Validation failed",
      details: err.issues.map((issue: any) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code
      }))
    });
  }

  // Authentication errors
  if (err.statusCode === 401 || err.message === "Unauthorized") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Forbidden (org isolation)
  if (err.statusCode === 403 || err.message === "Forbidden") {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Not found
  if (err.statusCode === 404 || err.message?.includes("not found")) {
    return res.status(404).json({ error: "Resource not found" });
  }

  // Default: 500
  res.status(err.statusCode || 500).json({
    error: process.env.NODE_ENV === "production" 
      ? "Internal server error" 
      : err.message
  });
});

// ============================================================================
// 404 HANDLER
// ============================================================================
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});
