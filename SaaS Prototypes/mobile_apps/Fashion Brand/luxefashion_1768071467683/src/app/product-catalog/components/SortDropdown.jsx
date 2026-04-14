'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  const currentOption = sortOptions?.find(option => option?.value === currentSort);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-colors btn-press"
        aria-label="Sort options"
      >
        <span className="text-sm font-semibold">
          Sort: {currentOption?.label}
        </span>
        <Icon 
          name="ChevronDownIcon" 
          size={16} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-dropdown"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border shadow-elevation-2 z-dropdown animate-fade-in">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSortSelect(option?.value)}
                className={`
                  w-full text-left px-4 py-3 text-sm transition-colors
                  ${currentSort === option?.value
                    ? 'bg-accent text-accent-foreground font-semibold'
                    : 'text-popover-foreground hover:bg-muted hover:text-accent'
                  }
                `}
              >
                {option?.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

SortDropdown.propTypes = {
  currentSort: PropTypes?.string?.isRequired,
  onSortChange: PropTypes?.func?.isRequired
};

export default SortDropdown;