import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye, ShoppingBag, MousePointerClick, FileText, Activity, BarChart3, PieChart as PieIcon, ListOrdered } from "lucide-react";
import { getAnalyticsEvents } from "@/lib/analytics";
import { AnimatedStatCard, ChartCard, ChartSkeleton, EmptyState, StatSkeleton } from "./AdminPolish";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"];
const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
};

export default function AnalyticsTab() {
  const [loading, setLoading] = useState(true);
  const events = useMemo(() => getAnalyticsEvents(), []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const counts = useMemo(() => {
    const c = { page_view: 0, product_view: 0, purchase: 0, recommendation_click: 0 };
    events.forEach(e => {
      if (e.event in c) c[e.event as keyof typeof c]++;
    });
    return c;
  }, [events]);

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
    { label: "Page Views", numeric: counts.page_view, icon: FileText, iconClass: "text-primary" },
    { label: "Product Views", numeric: counts.product_view, icon: Eye, iconClass: "text-blue-500" },
    { label: "Purchases", numeric: counts.purchase, icon: ShoppingBag, iconClass: "text-green-500" },
    { label: "Rec. Clicks", numeric: counts.recommendation_click, icon: MousePointerClick, iconClass: "text-amber-500" },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <StatSkeleton />
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartSkeleton height={200} />
          <ChartSkeleton height={200} />
        </div>
      </div>
    );
  }

  const hasDaily = dailyData.some(d => d.views > 0 || d.purchases > 0);

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <AnimatedStatCard
            key={s.label}
            label={s.label}
            numeric={s.numeric}
            icon={s.icon}
            iconClass={s.iconClass}
            index={i}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Activity (Last 7 Days)" index={0}>
          {hasDaily ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
                <Bar dataKey="views" name="Views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} animationDuration={900} animationEasing="ease-out" />
                <Bar dataKey="purchases" name="Purchases" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={900} animationBegin={200} animationEasing="ease-out" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              icon={Activity}
              title="No activity yet"
              description="Events will appear here as users browse the site."
            />
          )}
        </ChartCard>

        <ChartCard title="Recommendation Clicks" index={1}>
          {recClicks.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={recClicks} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name} (${value})`} animationDuration={900} animationEasing="ease-out">
                  {recClicks.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              icon={PieIcon}
              title="No recommendation clicks yet"
              description="Track which suggestions convert best."
            />
          )}
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Top Viewed Products" index={0}>
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
            <EmptyState icon={BarChart3} title="No product views tracked yet" />
          )}
        </ChartCard>

        <ChartCard title="Top Pages" index={1}>
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
            <EmptyState icon={ListOrdered} title="No page views tracked yet" />
          )}
        </ChartCard>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        {events.length} total events tracked · Data stored locally in browser
      </div>
    </div>
  );
}
