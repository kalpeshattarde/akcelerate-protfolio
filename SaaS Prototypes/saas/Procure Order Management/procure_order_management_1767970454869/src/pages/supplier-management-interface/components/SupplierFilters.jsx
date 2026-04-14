import React from 'react';
import Icon from '../../../components/AppIcon';

const SupplierFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  suppliers
}) => {
  const statusCounts = {
    all: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    pending: suppliers.filter(s => s.status === 'pending').length,
    inactive: suppliers.filter(s => s.status === 'inactive').length
  };

  const categoryCounts = {
    all: suppliers.length,
    technology: suppliers.filter(s => s.category === 'technology').length,
    manufacturing: suppliers.filter(s => s.category === 'manufacturing').length,
    'office-supplies': suppliers.filter(s => s.category === 'office-supplies').length,
    logistics: suppliers.filter(s => s.category === 'logistics').length,
    energy: suppliers.filter(s => s.category === 'energy').length,
    services: suppliers.filter(s => s.category === 'services').length
  };

  const statusOptions = [
    { value: 'all', label: 'All Suppliers', icon: 'Users' },
    { value: 'active', label: 'Active', icon: 'CheckCircle' },
    { value: 'pending', label: 'Pending', icon: 'Clock' },
    { value: 'inactive', label: 'Inactive', icon: 'XCircle' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: 'Grid3X3' },
    { value: 'technology', label: 'Technology', icon: 'Monitor' },
    { value: 'manufacturing', label: 'Manufacturing', icon: 'Factory' },
    { value: 'office-supplies', label: 'Office Supplies', icon: 'Package' },
    { value: 'logistics', label: 'Logistics', icon: 'Truck' },
    { value: 'energy', label: 'Energy', icon: 'Zap' },
    { value: 'services', label: 'Services', icon: 'Briefcase' }
  ];

  return (
    <div className="bg-surface rounded-card border border-border h-full">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading-medium text-text-primary mb-4">Filters & Search</h3>
        
        {/* Search */}
        <div className="relative mb-6">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-heading-medium text-text-primary mb-3">Status</h4>
          <div className="space-y-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`w-full flex items-center justify-between p-2 rounded-button transition-smooth ${
                  statusFilter === option.value
                    ? 'bg-primary-100 text-primary' :'hover:bg-secondary-100 text-text-secondary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={option.icon} size={16} />
                  <span className="text-sm">{option.label}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  statusFilter === option.value
                    ? 'bg-primary text-white' :'bg-secondary-200 text-text-secondary'
                }`}>
                  {statusCounts[option.value]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-heading-medium text-text-primary mb-3">Category</h4>
          <div className="space-y-1">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCategoryFilter(option.value)}
                className={`w-full flex items-center justify-between p-2 rounded-button transition-smooth ${
                  categoryFilter === option.value
                    ? 'bg-primary-100 text-primary' :'hover:bg-secondary-100 text-text-secondary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={option.icon} size={16} />
                  <span className="text-sm">{option.label}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  categoryFilter === option.value
                    ? 'bg-primary text-white' :'bg-secondary-200 text-text-secondary'
                }`}>
                  {categoryCounts[option.value]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-heading-medium text-text-primary mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-secondary-100 rounded-button transition-smooth">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm text-text-secondary">Expiring Contracts</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-secondary-100 rounded-button transition-smooth">
              <Icon name="TrendingDown" size={16} className="text-error" />
              <span className="text-sm text-text-secondary">Low Performance</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-secondary-100 rounded-button transition-smooth">
              <Icon name="FileX" size={16} className="text-error" />
              <span className="text-sm text-text-secondary">Missing Documents</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
        <div className="p-4">
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setCategoryFilter('all');
            }}
            className="w-full flex items-center justify-center space-x-2 p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-button transition-smooth"
          >
            <Icon name="RotateCcw" size={16} />
            <span className="text-sm">Clear All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SupplierFilters;