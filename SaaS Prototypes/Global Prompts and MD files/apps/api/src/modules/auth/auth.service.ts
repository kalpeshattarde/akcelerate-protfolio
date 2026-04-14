import { prisma } from "../../lib/prisma.js";
import { hashPassword, verifyPassword, generateToken, generateSecureToken } from "../../lib/crypto.js";
import { logger } from "../../lib/logger.js";

export class AuthService {
  /**
   * Register a new user and organization
   */
  async register(email: string, password: string, organizationName: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name: organizationName,
        slug: organizationName.toLowerCase().replace(/\s+/g, "-")
      }
    });

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: email.split("@")[0],
        passwordHash
      }
    });

    // Add user to organization as owner
    await prisma.membership.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
        role: "owner"
      }
    });

    // Log event
    await prisma.analyticsEvent.create({
      data: {
        organizationId: organization.id,
        eventType: "user_registered"
      }
    });

    // Generate token
    const token = generateToken(user.id, organization.id);

    logger.info(`User registered: ${email} in org: ${organization.id}`);

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
      organization: { id: organization.id, name: organization.name }
    };
  }

  /**
   * Login user with email and password
   */
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.passwordHash) {
      throw new Error("User has no password set");
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      logger.warn(`Failed login attempt for: ${email}`);
      throw new Error("Invalid password");
    }

    // Get user's primary organization (first membership)
    const membership = await prisma.membership.findFirst({
      where: { userId: user.id }
    });

    if (!membership) {
      throw new Error("User has no organization");
    }

    const token = generateToken(user.id, membership.organizationId);

    logger.info(`User logged in: ${email}`);

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
      organizationId: membership.organizationId
    };
  }

  /**
   * OAuth callback handling - validate state, exchange code for token
   * In production, this would call the actual OAuth provider API
   */
  async handleOAuthCallback(provider: string, code: string, state: string, organizationId: string) {
    // In a real implementation:
    // 1. Retrieve the state we stored in DB/cache
    // 2. Validate it matches
    // 3. Exchange code for token with provider
    // 4. Store token in OauthAccount

    if (!code || !state) {
      throw new Error("Missing OAuth parameters");
    }

    // For development: validate mock state format
    if (process.env.NODE_ENV === "production" && !state.match(/^[a-f0-9]{32}$/)) {
      throw new Error("Invalid state parameter");
    }

    logger.info(`OAuth callback: provider=${provider} org=${organizationId}`);

    return {
      provider,
      status: "pending_token_exchange",
      // In production, would contain real tokens
      mockNote: "Implement provider-specific token exchange"
    };
  }

  /**
   * Link OAuth account to existing user
   */
  async linkOAuthAccount(userId: string, provider: string, providerAccountId: string, accessToken: string, refreshToken?: string) {
    const existingAccount = await prisma.oauthAccount.findFirst({
      where: {
        provider,
        providerAccountId
      }
    });

    if (existingAccount?.userId && existingAccount.userId !== userId) {
      throw new Error("This account is already linked to another user");
    }

    const account = await prisma.oauthAccount.upsert({
      where: {
        provider_providerAccountId: { provider, providerAccountId }
      },
      create: {
        userId,
        provider,
        providerAccountId,
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      update: {
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });

    logger.info(`OAuth account linked: user=${userId} provider=${provider}`);

    return account;
  }

  /**
   * Get user with all their organizations
   */
  async getUserWithOrgs(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          include: {
            organization: true
          }
        }
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      passwordHash: undefined, // Don't return hash
      organizations: user.memberships.map((m) => ({
        ...m.organization,
        role: m.role
      }))
    };
  }
}
