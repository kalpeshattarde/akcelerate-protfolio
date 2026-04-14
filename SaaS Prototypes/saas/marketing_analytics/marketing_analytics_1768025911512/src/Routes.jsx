import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ROIAnalysisDashboard from './pages/roi-analysis-dashboard';
import ChannelPerformanceAnalyticsDashboard from './pages/channel-performance-analytics-dashboard';
import CompetitiveBenchmarkingDashboard from './pages/competitive-benchmarking-dashboard';
import MarketingPerformanceOverviewDashboard from './pages/marketing-performance-overview-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ChannelPerformanceAnalyticsDashboard />} />
        <Route path="/roi-analysis-dashboard" element={<ROIAnalysisDashboard />} />
        <Route path="/channel-performance-analytics-dashboard" element={<ChannelPerformanceAnalyticsDashboard />} />
        <Route path="/competitive-benchmarking-dashboard" element={<CompetitiveBenchmarkingDashboard />} />
        <Route path="/marketing-performance-overview-dashboard" element={<MarketingPerformanceOverviewDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
