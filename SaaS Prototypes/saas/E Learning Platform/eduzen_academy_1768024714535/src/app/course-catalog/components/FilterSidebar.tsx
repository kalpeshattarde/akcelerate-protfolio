'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterSidebarProps {
  filters: {
    categories: FilterOption[];
    levels: FilterOption[];
    durations: FilterOption[];
    formats: FilterOption[];
    priceRanges: FilterOption[];
  };
  selectedFilters: {
    categories: string[];
    levels: string[];
    durations: string[];
    formats: string[];
    priceRanges: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearAll: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const FilterSidebar = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  isMobileOpen,
  onMobileClose,
}: FilterSidebarProps) => {
  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  const FilterSection = ({
    title,
    options,
    filterType,
  }: {
    title: string;
    options: FilterOption[];
    filterType: keyof typeof selectedFilters;
  }) => (
    <div className="mb-6">
      <h3 className="text-sm font-headline font-semibold text-foreground mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-3 cursor-pointer group hover:bg-muted/50 p-2 rounded-lg transition-colors duration-200"
          >
            <input
              type="checkbox"
              checked={selectedFilters[filterType].includes(option.id)}
              onChange={() => onFilterChange(filterType, option.id)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary/20 cursor-pointer"
            />
            <span className="flex-1 text-sm font-body text-foreground group-hover:text-primary transition-colors duration-200">
              {option.label}
            </span>
            {option.count !== undefined && (
              <span className="text-xs font-body text-muted-foreground">({option.count})</span>
            )}
          </label>
        ))}
      </div>
    </div>
  );

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h2 className="text-lg font-headline font-semibold text-foreground">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-sm font-body text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1 text-foreground hover:text-primary transition-colors duration-200"
            aria-label="Close filters"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <FilterSection title="Category" options={filters.categories} filterType="categories" />
        <FilterSection title="Skill Level" options={filters.levels} filterType="levels" />
        <FilterSection title="Duration" options={filters.durations} filterType="durations" />
        <FilterSection title="Learning Format" options={filters.formats} filterType="formats" />
        <FilterSection title="Price Range" options={filters.priceRanges} filterType="priceRanges" />
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden lg:block w-80 bg-card rounded-2xl border border-border p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-80 bg-card shadow-2xl overflow-y-auto p-6">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;