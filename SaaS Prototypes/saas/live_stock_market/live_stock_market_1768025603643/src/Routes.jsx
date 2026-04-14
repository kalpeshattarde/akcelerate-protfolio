import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MarketOverviewDashboard from './pages/market-overview-dashboard';
import PortfolioAnalyticsDashboard from './pages/portfolio-analytics-dashboard';
import TradingAnalyticsDashboard from './pages/trading-analytics-dashboard';
import RiskManagementDashboard from './pages/risk-management-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MarketOverviewDashboard />} />
        <Route path="/market-overview-dashboard" element={<MarketOverviewDashboard />} />
        <Route path="/portfolio-analytics-dashboard" element={<PortfolioAnalyticsDashboard />} />
        <Route path="/trading-analytics-dashboard" element={<TradingAnalyticsDashboard />} />
        <Route path="/risk-management-dashboard" element={<RiskManagementDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
