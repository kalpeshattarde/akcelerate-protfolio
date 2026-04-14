import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ onFiltersChange, appliedFilters = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    contractTypes: true,
    status: true,
    departments: false,
    vendors: false,
    dateRange: false,
    value: false
  });

  const filterData = {
    contractTypes: [
      { id: 'service', label: 'Service Agreements', count: 1247 },
      { id: 'procurement', label: 'Procurement Contracts', count: 892 },
      { id: 'employment', label: 'Employment Contracts', count: 634 },
      { id: 'nda', label: 'Non-Disclosure Agreements', count: 523 },
      { id: 'licensing', label: 'Licensing Agreements', count: 387 },
      { id: 'partnership', label: 'Partnership Agreements', count: 245 },
      { id: 'lease', label: 'Lease Agreements', count: 156 },
      { id: 'maintenance', label: 'Maintenance Contracts', count: 134 }
    ],
    status: [
      { id: 'active', label: 'Active', count: 2156, color: 'text-success' },
      { id: 'pending', label: 'Pending Approval', count: 423, color: 'text-warning' },
      { id: 'draft', label: 'Draft', count: 287, color: 'text-muted-foreground' },
      { id: 'expired', label: 'Expired', count: 198, color: 'text-error' },
      { id: 'terminated', label: 'Terminated', count: 156, color: 'text-error' },
      { id: 'renewal', label: 'Up for Renewal', count: 98, color: 'text-accent' }
    ],
    departments: [
      { id: 'it', label: 'Information Technology', count: 567 },
      { id: 'hr', label: 'Human Resources', count: 445 },
      { id: 'finance', label: 'Finance & Accounting', count: 389 },
      { id: 'legal', label: 'Legal Department', count: 334 },
      { id: 'operations', label: 'Operations', count: 298 },
      { id: 'marketing', label: 'Marketing & Sales', count: 267 },
      { id: 'procurement', label: 'Procurement', count: 234 },
      { id: 'facilities', label: 'Facilities Management', count: 187 }
    ],
    vendors: [
      { id: 'microsoft', label: 'Microsoft Corporation', count: 45 },
      { id: 'salesforce', label: 'Salesforce Inc.', count: 38 },
      { id: 'oracle', label: 'Oracle Corporation', count: 32 },
      { id: 'aws', label: 'Amazon Web Services', count: 29 },
      { id: 'google', label: 'Google LLC', count: 27 },
      { id: 'adobe', label: 'Adobe Systems', count: 24 },
      { id: 'ibm', label: 'IBM Corporation', count: 21 },
      { id: 'sap', label: 'SAP SE', count: 19 }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (category, filterId, checked) => {
    const currentFilters = appliedFilters?.[category] || [];
    const newFilters = checked 
      ? [...currentFilters, filterId]
      : currentFilters?.filter(id => id !== filterId);
    
    onFiltersChange({
      ...appliedFilters,
      [category]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    setSearchTerm('');
  };

  const getActiveFilterCount = () => {
    return Object.values(appliedFilters)?.reduce((total, filters) => {
      return total + (Array.isArray(filters) ? filters?.length : 0);
    }, 0);
  };

  const renderFilterSection = (title, key, items, icon) => {
    const isExpanded = expandedSections?.[key];
    const appliedInSection = appliedFilters?.[key] || [];
    
    return (
      <div key={key} className="border-b border-border last:border-b-0">
        <button
          onClick={() => toggleSection(key)}
          className="w-full flex items-center justify-between p-3 hover:bg-muted transition-smooth"
        >
          <div className="flex items-center space-x-2">
            <Icon name={icon} size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-text-primary">{title}</span>
            {appliedInSection?.length > 0 && (
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">
                {appliedInSection?.length}
              </span>
            )}
          </div>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>
        {isExpanded && (
          <div className="px-3 pb-3 space-y-2">
            {items?.map((item) => (
              <div key={item?.id} className="flex items-center justify-between">
                <Checkbox
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-sm ${item?.color || 'text-text-primary'}`}>
                        {item?.label}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {item?.count?.toLocaleString()}
                      </span>
                    </div>
                  }
                  checked={appliedInSection?.includes(item?.id)}
                  onChange={(e) => handleFilterChange(key, item?.id, e?.target?.checked)}
                  size="sm"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-surface border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All ({getActiveFilterCount()})
            </Button>
          )}
        </div>
        
        <Input
          type="search"
          placeholder="Search filters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="text-sm"
        />
      </div>
      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto">
        {renderFilterSection('Contract Types', 'contractTypes', filterData?.contractTypes, 'FileText')}
        {renderFilterSection('Status', 'status', filterData?.status, 'Circle')}
        {renderFilterSection('Departments', 'departments', filterData?.departments, 'Building2')}
        {renderFilterSection('Vendors', 'vendors', filterData?.vendors, 'Users')}
        
        {/* Date Range Filter */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('dateRange')}
            className="w-full flex items-center justify-between p-3 hover:bg-muted transition-smooth"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-text-primary">Date Range</span>
            </div>
            <Icon 
              name={expandedSections?.dateRange ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground" 
            />
          </button>
          
          {expandedSections?.dateRange && (
            <div className="px-3 pb-3 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Effective Date From
                </label>
                <Input type="date" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Effective Date To
                </label>
                <Input type="date" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Expiration Date From
                </label>
                <Input type="date" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Expiration Date To
                </label>
                <Input type="date" className="text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* Value Range Filter */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('value')}
            className="w-full flex items-center justify-between p-3 hover:bg-muted transition-smooth"
          >
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-text-primary">Contract Value</span>
            </div>
            <Icon 
              name={expandedSections?.value ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className="text-muted-foreground" 
            />
          </button>
          
          {expandedSections?.value && (
            <div className="px-3 pb-3 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Minimum Value ($)
                </label>
                <Input type="number" placeholder="0" className="text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Maximum Value ($)
                </label>
                <Input type="number" placeholder="1,000,000" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Checkbox label="Under $10K" size="sm" />
                <Checkbox label="$10K - $100K" size="sm" />
                <Checkbox label="$100K - $1M" size="sm" />
                <Checkbox label="Over $1M" size="sm" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center justify-between mb-2">
            <span>Total Contracts</span>
            <span className="font-medium">4,218</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Filtered Results</span>
            <span className="font-medium text-accent">
              {getActiveFilterCount() > 0 ? '1,847' : '4,218'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;