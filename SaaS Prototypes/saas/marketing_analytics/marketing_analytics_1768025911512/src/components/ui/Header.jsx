import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigationTabs = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/marketing-performance-overview-dashboard',
    icon: 'BarChart3',
    tooltip: 'Executive performance summary'
  },
  {
    id: 'channels',
    label: 'Channels',
    path: '/channel-performance-analytics-dashboard',
    icon: 'TrendingUp',
    tooltip: 'Channel analysis and optimization'
  },
  {
    id: 'roi',
    label: 'ROI',
    path: '/roi-analysis-dashboard',
    icon: 'DollarSign',
    tooltip: 'Financial performance analysis'
  },
  {
    id: 'benchmarks',
    label: 'Benchmarks',
    path: '/competitive-benchmarking-dashboard',
    icon: 'Target',
    tooltip: 'Competitive intelligence'
  }];


  useEffect(() => {
    const currentTab = navigationTabs?.find((tab) => tab?.path === location?.pathname);
    if (currentTab) {
      setActiveTab(currentTab?.id);
    }
  }, [location?.pathname]);

  const handleTabClick = (tab) => {
    if (tab?.id !== activeTab) {
      setActiveTab(tab?.id);
      navigate(tab?.path);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const formatLastRefresh = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Icon name="BarChart4" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground leading-none">Marketing Analytics 

              </h1>
              <span className="text-xs text-muted-foreground leading-none mt-0.5">
                Performance Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1" role="tablist">
          {navigationTabs?.map((tab) =>
          <button
            key={tab?.id}
            role="tab"
            aria-selected={activeTab === tab?.id}
            aria-controls={`${tab?.id}-panel`}
            title={tab?.tooltip}
            onClick={() => handleTabClick(tab)}
            className={`
                relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200 ease-out-custom
                ${activeTab === tab?.id ?
            'bg-primary/10 text-primary border border-primary/20 shadow-glow' :
            'text-muted-foreground hover:text-foreground hover:bg-muted/50'}
              `
            }>

              <Icon
              name={tab?.icon}
              size={16}
              className={activeTab === tab?.id ? 'text-primary' : 'text-current'} />

              <span>{tab?.label}</span>
              {activeTab === tab?.id &&
            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            }
            </button>
          )}
        </nav>

        {/* Data Refresh Indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isRefreshing ? 'bg-warning animate-pulse' : 'bg-success'}`} />
              <span className="hidden sm:inline">
                {isRefreshing ? 'Refreshing...' : `Updated ${formatLastRefresh(lastRefresh)}`}
              </span>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-md hover:bg-muted/50 transition-colors duration-200 disabled:opacity-50"
              title="Refresh data">

              <Icon
                name="RefreshCw"
                size={14}
                className={isRefreshing ? 'animate-spin' : ''} />

            </button>
          </div>
        </div>
      </div>
    </header>);

};

export default Header;