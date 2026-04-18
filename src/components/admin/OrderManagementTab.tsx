import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Search, X, Package, Clock, CheckCircle2, AlertCircle, ArrowUpDown, Download, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";
import { downloadCSV } from "@/lib/csvExport";
import { AnimatedStatCard, EmptyState, TableSkeleton, StatSkeleton } from "./AdminPolish";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

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
        o.orderId.toLowerCase().includes(q) || o.items.some(i => i.name.toLowerCase().includes(q)) || (o.email || "").toLowerCase().includes(q)
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

  const exportOrders = () => {
    downloadCSV("orders-export.csv",
      ["Order ID", "Date", "Items", "Total", "Currency", "Status", "Payment", "Email"],
      filtered.map(o => [o.orderId, new Date(o.date).toLocaleDateString(), o.items.map(i => i.name).join("; "), String(o.total), o.currency, o.status, o.paymentMethod, o.email || ""])
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          <h2 className="font-poppins text-xl font-semibold text-foreground">Order Management</h2>
        </div>
        <button onClick={exportOrders} disabled={filtered.length === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {loading ? (
        <StatSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <AnimatedStatCard label="Total Orders" numeric={orders.length} icon={ShoppingBag} iconClass="text-primary" index={0} />
          <AnimatedStatCard label="Completed" numeric={completedCount} icon={CheckCircle2} iconClass="text-emerald-500" index={1} />
          <AnimatedStatCard label="Revenue" numeric={totalRevenue} prefix="$" icon={DollarSign} iconClass="text-violet-500" index={2} />
          <AnimatedStatCard label="Avg Order" numeric={Math.round(avgOrder)} prefix="$" icon={TrendingUp} iconClass="text-cyan-500" index={3} />
        </div>
      )}

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

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="skeleton" exit={{ opacity: 0 }}>
            <TableSkeleton rows={6} cols={7} />
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-border bg-card">
            <EmptyState
              icon={Package}
              title={orders.length === 0 ? "No orders yet" : "No orders match your filters"}
              description={orders.length === 0 ? "New orders will appear here as soon as customers complete checkout." : "Try a different status filter or clear your search."}
            />
          </motion.div>
        ) : (
          <motion.div key="table" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-2xl border border-border overflow-hidden">
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
                  {filtered.map((order, i) => {
                    const sym = order.currency === "inr" ? "₹" : "$";
                    return (
                      <motion.tr
                        key={order.orderId}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
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
                          <select value={order.status} onChange={e => updateStatus(order.orderId, e.target.value)}
                            className="text-xs rounded-lg border border-input bg-background px-2 py-1 focus:outline-none">
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
