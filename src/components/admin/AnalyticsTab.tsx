import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye, ShoppingBag, MousePointerClick, FileText, Activity, BarChart3, PieChart as PieIcon, ListOrdered } from "lucide-react";
import { getAnalyticsEvents } from "@/lib/analytics";
import { AnimatedStatCard, ChartCard, ChartSkeleton, EmptyState, StatSkeleton } from "./AdminPolish";
import AbSeedDevBar from "./analytics/AbSeedDevBar";
import AbTestCard, { type AbVariantRow } from "./analytics/AbTestCard";
import AbTrendChart, { type AbDailyRow } from "./analytics/AbTrendChart";
import AdminUsageHeatmap from "./AdminUsageHeatmap";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444"];
const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
};

export default function AnalyticsTab() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(() => getAnalyticsEvents());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    const refresh = () => setEvents(getAnalyticsEvents());
    window.addEventListener("ak-analytics-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("ak-analytics-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
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

  const abVariantData = useMemo<AbVariantRow[]>(() => {
    const tally: Record<string, { variant: string; views: number; addToCart: number; bundleUnlocked: number }> = {
      control: { variant: "control", views: 0, addToCart: 0, bundleUnlocked: 0 },
      "catalog-early": { variant: "catalog-early", views: 0, addToCart: 0, bundleUnlocked: 0 },
    };
    events.forEach(e => {
      const v = (e.data.variant as string) || "";
      if (v !== "control" && v !== "catalog-early") return;
      if (e.event === "products_view") tally[v].views++;
      else if (e.event === "add_to_cart") tally[v].addToCart++;
      else if (e.event === "bundle_unlocked") tally[v].bundleUnlocked++;
    });
    return Object.values(tally).map(row => ({
      ...row,
      cartRate: row.views > 0 ? +((row.addToCart / row.views) * 100).toFixed(1) : 0,
      bundleRate: row.views > 0 ? +((row.bundleUnlocked / row.views) * 100).toFixed(1) : 0,
    }));
  }, [events]);

  const abDailyData = useMemo<AbDailyRow[]>(() => {
    const days: Record<string, { date: string; cV: number; cC: number; eV: number; eC: number }> = {};
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = { date: d.toLocaleDateString("en", { month: "short", day: "numeric" }), cV: 0, cC: 0, eV: 0, eC: 0 };
    }
    events.forEach(e => {
      const v = (e.data.variant as string) || "";
      if (v !== "control" && v !== "catalog-early") return;
      const key = e.timestamp.slice(0, 10);
      if (!days[key]) return;
      if (e.event === "products_view") { if (v === "control") days[key].cV++; else days[key].eV++; }
      else if (e.event === "add_to_cart") { if (v === "control") days[key].cC++; else days[key].eC++; }
    });
    return Object.values(days).map(d => {
      const ci = (c: number, n: number) => {
        if (n === 0) return { rate: 0, low: 0, high: 0 };
        const p = c / n;
        const m = 1.96 * Math.sqrt((p * (1 - p)) / n);
        return { rate: +(p * 100).toFixed(1), low: +(Math.max(0, p - m) * 100).toFixed(1), high: +(Math.min(1, p + m) * 100).toFixed(1) };
      };
      const c = ci(d.cC, d.cV);
      const e = ci(d.eC, d.eV);
      return {
        date: d.date,
        control: c.rate,
        controlBand: [c.low, c.high] as [number, number],
        "catalog-early": e.rate,
        expBand: [e.low, e.high] as [number, number],
      };
    });
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
      <AbSeedDevBar />

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

      <AbTestCard data={abVariantData} index={0} />
      <AbTrendChart data={abDailyData} index={1} />

      <div className="text-center text-xs text-muted-foreground">
        {events.length} total events tracked · Data stored locally in browser
      </div>
    </div>
  );
}
