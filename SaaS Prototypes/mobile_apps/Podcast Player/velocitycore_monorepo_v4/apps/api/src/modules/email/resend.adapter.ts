import { env } from "../../config/env.js";

export class ResendAdapter {
  async send(input: { to: string; subject: string; html: string }) {
    if (!env.RESEND_API_KEY) {
      return { provider: "resend", mode: "mock", status: "queued", to: input.to };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [input.to],
        subject: input.subject,
        html: input.html
      })
    });

    const data = await response.json().catch(() => ({}));
    return {
      provider: "resend",
      mode: "live",
      status: response.ok ? "queued" : "error",
      responseStatus: response.status,
      data,
      to: input.to
    };
  }
}
