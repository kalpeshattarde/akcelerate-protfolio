'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOptions {
  specializations: string[];
  availability: string[];
  experience: string[];
  rating: string[];
}

interface TrainerFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const TrainerFilters = ({ onFiltersChange }: TrainerFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    specialization: '',
    availability: '',
    experience: '',
    rating: '',
    search: ''
  });

  const filterOptions: FilterOptions = {
    specializations: ['Strength Training', 'Weight Loss', 'Muscle Building', 'Cardio', 'Flexibility', 'Sports Performance', 'Rehabilitation', 'Nutrition'],
    availability: ['Available', 'Busy', 'All'],
    experience: ['1-3 years', '4-7 years', '8-12 years', '13+ years'],
    rating: ['4.5+', '4.0+', '3.5+', 'All']
  };

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      specialization: '',
      availability: '',
      experience: '',
      rating: '',
      search: ''
    };
    setActiveFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== '');

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="FunnelIcon" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Trainers</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors duration-200"
          >
            <Icon name={isExpanded ? "ChevronUpIcon" : "ChevronDownIcon"} size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search trainers by name or expertise..."
            value={activeFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
          />
        </div>
      </div>

      {/* Filter Options */}
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Specialization Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Specialization</label>
            <select
              value={activeFilters.specialization}
              onChange={(e) => handleFilterChange('specialization', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              <option value="">All Specializations</option>
              {filterOptions.specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Availability</label>
            <select
              value={activeFilters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              <option value="">All Status</option>
              {filterOptions.availability.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Experience</label>
            <select
              value={activeFilters.experience}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              <option value="">All Experience</option>
              {filterOptions.experience.map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Rating</label>
            <select
              value={activeFilters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
            >
              <option value="">All Ratings</option>
              {filterOptions.rating.map((rating) => (
                <option key={rating} value={rating}>{rating} Stars</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {Object.entries(activeFilters).map(([key, value]) => {
              if (!value) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="hover:text-primary/80 transition-colors duration-200"
                  >
                    <Icon name="XMarkIcon" size={14} />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerFilters;