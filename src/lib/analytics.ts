/**
 * Lightweight analytics tracker.
 * Logs events to localStorage for the admin dashboard and
 * forwards to Google Analytics (gtag) if available.
 */

interface AnalyticsEvent {
  event: string;
  data: Record<string, unknown>;
  timestamp: string;
  path: string;
}

const STORAGE_KEY = "ak-analytics";
const MAX_EVENTS = 500;

function getStoredEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function trackEvent(event: string, data: Record<string, unknown> = {}) {
  // Store locally
  const events = getStoredEvents();
  events.push({
    event,
    data,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  });

  // Keep only last N events
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));

  // Forward to Google Analytics if available
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event, data);
  }
}

export function trackPageView(path: string) {
  trackEvent("page_view", { page: path });
}

export function trackProductView(slug: string, name: string) {
  trackEvent("product_view", { slug, name });
}

export function trackPurchase(productId: string, productName: string, price: number, currency: string) {
  trackEvent("purchase", { productId, productName, price, currency });
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  return getStoredEvents();
}

export function getEventCounts(): Record<string, number> {
  const events = getStoredEvents();
  return events.reduce<Record<string, number>>((acc, e) => {
    acc[e.event] = (acc[e.event] || 0) + 1;
    return acc;
  }, {});
}
