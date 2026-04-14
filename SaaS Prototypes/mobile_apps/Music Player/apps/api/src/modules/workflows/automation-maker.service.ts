import crypto from "crypto";
import { env } from "../../config/env.js";

async function dispatchN8N(payload: Record<string, unknown>) {
  if (!env.N8N_BASE_URL) return { provider: "n8n", mode: "mock", dispatched: false };
  const base = env.N8N_BASE_URL.replace(/\/$/, "");
  const path = env.N8N_WEBHOOK_PATH.startsWith("/") ? env.N8N_WEBHOOK_PATH : `/${env.N8N_WEBHOOK_PATH}`;
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(env.N8N_API_KEY ? { "X-N8N-API-KEY": env.N8N_API_KEY } : {})
    },
    body: JSON.stringify(payload)
  });
  return { provider: "n8n", mode: "live", dispatched: response.ok, responseStatus: response.status };
}

async function dispatchZapier(payload: Record<string, unknown>) {
  if (!env.ZAPIER_WEBHOOK_URL) return { provider: "zapier", mode: "mock", dispatched: false };
  const response = await fetch(env.ZAPIER_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(env.ZAPIER_SIGNING_SECRET ? { "X-Zapier-Signature": env.ZAPIER_SIGNING_SECRET } : {})
    },
    body: JSON.stringify(payload)
  });
  return { provider: "zapier", mode: "live", dispatched: response.ok, responseStatus: response.status };
}

export class AutomationMakerService {
  listProviders() {
    return [
      { key: "n8n", type: "workflow_orchestrator", connected: Boolean(env.N8N_BASE_URL) },
      { key: "zapier", type: "automation_webhook", connected: Boolean(env.ZAPIER_WEBHOOK_URL) }
    ];
  }

  createAutomation(input: {
    name: string;
    triggerKey: string;
    provider: "n8n" | "zapier";
    steps: Array<{ type: string; config: Record<string, unknown> }>;
  }) {
    return {
      id: `automation_${Date.now()}`,
      secret: crypto.randomUUID(),
      status: "active",
      ...input
    };
  }

  async triggerAutomation(input: { automationId?: string; key?: string; payload: Record<string, unknown> }) {
    const payload = {
      automationId: input.automationId,
      key: input.key,
      payload: input.payload,
      triggeredAt: new Date().toISOString()
    };

    const dispatches = await Promise.all([dispatchN8N(payload), dispatchZapier(payload)]);
    return {
      providerDispatch: dispatches,
      status: dispatches.some((d) => d.dispatched) ? "queued" : "mock_queued",
      ...input
    };
  }
}
