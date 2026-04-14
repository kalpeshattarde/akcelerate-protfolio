import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PortfolioSelector from './components/PortfolioSelector';
import DateRangePicker from './components/DateRangePicker';
import KPIMetrics from './components/KPIMetrics';
import PortfolioChart from './components/PortfolioChart';
import AssetAllocation from './components/AssetAllocation';
import RiskMetrics from './components/RiskMetrics';
import TopHoldings from './components/TopHoldings';
import HoldingsTable from './components/HoldingsTable';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PortfolioAnalyticsDashboard = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState('main');
  const [selectedBenchmark, setSelectedBenchmark] = useState('nifty50');
  const [selectedRange, setSelectedRange] = useState('1Y');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock portfolio data
  const portfolioData = {
    totalValue: 1258473,
    absoluteReturns: 258473,
    percentageGains: 25.84,
    sharpeRatio: 1.42,
    benchmark: 'Nifty 50',
    lastUpdated: lastUpdated
  };

  useEffect(() => {
    // Simulate real-time updates every 5 minutes during market hours
    const interval = setInterval(() => {
      const now = new Date();
      const marketOpen = new Date();
      marketOpen?.setHours(9, 15, 0, 0);
      const marketClose = new Date();
      marketClose?.setHours(15, 30, 0, 0);

      if (now >= marketOpen && now <= marketClose) {
        setLastUpdated(new Date());
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleExportReport = () => {
    // Simulate PDF export
    console.log('Exporting portfolio report...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-none px-8 py-8">
          {/* BRUTALIST PAGE HEADER */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div className="bg-card brutalist-shadow p-6 mb-6 lg:mb-0">
              <h1 className="text-3xl font-black text-card-foreground mb-3 tracking-widest" style={{ fontSize: '31px' }}>PORTFOLIO</h1>
              <h2 className="text-2xl font-black text-primary tracking-wider">ANALYTICS</h2>
              <div className="w-20 h-2 bg-warning mt-3"></div>
            </div>
            
            <div className="flex items-center gap-6 mt-6 lg:mt-0">
              <div className="bg-muted brutalist-border-thin p-4">
                <div className="flex items-center gap-3 text-base font-bold text-muted-foreground">
                  <Icon name="Clock" size={24} />
                  <span className="font-mono tracking-wider">
                    {lastUpdated?.toLocaleTimeString('en-IN')}
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleRefresh}
                loading={isRefreshing}
                iconName="RefreshCw"
                iconPosition="left"
                className="brutalist-border brutalist-shadow-sm brutalist-hover font-black tracking-wider text-base px-6 py-3"
              >
                REFRESH
              </Button>
              
              <Button
                variant="default"
                size="lg"
                onClick={handleExportReport}
                iconName="Download"
                iconPosition="left"
                className="brutalist-shadow brutalist-hover font-black tracking-wider text-base px-6 py-3 bg-success text-success-foreground"
              >
                EXPORT
              </Button>
            </div>
          </div>

          {/* CONTROLS SECTION */}
          <div className="bg-card p-6 mb-8 border-4 border-white">
            <div className="border-l-8 border-primary pl-4 mb-6">
              <h3 className="text-xl font-black text-card-foreground tracking-wider">CONTROLS</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortfolioSelector
                selectedPortfolio={selectedPortfolio}
                onPortfolioChange={setSelectedPortfolio}
                selectedBenchmark={selectedBenchmark}
                onBenchmarkChange={setSelectedBenchmark}
              />
              
              <DateRangePicker
                selectedRange={selectedRange}
                onRangeChange={setSelectedRange}
              />
            </div>
          </div>

          {/* KPI METRICS */}
          <div className="mb-8">
            <KPIMetrics portfolioData={portfolioData} />
          </div>

          {/* PORTFOLIO PERFORMANCE SECTION */}
          <div className="mb-8">
            <PortfolioChart />
          </div>

          {/* HORIZONTAL SECTIONS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Asset Allocation - Equal width */}
            <div className="w-full">
              <AssetAllocation />
            </div>
            
            {/* Risk Metrics - Equal width */}
            <div className="w-full">
              <RiskMetrics />
            </div>
            
            {/* Top Holdings - Equal width */}
            <div className="w-full">
              <TopHoldings />
            </div>
          </div>

          {/* Holdings Table - Full Width */}
          <div className="mb-8">
            <HoldingsTable />
          </div>

          {/* MARKET STATUS BANNER */}
          <div className="bg-card brutalist-border brutalist-shadow p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex items-center gap-6 mb-4 lg:mb-0">
                <div className="w-8 h-8 bg-success border-4 border-black animate-pulse"></div>
                <span className="font-black text-xl text-card-foreground tracking-wider">MARKET: OPEN</span>
                <span className="text-base font-bold text-muted-foreground font-mono">
                  9:15 AM - 3:30 PM IST
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-base font-black">
                <div className="bg-muted p-3 brutalist-border-thin">
                  <span className="text-muted-foreground">NIFTY:</span>
                  <span className="font-mono text-success ml-3">19,674.25 +0.85%</span>
                </div>
                <div className="bg-muted p-3 brutalist-border-thin">
                  <span className="text-muted-foreground">SENSEX:</span>
                  <span className="font-mono text-success ml-3">66,023.69 +0.92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioAnalyticsDashboard;