import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import GlobalFilterBar from '../../components/ui/GlobalFilterBar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import ExportShareControls from '../../components/ui/ExportShareControls';
import MetricCard from './components/MetricCard';
import RevenueChart from './components/RevenueChart';
import RegionalPerformance from './components/RegionalPerformance';
import PipelineHealthGauge from './components/PipelineHealthGauge';
import FiscalPeriodSelector from './components/FiscalPeriodSelector';
import Icon from '../../components/AppIcon';

const ExecutiveRevenueDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'Total Revenue',
      value: 18500000,
      change: '+12.5%',
      changeType: 'positive',
      target: 20000000,
      icon: 'DollarSign',
      color: 'primary'
    },
    {
      title: 'Win Rate',
      value: '23.5%',
      change: '+2.1%',
      changeType: 'positive',
      target: '25%',
      icon: 'Target',
      color: 'success'
    },
    {
      title: 'Average Deal Size',
      value: 194872,
      change: '-3.2%',
      changeType: 'negative',
      target: 200000,
      icon: 'TrendingUp',
      color: 'secondary'
    },
    {
      title: 'Pipeline Value',
      value: 45600000,
      change: '+8.7%',
      changeType: 'positive',
      target: 50000000,
      icon: 'BarChart3',
      color: 'warning'
    }
  ];

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Executive Revenue Overview - Revenue Command</title>
        <meta name="description" content="Strategic revenue insights and KPI monitoring for executive leadership" />
      </Helmet>

      <Header />
      
      {/* Consistent spacing wrapper */}
      <div className="px-6 py-6">
        {/* Dashboard Header with consistent spacing */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Executive Revenue Overview
              </h1>
              <p className="text-text-secondary">
                Strategic revenue insights and performance monitoring for leadership decision-making
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <DataRefreshIndicator />
              <ExportShareControls />
            </div>
          </div>
        </div>

        {/* Global Filter Bar moved below header with consistent spacing */}
        <div className="mb-8">
          <GlobalFilterBar />
        </div>

        {/* Fiscal Period Selector */}
        <div className="mb-8 p-4 bg-card border border-border rounded-lg shadow-card">
          <FiscalPeriodSelector />
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {kpiData.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              target={metric.target}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>

          {/* Regional Performance - Takes 1 column */}
          <div className="xl:col-span-1">
            <RegionalPerformance />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pipeline Health Gauge */}
          <div>
            <PipelineHealthGauge />
          </div>

          {/* Executive Summary Card */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Executive Summary</h3>
                <p className="text-sm text-text-secondary">Key insights and recommendations</p>
              </div>
              <Icon name="FileText" size={20} className="text-primary" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium text-success mb-1">Strong Q2 Performance</h4>
                    <p className="text-sm text-text-secondary">
                      Revenue exceeded target by 12.5%, driven by North America's exceptional performance and improved win rates across all segments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning mb-1">Pipeline Velocity Concerns</h4>
                    <p className="text-sm text-text-secondary">
                      Deal velocity has decreased by 12% compared to last quarter. Focus needed on Latin America and Asia Pacific regions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Target" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-primary mb-1">Q3 Outlook</h4>
                    <p className="text-sm text-text-secondary">
                      Pipeline health score of 78 indicates good momentum. Recommend increasing focus on deal acceleration and territory support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Last updated: {lastUpdated.toLocaleTimeString()}</span>
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Icon 
                    name="RefreshCw" 
                    size={14} 
                    className={isLoading ? 'animate-spin' : ''} 
                  />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-text-secondary mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} Revenue Command. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
              <button className="hover:text-primary transition-colors">Terms of Service</button>
              <button className="hover:text-primary transition-colors">Support</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ExecutiveRevenueDashboard;