// Brand Kit — stored in localStorage, applied to CSS variables at runtime.
// Allows admins to live-edit colors, typography, logos, tagline & voice.

export interface BrandKit {
  colors: {
    primary: string;   // HSL string e.g. "217 91% 60%"
    accent: string;
    background: string;
    foreground: string; // body/heading text
  };
  typography: {
    heading: string;   // Google Font family name
    body: string;
    weights: string;   // e.g. "400;500;600;700"
  };
  logos: {
    light: string | null;   // data URL or http URL
    dark: string | null;
    favicon: string | null;
  };
  brand: {
    tagline: string;
    voice: string;        // free-form notes
  };
}

const STORAGE_KEY = "ak-brand-kit";

export const DEFAULT_BRAND_KIT: BrandKit = {
  colors: {
    primary: "217 91% 60%",
    accent: "187 92% 43%",
    background: "0 0% 100%",
    foreground: "222 47% 11%",
  },
  typography: {
    heading: "Poppins",
    body: "Inter",
    weights: "400;500;600;700",
  },
  logos: {
    light: null,
    dark: null,
    favicon: null,
  },
  brand: {
    tagline: "AI & Digital Solutions for Enterprise Growth",
    voice: "Confident, technical, outcome-focused. Avoid jargon. Lead with value.",
  },
};

export function loadBrandKit(): BrandKit {
  if (typeof window === "undefined") return DEFAULT_BRAND_KIT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BRAND_KIT;
    const parsed = JSON.parse(raw);
    return {
      colors: { ...DEFAULT_BRAND_KIT.colors, ...(parsed.colors || {}) },
      typography: { ...DEFAULT_BRAND_KIT.typography, ...(parsed.typography || {}) },
      logos: { ...DEFAULT_BRAND_KIT.logos, ...(parsed.logos || {}) },
      brand: { ...DEFAULT_BRAND_KIT.brand, ...(parsed.brand || {}) },
    };
  } catch {
    return DEFAULT_BRAND_KIT;
  }
}

export function saveBrandKit(kit: BrandKit): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kit));
}

export function resetBrandKit(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ── Color helpers ─────────────────────────────────────────
export function hexToHsl(hex: string): string {
  const m = hex.replace("#", "").match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return "0 0% 0%";
  let h = m[1];
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, sat = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hue = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: hue = (b - r) / d + 2; break;
      case b: hue = (r - g) / d + 4; break;
    }
    hue *= 60;
  }
  return `${Math.round(hue)} ${Math.round(sat * 100)}% ${Math.round(l * 100)}%`;
}

export function hslToHex(hsl: string): string {
  const m = hsl.match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
  if (!m) return "#000000";
  const h = parseFloat(m[1]) / 360;
  const s = parseFloat(m[2]) / 100;
  const l = parseFloat(m[3]) / 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  let r: number, g: number, b: number;
  if (s === 0) { r = g = b = l; }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ── Apply to <html> ───────────────────────────────────────
const FONT_LINK_ID = "ak-brand-fonts";
const FAVICON_ID = "ak-brand-favicon";

function loadGoogleFont(heading: string, body: string, weights: string) {
  if (typeof document === "undefined") return;
  const families = Array.from(new Set([heading, body].filter(Boolean)));
  if (!families.length) return;
  const param = families
    .map(f => `family=${encodeURIComponent(f)}:wght@${weights}`)
    .join("&");
  const href = `https://fonts.googleapis.com/css2?${param}&display=swap`;
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.href !== href) link.href = href;
}

function setFavicon(url: string | null) {
  if (typeof document === "undefined" || !url) return;
  let link = document.getElementById(FAVICON_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = FAVICON_ID;
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
}

export function applyBrandKit(kit: BrandKit): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Colors → CSS vars (HSL space-separated, used as hsl(var(--…)))
  root.style.setProperty("--primary", kit.colors.primary);
  root.style.setProperty("--ring", kit.colors.primary);
  root.style.setProperty("--ak-primary", kit.colors.primary);
  root.style.setProperty("--accent", kit.colors.accent);
  root.style.setProperty("--ak-accent", kit.colors.accent);
  // Background/foreground only override in light mode (dark mode keeps its own scheme)
  if (!root.classList.contains("dark")) {
    root.style.setProperty("--background", kit.colors.background);
    root.style.setProperty("--foreground", kit.colors.foreground);
    root.style.setProperty("--ak-navy", kit.colors.foreground);
  }

  // Typography
  root.style.setProperty("--font-heading", `'${kit.typography.heading}', system-ui, sans-serif`);
  root.style.setProperty("--font-body", `'${kit.typography.body}', system-ui, sans-serif`);
  loadGoogleFont(kit.typography.heading, kit.typography.body, kit.typography.weights);

  // Favicon
  setFavicon(kit.logos.favicon);
}

// Convenience: load + apply on boot
export function bootBrandKit(): BrandKit {
  const kit = loadBrandKit();
  applyBrandKit(kit);
  return kit;
}
