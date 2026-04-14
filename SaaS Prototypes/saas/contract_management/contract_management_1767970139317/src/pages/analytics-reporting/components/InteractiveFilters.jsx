import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const InteractiveFilters = ({ onFiltersChange, savedViews, onSaveView, onLoadView }) => {
  const [activeFilters, setActiveFilters] = useState({
    dateRange: '30d',
    contractTypes: [],
    departments: [],
    vendors: [],
    statuses: [],
    valueRange: { min: '', max: '' },
    regions: [],
    customFilters: []
  });

  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [isSaveViewOpen, setIsSaveViewOpen] = useState(false);
  const [newViewName, setNewViewName] = useState('');
  const [quickFilters, setQuickFilters] = useState([]);

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '6m', label: 'Last 6 months' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const contractTypeOptions = [
    { value: 'service', label: 'Service Agreement' },
    { value: 'software', label: 'Software License' },
    { value: 'maintenance', label: 'Maintenance Contract' },
    { value: 'consulting', label: 'Consulting Agreement' },
    { value: 'nda', label: 'Non-Disclosure Agreement' },
    { value: 'employment', label: 'Employment Contract' }
  ];

  const departmentOptions = [
    { value: 'it', label: 'Information Technology' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'legal', label: 'Legal' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operations' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'expired', label: 'Expired' },
    { value: 'terminated', label: 'Terminated' },
    { value: 'draft', label: 'Draft' },
    { value: 'under_review', label: 'Under Review' }
  ];

  const regionOptions = [
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'latin_america', label: 'Latin America' },
    { value: 'middle_east', label: 'Middle East' },
    { value: 'africa', label: 'Africa' }
  ];

  const vendorOptions = [
    { value: 'microsoft', label: 'Microsoft Corporation' },
    { value: 'oracle', label: 'Oracle Corporation' },
    { value: 'salesforce', label: 'Salesforce Inc.' },
    { value: 'aws', label: 'Amazon Web Services' },
    { value: 'google', label: 'Google LLC' },
    { value: 'ibm', label: 'IBM Corporation' }
  ];

  useEffect(() => {
    onFiltersChange(activeFilters);
  }, [activeFilters, onFiltersChange]);

  useEffect(() => {
    // Set up quick filters based on common use cases
    setQuickFilters([
      {
        id: 'expiring_soon',
        label: 'Expiring Soon',
        icon: 'Clock',
        filters: { dateRange: '30d', statuses: ['active'] }
      },
      {
        id: 'high_value',
        label: 'High Value Contracts',
        icon: 'DollarSign',
        filters: { valueRange: { min: '100000', max: '' } }
      },
      {
        id: 'pending_approval',
        label: 'Pending Approval',
        icon: 'AlertCircle',
        filters: { statuses: ['pending'] }
      },
      {
        id: 'software_licenses',
        label: 'Software Licenses',
        icon: 'Monitor',
        filters: { contractTypes: ['software'] }
      }
    ]);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleMultiSelectChange = (filterType, option) => {
    setActiveFilters(prev => {
      const currentValues = prev?.[filterType] || [];
      const isSelected = currentValues?.includes(option?.value);
      
      return {
        ...prev,
        [filterType]: isSelected
          ? currentValues?.filter(v => v !== option?.value)
          : [...currentValues, option?.value]
      };
    });
  };

  const handleQuickFilter = (quickFilter) => {
    setActiveFilters(prev => ({
      ...prev,
      ...quickFilter?.filters
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      dateRange: '30d',
      contractTypes: [],
      departments: [],
      vendors: [],
      statuses: [],
      valueRange: { min: '', max: '' },
      regions: [],
      customFilters: []
    });
  };

  const handleSaveView = () => {
    if (newViewName?.trim()) {
      const view = {
        id: Date.now(),
        name: newViewName,
        filters: activeFilters,
        createdAt: new Date()?.toISOString()
      };
      onSaveView(view);
      setNewViewName('');
      setIsSaveViewOpen(false);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters?.contractTypes?.length > 0) count++;
    if (activeFilters?.departments?.length > 0) count++;
    if (activeFilters?.vendors?.length > 0) count++;
    if (activeFilters?.statuses?.length > 0) count++;
    if (activeFilters?.regions?.length > 0) count++;
    if (activeFilters?.valueRange?.min || activeFilters?.valueRange?.max) count++;
    if (activeFilters?.dateRange !== '30d') count++;
    return count;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-accent" />
          <h3 className="font-medium text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdvancedMode(!isAdvancedMode)}
            iconName={isAdvancedMode ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {isAdvancedMode ? 'Simple' : 'Advanced'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Quick Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Quick Filters</h4>
          <div className="flex flex-wrap gap-2">
            {quickFilters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => handleQuickFilter(filter)}
                className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-accent/10 border border-border hover:border-accent rounded-lg transition-colors text-sm"
              >
                <Icon name={filter?.icon} size={14} />
                <span>{filter?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Views */}
        {savedViews && savedViews?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary">Saved Views</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSaveViewOpen(true)}
                iconName="Save"
                iconPosition="left"
              >
                Save Current
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {savedViews?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => onLoadView(view)}
                  className="flex items-center space-x-2 px-3 py-2 bg-muted hover:bg-accent/10 border border-border hover:border-accent rounded-lg transition-colors text-sm"
                >
                  <Icon name="Bookmark" size={14} />
                  <span>{view?.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Basic Filters */}
        <div className="grid grid-cols-3 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={activeFilters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Contract Types</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {contractTypeOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={activeFilters?.contractTypes?.includes(option?.value)}
                  onChange={() => handleMultiSelectChange('contractTypes', option)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Status</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {statusOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={activeFilters?.statuses?.includes(option?.value)}
                  onChange={() => handleMultiSelectChange('statuses', option)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {isAdvancedMode && (
          <div className="space-y-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Departments</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {departmentOptions?.map((option) => (
                    <Checkbox
                      key={option?.value}
                      label={option?.label}
                      checked={activeFilters?.departments?.includes(option?.value)}
                      onChange={() => handleMultiSelectChange('departments', option)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Regions</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {regionOptions?.map((option) => (
                    <Checkbox
                      key={option?.value}
                      label={option?.label}
                      checked={activeFilters?.regions?.includes(option?.value)}
                      onChange={() => handleMultiSelectChange('regions', option)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Vendors</label>
              <div className="grid grid-cols-3 gap-2">
                {vendorOptions?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={activeFilters?.vendors?.includes(option?.value)}
                    onChange={() => handleMultiSelectChange('vendors', option)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-text-primary">Contract Value Range</label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Minimum value"
                  value={activeFilters?.valueRange?.min}
                  onChange={(e) => handleFilterChange('valueRange', {
                    ...activeFilters?.valueRange,
                    min: e?.target?.value
                  })}
                />
                <Input
                  type="number"
                  placeholder="Maximum value"
                  value={activeFilters?.valueRange?.max}
                  onChange={(e) => handleFilterChange('valueRange', {
                    ...activeFilters?.valueRange,
                    max: e?.target?.value
                  })}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Save View Modal */}
      {isSaveViewOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300">
          <div className="bg-surface border border-border rounded-lg shadow-elevated w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-medium text-text-primary">Save Filter View</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSaveViewOpen(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <Input
                label="View Name"
                placeholder="Enter a name for this filter view"
                value={newViewName}
                onChange={(e) => setNewViewName(e?.target?.value)}
                required
              />
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsSaveViewOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveView}
                  disabled={!newViewName?.trim()}
                >
                  Save View
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveFilters;