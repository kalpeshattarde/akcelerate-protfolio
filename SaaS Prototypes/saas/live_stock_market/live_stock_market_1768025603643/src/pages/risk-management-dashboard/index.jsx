import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import RiskMetricsCard from './components/RiskMetricsCard';
import RiskReturnScatter from './components/RiskReturnScatter';
import CorrelationMatrix from './components/CorrelationMatrix';
import SectorConcentration from './components/SectorConcentration';
import StressTestResults from './components/StressTestResults';
import ScenarioAnalysis from './components/ScenarioAnalysis';
import RiskControls from './components/RiskControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RiskManagementDashboard = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState('main');
  const [refreshInterval, setRefreshInterval] = useState(300); // 5 minutes
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  // Mock portfolio data
  const portfolios = [
    { id: 'main', name: 'Main Portfolio', value: '₹12,58,473', risk: 'Medium' },
    { id: 'aggressive', name: 'Growth Portfolio', value: '₹8,94,231', risk: 'High' },
    { id: 'conservative', name: 'Conservative Portfolio', value: '₹15,67,892', risk: 'Low' }
  ];

  const riskMetrics = [
    {
      title: 'Value at Risk (1D)',
      value: '2.34%',
      change: 0.12,
      threshold: '3.00%',
      status: 'safe',
      icon: 'TrendingDown',
      description: 'Maximum daily loss at 95% confidence'
    },
    {
      title: 'Portfolio Beta',
      value: '1.23',
      change: -0.05,
      threshold: '1.50',
      status: 'safe',
      icon: 'Activity',
      description: 'Sensitivity to market movements'
    },
    {
      title: 'Maximum Drawdown',
      value: '8.7%',
      change: 1.2,
      threshold: '15.0%',
      status: 'warning',
      icon: 'ArrowDown',
      description: 'Largest peak-to-trough decline'
    },
    {
      title: 'Correlation Coefficient',
      value: '0.67',
      change: 0.03,
      threshold: '0.80',
      status: 'warning',
      icon: 'GitBranch',
      description: 'Average correlation between holdings'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Risk Overview', icon: 'BarChart3' },
    { id: 'analysis', name: 'Scenario Analysis', icon: 'TrendingUp' },
    { id: 'controls', name: 'Risk Controls', icon: 'Settings' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handlePortfolioChange = (portfolioId) => {
    setSelectedPortfolio(portfolioId);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const selectedPortfolioData = portfolios?.find(p => p?.id === selectedPortfolio);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24">
        <div className="max-w-full mx-auto px-6 py-8">
          {/* Dashboard Header - Brutalist Style */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 text-secondary-foreground p-8 border-0">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white brutalist-heading mb-4">
                RISK MANAGEMENT DASHBOARD
              </h1>
              <p className="text-lg font-bold uppercase tracking-wide text-muted-foreground brutalist-text">
                MONITOR PORTFOLIO EXPOSURE • ASSESS VOLATILITY • IMPLEMENT RISK CONTROLS
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Portfolio Selector - Brutalist */}
              <div className="flex items-center space-x-4 px-4 py-3">
                <Icon name="Briefcase" size={20} className="text-foreground" />
                <select
                  value={selectedPortfolio}
                  onChange={(e) => handlePortfolioChange(e?.target?.value)}
                  className="bg-background text-foreground font-black uppercase tracking-wide text-sm brutalist-shadow-sm px-3 py-2 brutalist-input"
                >
                  {portfolios?.map(portfolio => (
                    <option key={portfolio?.id} value={portfolio?.id} className="font-black uppercase">
                      {portfolio?.name} ({portfolio?.value})
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh Controls - Brutalist */}
              <div className="flex items-center space-x-4 px-4 py-3">
                <Button variant="outline" size="sm" onClick={handleRefresh} className="brutalist-shadow-sm">
                  <Icon name="RefreshCw" size={16} className="mr-2" />
                  REFRESH
                </Button>
                <div className="text-xs font-black uppercase tracking-wide text-muted-foreground brutalist-mono">
                  UPDATED: {lastUpdated?.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          {/* Risk Metrics Strip - Brutalist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {riskMetrics?.map((metric, index) => (
              <RiskMetricsCard key={index} {...metric} />
            ))}
          </div>

          {/* Navigation Tabs - Brutalist */}
          <div className="flex items-center space-x-2 mb-8 bg-muted brutalist-border-thin brutalist-shadow-sm p-2">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-3 px-6 py-4 text-sm font-black uppercase tracking-wide transition-all duration-100
                  brutalist-border-thin brutalist-interactive
                  ${activeTab === tab?.id 
                    ? 'bg-primary text-primary-foreground brutalist-shadow-md' 
                    : 'bg-background text-foreground hover:bg-card brutalist-shadow-sm'
                  }
                `}
              >
                <Icon name={tab?.icon} size={18} />
                <span className="brutalist-text">{tab?.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content - Brutalist Layout */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Visualization Area */}
              <div className="xl:col-span-2 space-y-8">
                <RiskReturnScatter />
                <StressTestResults />
              </div>

              {/* Right Panel */}
              <div className="space-y-8">
                <CorrelationMatrix />
                <SectorConcentration />
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-8">
              <ScenarioAnalysis />
            </div>
          )}

          {activeTab === 'controls' && (
            <div className="space-y-8">
              <RiskControls />
            </div>
          )}

          {/* Alert Banner - Brutalist Style */}
          <div className="mt-8 bg-card text-foreground brutalist-border brutalist-shadow-md p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-foreground brutalist-border-thin flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-black uppercase tracking-wide text-lg text-foreground mb-3 brutalist-heading">
                  RISK ALERT
                </h4>
                <p className="text-sm font-bold uppercase tracking-wide text-foreground mb-4 brutalist-text">
                  TECHNOLOGY SECTOR CONCENTRATION HAS REACHED 24.5%, APPROACHING THE 30% LIMIT. 
                  CONSIDER REBALANCING TO MAINTAIN DIVERSIFICATION.
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="secondary" size="sm" className="brutalist-shadow-sm">
                    VIEW DETAILS
                  </Button>
                  <Button variant="outline" size="sm" className="brutalist-shadow-sm">
                    DISMISS
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagementDashboard;