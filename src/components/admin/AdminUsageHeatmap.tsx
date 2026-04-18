import { useEffect, useMemo, useState } from "react";
import { Sparkles, Users as UsersIcon } from "lucide-react";
import { getAdminTabViews, seedAdminTabViews, clearAdminTabViews } from "@/lib/adminUsage";
import { ChartCard, EmptyState } from "./AdminPolish";

const DAYS = 14;

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function AdminUsageHeatmap() {
  const [views, setViews] = useState(() => getAdminTabViews());

  useEffect(() => {
    const refresh = () => setViews(getAdminTabViews());
    window.addEventListener("ak-admin-usage-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ak-admin-usage-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const { matrix, tabs, max, totals, perUser } = useMemo(() => {
    const tabSet = new Set<string>();
    const userSet = new Set<string>();
    const m: Record<string, Record<string, number>> = {};
    views.forEach(v => {
      tabSet.add(v.tab);
      userSet.add(v.user);
      m[v.tab] ||= {};
      const day = v.timestamp.slice(0, 10);
      m[v.tab][day] = (m[v.tab][day] || 0) + 1;
    });
    const tabs = Array.from(tabSet).sort();
    const days: string[] = [];
    const today = new Date();
    for (let i = DAYS - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days.push(dayKey(d));
    }
    let max = 0;
    const matrix = tabs.map(t => ({
      tab: t,
      cells: days.map(d => {
        const v = m[t]?.[d] || 0;
        if (v > max) max = v;
        return { day: d, value: v };
      }),
      total: days.reduce((a, d) => a + (m[t]?.[d] || 0), 0),
    }));
    const totals = days.map(d => ({
      day: d,
      label: new Date(d).toLocaleDateString("en", { month: "short", day: "numeric" }),
    }));
    // per-user counts
    const userCounts: Record<string, number> = {};
    views.forEach(v => { userCounts[v.user] = (userCounts[v.user] || 0) + 1; });
    const perUser = Object.entries(userCounts)
      .map(([user, count]) => ({ user, count }))
      .sort((a, b) => b.count - a.count);
    return { matrix, tabs, max, totals, perUser };
  }, [views]);

  const cellColor = (v: number) => {
    if (v === 0) return "bg-muted/40";
    const intensity = Math.min(1, v / Math.max(1, max));
    if (intensity > 0.75) return "bg-primary";
    if (intensity > 0.5) return "bg-primary/70";
    if (intensity > 0.25) return "bg-primary/45";
    return "bg-primary/25";
  };

  const isEmpty = views.length === 0;

  return (
    <ChartCard
      title="Admin tab usage (last 14 days)"
      index={2}
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => seedAdminTabViews()}
            className="text-xs rounded-md border border-border px-2.5 py-1 hover:bg-muted transition-colors inline-flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> Seed sample
          </button>
          {!isEmpty && (
            <button
              type="button"
              onClick={() => clearAdminTabViews()}
              className="text-xs rounded-md border border-border px-2.5 py-1 hover:bg-muted hover:text-destructive transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      }
    >
      {isEmpty ? (
        <EmptyState
          icon={UsersIcon}
          title="No admin tab views yet"
          description="Click around the admin tabs — or seed sample data — to see which tabs your team uses most."
        />
      ) : (
        <div className="space-y-5">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 text-xs">
              <thead>
                <tr>
                  <th className="text-left text-muted-foreground font-medium pr-2 sticky left-0 bg-card">Tab</th>
                  {totals.map(t => (
                    <th key={t.day} className="text-[9px] text-muted-foreground font-normal text-center w-6">
                      {t.label.split(" ")[1]}
                    </th>
                  ))}
                  <th className="text-right text-muted-foreground font-medium pl-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map(row => (
                  <tr key={row.tab}>
                    <td className="text-foreground font-medium pr-2 capitalize sticky left-0 bg-card">
                      {row.tab}
                    </td>
                    {row.cells.map(c => (
                      <td key={c.day} className="p-0">
                        <div
                          title={`${row.tab} · ${c.day} · ${c.value} view${c.value === 1 ? "" : "s"}`}
                          className={`w-6 h-6 rounded ${cellColor(c.value)} transition-colors`}
                        />
                      </td>
                    ))}
                    <td className="text-right pl-2 font-mono tabular-nums text-foreground">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              {[0, 0.25, 0.5, 0.75, 1].map(i => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded ${cellColor(Math.ceil(i * max))}`}
                />
              ))}
              <span>More</span>
            </div>
            <span>{tabs.length} tabs · {views.length} total views</span>
          </div>

          {perUser.length > 0 && (
            <div className="pt-4 border-t border-border">
              <div className="text-xs font-medium text-foreground mb-2">By admin user</div>
              <div className="space-y-1.5">
                {perUser.slice(0, 6).map(u => {
                  const pct = (u.count / views.length) * 100;
                  return (
                    <div key={u.user} className="flex items-center gap-3 text-xs">
                      <span className="w-48 truncate text-foreground">{u.user}</span>
                      <div className="flex-1 h-2 rounded bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums text-muted-foreground w-12 text-right">{u.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </ChartCard>
  );
}
