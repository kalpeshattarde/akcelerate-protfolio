import React, { useState } from 'react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import Icon from '../../../components/AppIcon';

const FilterSidebar = ({ isOpen, filters, onFilterChange, onToggle, auditRecords }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Extract unique values for filter options
  const uniqueUsers = [...new Set(auditRecords.map(r => r.userId))];
  const uniqueActionTypes = [...new Set(auditRecords.map(r => r.actionType))];
  const uniqueComplianceTags = [...new Set(auditRecords.flatMap(r => r.complianceTags))];

  const handleDateRangeChange = (range) => {
    const newFilters = {
      ...localFilters,
      dateRange: range
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFilterToggle = (filterType, value) => {
    const currentValues = localFilters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    const newFilters = {
      ...localFilters,
      [filterType]: newValues
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSeverityChange = (severity) => {
    const newFilters = {
      ...localFilters,
      severity
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: {
        start: startOfDay(subDays(new Date(), 30)),
        end: endOfDay(new Date())
      },
      users: [],
      actionTypes: [],
      complianceFrameworks: [],
      severity: 'all'
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const quickDateRanges = [
    { label: 'Last 24 Hours', days: 1 },
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities', color: 'text-text-secondary' },
    { value: 'low', label: 'Low', color: 'text-success' },
    { value: 'medium', label: 'Medium', color: 'text-warning' },
    { value: 'high', label: 'High', color: 'text-error' },
    { value: 'critical', label: 'Critical', color: 'text-error font-heading-semibold' }
  ];

  if (!isOpen) {
    return (
      <div className="fixed left-60 top-16 z-sidebar">
        <button
          onClick={onToggle}
          className="p-3 bg-surface border border-border rounded-r-button shadow-elevation-md hover:bg-secondary-50 transition-smooth"
          title="Open Filters"
        >
          <Icon name="Filter" size={20} className="text-text-secondary" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed left-60 top-16 w-80 h-[calc(100vh-4rem)] bg-surface border-r border-border z-sidebar overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading-semibold text-text-primary">Filters</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary-700 transition-smooth"
            >
              Clear All
            </button>
            <button
              onClick={onToggle}
              className="p-1 rounded-button hover:bg-secondary-100 transition-smooth"
              title="Close Filters"
            >
              <Icon name="X" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <h3 className="text-sm font-heading-medium text-text-primary mb-3">Date Range</h3>
          <div className="space-y-2">
            {quickDateRanges.map((range) => (
              <button
                key={range.days}
                onClick={() => handleDateRangeChange({
                  start: startOfDay(subDays(new Date(), range.days)),
                  end: endOfDay(new Date())
                })}
                className="w-full text-left px-3 py-2 text-sm rounded-button hover:bg-secondary-100 transition-smooth text-text-secondary"
              >
                {range.label}
              </button>
            ))}
          </div>
          
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-heading-medium text-text-secondary mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={format(localFilters.dateRange.start, 'yyyy-MM-dd')}
                onChange={(e) => handleDateRangeChange({
                  ...localFilters.dateRange,
                  start: startOfDay(new Date(e.target.value))
                })}
                className="w-full px-3 py-2 text-sm border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-heading-medium text-text-secondary mb-1">
                End Date
              </label>
              <input
                type="date"
                value={format(localFilters.dateRange.end, 'yyyy-MM-dd')}
                onChange={(e) => handleDateRangeChange({
                  ...localFilters.dateRange,
                  end: endOfDay(new Date(e.target.value))
                })}
                className="w-full px-3 py-2 text-sm border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-heading-medium text-text-primary mb-3">Severity Level</h3>
          <div className="space-y-2">
            {severityOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="severity"
                  value={option.value}
                  checked={localFilters.severity === option.value}
                  onChange={() => handleSeverityChange(option.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className={`text-sm ${option.color}`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Types */}
        <div className="mb-6">
          <h3 className="text-sm font-heading-medium text-text-primary mb-3">Action Types</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uniqueActionTypes.map((actionType) => (
              <label key={actionType} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.actionTypes.includes(actionType)}
                  onChange={() => handleFilterToggle('actionTypes', actionType)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">{actionType}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Users */}
        <div className="mb-6">
          <h3 className="text-sm font-heading-medium text-text-primary mb-3">Users</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uniqueUsers.map((user) => (
              <label key={user} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.users.includes(user)}
                  onChange={() => handleFilterToggle('users', user)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-secondary truncate" title={user}>
                  {user.split('@')[0]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Compliance Frameworks */}
        <div className="mb-6">
          <h3 className="text-sm font-heading-medium text-text-primary mb-3">Compliance Frameworks</h3>
          <div className="space-y-2">
            {uniqueComplianceTags.map((tag) => (
              <label key={tag} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.complianceFrameworks.includes(tag)}
                  onChange={() => handleFilterToggle('complianceFrameworks', tag)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Saved Searches */}
        <div className="mb-6">
          <h3 className="text-sm font-heading-medium text-text-primary mb-3">Saved Searches</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm rounded-button hover:bg-secondary-100 transition-smooth text-text-secondary">
              SOX Compliance Review
            </button>
            <button className="w-full text-left px-3 py-2 text-sm rounded-button hover:bg-secondary-100 transition-smooth text-text-secondary">
              Critical Security Events
            </button>
            <button className="w-full text-left px-3 py-2 text-sm rounded-button hover:bg-secondary-100 transition-smooth text-text-secondary">
              Budget Threshold Alerts
            </button>
          </div>
          <button className="w-full mt-2 px-3 py-2 text-sm border border-dashed border-border rounded-button hover:bg-secondary-50 transition-smooth text-text-secondary">
            + Save Current Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;