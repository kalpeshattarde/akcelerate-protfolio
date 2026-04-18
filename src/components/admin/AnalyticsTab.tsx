import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, Legend, ComposedChart, Area } from "recharts";
import { Eye, ShoppingBag, MousePointerClick, FileText, Activity, BarChart3, PieChart as PieIcon, ListOrdered, LineChart as LineIcon } from "lucide-react";
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

  // A/B variant breakdown for products page (control vs catalog-early)
  const abVariantData = useMemo(() => {
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

  // Daily cart rate per variant (last 7 days) for trend chart
  const abDailyData = useMemo(() => {
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

  const STORAGE_KEY = "ak-analytics";
  type Evt = { event: string; data: Record<string, unknown>; timestamp: string; path: string };
  const makeEvents = (event: string, variant: string, count: number, offsetMs = 0): Evt[] => {
    const now = Date.now();
    return Array.from({ length: count }, (_, i) => ({
      event,
      data: { variant },
      timestamp: new Date(now - offsetMs - i * 1000).toISOString(),
      path: "/products",
    }));
  };
  const writeSeed = (seeded: Evt[]) => {
    const existing: Evt[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const combined = [...existing, ...seeded].slice(-500);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
    window.location.reload();
  };

  const seedAbTestData = () => {
    // 600 control views, 90 add_to_cart (15%), 30 bundle_unlocked
    // 550 catalog-early views, 120 add_to_cart (~21.8%, +6.8 pts → z≈3.0, p≈0.003 → green winner)
    writeSeed([
      ...makeEvents("products_view", "control", 600),
      ...makeEvents("add_to_cart", "control", 90, 1000),
      ...makeEvents("bundle_unlocked", "control", 30, 2000),
      ...makeEvents("products_view", "catalog-early", 550),
      ...makeEvents("add_to_cart", "catalog-early", 120, 1000),
      ...makeEvents("bundle_unlocked", "catalog-early", 40, 2000),
    ]);
  };

  const seedSparseAbData = () => {
    // 40 views per variant + a few add_to_cart → triggers amber "Need 100+ views" banner
    writeSeed([
      ...makeEvents("products_view", "control", 40),
      ...makeEvents("add_to_cart", "control", 4, 1000),
      ...makeEvents("products_view", "catalog-early", 40),
      ...makeEvents("add_to_cart", "catalog-early", 6, 1000),
    ]);
  };

  const seedNeutralAbData = () => {
    // 600 control views, 90 add_to_cart (15%)
    // 600 catalog-early views, 80 add_to_cart (~13.3%) → ~-1.7 pts lift, p≈0.39 → neutral
    writeSeed([
      ...makeEvents("products_view", "control", 600),
      ...makeEvents("add_to_cart", "control", 90, 1000),
      ...makeEvents("bundle_unlocked", "control", 30, 2000),
      ...makeEvents("products_view", "catalog-early", 600),
      ...makeEvents("add_to_cart", "catalog-early", 80, 1000),
      ...makeEvents("bundle_unlocked", "catalog-early", 35, 2000),
    ]);
  };

  const clearAbTestData = () => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Array<{ data?: { variant?: string } }>;
    const filtered = existing.filter(e => !e.data || (e.data.variant !== "control" && e.data.variant !== "catalog-early"));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      {import.meta.env.DEV && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-dashed border-border bg-muted/30">
          <span className="text-xs font-mono text-muted-foreground mr-auto">DEV ONLY · Preview A/B card states</span>
          <button
            onClick={seedSparseAbData}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-500/90 transition-colors"
          >
            Seed sparse data
          </button>
          <button
            onClick={seedNeutralAbData}
            className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 border border-border transition-colors"
          >
            Seed neutral data
          </button>
          <button
            onClick={seedAbTestData}
            className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            Seed A/B test data
          </button>
          <button
            onClick={clearAbTestData}
            className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs font-medium hover:bg-muted transition-colors"
          >
            Clear A/B data
          </button>
        </div>
      )}
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

      <ChartCard title="A/B Test: Products Page Order" index={0}>
        {abVariantData.some(r => r.views > 0) ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Variant</th>
                  <th className="py-2 pr-4 font-medium">Views</th>
                  <th className="py-2 pr-4 font-medium">Add to Cart</th>
                  <th className="py-2 pr-4 font-medium">Bundle Unlocked</th>
                  <th className="py-2 pr-4 font-medium">Cart Rate</th>
                  <th className="py-2 font-medium">Bundle Rate</th>
                </tr>
              </thead>
              <tbody>
                {abVariantData.map(row => (
                  <tr key={row.variant} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 font-mono text-xs text-foreground">{row.variant}</td>
                    <td className="py-2 pr-4 text-foreground">{row.views}</td>
                    <td className="py-2 pr-4 text-foreground">{row.addToCart}</td>
                    <td className="py-2 pr-4 text-foreground">{row.bundleUnlocked}</td>
                    <td className="py-2 pr-4 font-semibold text-primary">{row.cartRate}%</td>
                    <td className="py-2 font-semibold text-primary">{row.bundleRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(() => {
              const MIN_VIEWS = 100;
              const ALPHA = 0.05;
              const ctrl = abVariantData.find(r => r.variant === "control");
              const exp = abVariantData.find(r => r.variant === "catalog-early");
              if (!ctrl || !exp) return null;
              const enoughData = ctrl.views >= MIN_VIEWS && exp.views >= MIN_VIEWS;
              const lift = +(exp.cartRate - ctrl.cartRate).toFixed(1);
              const winner = lift > 0 ? "catalog-early" : lift < 0 ? "control" : null;

              // Two-proportion z-test (pooled). Returns two-tailed p-value.
              // Abramowitz & Stegun 26.2.17 approximation for normal CDF.
              const normalCdf = (z: number) => {
                const t = 1 / (1 + 0.2316419 * Math.abs(z));
                const d = 0.3989422804014327 * Math.exp(-z * z / 2);
                const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
                return z > 0 ? 1 - p : p;
              };
              const p1 = ctrl.addToCart / Math.max(ctrl.views, 1);
              const p2 = exp.addToCart / Math.max(exp.views, 1);
              const pPool = (ctrl.addToCart + exp.addToCart) / Math.max(ctrl.views + exp.views, 1);
              const se = Math.sqrt(pPool * (1 - pPool) * (1 / Math.max(ctrl.views, 1) + 1 / Math.max(exp.views, 1)));
              const z = se > 0 ? (p2 - p1) / se : 0;
              const pValue = 2 * (1 - normalCdf(Math.abs(z)));
              const pStr = pValue < 0.001 ? "<0.001" : pValue.toFixed(3);
              const significant = enoughData && pValue < ALPHA;

              if (!enoughData) {
                const remaining = Math.max(0, MIN_VIEWS - Math.min(ctrl.views, exp.views));
                return (
                  <div className="mt-3 flex items-start gap-2 text-xs p-2.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    <span aria-hidden>⏳</span>
                    <span>Need 100+ views per variant for a reliable read — {remaining} more view{remaining === 1 ? "" : "s"} on the smaller arm.</span>
                  </div>
                );
              }
              if (significant && winner) {
                return (
                  <div className="mt-3 flex items-start gap-2 text-xs p-2.5 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20">
                    <span aria-hidden>✓</span>
                    <span><strong>{winner}</strong> wins by {Math.abs(lift)} pts on cart rate (p={pStr}, z={z.toFixed(2)}).</span>
                  </div>
                );
              }
              return (
                <div className="mt-3 flex items-start gap-2 text-xs p-2.5 rounded-lg bg-muted text-muted-foreground border border-border">
                  <span aria-hidden>≈</span>
                  <span>No significant winner yet (lift {lift > 0 ? "+" : ""}{lift} pts, p={pStr}, threshold α={ALPHA}).</span>
                </div>
              );
            })()}
            <p className="mt-3 text-xs text-muted-foreground">
              Cart Rate = Add to Cart / Views · Bundle Rate = Bundle Unlocked / Views
            </p>
          </div>
        ) : (
          <EmptyState icon={Activity} title="No A/B test data yet" description="Visit /products in different sessions to assign both variants." />
        )}
      </ChartCard>

      <ChartCard title="A/B Cart Rate Over Time (Last 7 Days)" index={1}>
        {abDailyData.some(d => d.control > 0 || d["catalog-early"] > 0) ? (
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={abDailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number | [number, number], name: string) => {
                  if (Array.isArray(v)) return [`${v[0]}% – ${v[1]}%`, name];
                  return [`${v}%`, name];
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="controlBand" name="control 95% CI" stroke="none" fill="hsl(var(--muted-foreground))" fillOpacity={0.15} activeDot={false} legendType="none" />
              <Area type="monotone" dataKey="expBand" name="catalog-early 95% CI" stroke="none" fill="hsl(var(--primary))" fillOpacity={0.15} activeDot={false} legendType="none" />
              <Line type="monotone" dataKey="control" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={{ r: 3 }} animationDuration={900} />
              <Line type="monotone" dataKey="catalog-early" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} animationDuration={900} animationBegin={150} />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState icon={LineIcon} title="No A/B trend data yet" description="Cart rate per variant will appear here once events accumulate." />
        )}
      </ChartCard>

      <div className="text-center text-xs text-muted-foreground">
        {events.length} total events tracked · Data stored locally in browser
      </div>
    </div>
  );
}
