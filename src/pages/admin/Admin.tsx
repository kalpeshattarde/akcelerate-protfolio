import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart3, Settings, Package, Users, TrendingUp, Megaphone, Activity, LogOut, Receipt, FileText, Mail, Shield, ClipboardList, PanelLeftClose, PanelLeftOpen, Filter, Radio, Users2, Palette } from "lucide-react";
import DashboardTab from "@/components/admin/DashboardTab";
import FunnelTab from "@/components/admin/FunnelTab";
import ActivityLiveTab from "@/components/admin/ActivityLiveTab";
import CohortsTab from "@/components/admin/CohortsTab";
import { recordAdminTabView } from "@/lib/adminUsage";
import ConfigTab from "@/components/admin/ConfigTab";
import ProductsTab from "@/components/admin/ProductsTab";
import AffiliateTab from "@/components/admin/AffiliateTab";
import GrowthTab from "@/components/admin/GrowthTab";
import AdGeneratorTab from "@/components/admin/AdGeneratorTab";
import OfferGeneratorTab from "@/components/admin/OfferGeneratorTab";
import LandingPageGeneratorTab from "@/components/admin/LandingPageGeneratorTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import UserManagementTab from "@/components/admin/UserManagementTab";
import OrderManagementTab from "@/components/admin/OrderManagementTab";
import ContentManagementTab from "@/components/admin/ContentManagementTab";
import EmailNotificationsTab from "@/components/admin/EmailNotificationsTab";
import ActivityFeedTab from "@/components/admin/ActivityFeedTab";
import AuditLogTab from "@/components/admin/AuditLogTab";
import BrandKitTab from "@/components/admin/BrandKitTab";
import AdminLoginGate, { useAdminAuth, ROLE_LABELS } from "@/components/admin/AdminLoginGate";
import { AuditProvider } from "@/lib/auditLog";

const TAB_SECTIONS = [
  {
    label: "Overview",
    items: [
      { value: "dashboard", label: "Dashboard", icon: BarChart3 },
      { value: "activity", label: "Activity", icon: Activity },
      { value: "live", label: "Live", icon: Radio },
      { value: "analytics", label: "Analytics", icon: Activity },
      { value: "funnel", label: "Funnel", icon: Filter },
      { value: "cohorts", label: "Cohorts", icon: Users2 },
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
      { value: "ads", label: "Ad Generator", icon: Megaphone },
      { value: "offers", label: "Offer Generator", icon: Megaphone },
      { value: "landing", label: "Landing Generator", icon: Megaphone },
    ],
  },
  {
    label: "System",
    items: [
      { value: "brand", label: "Brand Kit", icon: Palette },
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

  // Record the initial dashboard view (onValueChange only fires on change)
  useEffect(() => {
    if (currentUser) recordAdminTabView(currentUser, "dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleSections = TAB_SECTIONS
    .map(s => ({ ...s, items: s.items.filter(t => hasPermission(t.value)) }))
    .filter(s => s.items.length > 0);

  return (
    <AuditProvider user={currentUser}>
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-poppins text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Manage products, users, orders, content, and analytics.</p>
          </div>

          <Tabs
            defaultValue="dashboard"
            orientation="vertical"
            onValueChange={(v) => recordAdminTabView(currentUser, v)}
            className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start"
          >
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
                {visibleSections.map((section, sIdx) => (
                  <div key={section.label} className="flex flex-col gap-1 w-full">
                    {sIdx > 0 && (
                      <div className={`hidden lg:block h-px bg-border/70 my-1 ${collapsed ? "mx-2" : "mx-1"}`} />
                    )}
                    <div
                      className={`px-2 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 ${
                        collapsed ? "lg:hidden" : ""
                      }`}
                    >
                      {section.label}
                    </div>
                    {section.items.map(t => {
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
                  </div>
                ))}

                <div className="hidden lg:block h-px bg-border/70 my-2 mx-1" />
                <div className={`flex flex-col gap-2 px-1 pb-1 ${collapsed ? "lg:items-center" : ""}`}>
                  <div className={`flex items-center gap-2 min-w-0 ${collapsed ? "lg:flex-col lg:gap-1" : ""}`}>
                    <Shield className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className={`flex flex-col min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
                      <span className="text-xs font-medium text-foreground truncate">{currentUser}</span>
                      <span className={`text-[9px] font-semibold uppercase tracking-wider ${
                        role === "super_admin" ? "text-red-600" :
                        role === "manager" ? "text-amber-600" :
                        "text-primary"
                      }`}>{ROLE_LABELS[role]}</span>
                    </div>
                  </div>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={logout}
                          aria-label="Sign Out"
                          className="hidden lg:inline-flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/70 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">Sign Out</TooltipContent>
                    </Tooltip>
                  ) : null}
                  <button
                    onClick={logout}
                    className={`inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-background/70 ${
                      collapsed ? "lg:hidden" : ""
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </TabsList>
            </TooltipProvider>

            <div className="flex-1 min-w-0 w-full">
            {hasPermission("dashboard") && <TabsContent value="dashboard" className="mt-0"><DashboardTab /></TabsContent>}
            {hasPermission("activity") && <TabsContent value="activity"><ActivityFeedTab /></TabsContent>}
            {hasPermission("activity") && <TabsContent value="live"><ActivityLiveTab /></TabsContent>}
            {hasPermission("analytics") && <TabsContent value="analytics"><AnalyticsTab /></TabsContent>}
            {hasPermission("analytics") && <TabsContent value="funnel"><FunnelTab /></TabsContent>}
            {hasPermission("analytics") && <TabsContent value="cohorts"><CohortsTab /></TabsContent>}
            {hasPermission("users") && <TabsContent value="users"><UserManagementTab /></TabsContent>}
            {hasPermission("orders") && <TabsContent value="orders"><OrderManagementTab /></TabsContent>}
            {hasPermission("content") && <TabsContent value="content"><ContentManagementTab /></TabsContent>}
            {hasPermission("email") && <TabsContent value="email"><EmailNotificationsTab /></TabsContent>}
            {hasPermission("products") && <TabsContent value="products"><ProductsTab /></TabsContent>}
            {hasPermission("config") && <TabsContent value="config"><ConfigTab /></TabsContent>}
            {hasPermission("brand") && <TabsContent value="brand"><BrandKitTab /></TabsContent>}
            {hasPermission("affiliates") && <TabsContent value="affiliates"><AffiliateTab /></TabsContent>}
            {hasPermission("growth") && <TabsContent value="growth"><GrowthTab /></TabsContent>}
            {hasPermission("ads") && <TabsContent value="ads"><AdGeneratorTab /></TabsContent>}
            {hasPermission("ads") && <TabsContent value="offers"><OfferGeneratorTab /></TabsContent>}
            {hasPermission("ads") && <TabsContent value="landing"><LandingPageGeneratorTab /></TabsContent>}
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
