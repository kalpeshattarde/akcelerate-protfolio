import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const GlobalControls = ({ 
  dateRange, 
  onDateRangeChange, 
  selectedChannels, 
  onChannelChange, 
  isRealTimeEnabled, 
  onRealTimeToggle,
  lastRefresh,
  onRefresh,
  onExport 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'last_90_days', label: 'Last 90 days' },
    { value: 'this_month', label: 'This month' },
    { value: 'last_month', label: 'Last month' },
    { value: 'this_quarter', label: 'This quarter' },
    { value: 'custom', label: 'Custom range' }
  ];

  const channelOptions = [
    { value: 'google_ads', label: 'Google Ads' },
    { value: 'facebook_ads', label: 'Facebook Ads' },
    { value: 'linkedin_ads', label: 'LinkedIn Ads' },
    { value: 'email_marketing', label: 'Email Marketing' },
    { value: 'organic_search', label: 'Organic Search' },
    { value: 'direct_traffic', label: 'Direct Traffic' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
      // Show success animation
      setTimeout(() => setIsExporting(false), 2000);
    } catch (error) {
      setIsExporting(false);
    }
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
    <div className="glass-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={onDateRangeChange}
              placeholder="Select date range"
              className="min-w-[160px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <Select
              options={channelOptions}
              value={selectedChannels}
              onChange={onChannelChange}
              placeholder="All channels"
              multiple
              searchable
              className="min-w-[200px]"
            />
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Real-time Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isRealTimeEnabled ? 'bg-success animate-pulse' : 'bg-muted-foreground'
              }`} />
              <span className="text-sm text-muted-foreground">
                {isRealTimeEnabled ? 'Live' : 'Paused'}
              </span>
            </div>
            <button
              onClick={onRealTimeToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isRealTimeEnabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  isRealTimeEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Refresh Info */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">
              Updated {formatLastRefresh(lastRefresh)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              iconName="RefreshCw"
              iconSize={14}
              className="p-2"
            />
          </div>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            loading={isExporting}
            iconName={isExporting ? "Download" : "Download"}
            iconPosition="left"
            iconSize={14}
          >
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-muted-foreground">Active Campaigns</div>
            <div className="text-lg font-semibold text-foreground">24</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total Spend</div>
            <div className="text-lg font-semibold text-foreground">$45.2K</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Avg. ROI</div>
            <div className="text-lg font-semibold text-success">+234%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Data Quality</div>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm font-medium text-foreground">98.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;