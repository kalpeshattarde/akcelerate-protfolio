import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ 
  selectedDateRange, 
  setSelectedDateRange, 
  selectedDepartment, 
  setSelectedDepartment, 
  selectedSupplier, 
  setSelectedSupplier 
}) => {
  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'thisyear', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'it', label: 'IT Department' },
    { value: 'operations', label: 'Operations' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const supplierOptions = [
    { value: 'all', label: 'All Suppliers' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'global', label: 'Global Supplies Inc' },
    { value: 'industrial', label: 'Industrial Partners' },
    { value: 'office', label: 'Office Dynamics' }
  ];

  return (
    <div className="bg-surface border border-border rounded-card p-4 shadow-elevation-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Left Side - Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="bg-background border border-border rounded-button px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Building" size={16} className="text-text-secondary" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-background border border-border rounded-button px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {departmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="bg-background border border-border rounded-button px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {supplierOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Currency Toggle */}
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-text-secondary" />
            <select className="bg-background border border-border rounded-button px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedDateRange('last30days');
              setSelectedDepartment('all');
              setSelectedSupplier('all');
            }}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-button transition-smooth"
          >
            <Icon name="RotateCcw" size={16} />
            <span>Reset</span>
          </button>

          {/* Save View */}
          <button className="flex items-center space-x-2 px-3 py-2 text-sm bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth">
            <Icon name="Bookmark" size={16} />
            <span>Save View</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-text-secondary">Active filters:</span>
        
        {selectedDateRange !== 'last30days' && (
          <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
            {dateRangeOptions.find(opt => opt.value === selectedDateRange)?.label}
            <button
              onClick={() => setSelectedDateRange('last30days')}
              className="ml-1 hover:bg-primary-200 rounded-full p-0.5"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
        
        {selectedDepartment !== 'all' && (
          <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
            {departmentOptions.find(opt => opt.value === selectedDepartment)?.label}
            <button
              onClick={() => setSelectedDepartment('all')}
              className="ml-1 hover:bg-primary-200 rounded-full p-0.5"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
        
        {selectedSupplier !== 'all' && (
          <span className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
            {supplierOptions.find(opt => opt.value === selectedSupplier)?.label}
            <button
              onClick={() => setSelectedSupplier('all')}
              className="ml-1 hover:bg-primary-200 rounded-full p-0.5"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterBar;