import React from 'react';
import Icon from '../../../components/AppIcon';

const SupplierGrid = ({
  suppliers,
  selectedSuppliers,
  onSupplierSelect,
  onSelectAll,
  onSort,
  sortConfig,
  onSupplierClick,
  selectedSupplierId
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success-100';
      case 'pending': return 'text-warning bg-warning-100';
      case 'inactive': return 'text-error bg-error-100';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const getComplianceColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-success';
      case 'review-required': return 'text-warning';
      case 'non-compliant': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const allSelected = suppliers.length > 0 && selectedSuppliers.length === suppliers.length;
  const someSelected = selectedSuppliers.length > 0 && selectedSuppliers.length < suppliers.length;

  return (
    <div className="flex-1 overflow-hidden">
      {/* Table Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading-medium text-text-primary">
            Suppliers ({suppliers.length})
          </h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-secondary-100 rounded-button transition-smooth">
              <Icon name="Filter" size={16} className="text-text-secondary" />
            </button>
            <button className="p-2 hover:bg-secondary-100 rounded-button transition-smooth">
              <Icon name="MoreVertical" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full">
          <thead className="bg-secondary-50 sticky top-0">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span className="text-sm font-heading-medium text-text-secondary">Name</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span className="text-sm font-heading-medium text-text-secondary">Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => onSort('rating')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span className="text-sm font-heading-medium text-text-secondary">Rating</span>
                  <Icon name={getSortIcon('rating')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => onSort('lastOrderDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span className="text-sm font-heading-medium text-text-secondary">Last Order</span>
                  <Icon name={getSortIcon('lastOrderDate')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => onSort('totalSpend')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span className="text-sm font-heading-medium text-text-secondary">Total Spend</span>
                  <Icon name={getSortIcon('totalSpend')} size={14} />
                </button>
              </th>
              <th className="p-3 text-left">
                <span className="text-sm font-heading-medium text-text-secondary">Compliance</span>
              </th>
              <th className="w-12 p-3"></th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className={`border-b border-border hover:bg-secondary-50 transition-smooth cursor-pointer ${
                  selectedSupplierId === supplier.id ? 'bg-primary-50' : ''
                }`}
                onClick={() => onSupplierClick(supplier.id)}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSupplierSelect(supplier.id, e.target.checked);
                    }}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="p-3">
                  <div>
                    <div className="font-body-medium text-text-primary">{supplier.name}</div>
                    <div className="text-sm text-text-secondary">{supplier.id}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-body-medium ${getStatusColor(supplier.status)}`}>
                    {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span className="text-sm font-body-medium text-text-primary">{supplier.rating}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-sm text-text-primary">{formatDate(supplier.lastOrderDate)}</span>
                </td>
                <td className="p-3">
                  <span className="text-sm font-body-medium text-text-primary">
                    {formatCurrency(supplier.totalSpend)}
                  </span>
                </td>
                <td className="p-3">
                  <Icon 
                    name={supplier.complianceStatus === 'compliant' ? 'CheckCircle' : 
                          supplier.complianceStatus === 'review-required' ? 'AlertCircle' : 'XCircle'} 
                    size={16} 
                    className={getComplianceColor(supplier.complianceStatus)}
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle menu action
                    }}
                    className="p-1 hover:bg-secondary-100 rounded transition-smooth"
                  >
                    <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {suppliers.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="font-heading-medium text-text-primary mb-2">No suppliers found</h3>
            <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierGrid;