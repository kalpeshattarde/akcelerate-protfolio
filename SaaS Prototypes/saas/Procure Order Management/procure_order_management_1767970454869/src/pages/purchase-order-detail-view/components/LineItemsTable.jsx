// /home/ubuntu/app/procureflow/src/pages/purchase-order-detail-view/components/LineItemsTable.jsx
import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const LineItemsTable = ({ 
  lineItems, 
  financials, 
  selectedItems, 
  onSelectionChange, 
  onItemUpdate, 
  onBulkAction, 
  isEditing, 
  userRole 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showBulkActions, setShowBulkActions] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    if (!sortConfig.key) return lineItems;

    return [...lineItems].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [lineItems, sortConfig]);

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(lineItems.map(item => item.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      onSelectionChange([...selectedItems, itemId]);
    } else {
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleItemChange = (itemId, field, value) => {
    const updates = { [field]: value };
    
    // Recalculate extended amount if quantity or unit price changes
    if (field === 'quantity' || field === 'unitPrice') {
      const item = lineItems.find(item => item.id === itemId);
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : item.quantity;
      const unitPrice = field === 'unitPrice' ? parseFloat(value) || 0 : item.unitPrice;
      const extendedAmount = quantity * unitPrice;
      const taxAmount = extendedAmount * item.taxRate;
      
      updates.extendedAmount = extendedAmount;
      updates.taxAmount = taxAmount;
    }
    
    onItemUpdate(itemId, updates);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const isAllSelected = selectedItems.length === lineItems.length && lineItems.length > 0;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < lineItems.length;

  return (
    <div className="bg-surface border border-border rounded-card shadow-elevation-sm">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="min-w-0">
            <h2 className="text-lg font-heading-semibold text-text-primary truncate">Line Items</h2>
            <p className="text-sm text-text-secondary mt-1">
              {lineItems.length} item{lineItems.length !== 1 ? 's' : ''} • Total: {formatCurrency(financials.grandTotal)}
            </p>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && isEditing && userRole === 'procurement' && (
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-sm text-text-secondary">
                {selectedItems.length} selected
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-text-primary rounded-button hover:bg-secondary-200 transition-smooth"
                >
                  <Icon name="MoreHorizontal" size={16} />
                  <span className="text-sm">Actions</span>
                </button>

                {showBulkActions && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-card shadow-elevation-lg z-dropdown">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          onBulkAction('duplicate');
                          setShowBulkActions(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-secondary-100 rounded-button transition-smooth"
                      >
                        <Icon name="Copy" size={16} className="text-text-secondary" />
                        <span className="text-sm text-text-primary">Duplicate Items</span>
                      </button>
                      <button
                        onClick={() => {
                          onBulkAction('delete');
                          setShowBulkActions(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-error-50 rounded-button transition-smooth"
                      >
                        <Icon name="Trash2" size={16} className="text-error" />
                        <span className="text-sm text-error">Delete Items</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full table-fixed">
            <colgroup>
              {isEditing && userRole === 'procurement' && <col className="w-12" />}
              <col className="w-24 lg:w-32" />
              <col className="w-48 lg:w-64" />
              <col className="w-20 lg:w-24" />
              <col className="w-20 lg:w-24" />
              <col className="w-24 lg:w-32" />
              <col className="w-28 lg:w-36" />
              <col className="w-28 lg:w-32" />
              <col className="w-32 lg:w-40" />
            </colgroup>
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                {isEditing && userRole === 'procurement' && (
                  <th className="px-2 lg:px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isPartiallySelected;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-border focus:ring-primary focus:border-primary"
                    />
                  </th>
                )}
                
                <th className="text-left px-2 lg:px-4 py-3">
                  <button
                    onClick={() => handleSort('productCode')}
                    className="flex items-center space-x-1 text-sm font-heading-medium text-text-secondary hover:text-text-primary transition-smooth w-full justify-start"
                  >
                    <span className="truncate">Product Code</span>
                    {getSortIcon('productCode')}
                  </button>
                </th>
                
                <th className="text-left px-2 lg:px-4 py-3">
                  <button
                    onClick={() => handleSort('description')}
                    className="flex items-center space-x-1 text-sm font-heading-medium text-text-secondary hover:text-text-primary transition-smooth w-full justify-start"
                  >
                    <span className="truncate">Description</span>
                    {getSortIcon('description')}
                  </button>
                </th>
                
                <th className="text-left px-2 lg:px-4 py-3">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center space-x-1 text-sm font-heading-medium text-text-secondary hover:text-text-primary transition-smooth w-full justify-start"
                  >
                    <span className="truncate">Category</span>
                    {getSortIcon('category')}
                  </button>
                </th>
                
                <th className="text-right px-2 lg:px-4 py-3">
                  <button
                    onClick={() => handleSort('quantity')}
                    className="flex items-center space-x-1 text-sm font-heading-medium text-text-secondary hover:text-text-primary transition-smooth w-full justify-end"
                  >
                    <span className="truncate">Quantity</span>
                    {getSortIcon('quantity')}
                  </button>
                </th>
                
                <th className="text-right px-2 lg:px-4 py-3">
                  <button
                    onClick={() => handleSort('unitPrice')}
                    className="flex items-center space-x-1 text-sm font-heading-medium text-text-secondary hover:text-text-primary transition-smooth w-full justify-end"
                  >
                    <span className="truncate">Unit Price</span>
                    {getSortIcon('unitPrice')}
                  </button>
                </th>
                
                <th className="text-right px-2 lg:px-4 py-3">
                  <button
                    onClick={() => handleSort('extendedAmount')}
                    className="flex items-center space-x-1 text-sm font-heading-medium text-text-secondary hover:text-text-primary transition-smooth w-full justify-end"
                  >
                    <span className="truncate">Extended Amount</span>
                    {getSortIcon('extendedAmount')}
                  </button>
                </th>
                
                <th className="text-left px-2 lg:px-4 py-3">
                  <button
                    onClick={() => handleSort('deliveryDate')}
                    className="flex items-center space-x-1 text-sm font-heading-medium text-text-secondary hover:text-text-primary transition-smooth w-full justify-start"
                  >
                    <span className="truncate">Delivery Date</span>
                    {getSortIcon('deliveryDate')}
                  </button>
                </th>
                
                <th className="text-left px-2 lg:px-4 py-3">
                  <span className="text-sm font-heading-medium text-text-secondary truncate">Notes</span>
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-border">
              {sortedItems.map((item, index) => (
                <tr key={item.id} className={`hover:bg-secondary-50 transition-smooth ${
                  selectedItems.includes(item.id) ? 'bg-primary-50' : ''
                }`}>
                  {isEditing && userRole === 'procurement' && (
                    <td className="px-2 lg:px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                        className="rounded border-border focus:ring-primary focus:border-primary"
                      />
                    </td>
                  )}
                  
                  <td className="px-2 lg:px-4 py-4">
                    {isEditing && userRole === 'procurement' ? (
                      <input
                        type="text"
                        value={item.productCode}
                        onChange={(e) => handleItemChange(item.id, 'productCode', e.target.value)}
                        className="w-full px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <span className="text-sm font-body-medium text-text-primary block truncate" title={item.productCode}>{item.productCode}</span>
                    )}
                  </td>
                  
                  <td className="px-2 lg:px-4 py-4">
                    {isEditing && userRole === 'procurement' ? (
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent resize-none"
                      />
                    ) : (
                      <div className="text-sm text-text-primary">
                        <p className="line-clamp-3 break-words" title={item.description}>{item.description}</p>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-2 lg:px-4 py-4">
                    {isEditing && userRole === 'procurement' ? (
                      <select
                        value={item.category}
                        onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                        className="w-full px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Services">Services</option>
                      </select>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-body-medium bg-secondary-100 text-secondary-700 rounded-full truncate">
                        {item.category}
                      </span>
                    )}
                  </td>
                  
                  <td className="px-2 lg:px-4 py-4 text-right">
                    {isEditing && userRole === 'procurement' ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                        min="1"
                        className="w-full px-2 py-1 border border-border rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <span className="text-sm text-text-primary">{item.quantity}</span>
                    )}
                  </td>
                  
                  <td className="px-2 lg:px-4 py-4 text-right">
                    {isEditing && userRole === 'procurement' ? (
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                        min="0"
                        step="0.01"
                        className="w-full px-2 py-1 border border-border rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <span className="text-sm text-text-primary truncate block" title={formatCurrency(item.unitPrice)}>{formatCurrency(item.unitPrice)}</span>
                    )}
                  </td>
                  
                  <td className="px-2 lg:px-4 py-4 text-right">
                    <span className="text-sm font-body-medium text-text-primary truncate block" title={formatCurrency(item.extendedAmount)}>
                      {formatCurrency(item.extendedAmount)}
                    </span>
                  </td>
                  
                  <td className="px-2 lg:px-4 py-4">
                    {isEditing && userRole === 'procurement' ? (
                      <input
                        type="date"
                        value={item.deliveryDate.toISOString().split('T')[0]}
                        onChange={(e) => handleItemChange(item.id, 'deliveryDate', new Date(e.target.value))}
                        className="w-full px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <span className="text-sm text-text-primary truncate block" title={formatDate(item.deliveryDate)}>{formatDate(item.deliveryDate)}</span>
                    )}
                  </td>
                  
                  <td className="px-2 lg:px-4 py-4">
                    {isEditing && userRole === 'procurement' ? (
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleItemChange(item.id, 'notes', e.target.value)}
                        placeholder="Add notes..."
                        className="w-full px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <span className="text-sm text-text-secondary truncate block" title={item.notes || '—'}>{item.notes || '—'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="p-4 lg:p-6 border-t border-border bg-secondary-50">
        <div className="flex justify-end">
          <div className="w-full max-w-80 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal:</span>
              <span className="text-text-primary font-body-medium break-words">{formatCurrency(financials.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tax:</span>
              <span className="text-text-primary font-body-medium break-words">{formatCurrency(financials.taxTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Shipping:</span>
              <span className="text-text-primary font-body-medium break-words">{formatCurrency(financials.shippingCost)}</span>
            </div>
            {financials.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Discount:</span>
                <span className="text-success font-body-medium break-words">-{formatCurrency(financials.discount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between">
                <span className="text-base font-heading-medium text-text-primary">Grand Total:</span>
                <span className="text-base font-heading-semibold text-text-primary break-words">{formatCurrency(financials.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineItemsTable;