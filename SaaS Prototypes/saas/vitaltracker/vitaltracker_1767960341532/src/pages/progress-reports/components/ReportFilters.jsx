import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ReportFilters = ({ onFiltersChange, selectedFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const reportTypeOptions = [
    { value: 'weekly', label: 'Weekly Summary' },
    { value: 'monthly', label: 'Monthly Overview' },
    { value: 'goals', label: 'Goal Achievement' },
    { value: 'trends', label: 'Trend Analysis' },
    { value: 'comparison', label: 'Period Comparison' }
  ];

  const metricOptions = [
    { id: 'steps', label: 'Steps & Activity', checked: selectedFilters?.metrics?.includes('steps') },
    { id: 'calories', label: 'Calories & Nutrition', checked: selectedFilters?.metrics?.includes('calories') },
    { id: 'hydration', label: 'Water Intake', checked: selectedFilters?.metrics?.includes('hydration') },
    { id: 'sleep', label: 'Sleep Quality', checked: selectedFilters?.metrics?.includes('sleep') },
    { id: 'weight', label: 'Weight Tracking', checked: selectedFilters?.metrics?.includes('weight') },
    { id: 'mood', label: 'Mood & Wellness', checked: selectedFilters?.metrics?.includes('mood') }
  ];

  const handleDateRangeChange = (value) => {
    onFiltersChange({ ...selectedFilters, dateRange: value });
  };

  const handleReportTypeChange = (value) => {
    onFiltersChange({ ...selectedFilters, reportType: value });
  };

  const handleMetricToggle = (metricId, checked) => {
    const updatedMetrics = checked 
      ? [...selectedFilters?.metrics, metricId]
      : selectedFilters?.metrics?.filter(m => m !== metricId);
    
    onFiltersChange({ ...selectedFilters, metrics: updatedMetrics });
  };

  const handleGenerateReport = () => {
    console.log('Generating report with filters:', selectedFilters);
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 border border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Report Filters</h3>
            <p className="text-sm text-muted-foreground">Customize your wellness report</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={selectedFilters?.dateRange}
          onChange={handleDateRangeChange}
          placeholder="Select date range"
        />

        <Select
          label="Report Type"
          options={reportTypeOptions}
          value={selectedFilters?.reportType}
          onChange={handleReportTypeChange}
          placeholder="Select report type"
        />
      </div>
      {isExpanded && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Select Metrics to Include</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {metricOptions?.map((metric) => (
                <Checkbox
                  key={metric?.id}
                  label={metric?.label}
                  checked={metric?.checked}
                  onChange={(e) => handleMetricToggle(metric?.id, e?.target?.checked)}
                  className="text-sm"
                />
              ))}
            </div>
          </div>

          {selectedFilters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue="2024-09-11"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue="2024-10-11"
                />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border/40">
        <Button
          variant="default"
          onClick={handleGenerateReport}
          iconName="BarChart3"
          iconPosition="left"
          className="flex-1"
        >
          Generate Report
        </Button>
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
        >
          Export Data
        </Button>
        <Button
          variant="ghost"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;