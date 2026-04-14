import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const qualityOptions = [
    { value: '', label: 'All Qualities' },
    { value: 'HD', label: 'HD (1080p)' },
    { value: 'SD', label: 'SD (720p)' },
    { value: 'Low', label: 'Low (480p)' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'duration-desc', label: 'Longest First' },
    { value: 'duration-asc', label: 'Shortest First' },
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' }
  ];

  const organizerOptions = [
    { value: '', label: 'All Organizers' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'alex-brown', label: 'Alex Brown' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return filters?.search || filters?.organizer || filters?.quality || 
           filters?.dateFrom || filters?.dateTo || filters?.hasTranscription;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Search Bar and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search recordings by title, organizer, or participants..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort and Filter Toggle */}
        <div className="flex items-center space-x-2">
          <Select
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            placeholder="Sort by"
            className="w-40"
          />
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filters
          </Button>

          {hasActiveFilters() && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={filters?.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
                  placeholder="From date"
                />
                <Input
                  type="date"
                  value={filters?.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
                  placeholder="To date"
                />
              </div>
            </div>

            {/* Organizer */}
            <div>
              <Select
                label="Organizer"
                options={organizerOptions}
                value={filters?.organizer}
                onChange={(value) => handleFilterChange('organizer', value)}
                searchable
              />
            </div>

            {/* Quality */}
            <div>
              <Select
                label="Video Quality"
                options={qualityOptions}
                value={filters?.quality}
                onChange={(value) => handleFilterChange('quality', value)}
              />
            </div>

            {/* Additional Filters */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Additional Options</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters?.hasTranscription}
                    onChange={(e) => handleFilterChange('hasTranscription', e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span>Has Transcription</span>
                </label>
                
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters?.isShared}
                    onChange={(e) => handleFilterChange('isShared', e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span>Shared Recordings</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;