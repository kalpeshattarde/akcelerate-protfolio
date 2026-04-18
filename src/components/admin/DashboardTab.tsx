import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, Users, Download } from "lucide-react";
import { downloadCSV } from "@/lib/csvExport";
import { AnimatedStatCard, ChartCard, ChartSkeleton, StatSkeleton } from "./AdminPolish";

const revenueData = [
  { month: "Jan", revenue: 2400, sales: 24, users: 120 },
  { month: "Feb", revenue: 3600, sales: 36, users: 180 },
  { month: "Mar", revenue: 4200, sales: 42, users: 260 },
  { month: "Apr", revenue: 5800, sales: 58, users: 340 },
  { month: "May", revenue: 7200, sales: 72, users: 480 },
  { month: "Jun", revenue: 8400, sales: 84, users: 620 },
];

const trafficSources = [
  { name: "Direct", value: 40 },
  { name: "Organic", value: 30 },
  { name: "Referral", value: 18 },
  { name: "Social", value: 12 },
];

const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#F59E0B", "#8B5CF6"];

const stats = [
  { label: "Total Revenue", numeric: 31600, prefix: "$", change: "+23% from last month", icon: DollarSign },
  { label: "Total Sales", numeric: 316, change: "+18% from last month", icon: ShoppingCart },
  { label: "Active Users", numeric: 1240, change: "+12% from last month", icon: Users },
  { label: "Conversion Rate", numeric: 3.2, suffix: "%", decimals: 1, change: "+0.4% from last month", icon: TrendingUp },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
};

export default function DashboardTab() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const exportDashboard = () => {
    downloadCSV("dashboard-report.csv",
      ["Month", "Revenue", "Sales", "Users"],
      revenueData.map(r => [r.month, String(r.revenue), String(r.sales), String(r.users)])
    );
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <StatSkeleton />
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-poppins text-lg font-semibold text-foreground">Overview</h3>
        <button onClick={exportDashboard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <AnimatedStatCard
            key={s.label}
            label={s.label}
            numeric={s.numeric}
            prefix={s.prefix}
            suffix={s.suffix}
            decimals={s.decimals}
            change={s.change}
            icon={s.icon}
            index={i}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Over Time" index={0}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} animationDuration={900} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Sales Trend" index={1}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} activeDot={{ r: 6 }} animationDuration={1100} animationEasing="ease-out" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="User Growth" index={0}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="users" stroke="hsl(var(--accent))" fill="url(#userGrad)" strokeWidth={2.5} animationDuration={1100} animationEasing="ease-out" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Traffic Sources" index={1}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} animationDuration={900} animationEasing="ease-out">
                {trafficSources.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
