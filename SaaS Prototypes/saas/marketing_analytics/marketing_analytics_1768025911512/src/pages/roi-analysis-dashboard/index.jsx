import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FinancialKPICard from './components/FinancialKPICard';
import WaterfallChart from './components/WaterfallChart';
import BenchmarkBars from './components/BenchmarkBars';
import SpendEfficiencyChart from './components/SpendEfficiencyChart';
import CampaignROITable from './components/CampaignROITable';
import GlobalControls from './components/GlobalControls';
import Icon from '../../components/AppIcon';

const ROIAnalysisDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [filters, setFilters] = useState({
    fiscalPeriod: 'Q4-2024',
    attributionWindow: '30-day',
    costAllocation: 'last-click'
  });

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setLastRefresh(new Date());
  };

  const kpiData = [
  {
    title: 'Total Revenue',
    value: '$2.4M',
    trend: 'up',
    trendValue: '+18.5%',
    icon: 'DollarSign',
    color: 'success',
    benchmark: {
      value: '+12% above avg',
      percentage: 75,
      status: 'above'
    }
  },
  {
    title: 'Marketing Spend',
    value: '$485K',
    trend: 'up',
    trendValue: '+8.2%',
    icon: 'CreditCard',
    color: 'primary',
    benchmark: {
      value: 'Within budget',
      percentage: 60,
      status: 'average'
    }
  },
  {
    title: 'ROI Percentage',
    value: '394%',
    trend: 'up',
    trendValue: '+24.1%',
    icon: 'TrendingUp',
    color: 'success',
    benchmark: {
      value: '+45% above avg',
      percentage: 85,
      status: 'above'
    }
  },
  {
    title: 'Customer Acquisition Cost',
    value: '$127',
    trend: 'down',
    trendValue: '-12.3%',
    icon: 'Users',
    color: 'warning',
    benchmark: {
      value: '8% below avg',
      percentage: 40,
      status: 'below'
    }
  }];


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Loading ROI Analytics</h3>
                <p className="text-sm text-muted-foreground">Calculating financial performance metrics...</p>
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-[1920px] mx-auto p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="font-bold text-foreground text-2xl">ROI Analysis Dashboard</h1>
              <p className="text-muted-foreground">Track campaign profitability and optimize budget allocation through advanced financial analytics

              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span>Live data • Updated {lastRefresh?.toLocaleTimeString()}</span>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200">
                <Icon name="Download" size={16} />
                <span className="text-sm font-medium">Export Report</span>
              </button>
            </div>
          </div>

          {/* Global Controls */}
          <GlobalControls onFiltersChange={handleFiltersChange} />

          {/* Financial KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {kpiData?.map((kpi, index) =>
            <FinancialKPICard
              key={index}
              title={kpi?.title}
              value={kpi?.value}
              trend={kpi?.trend}
              trendValue={kpi?.trendValue}
              benchmark={kpi?.benchmark}
              icon={kpi?.icon}
              color={kpi?.color} />

            )}
          </div>

          {/* Primary Visualization Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Waterfall Chart - 2 columns */}
            <div className="xl:col-span-2">
              <WaterfallChart />
            </div>
            
            {/* Benchmark Bars - 1 column */}
            <div className="xl:col-span-1">
              <BenchmarkBars />
            </div>
          </div>

          {/* Spend Efficiency Chart */}
          <div className="w-full">
            <SpendEfficiencyChart />
          </div>

          {/* Campaign ROI Table */}
          <div className="w-full">
            <CampaignROITable />
          </div>

          {/* Footer Stats */}
          <div className="glass-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Calculator" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Calculations</span>
                </div>
                <div className="text-2xl font-bold text-foreground">24,567</div>
                <div className="text-xs text-muted-foreground">Real-time processing</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span className="text-sm font-medium text-muted-foreground">Processing Speed</span>
                </div>
                <div className="text-2xl font-bold text-success">1.2s</div>
                <div className="text-xs text-muted-foreground">Average response time</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Database" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-muted-foreground">Data Points</span>
                </div>
                <div className="text-2xl font-bold text-warning">847K</div>
                <div className="text-xs text-muted-foreground">Historical records</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Shield" size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-muted-foreground">Data Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-secondary">99.8%</div>
                <div className="text-xs text-muted-foreground">Validation rate</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default ROIAnalysisDashboard;