import { useState, useMemo } from "react";
import { Receipt, Search, X, Package, Clock, CheckCircle2, AlertCircle, ArrowUpDown } from "lucide-react";

interface Order {
  orderId: string;
  date: string;
  items: { name: string; id: string; quantity: number }[];
  subtotal: number;
  discount: { code: string; percent: number } | null;
  total: number;
  currency: string;
  status: string;
  paymentMethod: string;
  email?: string;
  name?: string;
}

function getOrders(): Order[] {
  try { return JSON.parse(localStorage.getItem("ak-orders") || "[]"); } catch { return []; }
}

type SortKey = "date" | "total" | "status";

export default function OrderManagementTab() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "refunded">("all");
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);

  const orders = useMemo(() => getOrders(), []);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const completedCount = orders.filter(o => o.status === "completed").length;
  const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;

  const filtered = useMemo(() => {
    let result = orders;
    if (statusFilter !== "all") result = result.filter(o => o.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(o =>
        o.orderId.toLowerCase().includes(q) ||
        o.items.some(i => i.name.toLowerCase().includes(q)) ||
        (o.email || "").toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "date") cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortBy === "total") cmp = a.total - b.total;
      else cmp = a.status.localeCompare(b.status);
      return sortAsc ? cmp : -cmp;
    });
    return result;
  }, [orders, statusFilter, search, sortBy, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortAsc(!sortAsc);
    else { setSortBy(key); setSortAsc(false); }
  };

  const updateStatus = (orderId: string, newStatus: string) => {
    const all = getOrders();
    const idx = all.findIndex(o => o.orderId === orderId);
    if (idx >= 0) {
      all[idx].status = newStatus;
      localStorage.setItem("ak-orders", JSON.stringify(all));
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Receipt className="w-5 h-5 text-primary" />
        <h2 className="font-poppins text-xl font-semibold text-foreground">Order Management</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: orders.length.toString() },
          { label: "Completed", value: completedCount.toString() },
          { label: "Revenue", value: `$${totalRevenue.toLocaleString()}` },
          { label: "Avg Order", value: `$${avgOrder.toFixed(0)}` },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="font-poppins text-xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders…"
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          {search && <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>}
        </div>
        <div className="flex gap-2">
          {(["all", "completed", "pending", "refunded"] as const).map(f => (
            <button key={f} onClick={() => setStatusFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-border bg-muted/20">
          <Package className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">No orders found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer" onClick={() => handleSort("date")}>
                    <span className="inline-flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Items</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground cursor-pointer" onClick={() => handleSort("total")}>
                    <span className="inline-flex items-center gap-1">Total <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Payment</th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground cursor-pointer" onClick={() => handleSort("status")}>
                    <span className="inline-flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3" /></span>
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => {
                  const sym = order.currency === "inr" ? "₹" : "$";
                  return (
                    <tr key={order.orderId} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{order.orderId}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />
                          {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground max-w-[200px] truncate">{order.items.map(i => i.name).join(", ")}</td>
                      <td className="px-4 py-3 text-center font-medium">
                        {order.discount && <span className="text-xs text-emerald-600 mr-1">-{order.discount.percent}%</span>}
                        {sym}{order.total.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-muted-foreground capitalize">
                        {order.paymentMethod === "mock" ? "Demo" : order.paymentMethod}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                          order.status === "completed" ? "bg-emerald-500/10 text-emerald-600" :
                          order.status === "refunded" ? "bg-red-500/10 text-red-600" :
                          "bg-amber-500/10 text-amber-600"
                        }`}>
                          {order.status === "completed" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <select
                          value={order.status}
                          onChange={e => updateStatus(order.orderId, e.target.value)}
                          className="text-xs rounded-lg border border-input bg-background px-2 py-1 focus:outline-none"
                        >
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
