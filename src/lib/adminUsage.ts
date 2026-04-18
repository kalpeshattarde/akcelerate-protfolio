/**
 * Admin usage tracking — records which admin user viewed which tab and when.
 * Stored locally for the heatmap on the Analytics tab.
 */

export interface AdminTabView {
  user: string;
  tab: string;
  timestamp: string; // ISO
}

const KEY = "ak-admin-tab-views";
const MAX = 2000;

export function recordAdminTabView(user: string, tab: string) {
  try {
    const list: AdminTabView[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    list.push({ user, tab, timestamp: new Date().toISOString() });
    if (list.length > MAX) list.splice(0, list.length - MAX);
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("ak-admin-usage-updated"));
  } catch {
    /* ignore */
  }
}

export function getAdminTabViews(): AdminTabView[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearAdminTabViews() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("ak-admin-usage-updated"));
}

/** Seed deterministic sample data for dev/demo. */
export function seedAdminTabViews() {
  const users = ["kalpesh@akcelerate.com", "priya@akcelerate.com", "dev@akcelerate.com"];
  const tabs = ["dashboard", "analytics", "users", "orders", "products", "content", "config", "audit"];
  const now = Date.now();
  const list: AdminTabView[] = [];
  // 14 days back
  for (let day = 13; day >= 0; day--) {
    users.forEach((u, ui) => {
      // each user has distinct tab affinities
      tabs.forEach((t, ti) => {
        const weight = ((ti + ui * 3) % 5) + 1;
        const count = Math.max(0, Math.round(Math.random() * weight) + (t === "dashboard" ? 2 : 0));
        for (let k = 0; k < count; k++) {
          const ts = now - day * 86400000 - Math.floor(Math.random() * 86400000);
          list.push({ user: u, tab: t, timestamp: new Date(ts).toISOString() });
        }
      });
    });
  }
  localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX)));
  window.dispatchEvent(new CustomEvent("ak-admin-usage-updated"));
}
