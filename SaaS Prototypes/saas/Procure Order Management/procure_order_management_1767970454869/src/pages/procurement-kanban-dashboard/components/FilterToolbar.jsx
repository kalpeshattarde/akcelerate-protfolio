import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterToolbar = ({ filters, setFilters, isBulkMode, setIsBulkMode, selectedCount }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [savedViews] = useState([
    { id: 'all', name: 'All Orders', active: true },
    { id: 'urgent', name: 'Urgent Orders', active: false },
    { id: 'high-value', name: 'High Value (>$10k)', active: false },
    { id: 'pending-approval', name: 'Pending My Approval', active: false }
  ]);

  const supplierOptions = [
    'TechCorp Solutions',
    'Office Supplies Inc',
    'Industrial Equipment Co',
    'Global Manufacturing',
    'Software Licensing Ltd',
    'Construction Materials',
    'Medical Supplies Pro',
    'IT Hardware Direct',
    'Facility Services Group',
    'Catering Solutions'
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      supplier: '',
      dateRange: '',
      amountRange: '',
      searchQuery: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const exportData = () => {
    console.log('Exporting data...');
    // Mock export functionality
  };

  return (
    <div className="bg-surface border border-border rounded-card p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Search PO number or supplier..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth text-sm"
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleFilterChange('searchQuery', '')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-3 py-2 border rounded-button transition-smooth ${
              hasActiveFilters 
                ? 'border-primary bg-primary-50 text-primary' :'border-border hover:bg-secondary-100'
            }`}
          >
            <Icon name="Filter" size={18} />
            <span className="text-sm">Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {Object.values(filters).filter(v => v !== '').length}
              </span>
            )}
          </button>

          {/* Saved Views */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary hidden lg:block">Views:</span>
            <div className="flex space-x-1">
              {savedViews.map(view => (
                <button
                  key={view.id}
                  className={`px-3 py-1.5 text-xs rounded-button transition-smooth ${
                    view.active 
                      ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                  }`}
                >
                  {view.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsBulkMode(!isBulkMode)}
            className={`flex items-center space-x-2 px-3 py-2 border rounded-button transition-smooth ${
              isBulkMode 
                ? 'border-primary bg-primary-50 text-primary' :'border-border hover:bg-secondary-100'
            }`}
          >
            <Icon name="CheckSquare" size={18} />
            <span className="text-sm">Bulk Select</span>
            {selectedCount > 0 && (
              <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                {selectedCount}
              </span>
            )}
          </button>

          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-3 py-2 border border-border rounded-button hover:bg-secondary-100 transition-smooth"
          >
            <Icon name="Download" size={18} />
            <span className="text-sm hidden sm:block">Export</span>
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Supplier Filter */}
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Supplier
              </label>
              <select
                value={filters.supplier}
                onChange={(e) => handleFilterChange('supplier', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth text-sm"
              >
                <option value="">All Suppliers</option>
                {supplierOptions.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Due Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth text-sm"
              >
                <option value="">All Dates</option>
                <option value="overdue">Overdue</option>
                <option value="this-week">This Week</option>
                <option value="next-week">Next Week</option>
                <option value="this-month">This Month</option>
                <option value="next-month">Next Month</option>
              </select>
            </div>

            {/* Amount Range Filter */}
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Amount Range
              </label>
              <select
                value={filters.amountRange}
                onChange={(e) => handleFilterChange('amountRange', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth text-sm"
              >
                <option value="">All Amounts</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-50000">$10,000 - $50,000</option>
                <option value="50000+">$50,000+</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-smooth"
              >
                <Icon name="X" size={16} />
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;