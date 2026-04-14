import crypto from "crypto";
import { prisma } from "../../lib/prisma.js";

export class AuthService {
  async register(email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: `hashed:${password.length}`
      }
    });
    return user;
  }

  async login(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return {
      token: "dev-session-token",
      user
    };
  }

  async handleOAuthCallback(provider: string, code: string, state: string) {
    return {
      provider,
      codeReceived: Boolean(code),
      stateValidated: Boolean(state),
      linked: true,
      mockExternalId: crypto.randomUUID()
    };
  }
}
