'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  if (!isHydrated) {
    return (
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search insights..."
          className="w-full px-6 py-3 pl-12 bg-surface border border-border rounded-md font-body text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          disabled
        />
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search insights..."
        className="w-full px-6 py-3 pl-12 bg-surface border border-border rounded-md font-body text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
      />
      <Icon
        name="MagnifyingGlassIcon"
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
      />
    </form>
  );
};

export default SearchBar;