import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableTags = [
    'Q4', 'accelerated', 'high-performers', 'new-hire', 'ramp', 'training',
    'territory', 'expansion', 'strategic', 'product-launch', 'incentive',
    'cross-sell', 'retention', 'customer-success', 'renewal', 'mid-year',
    'adjustment', 'market-correction'
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTagToggle = (tag) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', newTags);
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: { start: '', end: '' },
      creator: '',
      payoutRange: { min: '', max: '' },
      tags: [],
      status: 'all'
    });
  };

  const hasActiveFilters = () => {
    return filters.dateRange.start || filters.dateRange.end || 
           filters.creator || filters.payoutRange.min || filters.payoutRange.max ||
           (filters.tags && filters.tags.length > 0) || filters.status !== 'all';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          hasActiveFilters() 
            ? 'glass-morphism-elevated text-white border border-white/30 glow-indigo' :'glass-morphism text-white/80 hover:text-white border border-white/20 hover:border-white/30'
        }`}
      >
        <Icon name="Filter" size={16} />
        <span>Filters</span>
        {hasActiveFilters() && (
          <span className="w-2 h-2 bg-neon-indigo rounded-full glow-indigo"></span>
        )}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Filter Panel */}
          <div className="absolute top-full left-0 mt-2 w-80 glass-morphism-dark border border-white/20 rounded-xl shadow-dark z-50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-white">Filter Scenarios</h3>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-neon-aqua hover:text-white transition-colors duration-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        start: e.target.value
                      })}
                      className="input-glass-dark text-sm"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        end: e.target.value
                      })}
                      className="input-glass-dark text-sm"
                    />
                  </div>
                </div>

                {/* Creator */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Creator
                  </label>
                  <input
                    type="text"
                    placeholder="Search by creator name..."
                    value={filters.creator}
                    onChange={(e) => handleFilterChange('creator', e.target.value)}
                    className="w-full input-glass-dark text-sm placeholder-white/40"
                  />
                </div>

                {/* Payout Range */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Total Payout Range ($)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min amount"
                      value={filters.payoutRange.min}
                      onChange={(e) => handleFilterChange('payoutRange', {
                        ...filters.payoutRange,
                        min: e.target.value
                      })}
                      className="input-glass-dark text-sm placeholder-white/40"
                    />
                    <input
                      type="number"
                      placeholder="Max amount"
                      value={filters.payoutRange.max}
                      onChange={(e) => handleFilterChange('payoutRange', {
                        ...filters.payoutRange,
                        max: e.target.value
                      })}
                      className="input-glass-dark text-sm placeholder-white/40"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full glass-morphism-dark border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/40 transition-all duration-300 text-sm"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Tags
                  </label>
                  <div className="max-h-32 overflow-y-auto glass-morphism border border-white/10 rounded-lg p-3">
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1 text-xs rounded-full transition-all duration-300 border ${
                            filters.tags && filters.tags.includes(tag)
                              ? 'glass-morphism-elevated text-white border-white/30 glow-indigo' :'glass-morphism text-white/70 hover:text-white border-white/20 hover:border-white/30'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  {filters.tags && filters.tags.length > 0 && (
                    <p className="text-xs text-white/60 mt-2">
                      {filters.tags.length} tag{filters.tags.length !== 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;