import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Overview',
      path: '/executive-revenue-overview-dashboard',
      icon: 'BarChart3',
      tooltip: 'Executive revenue insights and strategic KPIs',
      analyticsType: 'strategic'
    },
    {
      label: 'Performance',
      path: '/sales-performance-analytics-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Team and individual sales analytics',
      analyticsType: 'tactical'
    },
    {
      label: 'Pipeline',
      path: '/real-time-pipeline-monitoring-dashboard',
      icon: 'Activity',
      tooltip: 'Real-time operational monitoring and alerts',
      analyticsType: 'operational'
    },
    {
      label: 'Forecasting',
      path: '/revenue-forecasting-trends-dashboard',
      icon: 'LineChart',
      tooltip: 'Predictive analytics and trend analysis',
      analyticsType: 'predictive'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border shadow-card">
      <div className="flex items-center h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="DollarSign" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-primary leading-tight">
              Revenue Command
            </h1>
            <span className="text-xs text-text-secondary leading-none">
              Executive Analytics
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center ml-12 space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleTabClick(item.path)}
              className={`
                relative flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium
                transition-all duration-200 ease-out group
                ${isActiveTab(item.path)
                  ? 'text-primary bg-primary/5 border-b-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-primary/5'
                }
              `}
              title={item.tooltip}
            >
              <Icon 
                name={item.icon} 
                size={16} 
                className={`
                  transition-colors duration-200
                  ${isActiveTab(item.path) ? 'text-primary' : 'text-text-secondary group-hover:text-primary'}
                `}
              />
              <span>{item.label}</span>
              
              {/* Active indicator */}
              {isActiveTab(item.path) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center ml-auto space-x-4">
          {/* Data Refresh Indicator */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="RefreshCw" size={14} className="animate-spin-slow" />
            <span className="hidden sm:inline">Last updated: 2 min ago</span>
          </div>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMoreMenuToggle}
              iconName="MoreHorizontal"
              iconSize={16}
              className="text-text-secondary hover:text-primary"
            >
              More
            </Button>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-200">
                <div className="py-2">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors">
                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors">
                    <Icon name="Shield" size={16} className="mr-3" />
                    Admin Panel
                  </button>
                  <div className="border-t border-border my-2" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-muted transition-colors">
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-text-primary">Sarah Chen</div>
              <div className="text-xs text-text-secondary">VP of Sales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside handler for more menu */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 z-100" 
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;