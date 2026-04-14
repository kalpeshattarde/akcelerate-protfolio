import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LineItemsSection = ({ 
  lineItems, 
  productCatalog, 
  onLineItemChange, 
  onProductCodeLookup, 
  onAddLineItem, 
  onRemoveLineItem,
  error 
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set([0]));

  const toggleItemExpansion = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleProductCodeChange = (index, value) => {
    onLineItemChange(index, 'productCode', value);
    
    // Auto-lookup product details
    if (value.length >= 3) {
      onProductCodeLookup(index, value);
    }
  };

  const getProductSuggestions = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) return [];
    return productCatalog.filter(product =>
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  };

  return (
    <div className="bg-surface rounded-card border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading-semibold text-text-primary">
          Line Items
        </h2>
        <button
          type="button"
          onClick={onAddLineItem}
          className="flex items-center px-3 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth text-sm"
        >
          <Icon name="Plus" size={16} className="mr-1" />
          Add Item
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-100 rounded-button">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {lineItems.map((item, index) => (
          <div key={item.id} className="border border-border rounded-button">
            {/* Item Header */}
            <div className="flex items-center justify-between p-4 bg-secondary-50">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => toggleItemExpansion(index)}
                  className="p-1 rounded-button hover:bg-secondary-100 transition-smooth"
                >
                  <Icon 
                    name={expandedItems.has(index) ? "ChevronDown" : "ChevronRight"} 
                    size={16} 
                    className="text-text-secondary"
                  />
                </button>
                <span className="font-body-medium text-text-primary">
                  Item #{index + 1}
                </span>
                {item.description && (
                  <span className="text-sm text-text-secondary truncate max-w-xs">
                    {item.description}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {item.total > 0 && (
                  <span className="text-sm font-body-medium text-text-primary">
                    ${item.total.toFixed(2)}
                  </span>
                )}
                {lineItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveLineItem(index)}
                    className="p-1 rounded-button hover:bg-error-50 text-error transition-smooth"
                    title="Remove item"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Item Details */}
            {expandedItems.has(index) && (
              <div className="p-4 space-y-4">
                {/* Product Code with Suggestions */}
                <div className="relative">
                  <label className="block text-sm font-body-medium text-text-primary mb-2">
                    Product Code
                  </label>
                  <input
                    type="text"
                    value={item.productCode}
                    onChange={(e) => handleProductCodeChange(index, e.target.value)}
                    placeholder="Enter product code or search..."
                    className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  
                  {/* Product Suggestions */}
                  {item.productCode && getProductSuggestions(item.productCode).length > 0 && (
                    <div className="absolute z-dropdown w-full mt-1 bg-surface border border-border rounded-button shadow-elevation-lg max-h-40 overflow-y-auto">
                      {getProductSuggestions(item.productCode).map((product, productIndex) => (
                        <button
                          key={productIndex}
                          type="button"
                          onClick={() => {
                            onLineItemChange(index, 'productCode', product.code);
                            onLineItemChange(index, 'description', product.description);
                            onLineItemChange(index, 'unitPrice', product.unitPrice);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-secondary-50 transition-smooth border-b border-border last:border-b-0"
                        >
                          <div className="font-body-medium text-text-primary">{product.code}</div>
                          <div className="text-sm text-text-secondary truncate">{product.description}</div>
                          <div className="text-sm text-primary">${product.unitPrice.toFixed(2)}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-body-medium text-text-primary mb-2">
                    Description *
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => onLineItemChange(index, 'description', e.target.value)}
                    placeholder="Enter item description..."
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                {/* Quantity, Unit Price, Tax Rate */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onLineItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-2">
                      Unit Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => onLineItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full pl-8 pr-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-body-medium text-text-primary mb-2">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={item.taxRate}
                      onChange={(e) => onLineItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Calculated Total */}
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-sm text-text-secondary">Line Total:</span>
                  <div className="text-right">
                    <div className="text-lg font-body-semibold text-text-primary">
                      ${item.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      Tax: ${(item.total * (item.taxRate / 100)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Add Section */}
      <div className="mt-4 p-4 bg-secondary-50 rounded-button">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-body-medium text-text-primary">Quick Actions</h3>
            <p className="text-sm text-text-secondary">Keyboard shortcuts: Ctrl+Enter to add item</p>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => {
                // Duplicate last item
                const lastItem = lineItems[lineItems.length - 1];
                const newItem = {
                  ...lastItem,
                  id: Date.now(),
                  quantity: 1,
                  total: lastItem.unitPrice
                };
                onAddLineItem();
              }}
              className="text-sm px-3 py-1 border border-border rounded-button hover:bg-surface transition-smooth"
            >
              Duplicate Last
            </button>
            <button
              type="button"
              onClick={onAddLineItem}
              className="text-sm px-3 py-1 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
            >
              Add New Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineItemsSection;