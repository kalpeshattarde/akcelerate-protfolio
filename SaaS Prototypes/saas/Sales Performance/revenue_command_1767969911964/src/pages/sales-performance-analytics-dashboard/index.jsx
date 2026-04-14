import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import GlobalFilterBar from '../../components/ui/GlobalFilterBar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportShareControls from '../../components/ui/ExportShareControls';
import KPIMetricCard from './components/KPIMetricCard';
import SalesFunnelChart from './components/SalesFunnelChart';
import SalesRepLeaderboard from './components/SalesRepLeaderboard';
import DealDistributionScatter from './components/DealDistributionScatter';
import FilterControls from './components/FilterControls';
import Icon from '../../components/AppIcon';


const SalesPerformanceAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock KPI data with sparklines
  const kpiData = [
  {
    title: 'Revenue Attainment',
    value: 2847000,
    change: 12.5,
    changeType: 'positive',
    icon: 'DollarSign',
    format: 'currency',
    sparklineData: [2100000, 2250000, 2400000, 2650000, 2750000, 2847000]
  },
  {
    title: 'Deal Velocity',
    value: 28,
    change: -5.2,
    changeType: 'negative',
    icon: 'Zap',
    format: 'days',
    sparklineData: [32, 30, 29, 31, 30, 28]
  },
  {
    title: 'Win Rate',
    value: 73.2,
    change: 8.1,
    changeType: 'positive',
    icon: 'Target',
    format: 'percentage',
    sparklineData: [65, 68, 70, 71, 72, 73.2]
  },
  {
    title: 'Conversion Rate',
    value: 24.8,
    change: 3.4,
    changeType: 'positive',
    icon: 'TrendingUp',
    format: 'percentage',
    sparklineData: [22, 23, 23.5, 24, 24.5, 24.8]
  },
  {
    title: 'Quota Achievement',
    value: 94.2,
    change: 6.7,
    changeType: 'positive',
    icon: 'Award',
    format: 'percentage',
    sparklineData: [85, 87, 89, 91, 93, 94.2]
  },
  {
    title: 'Pipeline Value',
    value: 8450000,
    change: 15.3,
    changeType: 'positive',
    icon: 'PieChart',
    format: 'currency',
    sparklineData: [7200000, 7500000, 7800000, 8100000, 8300000, 8450000]
  }];


  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    // Simulate data refresh when filters change
    console.log('Filters updated:', filters);
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sales Performance Analytics Dashboard - Revenue Command</title>
        <meta name="description" content="Comprehensive sales team monitoring and tactical decision-making tools with interactive data exploration and performance analytics." />
      </Helmet>

      <Header />
      
      {/* Consistent spacing wrapper */}
      <div className="px-6 py-6">
        {/* Dashboard Header with consistent spacing */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-text-primary text-3xl m-0">Sales Performance Analytics</h1>
              <p className="text-text-secondary mt-1">
                Comprehensive team monitoring and tactical decision-making tools
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DataRefreshIndicator />
              <ExportShareControls />
            </div>
          </div>
        </div>

        {/* Global Filter Bar moved below header with consistent spacing */}
        <div className="mb-8">
          <GlobalFilterBar />
        </div>

        {/* Filter Controls with consistent spacing */}
        <div className="mb-8">
          <FilterControls onFiltersChange={handleFiltersChange} />
        </div>

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiData.map((kpi, index) =>
          <KPIMetricCard
            key={`${kpi.title}-${refreshKey}`}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
            icon={kpi.icon}
            format={kpi.format}
            sparklineData={kpi.sparklineData} />

          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-16 gap-6">
          {/* Sales Funnel - Main Content Area (10 cols) */}
          <div className="xl:col-span-10">
            <SalesFunnelChart key={`funnel-${refreshKey}`} />
          </div>

          {/* Sales Rep Leaderboard - Right Panel (6 cols) */}
          <div className="xl:col-span-6">
            <SalesRepLeaderboard key={`leaderboard-${refreshKey}`} />
          </div>
        </div>

        {/* Deal Distribution Scatter - Full Width */}
        <div className="w-full">
          <DealDistributionScatter key={`scatter-${refreshKey}`} />
        </div>

        {/* Additional Insights Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Trends */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                <Icon name="TrendingUp" size={20} className="text-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Performance Trends</h3>
                <p className="text-sm text-text-secondary">Key performance indicators</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Revenue Growth</span>
                <span className="text-sm font-medium text-success">+12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Deal Velocity</span>
                <span className="text-sm font-medium text-error">-5.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Win Rate</span>
                <span className="text-sm font-medium text-success">+8.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Team Productivity</span>
                <span className="text-sm font-medium text-success">+15.3%</span>
              </div>
            </div>
          </div>

          {/* Territory Performance */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="Map" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Territory Performance</h3>
                <p className="text-sm text-text-secondary">Regional comparison</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
              { territory: 'West Coast', performance: 108, color: 'success' },
              { territory: 'East Coast', performance: 97, color: 'primary' },
              { territory: 'Central', performance: 112, color: 'success' },
              { territory: 'Southwest', performance: 89, color: 'warning' }].
              map((item) =>
              <div key={item.territory} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{item.territory}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                      className={`h-2 rounded-full bg-${item.color}`}
                      style={{ width: `${Math.min(item.performance, 100)}%` }} />

                    </div>
                    <span className={`text-sm font-medium text-${item.color}`}>
                      {item.performance}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                <Icon name="Zap" size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
                <p className="text-sm text-text-secondary">Common tasks</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">Generate Team Report</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">Schedule Review</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors text-left">
                <Icon name="Settings" size={16} className="text-primary" />
                <span className="text-sm text-text-primary">Configure Alerts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPerformanceAnalyticsDashboard;