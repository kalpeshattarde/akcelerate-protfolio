import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const GlobalControls = ({ onFiltersChange }) => {
  const [fiscalPeriod, setFiscalPeriod] = useState('Q4-2024');
  const [attributionWindow, setAttributionWindow] = useState('30-day');
  const [costAllocation, setCostAllocation] = useState('last-click');
  const [isProcessing, setIsProcessing] = useState(false);

  const fiscalPeriods = [
    { value: 'Q4-2024', label: 'Q4 2024 (Current)' },
    { value: 'Q3-2024', label: 'Q3 2024' },
    { value: 'Q2-2024', label: 'Q2 2024' },
    { value: 'Q1-2024', label: 'Q1 2024' },
    { value: 'FY-2024', label: 'Full Year 2024' },
    { value: 'FY-2023', label: 'Full Year 2023' }
  ];

  const attributionWindows = [
    { value: '1-day', label: '1 Day View' },
    { value: '7-day', label: '7 Day View' },
    { value: '30-day', label: '30 Day View' },
    { value: '90-day', label: '90 Day View' }
  ];

  const costAllocationModels = [
    { value: 'first-click', label: 'First Click Attribution' },
    { value: 'last-click', label: 'Last Click Attribution' },
    { value: 'linear', label: 'Linear Attribution' },
    { value: 'time-decay', label: 'Time Decay Attribution' },
    { value: 'position-based', label: 'Position Based Attribution' }
  ];

  const handleApplyFilters = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onFiltersChange?.({
        fiscalPeriod,
        attributionWindow,
        costAllocation
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleReset = () => {
    setFiscalPeriod('Q4-2024');
    setAttributionWindow('30-day');
    setCostAllocation('last-click');
    onFiltersChange?.({
      fiscalPeriod: 'Q4-2024',
      attributionWindow: '30-day',
      costAllocation: 'last-click'
    });
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Analysis Controls</h3>
            <p className="text-sm text-muted-foreground">Configure ROI calculation parameters</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isProcessing && (
            <div className="flex items-center space-x-2 text-sm text-warning">
              <Icon name="RefreshCw" size={14} className="animate-spin" />
              <span>Processing...</span>
            </div>
          )}
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" title="Real-time data active" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fiscal Period Selector - Replaced native select with custom Select component */}
        <div className="space-y-3">
          <Select
            label={
              <span className="flex items-center">
                <Icon name="Calendar" size={16} className="mr-2" />
                Fiscal Period
              </span>
            }
            options={fiscalPeriods}
            value={fiscalPeriod}
            onChange={setFiscalPeriod}
            description="Select reporting period for ROI analysis"
            className="w-full"
          />
        </div>

        {/* Attribution Window - Replaced native select with custom Select component */}
        <div className="space-y-3">
          <Select
            label={
              <span className="flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                Attribution Window
              </span>
            }
            options={attributionWindows}
            value={attributionWindow}
            onChange={setAttributionWindow}
            description="Conversion tracking timeframe"
            className="w-full"
          />
        </div>

        {/* Cost Allocation Model - Replaced native select with custom Select component */}
        <div className="space-y-3">
          <Select
            label={
              <span className="flex items-center">
                <Icon name="Target" size={16} className="mr-2" />
                Attribution Model
              </span>
            }
            options={costAllocationModels}
            value={costAllocation}
            onChange={setCostAllocation}
            description="How to attribute conversions"
            className="w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleApplyFilters}
            disabled={isProcessing}
            loading={isProcessing}
            iconName={isProcessing ? "RefreshCw" : "Play"}
            iconPosition="left"
            iconSize={16}
            className="px-6 py-3"
          >
            <span className="font-medium">Apply Filters</span>
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleReset}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="px-4 py-3"
          >
            Reset
          </Button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={14} />
            <span>Last updated: 15 min ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} />
            <span>24.5K data points</span>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <div>
              <div className="text-sm font-medium text-foreground">ROI Trending Up</div>
              <div className="text-xs text-muted-foreground">+12% vs last period</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <div>
              <div className="text-sm font-medium text-foreground">Attribution Impact</div>
              <div className="text-xs text-muted-foreground">Model affects 18% of conversions</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <Icon name="Zap" size={16} className="text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Real-time Active</div>
              <div className="text-xs text-muted-foreground">Data refreshes every 15 min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;