import { env } from "../../config/env.js";

function basicAuth(username: string, password: string) {
  return Buffer.from(`${username}:${password}`).toString("base64");
}

export class TwilioAdapter {
  async sendSms(input: { to: string; body: string }) {
    if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_MESSAGING_SERVICE_SID) {
      return {
        provider: "twilio",
        channel: "sms",
        mode: "mock",
        status: "queued",
        to: input.to
      };
    }

    const form = new URLSearchParams({
      To: input.to,
      Body: input.body,
      MessagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID
    });

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form.toString()
    });

    const data = await response.json().catch(() => ({}));
    return {
      provider: "twilio",
      channel: "sms",
      mode: "live",
      status: response.ok ? "queued" : "error",
      responseStatus: response.status,
      data,
      to: input.to
    };
  }

  async sendWhatsapp(input: { to: string; body: string }) {
    if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_WHATSAPP_FROM) {
      return {
        provider: "twilio",
        channel: "whatsapp",
        mode: "mock",
        status: "queued",
        to: input.to
      };
    }

    const form = new URLSearchParams({
      To: input.to.startsWith("whatsapp:") ? input.to : `whatsapp:${input.to}`,
      From: env.TWILIO_WHATSAPP_FROM.startsWith("whatsapp:") ? env.TWILIO_WHATSAPP_FROM : `whatsapp:${env.TWILIO_WHATSAPP_FROM}`,
      Body: input.body
    });

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: form.toString()
    });

    const data = await response.json().catch(() => ({}));
    return {
      provider: "twilio",
      channel: "whatsapp",
      mode: "live",
      status: response.ok ? "queued" : "error",
      responseStatus: response.status,
      data,
      to: input.to
    };
  }
}
