import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilters = ({ activeFilters, onFilterChange, onClearAll }) => {
  const filterOptions = [
    { id: 'my-contracts', label: 'My Contracts', icon: 'User', count: 23 },
    { id: 'team-contracts', label: 'Team Contracts', icon: 'Users', count: 156 },
    { id: 'critical-items', label: 'Critical Items', icon: 'AlertTriangle', count: 8 },
    { id: 'pending-approval', label: 'Pending Approval', icon: 'Clock', count: 12 },
    { id: 'expiring-soon', label: 'Expiring Soon', icon: 'Calendar', count: 5 },
    { id: 'high-value', label: 'High Value', icon: 'DollarSign', count: 34 }
  ];

  const handleFilterToggle = (filterId) => {
    const newFilters = activeFilters?.includes(filterId)
      ? activeFilters?.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">Quick Filters</h3>
        {activeFilters?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            iconName="X"
            iconSize={14}
            className="text-muted-foreground hover:text-text-primary"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {filterOptions?.map((filter) => {
          const isActive = activeFilters?.includes(filter?.id);
          return (
            <button
              key={filter?.id}
              onClick={() => handleFilterToggle(filter?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-smooth border ${
                isActive 
                  ? 'bg-primary text-primary-foreground border-primary shadow-soft' 
                  : 'bg-surface text-text-primary border-border hover:bg-muted hover:border-accent'
              }`}
            >
              <Icon 
                name={filter?.icon} 
                size={14} 
                className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
              <span>{filter?.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                isActive 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {filter?.count}
              </span>
            </button>
          );
        })}
      </div>
      {activeFilters?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={14} />
            <span>
              {activeFilters?.length} filter{activeFilters?.length !== 1 ? 's' : ''} active
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFilters;