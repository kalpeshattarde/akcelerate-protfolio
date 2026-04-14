import { Router, Request, Response } from "express";
import { z } from "zod";
import { AuthService } from "./auth.service.js";
import { authMiddleware } from "../../lib/middleware.js";
import { logger } from "../../lib/logger.js";
import { getProviderAuthUrl } from "../../lib/oauth.js";

const service = new AuthService();
export const authRouter = Router();

/**
 * POST /api/v1/auth/register
 * Register a new user and organization
 */
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const body = z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      organizationName: z.string().min(1, "Organization name is required")
    }).parse(req.body);

    const result = await service.register(body.email, body.password, body.organizationName);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error(`Register error: ${error.message}`);
    
    if (error.message.includes("already exists")) {
      return res.status(409).json({ error: error.message });
    }
    
    if (error.name === "ZodError") {
      return res.status(400).json({ error: error.errors[0].message });
    }

    res.status(500).json({ error: "Registration failed" });
  }
});

/**
 * POST /api/v1/auth/login
 * Login with email and password
 */
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const body = z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(1, "Password is required")
    }).parse(req.body);

    const result = await service.login(body.email, body.password);
    res.json(result);
  } catch (error: any) {
    logger.warn(`Login error: ${error.message}`);
    
    if (error.message.includes("not found") || error.message.includes("Invalid password")) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (error.name === "ZodError") {
      return res.status(400).json({ error: error.errors[0].message });
    }

    res.status(500).json({ error: "Login failed" });
  }
});

/**
 * GET /api/v1/auth/me
 * Get current user details
 */
authRouter.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await service.getUserWithOrgs(req.userId!);
    res.json(user);
  } catch (error: any) {
    logger.error(`Get user error: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

/**
 * GET /api/v1/auth/oauth/:provider/start
 * Start OAuth flow
 */
authRouter.get("/oauth/:provider/start", (req: Request, res: Response) => {
  try {
    const provider = z.enum(["google", "github", "linkedin"]).parse(req.params.provider);
    // In production: generate secure random state and store in cache/DB
    const state = Math.random().toString(36).substring(2, 15);
    
    res.json({
      provider,
      authUrl: getProviderAuthUrl(provider, state),
      state
    });
  } catch (error: any) {
    logger.error(`OAuth start error: ${error.message}`);
    res.status(400).json({ error: "Invalid provider" });
  }
});

/**
 * GET /api/v1/auth/oauth/:provider/callback
 * OAuth callback handler
 */
authRouter.get("/oauth/:provider/callback", async (req: Request, res: Response) => {
  try {
    const provider = z.enum(["google", "github", "linkedin"]).parse(req.params.provider);
    const code = z.string().parse(req.query.code);
    const state = z.string().parse(req.query.state);

    // In production: verify state from cache/DB first
    const result = await service.handleOAuthCallback(provider, code, state, "dummy-org-id");
    res.json(result);
  } catch (error: any) {
    logger.error(`OAuth callback error: ${error.message}`);
    
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    res.status(500).json({ error: "OAuth callback failed" });
  }
});
