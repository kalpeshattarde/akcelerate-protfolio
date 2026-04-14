// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { SidebarProvider } from "hooks/useSidebar";
import SalesCompensationDashboard from "pages/sales-compensation-dashboard";
import AuditTrailViewer from "pages/audit-trail-viewer";
import RepresentativePerformanceAnalytics from "pages/representative-performance-analytics";
import ScenarioManagementCenter from "pages/scenario-management-center";
import CommissionStructureConfiguration from "pages/commission-structure-configuration";
import BulkOperationsCenter from "pages/bulk-operations-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SidebarProvider>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={<SalesCompensationDashboard />} />
            <Route path="/sales-compensation-dashboard" element={<SalesCompensationDashboard />} />
            <Route path="/audit-trail-viewer" element={<AuditTrailViewer />} />
            <Route path="/representative-performance-analytics" element={<RepresentativePerformanceAnalytics />} />
            <Route path="/scenario-management-center" element={<ScenarioManagementCenter />} />
            <Route path="/commission-structure-configuration" element={<CommissionStructureConfiguration />} />
            <Route path="/bulk-operations-center" element={<BulkOperationsCenter />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </SidebarProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;