import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const GlobalFilterBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'last-30-days',
    territory: 'all',
    comparison: 'previous-period',
    segment: 'all'
  });

  const dateRangeOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'last-30-days', label: 'Last 30 days' },
  { value: 'last-90-days', label: 'Last 90 days' },
  { value: 'this-quarter', label: 'This quarter' },
  { value: 'last-quarter', label: 'Last quarter' },
  { value: 'this-year', label: 'This year' },
  { value: 'custom', label: 'Custom range' }];


  const territoryOptions = [
  { value: 'all', label: 'All Territories' },
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia-pacific', label: 'Asia Pacific' },
  { value: 'latin-america', label: 'Latin America' },
  { value: 'middle-east-africa', label: 'Middle East & Africa' }];


  const comparisonOptions = [
  { value: 'previous-period', label: 'Previous period' },
  { value: 'same-period-last-year', label: 'Same period last year' },
  { value: 'no-comparison', label: 'No comparison' }];


  const segmentOptions = [
  { value: 'all', label: 'All Segments' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'mid-market', label: 'Mid-Market' },
  { value: 'smb', label: 'Small Business' },
  { value: 'startup', label: 'Startup' }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      dateRange: 'last-30-days',
      territory: 'all',
      comparison: 'previous-period',
      segment: 'all'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange !== 'last-30-days') count++;
    if (filters.territory !== 'all') count++;
    if (filters.comparison !== 'previous-period') count++;
    if (filters.segment !== 'all') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="px-6 py-4">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <Button
            variant="outline"
            size="default"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="flex-1 mr-4 h-10 text-sm font-medium border-border hover:border-primary/30 hover:bg-primary/5"
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
          
          <Button
            variant="ghost"
            size="default"
            onClick={handleReset}
            iconName="RotateCcw"
            iconSize={18}
            className="h-10 px-4 text-text-secondary hover:text-text-primary hover:bg-muted font-medium"
          >
            Reset
          </Button>
        </div>

        {/* Filter Controls */}
        <div className={`
          transition-all duration-300 ease-out
          ${isExpanded ? 'block' : 'hidden lg:block'}
        `}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
            {/* Date Range */}
            <div className="lg:col-span-2">
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={filters.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                className="w-full" />

            </div>

            {/* Territory */}
            <div>
              <Select
                label="Territory"
                options={territoryOptions}
                value={filters.territory}
                onChange={(value) => handleFilterChange('territory', value)}
                className="w-full" />

            </div>

            {/* Comparison */}
            <div>
              <Select
                label="Compare to"
                options={comparisonOptions}
                value={filters.comparison}
                onChange={(value) => handleFilterChange('comparison', value)}
                className="w-full" />

            </div>

            {/* Segment */}
            <div>
              <Select
                label="Segment"
                options={segmentOptions}
                value={filters.segment}
                onChange={(value) => handleFilterChange('segment', value)}
                className="w-full" />

            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 lg:justify-end">
              <Button
                variant="outline"
                size="default"
                onClick={handleReset}
                iconName="RotateCcw"
                iconSize={18}
                className="hidden lg:flex h-10 px-4 text-text-secondary border-border hover:border-primary/30 hover:bg-primary/5 hover:text-text-primary font-medium transition-all duration-200">

                Reset
              </Button>
              
              <Button
                variant="default"
                size="default"
                iconName="Search"
                iconSize={18}
                className="h-10 px-5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-all duration-200 hover:shadow-md">

                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 &&
        <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-start space-x-3">
              <div className="flex items-center space-x-2 mt-0.5">
                <Icon name="Filter" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">Active filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.dateRange !== 'last-30-days' &&
              <span className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/15 transition-colors duration-200">
                    {dateRangeOptions.find((opt) => opt.value === filters.dateRange)?.label}
                    <button
                  onClick={() => handleFilterChange('dateRange', 'last-30-days')}
                  className="ml-2 hover:text-primary/70 transition-colors duration-200 p-0.5 rounded-full hover:bg-primary/20">

                      <Icon name="X" size={14} />
                    </button>
                  </span>
              }
                {filters.territory !== 'all' &&
              <span className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/15 transition-colors duration-200">
                    {territoryOptions.find((opt) => opt.value === filters.territory)?.label}
                    <button
                  onClick={() => handleFilterChange('territory', 'all')}
                  className="ml-2 hover:text-primary/70 transition-colors duration-200 p-0.5 rounded-full hover:bg-primary/20">

                      <Icon name="X" size={14} />
                    </button>
                  </span>
              }
                {filters.comparison !== 'previous-period' &&
              <span className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/15 transition-colors duration-200">
                    {comparisonOptions.find((opt) => opt.value === filters.comparison)?.label}
                    <button
                  onClick={() => handleFilterChange('comparison', 'previous-period')}
                  className="ml-2 hover:text-primary/70 transition-colors duration-200 p-0.5 rounded-full hover:bg-primary/20">

                      <Icon name="X" size={14} />
                    </button>
                  </span>
              }
                {filters.segment !== 'all' &&
              <span className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 hover:bg-primary/15 transition-colors duration-200">
                    {segmentOptions.find((opt) => opt.value === filters.segment)?.label}
                    <button
                  onClick={() => handleFilterChange('segment', 'all')}
                  className="ml-2 hover:text-primary/70 transition-colors duration-200 p-0.5 rounded-full hover:bg-primary/20">

                      <Icon name="X" size={14} />
                    </button>
                  </span>
              }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default GlobalFilterBar;