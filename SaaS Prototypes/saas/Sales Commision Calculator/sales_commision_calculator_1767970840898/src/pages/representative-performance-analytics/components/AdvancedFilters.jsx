import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AdvancedFilters = ({ 
  filters, 
  onFiltersChange, 
  timePeriod, 
  onTimePeriodChange, 
  onSaveView, 
  savedViews, 
  onLoadView 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSavedViews, setShowSavedViews] = useState(false);

  const filterOptions = {
    productLine: [
      { value: 'all', label: 'All Product Lines' },
      { value: 'enterprise', label: 'Enterprise Solutions' },
      { value: 'smb', label: 'Small & Medium Business' },
      { value: 'cloud', label: 'Cloud Services' },
      { value: 'consulting', label: 'Consulting Services' }
    ],
    dealSize: [
      { value: 'all', label: 'All Deal Sizes' },
      { value: 'small', label: 'Small ($0 - $50K)' },
      { value: 'medium', label: 'Medium ($50K - $250K)' },
      { value: 'large', label: 'Large ($250K - $1M)' },
      { value: 'enterprise', label: 'Enterprise ($1M+)' }
    ],
    customerSegment: [
      { value: 'all', label: 'All Customer Segments' },
      { value: 'new', label: 'New Customers' },
      { value: 'existing', label: 'Existing Customers' },
      { value: 'expansion', label: 'Expansion Opportunities' },
      { value: 'renewal', label: 'Renewals' }
    ],
    dateRange: [
      { value: 'ytd', label: 'Year to Date' },
      { value: 'last12', label: 'Last 12 Months' },
      { value: 'q4', label: 'Q4 2024' },
      { value: 'q3', label: 'Q3 2024' },
      { value: 'q2', label: 'Q2 2024' },
      { value: 'q1', label: 'Q1 2024' }
    ]
  };

  const timePeriodOptions = [
    { value: 'monthly', label: 'Monthly', icon: 'Calendar' },
    { value: 'quarterly', label: 'Quarterly', icon: 'BarChart3' },
    { value: 'yearly', label: 'Yearly', icon: 'TrendingUp' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      productLine: 'all',
      dealSize: 'all',
      customerSegment: 'all',
      dateRange: 'ytd'
    });
    onTimePeriodChange('quarterly');
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all').length;
  };

  const formatSavedViewDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card-glass">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-white">Advanced Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-neon-indigo/20 text-neon-indigo rounded-sm">
                {getActiveFiltersCount()} active
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSavedViews(!showSavedViews)}
              className="px-3 py-1 text-sm font-medium text-white/70 hover:text-white transition-smooth flex items-center space-x-1"
            >
              <Icon name="Bookmark" size={14} />
              <span>Saved Views ({savedViews.length})</span>
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-sm hover:bg-white/10 transition-smooth"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-white/60" 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Time Period Selector - Always Visible */}
      <div className="p-4 border-b border-white/10">
        <label className="block text-sm font-medium text-white mb-2">Time Period</label>
        <div className="flex space-x-1 glass-morphism-dark p-1 rounded-sm">
          {timePeriodOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimePeriodChange(option.value)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-sm text-sm font-medium transition-smooth ${
                timePeriod === option.value
                  ? 'glass-morphism text-neon-indigo shadow-soft'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Views Panel */}
      {showSavedViews && (
        <div className="p-4 border-b border-white/10 glass-morphism-dark">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-white">Saved Views</h4>
            <button
              onClick={onSaveView}
              className="px-3 py-1 text-sm font-medium bg-neon-indigo text-white rounded-sm hover:bg-neon-indigo/80 transition-smooth flex items-center space-x-1"
            >
              <Icon name="Plus" size={14} />
              <span>Save Current</span>
            </button>
          </div>
          
          {savedViews.length > 0 ? (
            <div className="space-y-2">
              {savedViews.map((view) => (
                <div
                  key={view.id}
                  className="flex items-center justify-between p-3 glass-morphism border border-white/10 rounded-sm hover:bg-white/10 transition-smooth"
                >
                  <div>
                    <div className="font-medium text-white text-sm">{view.name}</div>
                    <div className="text-xs text-white/60">
                      Saved {formatSavedViewDate(view.timestamp)}
                    </div>
                  </div>
                  <button
                    onClick={() => onLoadView(view)}
                    className="px-2 py-1 text-xs font-medium text-neon-indigo hover:bg-neon-indigo/20 rounded-sm transition-smooth"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-white/70">
              <Icon name="Bookmark" size={24} className="mx-auto mb-2 text-white/40" />
              <p className="text-sm">No saved views yet</p>
            </div>
          )}
        </div>
      )}

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Product Line Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Product Line
              </label>
              <select
                value={filters.productLine}
                onChange={(e) => handleFilterChange('productLine', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-neon-indigo/50 focus:border-white/40 glass-morphism text-white"
              >
                {filterOptions.productLine.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Deal Size Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Deal Size
              </label>
              <select
                value={filters.dealSize}
                onChange={(e) => handleFilterChange('dealSize', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-neon-indigo/50 focus:border-white/40 glass-morphism text-white"
              >
                {filterOptions.dealSize.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Segment Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Customer Segment
              </label>
              <select
                value={filters.customerSegment}
                onChange={(e) => handleFilterChange('customerSegment', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-neon-indigo/50 focus:border-white/40 glass-morphism text-white"
              >
                {filterOptions.customerSegment.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-white/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-neon-indigo/50 focus:border-white/40 glass-morphism text-white"
              >
                {filterOptions.dateRange.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="text-sm text-white/70">
              {getActiveFiltersCount() > 0 
                ? `${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? 's' : ''} applied`
                : 'No filters applied'
              }
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm font-medium text-white/70 hover:text-white transition-smooth"
                disabled={getActiveFiltersCount() === 0}
              >
                Reset All
              </button>
              
              <button
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1 text-sm font-medium glass-morphism-dark text-white rounded-sm hover:bg-white/10 transition-smooth"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;