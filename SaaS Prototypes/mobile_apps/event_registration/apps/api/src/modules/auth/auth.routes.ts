import { Router } from "express";
import { z } from "zod";
import { AuthService } from "./auth.service.js";
import { getProviderAuthUrl } from "../../lib/oauth.js";

const service = new AuthService();
export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(8) }).parse(req.body);
  const user = await service.register(body.email, body.password);
  res.status(201).json(user);
});

authRouter.post("/login", async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(8) }).parse(req.body);
  res.json(await service.login(body.email));
});

authRouter.get("/oauth/:provider/start", (req, res) => {
  const provider = z.enum(["google", "github", "linkedin"]).parse(req.params.provider);
  const state = "dev-state-token";
  res.json({ provider, url: getProviderAuthUrl(provider, state), state });
});

authRouter.get("/oauth/:provider/callback", async (req, res) => {
  const provider = z.enum(["google", "github", "linkedin"]).parse(req.params.provider);
  const code = z.string().parse(req.query.code);
  const state = z.string().parse(req.query.state);
  res.json(await service.handleOAuthCallback(provider, code, state));
});
