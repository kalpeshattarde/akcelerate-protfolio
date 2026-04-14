'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'course' | 'instructor' | 'topic';
}

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  suggestions: SearchSuggestion[];
}

const SearchBar = ({ searchQuery, onSearchChange, suggestions }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSearchChange(suggestion.text);
    setShowSuggestions(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return 'AcademicCapIcon';
      case 'instructor':
        return 'UserIcon';
      case 'topic':
        return 'TagIcon';
      default:
        return 'MagnifyingGlassIcon';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div
        className={`relative flex items-center bg-card border-2 rounded-2xl transition-all duration-300 ${
          isFocused ? 'border-primary shadow-lg' : 'border-border'
        }`}
      >
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          className="absolute left-4 text-muted-foreground"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Search courses, instructors, or topics..."
          className="w-full pl-12 pr-12 py-4 bg-transparent font-body text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange('');
              setShowSuggestions(false);
            }}
            className="absolute right-4 p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Clear search"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        )}
      </div>

      {showSuggestions && searchQuery && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-10">
          <div className="p-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted rounded-lg transition-colors duration-200 text-left"
              >
                <Icon
                  name={getTypeIcon(suggestion.type)}
                  size={18}
                  className="text-muted-foreground"
                />
                <span className="flex-1 font-body text-sm text-foreground">{suggestion.text}</span>
                <span className="text-xs font-body text-muted-foreground capitalize">
                  {suggestion.type}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;