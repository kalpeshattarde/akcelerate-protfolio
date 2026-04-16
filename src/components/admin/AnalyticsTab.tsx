import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye, ShoppingBag, MousePointerClick, FileText } from "lucide-react";
import { getAnalyticsEvents } from "@/lib/analytics";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"];

export default function AnalyticsTab() {
  const events = useMemo(() => getAnalyticsEvents(), []);

  const counts = useMemo(() => {
    const c = { page_view: 0, product_view: 0, purchase: 0, recommendation_click: 0 };
    events.forEach(e => {
      if (e.event in c) c[e.event as keyof typeof c]++;
    });
    return c;
  }, [events]);

  // Top viewed products
  const topViewed = useMemo(() => {
    const map: Record<string, { name: string; views: number }> = {};
    events.filter(e => e.event === "product_view").forEach(e => {
      const slug = (e.data.slug as string) || "unknown";
      const name = (e.data.name as string) || slug;
      if (!map[slug]) map[slug] = { name, views: 0 };
      map[slug].views++;
    });
    return Object.values(map).sort((a, b) => b.views - a.views).slice(0, 8);
  }, [events]);

  // Top pages
  const topPages = useMemo(() => {
    const map: Record<string, number> = {};
    events.filter(e => e.event === "page_view").forEach(e => {
      const page = (e.data.page as string) || e.path || "/";
      map[page] = (map[page] || 0) + 1;
    });
    return Object.entries(map)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }, [events]);

  // Events over time (last 7 days)
  const dailyData = useMemo(() => {
    const days: Record<string, { date: string; views: number; purchases: number }> = {};
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = { date: d.toLocaleDateString("en", { month: "short", day: "numeric" }), views: 0, purchases: 0 };
    }
    events.forEach(e => {
      const key = e.timestamp.slice(0, 10);
      if (days[key]) {
        if (e.event === "page_view" || e.event === "product_view") days[key].views++;
        if (e.event === "purchase") days[key].purchases++;
      }
    });
    return Object.values(days);
  }, [events]);

  // Recommendation click sources
  const recClicks = useMemo(() => {
    const map: Record<string, number> = {};
    events.filter(e => e.event === "recommendation_click").forEach(e => {
      const to = (e.data.to as string) || "unknown";
      map[to] = (map[to] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [events]);

  const stats = [
    { label: "Page Views", value: counts.page_view, icon: FileText, color: "text-primary" },
    { label: "Product Views", value: counts.product_view, icon: Eye, color: "text-blue-500" },
    { label: "Purchases", value: counts.purchase, icon: ShoppingBag, color: "text-green-500" },
    { label: "Rec. Clicks", value: counts.recommendation_click, icon: MousePointerClick, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground">{s.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Activity */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Activity (Last 7 Days)</h3>
          {dailyData.some(d => d.views > 0 || d.purchases > 0) ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip />
                <Bar dataKey="views" name="Views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="purchases" name="Purchases" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground py-12 text-center">No activity data yet. Events will appear as users browse.</p>
          )}
        </div>

        {/* Recommendation Clicks Pie */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Recommendation Clicks</h3>
          {recClicks.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={recClicks} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name} (${value})`}>
                  {recClicks.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground py-12 text-center">No recommendation clicks yet.</p>
          )}
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Viewed Products */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Top Viewed Products</h3>
          {topViewed.length > 0 ? (
            <div className="space-y-2">
              {topViewed.map((p, i) => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground">
                    <span className="text-muted-foreground mr-2">#{i + 1}</span>
                    {p.name}
                  </span>
                  <span className="text-sm font-semibold text-primary">{p.views} views</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-6 text-center">No product views tracked yet.</p>
          )}
        </div>

        {/* Top Pages */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Top Pages</h3>
          {topPages.length > 0 ? (
            <div className="space-y-2">
              {topPages.map((p, i) => (
                <div key={p.page} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground font-mono truncate max-w-[200px]">
                    <span className="text-muted-foreground mr-2">#{i + 1}</span>
                    {p.page}
                  </span>
                  <span className="text-sm font-semibold text-primary">{p.views}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-6 text-center">No page views tracked yet.</p>
          )}
        </div>
      </div>

      {/* Total events count */}
      <div className="text-center text-xs text-muted-foreground">
        {events.length} total events tracked · Data stored locally in browser
      </div>
    </div>
  );
}
