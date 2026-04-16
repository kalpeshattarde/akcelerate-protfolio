import { lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Settings, Package, Users, TrendingUp, Megaphone, Activity, LogOut, Receipt, FileText, Mail, Shield, ClipboardList } from "lucide-react";
import AdminLoginGate, { useAdminAuth, ROLE_LABELS } from "@/components/admin/AdminLoginGate";
import { AuditProvider } from "@/lib/auditLog";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-load all admin tabs for bundle splitting
const DashboardTab = lazy(() => import("@/components/admin/DashboardTab"));
const ConfigTab = lazy(() => import("@/components/admin/ConfigTab"));
const ProductsTab = lazy(() => import("@/components/admin/ProductsTab"));
const AffiliateTab = lazy(() => import("@/components/admin/AffiliateTab"));
const GrowthTab = lazy(() => import("@/components/admin/GrowthTab"));
const AdGeneratorTab = lazy(() => import("@/components/admin/AdGeneratorTab"));
const AnalyticsTab = lazy(() => import("@/components/admin/AnalyticsTab"));
const UserManagementTab = lazy(() => import("@/components/admin/UserManagementTab"));
const OrderManagementTab = lazy(() => import("@/components/admin/OrderManagementTab"));
const ContentManagementTab = lazy(() => import("@/components/admin/ContentManagementTab"));
const EmailNotificationsTab = lazy(() => import("@/components/admin/EmailNotificationsTab"));
const ActivityFeedTab = lazy(() => import("@/components/admin/ActivityFeedTab"));
const AuditLogTab = lazy(() => import("@/components/admin/AuditLogTab"));

const TabFallback = () => (
  <div className="space-y-4 p-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const ALL_TABS = [
  { value: "dashboard", label: "Dashboard", icon: BarChart3 },
  { value: "activity", label: "Activity", icon: Activity },
  { value: "analytics", label: "Analytics", icon: Activity },
  { value: "users", label: "Users", icon: Users },
  { value: "orders", label: "Orders", icon: Receipt },
  { value: "content", label: "Content", icon: FileText },
  { value: "email", label: "Email", icon: Mail },
  { value: "products", label: "Products", icon: Package },
  { value: "config", label: "Config", icon: Settings },
  { value: "affiliates", label: "Affiliates", icon: Users },
  { value: "growth", label: "Growth", icon: TrendingUp },
  { value: "ads", label: "Ads", icon: Megaphone },
  { value: "audit", label: "Audit Log", icon: ClipboardList },
];

const TAB_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  dashboard: DashboardTab,
  activity: ActivityFeedTab,
  analytics: AnalyticsTab,
  users: UserManagementTab,
  orders: OrderManagementTab,
  content: ContentManagementTab,
  email: EmailNotificationsTab,
  products: ProductsTab,
  config: ConfigTab,
  affiliates: AffiliateTab,
  growth: GrowthTab,
  ads: AdGeneratorTab,
  audit: AuditLogTab,
};

function AdminContent() {
  const { logout, role, currentUser, hasPermission } = useAdminAuth();

  const visibleTabs = ALL_TABS.filter(t => hasPermission(t.value));

  return (
    <AuditProvider user={currentUser}>
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-poppins text-3xl font-bold text-foreground">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{currentUser}</span>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                  role === "super_admin" ? "bg-red-500/10 text-red-600" :
                  role === "manager" ? "bg-amber-500/10 text-amber-600" :
                  "bg-primary/10 text-primary"
                }`}>{ROLE_LABELS[role]}</span>
              </div>
              <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
          <p className="text-muted-foreground mb-8">Manage products, users, orders, content, and analytics.</p>

          <Tabs defaultValue="dashboard">
            <TabsList className="flex-wrap h-auto gap-1 mb-8">
              {visibleTabs.map(t => (
                <TabsTrigger key={t.value} value={t.value} className="gap-1.5">
                  <t.icon className="w-4 h-4" /> {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {visibleTabs.map(t => {
              const Component = TAB_COMPONENTS[t.value];
              if (!Component) return null;
              return (
                <TabsContent key={t.value} value={t.value}>
                  <Suspense fallback={<TabFallback />}>
                    <Component />
                  </Suspense>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
    </AuditProvider>
  );
}

export default function Admin() {
  return (
    <AdminLoginGate>
      <AdminContent />
    </AdminLoginGate>
  );
}
