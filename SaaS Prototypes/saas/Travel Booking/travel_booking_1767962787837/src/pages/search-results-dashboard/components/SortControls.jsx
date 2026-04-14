import React from 'react';
import Icon from 'components/AppIcon';

const SortControls = ({ sortBy, onSortChange, resultCount, isLoading }) => {
  const sortOptions = [
    { id: 'price', label: 'Best Price', icon: 'DollarSign' },
    { id: 'duration', label: 'Shortest Duration', icon: 'Clock' },
    { id: 'eco-score', label: 'Eco-Friendly', icon: 'Leaf' },
    { id: 'rating', label: 'Highest Rated', icon: 'Star' },
    { id: 'departure', label: 'Departure Time', icon: 'Plane' },
    { id: 'recommended', label: 'Recommended', icon: 'ThumbsUp' }
  ];

  const viewOptions = [
    { id: 'list', icon: 'List' },
    { id: 'grid', icon: 'Grid3X3' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Icon name="Loader2" size={16} className="animate-spin text-primary" />
            ) : (
              <Icon name="Search" size={16} className="text-text-secondary" />
            )}
            <span className="text-sm text-text-secondary">
              {isLoading ? 'Searching...' : `${resultCount} packages found`}
            </span>
          </div>
          
          {!isLoading && resultCount > 0 && (
            <div className="flex items-center space-x-2">
              <Icon name="TrendingDown" size={16} className="text-success" />
              <span className="text-sm text-success font-body-medium">
                Best deals available
              </span>
            </div>
          )}
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary hidden sm:block">Sort by:</span>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onSortChange(option.id)}
                  disabled={isLoading}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-body-medium transition-all duration-200 ease-out ${
                    sortBy === option.id
                      ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-primary'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Icon name={option.icon} size={14} />
                  <span className="hidden sm:inline">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            {viewOptions.map((view) => (
              <button
                key={view.id}
                className="p-2 text-text-secondary hover:text-primary hover:bg-secondary-100 transition-all duration-200 ease-out"
                title={`${view.id} view`}
              >
                <Icon name={view.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-text-secondary">Active filters:</span>
          
          {/* Sample active filters - these would be dynamic based on actual filters */}
          <div className="flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary rounded-full text-xs">
            <span>Price: $500-$2000</span>
            <button className="hover:text-primary-700">
              <Icon name="X" size={12} />
            </button>
          </div>
          
          <div className="flex items-center space-x-1 px-2 py-1 bg-primary-100 text-primary rounded-full text-xs">
            <span>4+ Star Hotels</span>
            <button className="hover:text-primary-700">
              <Icon name="X" size={12} />
            </button>
          </div>
          
          <button className="text-xs text-primary hover:text-primary-700 transition-colors duration-200 ease-out">
            Clear all filters
          </button>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-text-secondary">Quick filters:</span>
          
          {[
            { label: 'Non-stop flights', icon: 'Plane' },
            { label: 'Free cancellation', icon: 'Shield' },
            { label: 'Breakfast included', icon: 'Coffee' },
            { label: 'Free WiFi', icon: 'Wifi' },
            { label: 'Eco-friendly', icon: 'Leaf' }
          ].map((filter) => (
            <button
              key={filter.label}
              className="flex items-center space-x-1 px-3 py-1 bg-secondary-100 text-text-secondary rounded-full text-xs hover:bg-secondary-200 hover:text-primary transition-all duration-200 ease-out"
            >
              <Icon name={filter.icon} size={12} />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortControls;