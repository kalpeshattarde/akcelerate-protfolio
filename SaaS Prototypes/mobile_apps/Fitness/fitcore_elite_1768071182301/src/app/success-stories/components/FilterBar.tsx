'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  transformationType: string;
  timeline: string;
  demographics: string;
  searchTerm: string;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    transformationType: 'all',
    timeline: 'all',
    demographics: 'all',
    searchTerm: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const transformationTypes = [
    { value: 'all', label: 'All Transformations' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'strength', label: 'Strength Building' },
    { value: 'endurance', label: 'Endurance' },
    { value: 'athletic', label: 'Athletic Performance' },
    { value: 'rehabilitation', label: 'Rehabilitation' }
  ];

  const timelines = [
    { value: 'all', label: 'All Timeframes' },
    { value: '3-months', label: '3 Months' },
    { value: '6-months', label: '6 Months' },
    { value: '1-year', label: '1 Year' },
    { value: '2-years', label: '2+ Years' }
  ];

  const demographics = [
    { value: 'all', label: 'All Ages' },
    { value: '20s', label: '20-29 Years' },
    { value: '30s', label: '30-39 Years' },
    { value: '40s', label: '40-49 Years' },
    { value: '50plus', label: '50+ Years' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      transformationType: 'all',
      timeline: 'all',
      demographics: 'all',
      searchTerm: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = filters.transformationType !== 'all' || 
                          filters.timeline !== 'all' || 
                          filters.demographics !== 'all' || 
                          filters.searchTerm !== '';

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground break-words overflow-wrap-anywhere">
          Filter Success Stories
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
        >
          <span className="text-sm break-words">Filters</span>
          <Icon 
            name={isExpanded ? "ChevronUpIcon" : "ChevronDownIcon"} 
            size={16} 
          />
        </button>
      </div>

      <div className={`space-y-3 sm:space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Search Bar */}
        <div className="relative">
          <Icon 
            name="MagnifyingGlassIcon" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search by name, goal, or achievement..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 text-sm sm:text-base break-words overflow-wrap-anywhere"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Transformation Type */}
          <div className="min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2 break-words overflow-wrap-anywhere">
              Transformation Type
            </label>
            <select
              value={filters.transformationType}
              onChange={(e) => handleFilterChange('transformationType', e.target.value)}
              className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 text-sm sm:text-base break-words overflow-wrap-anywhere"
            >
              {transformationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timeline */}
          <div className="min-w-0">
            <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2 break-words overflow-wrap-anywhere">
              Timeline
            </label>
            <select
              value={filters.timeline}
              onChange={(e) => handleFilterChange('timeline', e.target.value)}
              className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 text-sm sm:text-base break-words overflow-wrap-anywhere"
            >
              {timelines.map((timeline) => (
                <option key={timeline.value} value={timeline.value}>
                  {timeline.label}
                </option>
              ))}
            </select>
          </div>

          {/* Demographics */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2 break-words overflow-wrap-anywhere">
              Age Group
            </label>
            <select
              value={filters.demographics}
              onChange={(e) => handleFilterChange('demographics', e.target.value)}
              className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 text-sm sm:text-base break-words overflow-wrap-anywhere"
            >
              {demographics.map((demo) => (
                <option key={demo.value} value={demo.value}>
                  {demo.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 break-words overflow-wrap-anywhere"
            >
              <Icon name="XMarkIcon" size={14} />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;