import { env } from "../config/env.js";

export function getProviderAuthUrl(provider: "google" | "github" | "linkedin", state: string) {
  const redirectUri = `${env.API_URL}/api/v1/auth/oauth/${provider}/callback`;

  const map = {
    google: {
      base: "https://accounts.google.com/o/oauth2/v2/auth",
      clientId: env.GOOGLE_CLIENT_ID || "",
      scope: "openid email profile"
    },
    github: {
      base: "https://github.com/login/oauth/authorize",
      clientId: env.GITHUB_CLIENT_ID || "",
      scope: "read:user user:email"
    },
    linkedin: {
      base: "https://www.linkedin.com/oauth/v2/authorization",
      clientId: env.LINKEDIN_CLIENT_ID || "",
      scope: "r_liteprofile r_emailaddress"
    }
  }[provider];

  const params = new URLSearchParams({
    client_id: map.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: map.scope,
    state
  });

  return `${map.base}?${params.toString()}`;
}
