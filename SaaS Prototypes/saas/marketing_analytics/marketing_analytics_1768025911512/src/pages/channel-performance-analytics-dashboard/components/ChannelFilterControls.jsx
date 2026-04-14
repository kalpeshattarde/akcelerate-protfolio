import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChannelFilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    channel: 'all',
    campaignType: 'all',
    attributionModel: 'last-click',
    period: '30d'
  });

  const channelOptions = [
    { value: 'all', label: 'All Channels' },
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook', label: 'Facebook Ads' },
    { value: 'linkedin', label: 'LinkedIn Ads' },
    { value: 'email', label: 'Email Marketing' },
    { value: 'organic', label: 'Organic Search' }
  ];

  const campaignTypeOptions = [
    { value: 'all', label: 'All Campaign Types' },
    { value: 'search', label: 'Search Campaigns' },
    { value: 'display', label: 'Display Campaigns' },
    { value: 'video', label: 'Video Campaigns' },
    { value: 'shopping', label: 'Shopping Campaigns' },
    { value: 'social', label: 'Social Campaigns' }
  ];

  const attributionOptions = [
    { value: 'last-click', label: 'Last Click' },
    { value: 'first-click', label: 'First Click' },
    { value: 'linear', label: 'Linear Attribution' },
    { value: 'time-decay', label: 'Time Decay' },
    { value: 'position-based', label: 'Position Based' }
  ];

  const periodOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '12m', label: 'Last 12 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      channel: 'all',
      campaignType: 'all',
      attributionModel: 'last-click',
      period: '30d'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  return (
    <div className="glass-card p-6 mb-6 overflow-dropdown-visible">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <span>Advanced Filters</span>
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 position-dropdown-container">
        <div className="isolate-stacking">
          <Select
            label="Channel"
            options={channelOptions}
            value={filters?.channel}
            onChange={(value) => handleFilterChange('channel', value)}
            className="w-full"
          />
        </div>

        <div className="isolate-stacking">
          <Select
            label="Campaign Type"
            options={campaignTypeOptions}
            value={filters?.campaignType}
            onChange={(value) => handleFilterChange('campaignType', value)}
            className="w-full"
          />
        </div>

        <div className="isolate-stacking">
          <Select
            label="Attribution Model"
            options={attributionOptions}
            value={filters?.attributionModel}
            onChange={(value) => handleFilterChange('attributionModel', value)}
            className="w-full"
          />
        </div>

        <div className="isolate-stacking">
          <Select
            label="Time Period"
            options={periodOptions}
            value={filters?.period}
            onChange={(value) => handleFilterChange('period', value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: {new Date()?.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelFilterControls;