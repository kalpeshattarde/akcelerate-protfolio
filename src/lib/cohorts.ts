/**
 * Saved cohorts (audience segments) defined by event-based predicates.
 *
 * A cohort matches a session/visitor identified by their events. Since this
 * project tracks events without a user id, we group by `path` host-session
 * (all events in the local store) and treat the whole local store as one
 * "current visitor" cohort sample for demo purposes.
 *
 * The engine evaluates predicates against the full event list and returns
 * matching events — useful as a filter for Funnel, Live, and Analytics.
 */
import { getAnalyticsEvents } from "./analytics";

export type Operator = "equals" | "contains" | "exists" | "count_gte";

export interface CohortRule {
  /** Event name to match, or "*" for any */
  event: string;
  /** Optional: data key to inspect */
  key?: string;
  /** Comparison operator */
  op: Operator;
  /** Value to compare against (for equals/contains/count_gte) */
  value?: string | number;
}

export interface Cohort {
  id: string;
  name: string;
  description?: string;
  /** All rules must match (AND) */
  rules: CohortRule[];
  createdAt: string;
}

const KEY = "ak-cohorts";

export function getCohorts(): Cohort[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function saveCohorts(list: Cohort[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("ak-cohorts-updated"));
}

export function upsertCohort(c: Cohort) {
  const list = getCohorts();
  const idx = list.findIndex(x => x.id === c.id);
  if (idx >= 0) list[idx] = c;
  else list.push(c);
  saveCohorts(list);
}

export function deleteCohort(id: string) {
  saveCohorts(getCohorts().filter(c => c.id !== id));
}

export function newCohortId(): string {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

interface AnyEvent {
  event: string;
  data: Record<string, unknown>;
  timestamp: string;
  path: string;
}

function ruleMatches(events: AnyEvent[], rule: CohortRule): boolean {
  const pool = rule.event === "*" ? events : events.filter(e => e.event === rule.event);
  if (rule.op === "exists") return pool.length > 0;
  if (rule.op === "count_gte") {
    const n = Number(rule.value ?? 1);
    return pool.length >= n;
  }
  if (rule.op === "equals") {
    return pool.some(e => {
      if (!rule.key) return false;
      const v = rule.key === "path" ? e.path : (e.data?.[rule.key] as unknown);
      return String(v) === String(rule.value);
    });
  }
  if (rule.op === "contains") {
    return pool.some(e => {
      if (!rule.key) return false;
      const v = rule.key === "path" ? e.path : (e.data?.[rule.key] as unknown);
      return String(v ?? "").toLowerCase().includes(String(rule.value ?? "").toLowerCase());
    });
  }
  return false;
}

/** Returns true if the current visitor (local event store) matches the cohort */
export function matchesCohort(cohort: Cohort, events?: AnyEvent[]): boolean {
  const pool = events ?? getAnalyticsEvents();
  return cohort.rules.every(r => ruleMatches(pool, r));
}

/**
 * Returns events to use for a cohort filter. If the cohort matches the visitor,
 * we return all their events (so funnel/analytics show the data); otherwise
 * an empty list (visitor not in segment).
 */
export function filterEventsByCohort(cohortId: string | null): AnyEvent[] {
  const all = getAnalyticsEvents();
  if (!cohortId) return all;
  const cohort = getCohorts().find(c => c.id === cohortId);
  if (!cohort) return all;
  return matchesCohort(cohort, all) ? all : [];
}

export const SELECTED_COHORT_KEY = "ak-cohort-selected";

export function getSelectedCohortId(): string | null {
  return localStorage.getItem(SELECTED_COHORT_KEY) || null;
}

export function setSelectedCohortId(id: string | null) {
  if (id) localStorage.setItem(SELECTED_COHORT_KEY, id);
  else localStorage.removeItem(SELECTED_COHORT_KEY);
  window.dispatchEvent(new CustomEvent("ak-cohort-selected"));
}
