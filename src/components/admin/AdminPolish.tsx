import { motion } from "framer-motion";
import { Inbox, type LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Counter } from "@/components/motion/MotionPrimitives";

/* ───── Skeleton blocks ───── */
export function StatSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            <div className="h-4 w-4 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-7 w-24 rounded bg-muted animate-pulse mb-2" />
          <div className="h-3 w-16 rounded bg-muted/60 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = 250 }: { height?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="h-4 w-40 rounded bg-muted animate-pulse mb-4" />
      <div
        className="rounded-lg bg-gradient-to-b from-muted/60 to-muted/20 animate-pulse"
        style={{ height }}
      />
    </div>
  );
}

/* ───── Empty state ───── */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center py-12 px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
        className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
      {description && <p className="text-xs text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}

/* ───── Animated stat card ───── */
export function AnimatedStatCard({
  label,
  value,
  numeric,
  prefix = "",
  suffix = "",
  decimals = 0,
  change,
  icon: Icon,
  iconClass = "text-muted-foreground",
  index = 0,
}: {
  label: string;
  value?: string;
  numeric?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change?: string;
  icon: LucideIcon;
  iconClass?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className={`w-4 h-4 ${iconClass}`} />
      </div>
      <div className="text-2xl font-bold text-foreground">
        {numeric !== undefined ? (
          <Counter to={numeric} prefix={prefix} suffix={suffix} decimals={decimals} duration={1.2} />
        ) : (
          value
        )}
      </div>
      {change && <div className="text-xs text-green-500 mt-1">{change}</div>}
    </motion.div>
  );
}

/* ───── Animated chart card wrapper ───── */
export function ChartCard({
  title,
  children,
  index = 0,
  action,
}: {
  title: string;
  children: ReactNode;
  index?: number;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-border bg-card p-5 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </motion.div>
  );
}
