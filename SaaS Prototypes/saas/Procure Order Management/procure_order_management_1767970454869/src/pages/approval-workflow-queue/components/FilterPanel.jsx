import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, approvalQueue }) => {
  const [savedFilters, setSavedFilters] = useState([
    { name: 'High Priority', filters: { priority: 'high' } },
    { name: 'Over $20K', filters: { amountRange: { min: '20000', max: '' } } },
    { name: 'IT Department', filters: { department: 'IT Department' } }
  ]);

  const departments = [...new Set(approvalQueue.map(item => item.requestorDept))];
  const priorities = ['urgent', 'high', 'medium', 'low'];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAmountRangeChange = (type, value) => {
    onFiltersChange(prev => ({
      ...prev,
      amountRange: {
        ...prev.amountRange,
        [type]: value
      }
    }));
  };

  const handleDateRangeChange = (type, value) => {
    onFiltersChange(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      amountRange: { min: '', max: '' },
      department: '',
      dateRange: { start: '', end: '' },
      priority: '',
      status: 'pending'
    });
  };

  const applySavedFilter = (savedFilter) => {
    onFiltersChange(prev => ({
      ...prev,
      ...savedFilter.filters
    }));
  };

  return (
    <div className="bg-surface border border-border rounded-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading-medium text-text-primary">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-text-secondary hover:text-text-primary transition-smooth"
        >
          Clear All
        </button>
      </div>

      {/* Saved Filter Presets */}
      <div className="mb-6">
        <h4 className="text-sm font-body-medium text-text-secondary mb-2">Quick Filters</h4>
        <div className="space-y-2">
          {savedFilters.map((savedFilter, index) => (
            <button
              key={index}
              onClick={() => applySavedFilter(savedFilter)}
              className="w-full text-left px-3 py-2 text-sm bg-secondary-50 hover:bg-secondary-100 rounded-button transition-smooth"
            >
              {savedFilter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Range */}
      <div className="mb-4">
        <label className="block text-sm font-body-medium text-text-secondary mb-2">
          Amount Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.amountRange.min}
            onChange={(e) => handleAmountRangeChange('min', e.target.value)}
            className="px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.amountRange.max}
            onChange={(e) => handleAmountRangeChange('max', e.target.value)}
            className="px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Department */}
      <div className="mb-4">
        <label className="block text-sm font-body-medium text-text-secondary mb-2">
          Department
        </label>
        <select
          value={filters.department}
          onChange={(e) => handleFilterChange('department', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-sm font-body-medium text-text-secondary mb-2">
          Priority
        </label>
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="">All Priorities</option>
          {priorities.map(priority => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range */}
      <div className="mb-4">
        <label className="block text-sm font-body-medium text-text-secondary mb-2">
          Submission Date
        </label>
        <div className="space-y-2">
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Active Filters Count */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center text-sm text-text-secondary">
          <Icon name="Filter" size={16} className="mr-2" />
          <span>
            {Object.values(filters).filter(value => 
              typeof value === 'string' ? value !== '' : 
              typeof value === 'object' ? Object.values(value).some(v => v !== '') : 
              false
            ).length} active filters
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;