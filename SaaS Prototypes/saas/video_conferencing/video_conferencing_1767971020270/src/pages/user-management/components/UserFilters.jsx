import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UserFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onSearch,
  searchTerm,
  onSearchChange 
}) => {
  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const activityOptions = [
    { value: '', label: 'All Activity' },
    { value: 'today', label: 'Active Today' },
    { value: 'week', label: 'Active This Week' },
    { value: 'month', label: 'Active This Month' },
    { value: 'never', label: 'Never Logged In' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '') || searchTerm !== '';

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search users by name, email, or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
        <Select
          label="Role"
          options={roleOptions}
          value={filters?.role}
          onChange={(value) => onFilterChange('role', value)}
          className="w-full"
        />

        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => onFilterChange('department', value)}
          className="w-full"
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          className="w-full"
        />

        <Select
          label="Activity"
          options={activityOptions}
          value={filters?.activity}
          onChange={(value) => onFilterChange('activity', value)}
          className="w-full"
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="w-full"
          >
            <Icon name="X" size={16} className="mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {Object.entries(filters)?.map(([key, value]) => {
            if (!value) return null;
            
            const getLabel = (key, value) => {
              const option = {
                role: roleOptions,
                department: departmentOptions,
                status: statusOptions,
                activity: activityOptions
              }?.[key]?.find(opt => opt?.value === value);
              
              return option ? `${key}: ${option?.label}` : `${key}: ${value}`;
            };

            return (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
              >
                {getLabel(key, value)}
                <button
                  onClick={() => onFilterChange(key, '')}
                  className="ml-1 hover:text-accent/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserFilters;