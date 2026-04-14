import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ESGAnalyticsDashboard from './pages/esg-analytics-dashboard';
import ESGDataCollectionInterface from './pages/esg-data-collection-interface';
import MaterialityMatrixManagement from './pages/materiality-matrix-management';
import AuditTrailViewer from './pages/audit-trail-viewer';
import SystemConfigurationDashboard from './pages/system-configuration-dashboard';
import ComplianceReportingCenter from './pages/compliance-reporting-center';
import DataIntegrationMonitor from './pages/data-integration-monitor';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuditTrailViewer />} />
        <Route path="/esg-analytics-dashboard" element={<ESGAnalyticsDashboard />} />
        <Route path="/esg-data-collection-interface" element={<ESGDataCollectionInterface />} />
        <Route path="/materiality-matrix-management" element={<MaterialityMatrixManagement />} />
        <Route path="/audit-trail-viewer" element={<AuditTrailViewer />} />
        <Route path="/system-configuration-dashboard" element={<SystemConfigurationDashboard />} />
        <Route path="/compliance-reporting-center" element={<ComplianceReportingCenter />} />
        <Route path="/data-integration-monitor" element={<DataIntegrationMonitor />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;