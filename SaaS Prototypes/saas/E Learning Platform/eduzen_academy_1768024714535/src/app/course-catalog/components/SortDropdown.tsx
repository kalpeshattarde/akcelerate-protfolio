'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SortOption {
  id: string;
  label: string;
}

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (sortId: string) => void;
  options: SortOption[];
}

const SortDropdown = ({ sortBy, onSortChange, options }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.id === sortBy);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 font-body text-sm text-foreground"
      >
        <Icon name="AdjustmentsHorizontalIcon" size={18} />
        <span>Sort: {selectedOption?.label}</span>
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-10">
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSortChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors duration-200 text-left ${
                  sortBy === option.id
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                }`}
              >
                <span className="font-body text-sm">{option.label}</span>
                {sortBy === option.id && <Icon name="CheckIcon" size={16} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;