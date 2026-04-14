import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilterDropdown = ({ onFilterChange, currentFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '12months',
    facility: 'all',
    metrics: ['energy', 'emissions', 'water', 'waste'],
    comparison: 'previous-period',
    ...currentFilters
  });
  const dropdownRef = useRef(null);

  const filterOptions = {
    dateRange: [
      { value: '3months', label: 'Last 3 Months' },
      { value: '6months', label: 'Last 6 Months' },
      { value: '12months', label: 'Last 12 Months' },
      { value: '24months', label: 'Last 24 Months' },
      { value: 'ytd', label: 'Year to Date' },
      { value: 'custom', label: 'Custom Range' }
    ],
    facility: [
      { value: 'all', label: 'All Facilities' },
      { value: 'headquarters', label: 'Headquarters' },
      { value: 'manufacturing-1', label: 'Manufacturing Plant 1' },
      { value: 'manufacturing-2', label: 'Manufacturing Plant 2' },
      { value: 'warehouse-east', label: 'East Coast Warehouse' },
      { value: 'warehouse-west', label: 'West Coast Warehouse' },
      { value: 'retail-stores', label: 'Retail Stores' }
    ],
    metrics: [
      { value: 'energy', label: 'Energy Used', icon: 'Zap', color: 'text-primary' },
      { value: 'emissions', label: 'CO₂e Emissions', icon: 'CloudRain', color: 'text-success' },
      { value: 'water', label: 'Water Consumed', icon: 'Droplets', color: 'text-secondary' },
      { value: 'waste', label: 'Waste Recycled', icon: 'Recycle', color: 'text-warning' }
    ],
    comparison: [
      { value: 'none', label: 'No Comparison' },
      { value: 'previous-period', label: 'Previous Period' },
      { value: 'previous-year', label: 'Previous Year' },
      { value: 'target', label: 'vs Target' },
      { value: 'industry-avg', label: 'vs Industry Average' }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (category, value) => {
    let newFilters;
    
    if (category === 'metrics') {
      // Handle multi-select for metrics
      const currentMetrics = filters?.metrics || [];
      const updatedMetrics = currentMetrics?.includes(value)
        ? currentMetrics?.filter(m => m !== value)
        : [...currentMetrics, value];
      
      newFilters = { ...filters, metrics: updatedMetrics };
    } else {
      newFilters = { ...filters, [category]: value };
    }
    
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.dateRange !== '12months') count++;
    if (filters?.facility !== 'all') count++;
    if (filters?.metrics?.length !== 4) count++;
    if (filters?.comparison !== 'previous-period') count++;
    return count;
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      dateRange: '12months',
      facility: 'all',
      metrics: ['energy', 'emissions', 'water', 'waste'],
      comparison: 'previous-period'
    };
    setFilters(defaultFilters);
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  const getDateRangeLabel = () => {
    const option = filterOptions?.dateRange?.find(opt => opt?.value === filters?.dateRange);
    return option?.label || 'Last 12 Months';
  };

  const getFacilityLabel = () => {
    const option = filterOptions?.facility?.find(opt => opt?.value === filters?.facility);
    return option?.label || 'All Facilities';
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Icon name="Filter" size={16} className="mr-2" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="ml-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
            {activeFiltersCount}
          </span>
        )}
        <Icon name="ChevronDown" size={14} className="ml-2" />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-modal z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Filter Dashboard</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="p-4 space-y-6">
            {/* Date Range */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Date Range
              </label>
              <div className="space-y-2">
                {filterOptions?.dateRange?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleFilterChange('dateRange', option?.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      filters?.dateRange === option?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span>{option?.label}</span>
                    {filters?.dateRange === option?.value && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Facility */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Facility
              </label>
              <div className="space-y-2">
                {filterOptions?.facility?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleFilterChange('facility', option?.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      filters?.facility === option?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span>{option?.label}</span>
                    {filters?.facility === option?.value && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Metrics to Display
              </label>
              <div className="space-y-2">
                {filterOptions?.metrics?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleFilterChange('metrics', option?.value)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      filters?.metrics?.includes(option?.value)
                        ? 'bg-muted border border-primary' :'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={option?.icon} size={16} className={option?.color} />
                    <span className="flex-1 text-left">{option?.label}</span>
                    {filters?.metrics?.includes(option?.value) && (
                      <Icon name="Check" size={14} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Comparison
              </label>
              <div className="space-y-2">
                {filterOptions?.comparison?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleFilterChange('comparison', option?.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                      filters?.comparison === option?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <span>{option?.label}</span>
                    {filters?.comparison === option?.value && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="text-xs text-muted-foreground">
              <strong>Current Selection:</strong> {getDateRangeLabel()} • {getFacilityLabel()} • {filters?.metrics?.length || 0} metrics
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFilterDropdown;