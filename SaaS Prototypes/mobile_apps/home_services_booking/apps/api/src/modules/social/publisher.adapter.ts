import { env } from "../../config/env.js";

export class SocialPublisherAdapter {
  async publish(input: { provider: string; content: string }) {
    if (!env.SOCIAL_PUBLISHER_ACCESS_TOKEN) {
      return {
        provider: input.provider,
        status: "published",
        mode: "mock",
        externalPostId: `post_${Date.now()}`
      };
    }

    // Provider-specific publishing should branch here in production.
    // This is a live-shaped stub preserving adapter boundaries.
    return {
      provider: input.provider,
      status: "queued",
      mode: "live-ready",
      externalPostId: `queued_${Date.now()}`,
      note: "Implement provider-specific publish endpoint using stored account tokens."
    };
  }
}
