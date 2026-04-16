import { useState, useMemo } from "react";
import { Users, Search, X, Mail, Calendar, ShoppingBag, Crown } from "lucide-react";

interface UserRecord {
  id: string;
  email: string;
  name: string;
  signupDate: string;
  purchases: number;
  totalSpent: number;
  lastActive: string;
  status: "active" | "inactive";
}

function getUsers(): UserRecord[] {
  try {
    return JSON.parse(localStorage.getItem("ak-users") || "[]");
  } catch { return []; }
}

function getSalesAsUsers(): UserRecord[] {
  try {
    const sales = JSON.parse(localStorage.getItem("ak-sales") || "[]");
    const orders = JSON.parse(localStorage.getItem("ak-orders") || "[]");
    const map = new Map<string, UserRecord>();

    for (const order of orders) {
      const email = order.email || "unknown@user.com";
      if (!map.has(email)) {
        map.set(email, {
          id: email,
          email,
          name: order.name || email.split("@")[0],
          signupDate: order.date || new Date().toISOString(),
          purchases: 0,
          totalSpent: 0,
          lastActive: order.date || new Date().toISOString(),
          status: "active",
        });
      }
      const u = map.get(email)!;
      u.purchases += order.items?.length || 0;
      u.totalSpent += order.total || 0;
      if (order.date > u.lastActive) u.lastActive = order.date;
    }

    return Array.from(map.values());
  } catch { return []; }
}

export default function UserManagementTab() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const users = useMemo(() => {
    const stored = getUsers();
    if (stored.length > 0) return stored;
    return getSalesAsUsers();
  }, []);

  const filtered = useMemo(() => {
    let result = users;
    if (filter !== "all") result = result.filter(u => u.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(u =>
        u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
      );
    }
    return result;
  }, [users, filter, search]);

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const topSpender = users.reduce((top, u) => u.totalSpent > (top?.totalSpent || 0) ? u : top, users[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-5 h-5 text-primary" />
        <h2 className="font-poppins text-xl font-semibold text-foreground">User Management</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: totalUsers, color: "text-primary" },
          { label: "Active", value: activeUsers, color: "text-emerald-500" },
          { label: "Inactive", value: totalUsers - activeUsers, color: "text-amber-500" },
          { label: "Top Spender", value: topSpender?.name || "—", color: "text-violet-500" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className={`font-poppins text-xl font-bold ${s.color} truncate`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users…"
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>}
        </div>
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-border bg-muted/20">
          <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No users found. User data appears here after purchases.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Purchases</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Spent</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Last Active</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold uppercase">
                          {u.name[0]}
                        </div>
                        <span className="font-medium text-foreground">{u.name}</span>
                        {topSpender?.id === u.id && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1"><ShoppingBag className="w-3 h-3" /> {u.purchases}</span>
                    </td>
                    <td className="px-4 py-3 text-center font-medium">${u.totalSpent.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground text-xs">
                      {new Date(u.lastActive).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.status === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
