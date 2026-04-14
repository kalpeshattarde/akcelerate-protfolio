import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [marketStatus, setMarketStatus] = useState('Open');
  const [portfolioValue, setPortfolioValue] = useState(125847.32);
  const [portfolioChange, setPortfolioChange] = useState(2.34);
  const [alertCount, setAlertCount] = useState(3);
  const [showAlerts, setShowAlerts] = useState(false);

  const navigationItems = [
    {
      label: 'Market Overview',
      path: '/market-overview-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Real-time market intelligence and data streams'
    },
    {
      label: 'Portfolio',
      path: '/portfolio-analytics-dashboard',
      icon: 'PieChart',
      tooltip: 'Performance tracking and asset allocation analysis'
    },
    {
      label: 'Trading',
      path: '/trading-analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Real-time analytics and technical analysis tools'
    },
    {
      label: 'Risk Management',
      path: '/risk-management-dashboard',
      icon: 'Shield',
      tooltip: 'Institutional-grade risk assessment and monitoring'
    }
  ];

  const handleTabChange = (path) => {
    navigate(path);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value?.toFixed(2)}%`;
  };

  const getMarketStatusColor = () => {
    switch (marketStatus) {
      case 'Open':
        return 'text-success';
      case 'Closed':
        return 'text-muted-foreground';
      case 'Pre-Market':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const alerts = [
    { id: 1, type: 'warning', message: 'AAPL approaching stop loss level', time: '2 min ago' },
    { id: 2, type: 'success', message: 'Portfolio target reached for MSFT', time: '5 min ago' },
    { id: 3, type: 'error', message: 'High volatility detected in tech sector', time: '8 min ago' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background brutalist-border-thin border-t-0 border-l-0 border-r-0">
      <div className="flex items-center justify-between h-20 px-6">
        {/* Logo Section - Brutalist Style */}
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary brutalist-border brutalist-shadow-sm flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase tracking-tight text-foreground brutalist-heading">
                FINANCEIQ
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground -mt-1 brutalist-text">
                DASHBOARD
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Brutalist Style */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleTabChange(item?.path)}
                className={`
                  px-6 py-3 text-sm font-black tracking-widest uppercase transition-all duration-100
                  flex items-center space-x-3 brutalist-interactive brutalist-border-thin
                  ${isActive 
                    ? 'bg-primary text-primary-foreground brutalist-shadow-md' 
                    : 'bg-background text-foreground hover:bg-muted brutalist-shadow-sm'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span className="brutalist-text">{item?.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section - Status Indicators - Brutalist Style */}
        <div className="flex items-center space-x-4">
          {/* Market Status - Brutalist Indicator */}
          <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-muted brutalist-border-thin brutalist-shadow-sm">
            <div className={`w-6 h-6 ${marketStatus === 'Open' ? 'bg-success' : 'bg-muted-foreground'} brutalist-border-thin brutalist-indicator`} />
            <span className={`text-sm font-black uppercase tracking-wider brutalist-text ${getMarketStatusColor()}`}>
              {marketStatus}
            </span>
          </div>

          {/* Portfolio Value - Brutalist Display */}
          <div className="hidden lg:flex flex-col items-end bg-card brutalist-border-thin brutalist-shadow-sm px-4 py-2">
            <span className="text-lg font-black brutalist-mono text-foreground">
              {formatCurrency(portfolioValue)}
            </span>
            <span className={`text-sm font-black brutalist-mono ${portfolioChange >= 0 ? 'text-profit' : 'text-loss'}`}>
              {formatPercentage(portfolioChange)}
            </span>
          </div>

          {/* Alert Notifications - Brutalist */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAlerts(!showAlerts)}
              className="relative brutalist-shadow-sm"
            >
              <Icon name="Bell" size={20} />
              {alertCount > 0 && (
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-error text-error-foreground text-sm font-black brutalist-border-thin brutalist-shadow-sm flex items-center justify-center brutalist-text">
                  {alertCount}
                </span>
              )}
            </Button>

            {/* Alert Dropdown - Brutalist */}
            {showAlerts && (
              <div className="absolute right-0 top-full mt-3 w-96 bg-popover brutalist-border brutalist-shadow-lg z-50">
                <div className="p-6 border-b-3 border-current">
                  <h3 className="font-black text-lg uppercase tracking-wide text-foreground brutalist-heading">
                    ALERTS
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {alerts?.map((alert) => (
                    <div key={alert?.id} className="p-4 border-b-2 border-current last:border-b-0 hover:bg-muted brutalist-interactive">
                      <div className="flex items-start space-x-4">
                        <div className={`w-6 h-6 brutalist-border-thin ${
                          alert?.type === 'error' ? 'bg-error' :
                          alert?.type === 'warning' ? 'bg-warning' : 'bg-success'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground brutalist-text">{alert?.message}</p>
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mt-2 brutalist-text">
                            {alert?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu - Brutalist */}
          <div className="md:hidden">
            <Button variant="outline" size="icon" className="brutalist-shadow-sm">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Brutalist */}
      <div className="md:hidden border-t-3 border-current bg-muted">
        <nav className="flex items-center justify-around py-3">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleTabChange(item?.path)}
                className={`
                  flex flex-col items-center space-y-2 px-3 py-2 transition-colors duration-100
                  brutalist-interactive
                  ${isActive ? 'text-primary' : 'text-foreground'}
                `}
              >
                <Icon name={item?.icon} size={20} />
                <span className="text-xs font-black uppercase tracking-wide brutalist-text">
                  {item?.label?.split(' ')?.[0]}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Click outside to close alerts */}
      {showAlerts && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowAlerts(false)}
        />
      )}
    </header>
  );
};

export default Header;