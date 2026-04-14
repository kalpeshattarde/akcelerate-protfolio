import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ActivityFilters = ({ onFiltersChange, totalActivities }) => {
  const [filters, setFilters] = useState({
    activityType: '',
    dateRange: 'week',
    calorieRange: [0, 1000],
    searchQuery: ''
  });

  const activityTypeOptions = [
    { value: '', label: 'All Activities' },
    { value: 'walking', label: 'Walking' },
    { value: 'running', label: 'Running' },
    { value: 'cycling', label: 'Cycling' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'yoga', label: 'Yoga' },
    { value: 'strength', label: 'Strength Training' },
    { value: 'cardio', label: 'Cardio' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      activityType: '',
      dateRange: 'week',
      calorieRange: [0, 1000],
      searchQuery: ''
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = filters?.activityType || filters?.searchQuery || filters?.calorieRange?.[0] > 0 || filters?.calorieRange?.[1] < 1000;

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 border border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Activity Filters</h3>
            <p className="text-sm text-muted-foreground">
              {totalActivities} activities found
            </p>
          </div>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-1">
          <Input
            type="search"
            placeholder="Search activities..."
            value={filters?.searchQuery}
            onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Activity Type */}
        <div className="lg:col-span-1">
          <Select
            placeholder="Activity Type"
            options={activityTypeOptions}
            value={filters?.activityType}
            onChange={(value) => handleFilterChange('activityType', value)}
          />
        </div>

        {/* Date Range */}
        <div className="lg:col-span-1">
          <Select
            placeholder="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
        </div>

        {/* Calorie Range */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Calorie Range: {filters?.calorieRange?.[0]} - {filters?.calorieRange?.[1]}
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters?.calorieRange?.[0]}
                onChange={(e) => handleFilterChange('calorieRange', [parseInt(e?.target?.value), filters?.calorieRange?.[1]])}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={filters?.calorieRange?.[1]}
                onChange={(e) => handleFilterChange('calorieRange', [filters?.calorieRange?.[0], parseInt(e?.target?.value)])}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border/40">
          <div className="flex flex-wrap gap-2">
            {filters?.activityType && (
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Type: {activityTypeOptions?.find(opt => opt?.value === filters?.activityType)?.label}</span>
                <button
                  onClick={() => handleFilterChange('activityType', '')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            {filters?.searchQuery && (
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                <span>Search: "{filters?.searchQuery}"</span>
                <button
                  onClick={() => handleFilterChange('searchQuery', '')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            {(filters?.calorieRange?.[0] > 0 || filters?.calorieRange?.[1] < 1000) && (
              <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                <span>Calories: {filters?.calorieRange?.[0]}-{filters?.calorieRange?.[1]}</span>
                <button
                  onClick={() => handleFilterChange('calorieRange', [0, 1000])}
                  className="hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityFilters;