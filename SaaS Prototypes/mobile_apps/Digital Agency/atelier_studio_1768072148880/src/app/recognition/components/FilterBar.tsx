'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterBarProps {
  categories: string[];
  years: number[];
  onFilterChange: (category: string, year: number | null) => void;
}

const FilterBar = ({ categories, years, onFilterChange }: FilterBarProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange(category, selectedYear);
  };

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
    onFilterChange(selectedCategory, year);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full font-cta text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary text-background' :'bg-muted/50 text-text-secondary hover:bg-muted hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full font-cta text-sm font-semibold text-text-secondary hover:bg-muted hover:text-foreground transition-all duration-300"
        >
          {selectedYear || 'All Years'}
          <Icon 
            name="ChevronDownIcon" 
            size={16} 
            className={`transition-transform duration-300 ${isYearDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isYearDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-40 bg-surface/95 backdrop-blur-sm border border-border rounded-lg shadow-dramatic overflow-hidden z-10">
            <button
              onClick={() => handleYearChange(null)}
              className="w-full px-4 py-2 text-left font-cta text-sm text-foreground hover:bg-muted/50 transition-colors duration-300"
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className="w-full px-4 py-2 text-left font-cta text-sm text-foreground hover:bg-muted/50 transition-colors duration-300"
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;