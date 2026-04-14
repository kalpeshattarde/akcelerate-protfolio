import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VendorFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  onExport,
  totalVendors,
  filteredCount 
}) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Professional Services', label: 'Professional Services' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Facilities', label: 'Facilities' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Financial', label: 'Financial' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const performanceOptions = [
    { value: '', label: 'All Performance' },
    { value: '90-100', label: 'Excellent (90-100%)' },
    { value: '75-89', label: 'Good (75-89%)' },
    { value: '60-74', label: 'Average (60-74%)' },
    { value: '0-59', label: 'Poor (0-59%)' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'North America', label: 'North America' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Asia Pacific', label: 'Asia Pacific' },
    { value: 'Latin America', label: 'Latin America' },
    { value: 'Middle East', label: 'Middle East' },
    { value: 'Africa', label: 'Africa' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-text-primary">Filter Vendors</h3>
          <span className="text-sm text-muted-foreground">
            ({filteredCount} of {totalVendors} vendors)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconSize={14}
            >
              Clear Filters
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconSize={14}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search vendors..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        <Select
          placeholder="Select category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />

        <Select
          placeholder="Select status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          placeholder="Select location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => handleFilterChange('location', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          placeholder="Performance range"
          options={performanceOptions}
          value={filters?.performance}
          onChange={(value) => handleFilterChange('performance', value)}
        />

        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min spend"
            value={filters?.minSpend}
            onChange={(e) => handleFilterChange('minSpend', e?.target?.value)}
            className="flex-1"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max spend"
            value={filters?.maxSpend}
            onChange={(e) => handleFilterChange('maxSpend', e?.target?.value)}
            className="flex-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min contracts"
            value={filters?.minContracts}
            onChange={(e) => handleFilterChange('minContracts', e?.target?.value)}
            className="flex-1"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max contracts"
            value={filters?.maxContracts}
            onChange={(e) => handleFilterChange('maxContracts', e?.target?.value)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default VendorFilters;