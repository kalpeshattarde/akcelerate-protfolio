import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Settings, Package, Users, TrendingUp, Megaphone, Activity, LogOut } from "lucide-react";
import DashboardTab from "@/components/admin/DashboardTab";
import ConfigTab from "@/components/admin/ConfigTab";
import ProductsTab from "@/components/admin/ProductsTab";
import AffiliateTab from "@/components/admin/AffiliateTab";
import GrowthTab from "@/components/admin/GrowthTab";
import AdGeneratorTab from "@/components/admin/AdGeneratorTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import AdminLoginGate, { useAdminAuth } from "@/components/admin/AdminLoginGate";

function AdminContent() {
  const { logout } = useAdminAuth();

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-poppins text-3xl font-bold text-foreground">Admin Panel</h1>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
        <p className="text-muted-foreground mb-8">Manage products, pricing, growth, and analytics.</p>

        <Tabs defaultValue="dashboard">
          <TabsList className="flex-wrap h-auto gap-1 mb-8">
            <TabsTrigger value="dashboard" className="gap-1.5"><BarChart3 className="w-4 h-4" /> Dashboard</TabsTrigger>
            <TabsTrigger value="analytics" className="gap-1.5"><Activity className="w-4 h-4" /> Analytics</TabsTrigger>
            <TabsTrigger value="config" className="gap-1.5"><Settings className="w-4 h-4" /> Config</TabsTrigger>
            <TabsTrigger value="products" className="gap-1.5"><Package className="w-4 h-4" /> Products</TabsTrigger>
            <TabsTrigger value="affiliates" className="gap-1.5"><Users className="w-4 h-4" /> Affiliates</TabsTrigger>
            <TabsTrigger value="growth" className="gap-1.5"><TrendingUp className="w-4 h-4" /> Growth</TabsTrigger>
            <TabsTrigger value="ads" className="gap-1.5"><Megaphone className="w-4 h-4" /> Ad Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard"><DashboardTab /></TabsContent>
          <TabsContent value="analytics"><AnalyticsTab /></TabsContent>
          <TabsContent value="config"><ConfigTab /></TabsContent>
          <TabsContent value="products"><ProductsTab /></TabsContent>
          <TabsContent value="affiliates"><AffiliateTab /></TabsContent>
          <TabsContent value="growth"><GrowthTab /></TabsContent>
          <TabsContent value="ads"><AdGeneratorTab /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function Admin() {
  return (
    <AdminLoginGate>
      <AdminContent />
    </AdminLoginGate>
  );
}
