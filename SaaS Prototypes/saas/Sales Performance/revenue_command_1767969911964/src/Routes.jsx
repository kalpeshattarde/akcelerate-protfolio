import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import RealTimePipelineMonitoringDashboard from "pages/real-time-pipeline-monitoring-dashboard";
import RevenueForecastingTrendsDashboard from "pages/revenue-forecasting-trends-dashboard";
import SalesPerformanceAnalyticsDashboard from "pages/sales-performance-analytics-dashboard";
import ExecutiveRevenueOverviewDashboard from "pages/executive-revenue-overview-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ExecutiveRevenueOverviewDashboard />} />
        <Route path="/real-time-pipeline-monitoring-dashboard" element={<RealTimePipelineMonitoringDashboard />} />
        <Route path="/revenue-forecasting-trends-dashboard" element={<RevenueForecastingTrendsDashboard />} />
        <Route path="/sales-performance-analytics-dashboard" element={<SalesPerformanceAnalyticsDashboard />} />
        <Route path="/executive-revenue-overview-dashboard" element={<ExecutiveRevenueOverviewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;