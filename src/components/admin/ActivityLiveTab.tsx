import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Radio, Trash2, Filter as FilterIcon, Bell, BellOff } from "lucide-react";
import { getAnalyticsEvents } from "@/lib/analytics";
import { filterEventsByCohort, getSelectedCohortId } from "@/lib/cohorts";
import { ChartCard, EmptyState } from "./AdminPolish";
import CohortPicker from "./CohortPicker";

const NOTIFY_KEY = "ak-live-notify";
const NOTIFY_EVENT_KEY = "ak-live-notify-event";

function playChime() {
  try {
    const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.18);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.36);
  } catch { /* ignore */ }
}

const POLL_MS = 2000;
const MAX_DISPLAY = 50;

function timeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 5000) return "just now";
  if (ms < 60_000) return `${Math.floor(ms / 1000)}s ago`;
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)}m ago`;
  if (ms < 86_400_000) return `${Math.floor(ms / 3_600_000)}h ago`;
  return `${Math.floor(ms / 86_400_000)}d ago`;
}

const EVENT_COLORS: Record<string, string> = {
  page_view: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  product_view: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  products_view: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  add_to_cart: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  purchase: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  recommendation_click: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  bundle_unlocked: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
};

export default function ActivityLiveTab() {
  const [events, setEvents] = useState(() => getAnalyticsEvents().slice(-MAX_DISPLAY).reverse());
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [notify, setNotify] = useState<boolean>(() => localStorage.getItem(NOTIFY_KEY) === "1");
  const [notifyEvent, setNotifyEvent] = useState<string>(() => localStorage.getItem(NOTIFY_EVENT_KEY) || "purchase");
  const [desktopGranted, setDesktopGranted] = useState<boolean>(() => typeof Notification !== "undefined" && Notification.permission === "granted");
  const lastSeenRef = useRef<string>(events[0]?.timestamp || "");
  const [tick, setTick] = useState(0);

  useEffect(() => { localStorage.setItem(NOTIFY_KEY, notify ? "1" : "0"); }, [notify]);
  useEffect(() => { localStorage.setItem(NOTIFY_EVENT_KEY, notifyEvent); }, [notifyEvent]);

  const toggleNotify = async () => {
    const next = !notify;
    if (next && typeof Notification !== "undefined" && Notification.permission === "default") {
      try {
        const result = await Notification.requestPermission();
        setDesktopGranted(result === "granted");
      } catch { /* ignore */ }
    }
    setNotify(next);
  };

  // Poll
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const next = getAnalyticsEvents().slice(-MAX_DISPLAY).reverse();
      const lastSeen = lastSeenRef.current;
      // Detect new matching events for notification
      if (notify && lastSeen) {
        const fresh = next.filter(e => e.timestamp > lastSeen && e.event === notifyEvent);
        if (fresh.length > 0) {
          playChime();
          if (desktopGranted && typeof Notification !== "undefined") {
            try {
              new Notification(`New ${notifyEvent}`, {
                body: `${fresh.length} new event${fresh.length > 1 ? "s" : ""} on ${fresh[0].path}`,
                tag: `ak-live-${notifyEvent}`,
              });
            } catch { /* ignore */ }
          }
        }
      }
      setEvents(next);
      lastSeenRef.current = next[0]?.timestamp || lastSeenRef.current;
    }, POLL_MS);
    return () => clearInterval(id);
  }, [paused, notify, notifyEvent, desktopGranted]);

  // Re-render every 5s so "time ago" stays fresh
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    events.forEach(e => set.add(e.event));
    return ["all", ...Array.from(set).sort()];
  }, [events]);

  const filtered = useMemo(
    () => (filter === "all" ? events : events.filter(e => e.event === filter)),
    [events, filter],
  );
  void tick;

  return (
    <div className="space-y-6">
      <ChartCard
        title="Live activity"
        index={0}
        action={
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs">
              <span
                className={`relative inline-flex w-2 h-2 rounded-full ${
                  paused ? "bg-muted-foreground" : "bg-emerald-500"
                }`}
              >
                {!paused && (
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                )}
              </span>
              <span className="text-muted-foreground">{paused ? "Paused" : "Live"}</span>
            </span>
            <div className="inline-flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={toggleNotify}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 transition-colors ${
                  notify ? "border-primary/40 bg-primary/10 text-primary" : "border-border hover:bg-muted"
                }`}
                aria-pressed={notify}
                title={notify ? "Notifications on" : "Notifications off"}
              >
                {notify ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
                {notify ? "On" : "Off"}
              </button>
              {notify && (
                <select
                  value={notifyEvent}
                  onChange={(e) => setNotifyEvent(e.target.value)}
                  className="text-xs h-7 rounded-md border border-input bg-background px-2"
                  aria-label="Notify on event"
                >
                  {["purchase", "add_to_cart", "bundle_unlocked", "recommendation_click"].map(ev => (
                    <option key={ev} value={ev}>{ev}</option>
                  ))}
                </select>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPaused(p => !p)}
              className="inline-flex items-center gap-1.5 text-xs rounded-md border border-border px-2.5 py-1 hover:bg-muted transition-colors"
            >
              {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              {paused ? "Resume" : "Pause"}
            </button>
          </div>
        }
      >
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <FilterIcon className="w-3 h-3" /> Filter:
          </span>
          {eventTypes.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`text-xs rounded-full px-2.5 py-1 border transition-colors ${
                filter === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Radio}
            title={paused ? "Stream paused" : "Waiting for events…"}
            description="Events will appear here as users interact with the site."
          />
        ) : (
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {filtered.map((e, i) => {
                const cls = EVENT_COLORS[e.event] || "bg-muted text-muted-foreground border-border";
                const dataPreview = Object.entries(e.data || {})
                  .slice(0, 3)
                  .map(([k, v]) => `${k}=${typeof v === "string" ? v : JSON.stringify(v)}`)
                  .join(" · ");
                return (
                  <motion.div
                    key={`${e.timestamp}-${i}`}
                    layout
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 p-2.5 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/40 transition-colors"
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${cls} shrink-0`}
                    >
                      {e.event}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-foreground font-mono truncate">
                        {e.path}
                        {dataPreview && (
                          <span className="text-muted-foreground"> · {dataPreview}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
                      {timeAgo(e.timestamp)}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Showing {filtered.length} of last {events.length} events · polls every {POLL_MS / 1000}s</span>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("ak-analytics");
              window.dispatchEvent(new CustomEvent("ak-analytics-updated"));
              setEvents([]);
            }}
            className="inline-flex items-center gap-1 hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
      </ChartCard>
    </div>
  );
}
