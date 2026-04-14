import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MarketControlPanel from './components/MarketControlPanel';
import MarketMetricCard from './components/MarketMetricCard';
import MarketChart from './components/MarketChart';
import MarketHeatmap from './components/MarketHeatmap';
import TopMoversTable from './components/TopMoversTable';
import NewsAndSentiment from './components/NewsAndSentiment';
import PortfolioSummary from './components/PortfolioSummary';

const MarketOverviewDashboard = () => {
  const [selectedMarket, setSelectedMarket] = useState('NSE');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1D');
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock market indices data
  const marketIndices = [
    {
      title: 'Nifty 50',
      value: '19,674.25',
      change: 234.67,
      changePercent: 1.21,
      sparklineData: [19400, 19450, 19500, 19480, 19520, 19580, 19674],
      isPositive: true
    },
    {
      title: 'Sensex',
      value: '66,023.69',
      change: 789.45,
      changePercent: 1.21,
      sparklineData: [65200, 65300, 65400, 65350, 65500, 65800, 66023],
      isPositive: true
    },
    {
      title: 'Bank Nifty',
      value: '44,567.80',
      change: -123.45,
      changePercent: -0.28,
      sparklineData: [44800, 44750, 44700, 44650, 44600, 44580, 44567],
      isPositive: false
    },
    {
      title: 'Nifty IT',
      value: '31,245.60',
      change: 567.89,
      changePercent: 1.85,
      sparklineData: [30600, 30700, 30800, 30900, 31000, 31100, 31245],
      isPositive: true
    },
    {
      title: 'Nifty Pharma',
      value: '13,789.45',
      change: 234.12,
      changePercent: 1.73,
      sparklineData: [13500, 13550, 13600, 13650, 13700, 13750, 13789],
      isPositive: true
    },
    {
      title: 'Nifty Auto',
      value: '16,234.78',
      change: -89.34,
      changePercent: -0.55,
      sparklineData: [16400, 16380, 16350, 16320, 16290, 16260, 16234],
      isPositive: false
    }
  ];

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-refresh data every 30 seconds
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleMarketChange = (market) => {
    setSelectedMarket(market);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleTimeRangeChange = (timeRange) => {
    setSelectedTimeRange(timeRange);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Market Control Panel */}
          <MarketControlPanel
            onMarketChange={handleMarketChange}
            onTimeRangeChange={handleTimeRangeChange}
            onRefresh={handleRefresh}
          />

          {/* Market Indices Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {marketIndices?.map((index, i) => (
              <MarketMetricCard
                key={index?.title}
                title={index?.title}
                value={index?.value}
                change={index?.change}
                changePercent={index?.changePercent}
                sparklineData={index?.sparklineData}
                isPositive={index?.isPositive}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Market Chart - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <MarketChart 
                selectedIndex="NIFTY50" 
                timeRange={selectedTimeRange}
              />
            </div>

            {/* Market Heatmap - Takes 1 column on xl screens */}
            <div className="xl:col-span-1">
              <MarketHeatmap />
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Top Movers Table */}
            <div className="xl:col-span-1">
              <TopMoversTable />
            </div>

            {/* News and Sentiment */}
            <div className="xl:col-span-2">
              <NewsAndSentiment />
            </div>
          </div>

          {/* Portfolio Summary - Full Width */}
          <div className="mb-6">
            <PortfolioSummary />
          </div>

          {/* Footer Information */}
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
              <div className="flex items-center justify-center sm:justify-start space-x-4 mb-2 sm:mb-0">
                <span>Market data provided by NSE & BSE</span>
                <span>•</span>
                <span>Real-time quotes with 15-minute delay</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-4">
                <span>Last updated: {lastRefresh?.toLocaleTimeString()}</span>
                <span>•</span>
                <span>© {new Date()?.getFullYear()} FinanceIQ Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketOverviewDashboard;