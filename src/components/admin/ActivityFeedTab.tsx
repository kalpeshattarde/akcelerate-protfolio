import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShoppingCart, UserPlus, FileText, Mail, Package, Clock } from "lucide-react";
import { EmptyState, FeedSkeleton } from "./AdminPolish";

interface ActivityItem {
  id: string;
  type: "purchase" | "signup" | "content" | "email" | "product" | "order_status";
  message: string;
  timestamp: string;
  icon: "cart" | "user" | "file" | "mail" | "package" | "clock";
}

function getActivityKey() { return "ak-activity-feed"; }

function getActivityFeed(): ActivityItem[] {
  try {
    const stored = JSON.parse(localStorage.getItem(getActivityKey()) || "[]");
    if (stored.length > 0) return stored;
  } catch {}

  // Seed sample activity
  const now = Date.now();
  const samples: ActivityItem[] = [
    { id: "a1", type: "purchase", message: "New purchase: SaaS CRM Prototype by rahul@example.com", timestamp: new Date(now - 120000).toISOString(), icon: "cart" },
    { id: "a2", type: "signup", message: "New user registered: priya.sharma@gmail.com", timestamp: new Date(now - 300000).toISOString(), icon: "user" },
    { id: "a3", type: "content", message: "Blog post \"AI in Manufacturing\" published", timestamp: new Date(now - 600000).toISOString(), icon: "file" },
    { id: "a4", type: "email", message: "Invoice email sent to kalpesh@akcelerate.com", timestamp: new Date(now - 900000).toISOString(), icon: "mail" },
    { id: "a5", type: "order_status", message: "Order #ORD-1042 marked as completed", timestamp: new Date(now - 1500000).toISOString(), icon: "clock" },
    { id: "a6", type: "product", message: "Product \"Mobile Fitness App\" updated", timestamp: new Date(now - 2400000).toISOString(), icon: "package" },
    { id: "a7", type: "signup", message: "New user registered: dev.team@startup.io", timestamp: new Date(now - 3600000).toISOString(), icon: "user" },
    { id: "a8", type: "purchase", message: "New purchase: E-Learning Platform by ankit@corp.in", timestamp: new Date(now - 5400000).toISOString(), icon: "cart" },
    { id: "a9", type: "email", message: "Welcome email sent to newuser@example.com", timestamp: new Date(now - 7200000).toISOString(), icon: "mail" },
    { id: "a10", type: "content", message: "Case study \"MSME Growth\" moved to draft", timestamp: new Date(now - 10800000).toISOString(), icon: "file" },
  ];
  localStorage.setItem(getActivityKey(), JSON.stringify(samples));
  return samples;
}

const ICON_MAP = {
  cart: ShoppingCart,
  user: UserPlus,
  file: FileText,
  mail: Mail,
  package: Package,
  clock: Clock,
};

const TYPE_COLORS: Record<ActivityItem["type"], string> = {
  purchase: "bg-emerald-500/10 text-emerald-600",
  signup: "bg-primary/10 text-primary",
  content: "bg-amber-500/10 text-amber-600",
  email: "bg-violet-500/10 text-violet-600",
  product: "bg-cyan-500/10 text-cyan-600",
  order_status: "bg-muted text-muted-foreground",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ActivityFeedTab() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<"all" | ActivityItem["type"]>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setActivities(getActivityFeed());
      setLoading(false);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  // Simulate live activity every 30s
  useEffect(() => {
    if (loading) return;
    const messages = [
      { type: "purchase" as const, message: "New purchase: Travel Booking App by visitor", icon: "cart" as const },
      { type: "signup" as const, message: "New user registered: demo@lovable.dev", icon: "user" as const },
      { type: "email" as const, message: "Test email sent to admin@akcelerate.com", icon: "mail" as const },
    ];
    const interval = setInterval(() => {
      const pick = messages[Math.floor(Math.random() * messages.length)];
      const newItem: ActivityItem = {
        id: `live-${Date.now()}`,
        type: pick.type,
        message: pick.message,
        timestamp: new Date().toISOString(),
        icon: pick.icon,
      };
      setActivities(prev => {
        const updated = [newItem, ...prev].slice(0, 50);
        localStorage.setItem(getActivityKey(), JSON.stringify(updated));
        return updated;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [loading]);

  const filtered = filter === "all" ? activities : activities.filter(a => a.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        <h2 className="font-poppins text-xl font-semibold text-foreground">Activity Feed</h2>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live
        </span>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "purchase", "signup", "content", "email", "product", "order_status"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} disabled={loading}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50 ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {f === "all" ? "All" : f === "order_status" ? "Orders" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
          </button>
        ))}
      </div>

      {/* Feed */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="skeleton" exit={{ opacity: 0 }}>
            <FeedSkeleton items={6} />
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-border bg-card">
            <EmptyState
              icon={Activity}
              title={activities.length === 0 ? "No activity yet" : `No ${filter === "order_status" ? "order" : filter} events`}
              description={activities.length === 0 ? "Live events from purchases, signups, and content updates will stream here in real time." : "Switch the filter to view other event types."}
            />
          </motion.div>
        ) : (
          <motion.div key="feed" className="space-y-2">
            {filtered.map((item, idx) => {
              const Icon = ICON_MAP[item.icon] || Clock;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.4) }}
                  className={`flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:border-primary/20 transition-all ${idx === 0 ? "ring-1 ring-primary/10" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[item.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.message}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{timeAgo(item.timestamp)}</p>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${TYPE_COLORS[item.type]}`}>
                    {item.type === "order_status" ? "order" : item.type}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
