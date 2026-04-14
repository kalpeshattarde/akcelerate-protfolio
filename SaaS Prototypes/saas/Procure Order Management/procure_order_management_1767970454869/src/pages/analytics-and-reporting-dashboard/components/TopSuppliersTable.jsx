import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TopSuppliersTable = ({ data }) => {
  const [sortField, setSortField] = useState('totalSpend');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-warning';
    return 'text-error';
  };

  const getDeliveryColor = (percentage) => {
    if (percentage >= 95) return 'text-success';
    if (percentage >= 90) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-surface border border-border rounded-card shadow-elevation-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading-semibold text-text-primary mb-1">
              Top Suppliers
            </h3>
            <p className="text-text-secondary text-sm">
              Performance metrics by spending volume
            </p>
          </div>
          <button className="p-2 hover:bg-secondary-100 rounded-button transition-smooth">
            <Icon name="MoreHorizontal" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="text-left p-4 text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Supplier
              </th>
              <th 
                className="text-right p-4 text-xs font-heading-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('totalSpend')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Total Spend</span>
                  {sortField === 'totalSpend' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-4 text-xs font-heading-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('orderCount')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Orders</span>
                  {sortField === 'orderCount' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-4 text-xs font-heading-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Rating</span>
                  {sortField === 'rating' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-4 text-xs font-heading-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('onTimeDelivery')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>On-Time</span>
                  {sortField === 'onTimeDelivery' && (
                    <Icon 
                      name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-secondary-50 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm font-heading-medium">
                        {supplier.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-body-medium text-text-primary">
                        {supplier.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        Avg: {formatCurrency(supplier.avgOrderValue)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-body-medium text-text-primary">
                    {formatCurrency(supplier.totalSpend)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="font-body-medium text-text-primary">
                    {supplier.orderCount}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className={`flex items-center justify-end space-x-1 ${getRatingColor(supplier.rating)}`}>
                    <Icon name="Star" size={14} fill="currentColor" />
                    <span className="font-body-medium">{supplier.rating}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className={`font-body-medium ${getDeliveryColor(supplier.onTimeDelivery)}`}>
                    {supplier.onTimeDelivery}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary-700 transition-smooth">
          View All Suppliers
        </button>
      </div>
    </div>
  );
};

export default TopSuppliersTable;