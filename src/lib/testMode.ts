/**
 * Test mode utility — disables/reduces hero, Reveal, and Counter animations
 * during visual regression checks to prevent flaky diffs.
 *
 * Activation (any one):
 *  - URL query param:   ?test-mode=1
 *  - localStorage:      localStorage.setItem("ak-test-mode", "1")
 *  - Global flag:       window.__AK_TEST_MODE__ = true
 *
 * When active, sets `data-test-mode="1"` on <html>, which CSS uses to
 * disable transitions/animations and force reveal elements visible.
 */

const ATTR = "data-test-mode";
const STORAGE_KEY = "ak-test-mode";

declare global {
  interface Window {
    __AK_TEST_MODE__?: boolean;
  }
}

export function isTestMode(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__AK_TEST_MODE__) return true;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get("test-mode") === "1") return true;
    if (localStorage.getItem(STORAGE_KEY) === "1") return true;
  } catch {
    /* noop */
  }
  return document.documentElement.getAttribute(ATTR) === "1";
}

export function enableTestMode(persist = false): void {
  if (typeof window === "undefined") return;
  window.__AK_TEST_MODE__ = true;
  document.documentElement.setAttribute(ATTR, "1");
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
  }
}

export function disableTestMode(): void {
  if (typeof window === "undefined") return;
  window.__AK_TEST_MODE__ = false;
  document.documentElement.removeAttribute(ATTR);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

/** Call once at app boot to apply the html attribute from URL/storage. */
export function initTestMode(): void {
  if (typeof window === "undefined") return;
  if (isTestMode()) {
    document.documentElement.setAttribute(ATTR, "1");
  }
}
