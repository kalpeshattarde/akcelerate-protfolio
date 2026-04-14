'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterBarProps {
  categories: string[];
  industries: string[];
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string;
  industry: string;
  searchQuery: string;
}

const FilterBar = ({ categories, industries, onFilterChange }: FilterBarProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    industry: 'All',
    searchQuery: '',
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      onFilterChange(filters);
    }
  }, [filters, isHydrated, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleIndustryChange = (industry: string) => {
    setFilters(prev => ({ ...prev, industry }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      industry: 'All',
      searchQuery: '',
    });
  };

  if (!isHydrated) {
    return (
      <div className="sticky top-20 z-50 bg-background border-b border-border/30 py-6">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="h-12 bg-muted/20 rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  const hasActiveFilters = filters.category !== 'All' || filters.industry !== 'All' || filters.searchQuery !== '';

  return (
    <div className="sticky top-20 z-50 bg-background border-b border-border/30 py-6">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className={`relative transition-all duration-300 ${
              isSearchFocused ? 'scale-105' : 'scale-100'
            }`}>
              <Icon
                name="MagnifyingGlassIcon"
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search projects, clients, or keywords..."
                value={filters.searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-4 py-3 bg-muted/30 border border-border/50 rounded-md font-body text-sm text-foreground placeholder:text-text-secondary focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <div className="relative group">
              <button className="px-4 py-3 bg-muted/30 border border-border/50 rounded-md font-cta text-sm text-foreground hover:border-primary/50 transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-between">
                <span className="truncate">{filters.category}</span>
                <Icon name="ChevronDownIcon" size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-48 bg-surface/95 backdrop-blur-[20px] border border-border rounded-md shadow-dramatic opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`block w-full text-left px-4 py-3 font-cta text-sm transition-colors duration-300 first:rounded-t-md last:rounded-b-md ${
                      filters.category === category
                        ? 'bg-primary/20 text-primary' :'text-foreground/80 hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="relative group">
              <button className="px-4 py-3 bg-muted/30 border border-border/50 rounded-md font-cta text-sm text-foreground hover:border-primary/50 transition-all duration-300 flex items-center gap-2 min-w-[140px] justify-between">
                <span className="truncate">{filters.industry}</span>
                <Icon name="ChevronDownIcon" size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-48 bg-surface/95 backdrop-blur-[20px] border border-border rounded-md shadow-dramatic opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 max-h-64 overflow-y-auto">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => handleIndustryChange(industry)}
                    className={`block w-full text-left px-4 py-3 font-cta text-sm transition-colors duration-300 first:rounded-t-md last:rounded-b-md ${
                      filters.industry === industry
                        ? 'bg-primary/20 text-primary' :'text-foreground/80 hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-destructive/20 border border-destructive/30 rounded-md font-cta text-sm text-destructive hover:bg-destructive/30 transition-all duration-300 flex items-center gap-2"
              >
                <Icon name="XMarkIcon" size={16} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;