import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import ProcurementKanbanDashboard from "pages/procurement-kanban-dashboard";
import ApprovalWorkflowQueue from "pages/approval-workflow-queue";
import AnalyticsAndReportingDashboard from "pages/analytics-and-reporting-dashboard";
import SupplierManagementInterface from "pages/supplier-management-interface";
import NewPurchaseOrderCreation from "pages/new-purchase-order-creation";
import PurchaseOrderDetailView from "pages/purchase-order-detail-view";
import AuditTrailAndComplianceViewer from "pages/audit-trail-and-compliance-viewer";
import SystemAdministrationPanel from "pages/system-administration-panel";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ProcurementKanbanDashboard />} />
          <Route path="/procurement-kanban-dashboard" element={<ProcurementKanbanDashboard />} />
          <Route path="/approval-workflow-queue" element={<ApprovalWorkflowQueue />} />
          <Route path="/analytics-and-reporting-dashboard" element={<AnalyticsAndReportingDashboard />} />
          <Route path="/supplier-management-interface" element={<SupplierManagementInterface />} />
          <Route path="/new-purchase-order-creation" element={<NewPurchaseOrderCreation />} />
          <Route path="/purchase-order-detail-view" element={<PurchaseOrderDetailView />} />
          <Route path="/audit-trail-and-compliance-viewer" element={<AuditTrailAndComplianceViewer />} />
          <Route path="/system-administration-panel" element={<SystemAdministrationPanel />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;