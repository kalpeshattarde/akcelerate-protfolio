import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart3, Settings, Package, Users, TrendingUp, Megaphone, Activity, LogOut, Receipt, FileText, Mail, Shield, ClipboardList, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import DashboardTab from "@/components/admin/DashboardTab";
import ConfigTab from "@/components/admin/ConfigTab";
import ProductsTab from "@/components/admin/ProductsTab";
import AffiliateTab from "@/components/admin/AffiliateTab";
import GrowthTab from "@/components/admin/GrowthTab";
import AdGeneratorTab from "@/components/admin/AdGeneratorTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import UserManagementTab from "@/components/admin/UserManagementTab";
import OrderManagementTab from "@/components/admin/OrderManagementTab";
import ContentManagementTab from "@/components/admin/ContentManagementTab";
import EmailNotificationsTab from "@/components/admin/EmailNotificationsTab";
import ActivityFeedTab from "@/components/admin/ActivityFeedTab";
import AuditLogTab from "@/components/admin/AuditLogTab";
import AdminLoginGate, { useAdminAuth, ROLE_LABELS } from "@/components/admin/AdminLoginGate";
import { AuditProvider } from "@/lib/auditLog";

const TAB_SECTIONS = [
  {
    label: "Overview",
    items: [
      { value: "dashboard", label: "Dashboard", icon: BarChart3 },
      { value: "activity", label: "Activity", icon: Activity },
      { value: "analytics", label: "Analytics", icon: Activity },
    ],
  },
  {
    label: "Commerce",
    items: [
      { value: "users", label: "Users", icon: Users },
      { value: "orders", label: "Orders", icon: Receipt },
      { value: "products", label: "Products", icon: Package },
    ],
  },
  {
    label: "Content",
    items: [
      { value: "content", label: "Content", icon: FileText },
      { value: "email", label: "Email", icon: Mail },
    ],
  },
  {
    label: "Growth",
    items: [
      { value: "affiliates", label: "Affiliates", icon: Users },
      { value: "growth", label: "Growth", icon: TrendingUp },
      { value: "ads", label: "Ads", icon: Megaphone },
    ],
  },
  {
    label: "System",
    items: [
      { value: "config", label: "Config", icon: Settings },
      { value: "audit", label: "Audit Log", icon: ClipboardList },
    ],
  },
] as const;

function AdminContent() {
  const { logout, role, currentUser, hasPermission } = useAdminAuth();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("ak-admin-sidebar-collapsed") === "1";
  });

  useEffect(() => {
    localStorage.setItem("ak-admin-sidebar-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  const visibleSections = TAB_SECTIONS
    .map(s => ({ ...s, items: s.items.filter(t => hasPermission(t.value)) }))
    .filter(s => s.items.length > 0);

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

          <Tabs defaultValue="dashboard" orientation="vertical" className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            <TooltipProvider delayDuration={0}>
              <TabsList
                className={`flex lg:flex-col flex-row flex-wrap lg:flex-nowrap h-auto gap-1 p-2 lg:sticky lg:top-28 bg-muted/60 backdrop-blur rounded-xl border border-border lg:items-stretch transition-[width] duration-300 ease-out ${
                  collapsed ? "lg:w-16" : "lg:w-56"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setCollapsed(c => !c)}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                  aria-pressed={collapsed}
                  className="hidden lg:flex items-center justify-center w-full h-8 mb-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/70 transition-colors"
                >
                  {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                </button>
                {visibleTabs.map(t => {
                  const trigger = (
                    <TabsTrigger
                      key={t.value}
                      value={t.value}
                      aria-label={t.label}
                      className={`gap-2 w-full data-[state=active]:bg-background data-[state=active]:shadow-sm ${
                        collapsed ? "lg:justify-center lg:px-2 justify-start" : "justify-start"
                      }`}
                    >
                      <t.icon className="w-4 h-4 shrink-0" />
                      <span className={`truncate ${collapsed ? "lg:hidden" : ""}`}>{t.label}</span>
                    </TabsTrigger>
                  );
                  return collapsed ? (
                    <Tooltip key={t.value}>
                      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                      <TooltipContent side="right">{t.label}</TooltipContent>
                    </Tooltip>
                  ) : trigger;
                })}
              </TabsList>
            </TooltipProvider>

            <div className="flex-1 min-w-0 w-full">
            {hasPermission("dashboard") && <TabsContent value="dashboard" className="mt-0"><DashboardTab /></TabsContent>}
            {hasPermission("activity") && <TabsContent value="activity"><ActivityFeedTab /></TabsContent>}
            {hasPermission("analytics") && <TabsContent value="analytics"><AnalyticsTab /></TabsContent>}
            {hasPermission("users") && <TabsContent value="users"><UserManagementTab /></TabsContent>}
            {hasPermission("orders") && <TabsContent value="orders"><OrderManagementTab /></TabsContent>}
            {hasPermission("content") && <TabsContent value="content"><ContentManagementTab /></TabsContent>}
            {hasPermission("email") && <TabsContent value="email"><EmailNotificationsTab /></TabsContent>}
            {hasPermission("products") && <TabsContent value="products"><ProductsTab /></TabsContent>}
            {hasPermission("config") && <TabsContent value="config"><ConfigTab /></TabsContent>}
            {hasPermission("affiliates") && <TabsContent value="affiliates"><AffiliateTab /></TabsContent>}
            {hasPermission("growth") && <TabsContent value="growth"><GrowthTab /></TabsContent>}
            {hasPermission("ads") && <TabsContent value="ads"><AdGeneratorTab /></TabsContent>}
            {hasPermission("audit") && <TabsContent value="audit"><AuditLogTab /></TabsContent>}
            </div>
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
