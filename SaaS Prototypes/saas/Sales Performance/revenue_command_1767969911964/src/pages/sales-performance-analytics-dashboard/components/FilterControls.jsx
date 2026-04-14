import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterControls = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: 'this-month',
    team: 'all',
    territory: 'all',
    comparison: 'previous-period',
    segment: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const teamOptions = [
    { value: 'all', label: 'All Teams' },
    { value: 'enterprise', label: 'Enterprise Sales' },
    { value: 'mid-market', label: 'Mid-Market' },
    { value: 'smb', label: 'SMB Sales' },
    { value: 'inside-sales', label: 'Inside Sales' }
  ];

  const territoryOptions = [
    { value: 'all', label: 'All Territories' },
    { value: 'west-coast', label: 'West Coast' },
    { value: 'east-coast', label: 'East Coast' },
    { value: 'central', label: 'Central' },
    { value: 'southwest', label: 'Southwest' },
    { value: 'southeast', label: 'Southeast' }
  ];

  const comparisonOptions = [
    { value: 'previous-period', label: 'Previous Period' },
    { value: 'same-period-last-year', label: 'Same Period Last Year' },
    { value: 'no-comparison', label: 'No Comparison' }
  ];

  const segmentOptions = [
    { value: 'all', label: 'All Segments' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'mid-market', label: 'Mid-Market' },
    { value: 'smb', label: 'Small Business' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      dateRange: 'this-month',
      team: 'all',
      territory: 'all',
      comparison: 'previous-period',
      segment: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange !== 'this-month') count++;
    if (filters.team !== 'all') count++;
    if (filters.territory !== 'all') count++;
    if (filters.comparison !== 'previous-period') count++;
    if (filters.segment !== 'all') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card mb-6">
      {/* Mobile Toggle */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="flex-1 mr-4"
        >
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          iconName="RotateCcw"
          iconSize={16}
        >
          Reset
        </Button>
      </div>

      {/* Filter Controls */}
      <div className={`
        transition-all duration-300 ease-out
        ${isExpanded ? 'block' : 'hidden md:block'}
      `}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />

          <Select
            label="Team"
            options={teamOptions}
            value={filters.team}
            onChange={(value) => handleFilterChange('team', value)}
          />

          <Select
            label="Territory"
            options={territoryOptions}
            value={filters.territory}
            onChange={(value) => handleFilterChange('territory', value)}
          />

          <Select
            label="Compare to"
            options={comparisonOptions}
            value={filters.comparison}
            onChange={(value) => handleFilterChange('comparison', value)}
          />

          <div className="flex items-end space-x-2">
            <Select
              label="Segment"
              options={segmentOptions}
              value={filters.segment}
              onChange={(value) => handleFilterChange('segment', value)}
              className="flex-1"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              iconName="RotateCcw"
              iconSize={16}
              className="hidden md:flex"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
            <Icon name="Filter" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.dateRange !== 'this-month' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
                  <button
                    onClick={() => handleFilterChange('dateRange', 'this-month')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.team !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  {teamOptions.find(opt => opt.value === filters.team)?.label}
                  <button
                    onClick={() => handleFilterChange('team', 'all')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.territory !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  {territoryOptions.find(opt => opt.value === filters.territory)?.label}
                  <button
                    onClick={() => handleFilterChange('territory', 'all')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters.segment !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  {segmentOptions.find(opt => opt.value === filters.segment)?.label}
                  <button
                    onClick={() => handleFilterChange('segment', 'all')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;