import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  onFiltersChange, 
  userRole = 'compliance-officer',
  savedSearches = [],
  onSaveSearch,
  onLoadSearch 
}) => {
  const [filters, setFilters] = useState({
    dateRange: {
      startDate: '',
      endDate: ''
    },
    users: [],
    actionTypes: [],
    severity: 'all',
    ipAddress: '',
    searchQuery: '',
    dataTypes: []
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState('');

  const actionTypeOptions = [
    { value: 'login', label: 'User Login' },
    { value: 'logout', label: 'User Logout' },
    { value: 'data_create', label: 'Data Creation' },
    { value: 'data_update', label: 'Data Update' },
    { value: 'data_delete', label: 'Data Deletion' },
    { value: 'report_generate', label: 'Report Generation' },
    { value: 'export', label: 'Data Export' },
    { value: 'import', label: 'Data Import' },
    { value: 'permission_change', label: 'Permission Change' },
    { value: 'system_config', label: 'System Configuration' },
    { value: 'backup', label: 'System Backup' },
    { value: 'restore', label: 'System Restore' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'info', label: 'Information' }
  ];

  const dataTypeOptions = [
    { value: 'esg_metrics', label: 'ESG Metrics' },
    { value: 'compliance_reports', label: 'Compliance Reports' },
    { value: 'user_accounts', label: 'User Accounts' },
    { value: 'system_settings', label: 'System Settings' },
    { value: 'audit_logs', label: 'Audit Logs' },
    { value: 'materiality_matrix', label: 'Materiality Matrix' },
    { value: 'policy_documents', label: 'Policy Documents' }
  ];

  const userOptions = [
    { value: 'john.smith@company.com', label: 'John Smith (ESG Manager)' },
    { value: 'sarah.johnson@company.com', label: 'Sarah Johnson (Compliance Officer)' },
    { value: 'mike.chen@company.com', label: 'Mike Chen (Admin)' },
    { value: 'lisa.brown@company.com', label: 'Lisa Brown (Analyst)' },
    { value: 'david.wilson@company.com', label: 'David Wilson (Auditor)' },
    { value: 'system@company.com', label: 'System Account' }
  ];

  const commonPresets = [
    {
      id: 'recent_critical',
      name: 'Recent Critical Events',
      filters: {
        dateRange: { startDate: '2024-12-01', endDate: '2024-12-07' },
        severity: 'critical',
        actionTypes: ['data_delete', 'permission_change', 'system_config']
      }
    },
    {
      id: 'data_modifications',
      name: 'Data Modifications',
      filters: {
        actionTypes: ['data_create', 'data_update', 'data_delete'],
        dataTypes: ['esg_metrics', 'compliance_reports']
      }
    },
    {
      id: 'user_activities',
      name: 'User Activities',
      filters: {
        actionTypes: ['login', 'logout', 'permission_change'],
        dateRange: { startDate: '2024-12-01', endDate: '2024-12-07' }
      }
    },
    {
      id: 'compliance_actions',
      name: 'Compliance Actions',
      filters: {
        actionTypes: ['report_generate', 'export', 'data_update'],
        dataTypes: ['compliance_reports', 'esg_metrics']
      }
    }
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setActivePreset('');
  };

  const handleDateRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev?.dateRange,
        [field]: value
      }
    }));
    setActivePreset('');
  };

  const handleArrayFilterChange = (key, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [key]: checked 
        ? [...prev?.[key], value]
        : prev?.[key]?.filter(item => item !== value)
    }));
    setActivePreset('');
  };

  const applyPreset = (preset) => {
    setFilters(prev => ({
      ...prev,
      ...preset?.filters
    }));
    setActivePreset(preset?.id);
  };

  const clearAllFilters = () => {
    setFilters({
      dateRange: { startDate: '', endDate: '' },
      users: [],
      actionTypes: [],
      severity: 'all',
      ipAddress: '',
      searchQuery: '',
      dataTypes: []
    });
    setActivePreset('');
  };

  const saveCurrentSearch = () => {
    const searchName = prompt('Enter name for this search:');
    if (searchName && onSaveSearch) {
      onSaveSearch({
        id: Date.now()?.toString(),
        name: searchName,
        filters: { ...filters },
        createdAt: new Date()?.toISOString()
      });
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.dateRange?.startDate || filters?.dateRange?.endDate) count++;
    if (filters?.users?.length > 0) count++;
    if (filters?.actionTypes?.length > 0) count++;
    if (filters?.severity !== 'all') count++;
    if (filters?.ipAddress) count++;
    if (filters?.searchQuery) count++;
    if (filters?.dataTypes?.length > 0) count++;
    return count;
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="font-semibold text-foreground">Filters</h2>
            {getActiveFiltersCount() > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </Button>
      </div>
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto">
          {/* Quick Actions */}
          <div className="p-4 border-b border-border">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={saveCurrentSearch}
                iconName="Save"
                iconPosition="left"
                className="flex-1"
              >
                Save
              </Button>
            </div>
          </div>

          {/* Search Query */}
          <div className="p-4 border-b border-border">
            <Input
              label="Search Logs"
              type="search"
              placeholder="Search by description, user, or IP..."
              value={filters?.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e?.target?.value)}
              description="Supports regex patterns and boolean operators"
            />
          </div>

          {/* Date Range */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-3">Date Range</h3>
            <div className="space-y-3">
              <Input
                label="Start Date"
                type="date"
                value={filters?.dateRange?.startDate}
                onChange={(e) => handleDateRangeChange('startDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.dateRange?.endDate}
                onChange={(e) => handleDateRangeChange('endDate', e?.target?.value)}
              />
            </div>
          </div>

          {/* Severity Level */}
          <div className="p-4 border-b border-border">
            <Select
              label="Severity Level"
              options={severityOptions}
              value={filters?.severity}
              onChange={(value) => handleFilterChange('severity', value)}
            />
          </div>

          {/* Users Filter */}
          <div className="p-4 border-b border-border">
            <Select
              label="Users"
              description="Filter by specific users"
              options={userOptions}
              value={filters?.users}
              onChange={(value) => handleFilterChange('users', value)}
              multiple
              searchable
              clearable
            />
          </div>

          {/* Action Types */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-3">Action Types</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {actionTypeOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.actionTypes?.includes(option?.value)}
                  onChange={(e) => handleArrayFilterChange('actionTypes', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Data Types */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-3">Data Types</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {dataTypeOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={filters?.dataTypes?.includes(option?.value)}
                  onChange={(e) => handleArrayFilterChange('dataTypes', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* IP Address */}
          <div className="p-4 border-b border-border">
            <Input
              label="IP Address"
              type="text"
              placeholder="192.168.1.1 or 192.168.*"
              value={filters?.ipAddress}
              onChange={(e) => handleFilterChange('ipAddress', e?.target?.value)}
              description="Supports wildcards (*)"
            />
          </div>

          {/* Common Presets */}
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-3">Quick Filters</h3>
            <div className="space-y-2">
              {commonPresets?.map((preset) => (
                <Button
                  key={preset?.id}
                  variant={activePreset === preset?.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => applyPreset(preset)}
                  className="w-full justify-start"
                >
                  {preset?.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Saved Searches */}
          {savedSearches?.length > 0 && (
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-3">Saved Searches</h3>
              <div className="space-y-2">
                {savedSearches?.map((search) => (
                  <div key={search?.id} className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onLoadSearch(search)}
                      className="flex-1 justify-start"
                    >
                      {search?.name}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;