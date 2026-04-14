import { Request, Response, NextFunction } from "express";
import { getTokenFromHeader, verifyToken } from "./crypto.js";
import { logger } from "./logger.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      organizationId?: string;
    }
  }
}

/**
 * Middleware to verify JWT and extract user/org context
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req.headers.authorization);
  
  if (!token) {
    logger.warn(`Unauthorized request: ${req.method} ${req.path}`);
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    logger.warn(`Invalid token for: ${req.method} ${req.path}`);
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.userId = decoded.userId;
  req.organizationId = decoded.organizationId;
  next();
}

/**
 * Middleware to enforce organization isolation
 * Use after authMiddleware
 */
export function orgIsolationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.organizationId) {
    return res.status(401).json({ error: "Organization context missing" });
  }

  // Check if requested org matches user's org (from URL param or body)
  const requestedOrgId = req.params.orgId || req.body?.organizationId;
  if (requestedOrgId && requestedOrgId !== req.organizationId) {
    logger.warn(`Org isolation violation: user=${req.userId} trying to access org=${requestedOrgId}`);
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}

/**
 * Optional auth - sets req.userId/organizationId if token present, doesn't fail if missing
 */
export function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req.headers.authorization);
  
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.userId = decoded.userId;
      req.organizationId = decoded.organizationId;
    }
  }
  
  next();
}
