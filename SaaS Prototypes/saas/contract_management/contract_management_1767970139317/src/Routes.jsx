import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContractDashboard from './pages/contract-dashboard';
import AnalyticsReporting from './pages/analytics-reporting';
import ContractEditor from './pages/contract-editor';
import VendorManagement from './pages/vendor-management';
import SystemAdministration from './pages/system-administration';
import ComplianceCenter from './pages/compliance-center';
import FinancialTracking from './pages/financial-tracking';
import ContractRepository from './pages/contract-repository';
import ApprovalWorkflows from './pages/approval-workflows';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalyticsReporting />} />
        <Route path="/contract-dashboard" element={<ContractDashboard />} />
        <Route path="/analytics-reporting" element={<AnalyticsReporting />} />
        <Route path="/contract-editor" element={<ContractEditor />} />
        <Route path="/vendor-management" element={<VendorManagement />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/compliance-center" element={<ComplianceCenter />} />
        <Route path="/financial-tracking" element={<FinancialTracking />} />
        <Route path="/contract-repository" element={<ContractRepository />} />
        <Route path="/approval-workflows" element={<ApprovalWorkflows />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
