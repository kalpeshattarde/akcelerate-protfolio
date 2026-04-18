/**
 * A/B event data layer.
 *
 * Writes go to BOTH Lovable Cloud (durable, cross-session) and localStorage
 * (instant, works offline / in dev without Cloud). Reads prefer Cloud when it
 * has rows, falling back to localStorage so the dev seed buttons still work.
 */
import { supabase } from "@/integrations/supabase/client";

export type AbEventName = "products_view" | "add_to_cart" | "bundle_unlocked";
export type AbVariant = "control" | "catalog-early";

export interface AbEventRow {
  variant: AbVariant;
  event: AbEventName;
  created_at: string;
}

const STORAGE_KEY = "ak-analytics";
const UPDATED_EVENT = "ak-analytics-updated";

interface LocalEvt {
  event: string;
  data: Record<string, unknown>;
  timestamp: string;
  path: string;
}

function readLocal(): AbEventRow[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as LocalEvt[];
    return raw
      .filter(e => {
        const v = e.data?.variant as string | undefined;
        return (v === "control" || v === "catalog-early") &&
          (e.event === "products_view" || e.event === "add_to_cart" || e.event === "bundle_unlocked");
      })
      .map(e => ({
        variant: e.data.variant as AbVariant,
        event: e.event as AbEventName,
        created_at: e.timestamp,
      }));
  } catch {
    return [];
  }
}

/** Fetch A/B events: Cloud first, localStorage fallback if Cloud is empty. */
export async function fetchAbEvents(): Promise<{ rows: AbEventRow[]; source: "cloud" | "local" }> {
  try {
    const { data, error } = await supabase
      .from("ab_events")
      .select("variant, event, created_at")
      .order("created_at", { ascending: false })
      .limit(5000);
    if (!error && data && data.length > 0) {
      return { rows: data as AbEventRow[], source: "cloud" };
    }
  } catch {
    // fall through
  }
  return { rows: readLocal(), source: "local" };
}

/** Record a single A/B event. Best-effort to Cloud, always to localStorage. */
export async function recordAbEvent(variant: AbVariant, event: AbEventName, sessionId?: string) {
  // localStorage (instant, drives admin dashboard while Cloud round-trips)
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as LocalEvt[];
    existing.push({
      event,
      data: { variant },
      timestamp: new Date().toISOString(),
      path: typeof window !== "undefined" ? window.location.pathname : "/",
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(-5000)));
    if (typeof window !== "undefined") window.dispatchEvent(new Event(UPDATED_EVENT));
  } catch {
    /* ignore quota errors */
  }

  // Cloud (best effort, fire-and-forget)
  try {
    await supabase.from("ab_events").insert({ variant, event, session_id: sessionId ?? null });
  } catch {
    /* offline / RLS / network — local copy still tracked */
  }
}

export const AB_UPDATED_EVENT = UPDATED_EVENT;
