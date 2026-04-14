// src/pages/commission-structure-configuration/components/CommissionRateMatrix.jsx
import React, { useState, useCallback } from 'react';
import Icon from 'components/AppIcon';

const CommissionRateMatrix = ({ data, onChange, canEdit, isPreviewMode }) => {
  const [matrix, setMatrix] = useState(data?.rateMatrix || {
    territories: [],
    products: [],
    rates: {}
  });
  const [selectedCell, setSelectedCell] = useState(null);
  const [bulkEditValue, setBulkEditValue] = useState('');
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [newTerritory, setNewTerritory] = useState('');
  const [newProduct, setNewProduct] = useState('');

  // Handle rate change with validation
  const updateRate = useCallback((territory, product, value) => {
    const rate = parseFloat(value) / 100; // Convert percentage to decimal
    const key = `${territory}-${product}`;
    
    // Validate rate
    const errors = { ...validationErrors };
    if (rate < 0 || rate > 1) {
      errors[key] = 'Rate must be between 0% and 100%';
    } else {
      delete errors[key];
    }
    setValidationErrors(errors);

    // Update matrix
    const newMatrix = {
      ...matrix,
      rates: {
        ...matrix.rates,
        [key]: rate
      }
    };
    
    setMatrix(newMatrix);
    onChange?.('rateMatrix', newMatrix);
  }, [matrix, onChange, validationErrors]);

  // Add new territory
  const addTerritory = () => {
    if (!newTerritory.trim() || matrix.territories.includes(newTerritory)) return;
    
    const newMatrix = {
      ...matrix,
      territories: [...matrix.territories, newTerritory]
    };
    
    // Initialize rates for new territory
    matrix.products.forEach(product => {
      const key = `${newTerritory}-${product}`;
      newMatrix.rates[key] = 0.05; // Default 5%
    });
    
    setMatrix(newMatrix);
    onChange?.('rateMatrix', newMatrix);
    setNewTerritory('');
  };

  // Add new product
  const addProduct = () => {
    if (!newProduct.trim() || matrix.products.includes(newProduct)) return;
    
    const newMatrix = {
      ...matrix,
      products: [...matrix.products, newProduct]
    };
    
    // Initialize rates for new product
    matrix.territories.forEach(territory => {
      const key = `${territory}-${newProduct}`;
      newMatrix.rates[key] = 0.05; // Default 5%
    });
    
    setMatrix(newMatrix);
    onChange?.('rateMatrix', newMatrix);
    setNewProduct('');
  };

  // Remove territory
  const removeTerritory = (territory) => {
    const newMatrix = {
      ...matrix,
      territories: matrix.territories.filter(t => t !== territory)
    };
    
    // Remove associated rates
    const newRates = { ...matrix.rates };
    Object.keys(newRates).forEach(key => {
      if (key.startsWith(`${territory}-`)) {
        delete newRates[key];
      }
    });
    newMatrix.rates = newRates;
    
    setMatrix(newMatrix);
    onChange?.('rateMatrix', newMatrix);
  };

  // Remove product
  const removeProduct = (product) => {
    const newMatrix = {
      ...matrix,
      products: matrix.products.filter(p => p !== product)
    };
    
    // Remove associated rates
    const newRates = { ...matrix.rates };
    Object.keys(newRates).forEach(key => {
      if (key.endsWith(`-${product}`)) {
        delete newRates[key];
      }
    });
    newMatrix.rates = newRates;
    
    setMatrix(newMatrix);
    onChange?.('rateMatrix', newMatrix);
  };

  // Apply bulk edit to selected cells
  const applyBulkEdit = () => {
    if (!bulkEditValue || !selectedCell) return;
    
    const rate = parseFloat(bulkEditValue) / 100;
    const newRates = { ...matrix.rates };
    
    // Apply to all cells if bulk edit mode
    if (showBulkEdit) {
      matrix.territories.forEach(territory => {
        matrix.products.forEach(product => {
          newRates[`${territory}-${product}`] = rate;
        });
      });
    } else {
      newRates[selectedCell] = rate;
    }
    
    const newMatrix = { ...matrix, rates: newRates };
    setMatrix(newMatrix);
    onChange?.('rateMatrix', newMatrix);
    setShowBulkEdit(false);
    setBulkEditValue('');
    setSelectedCell(null);
  };

  // Get rate display value
  const getRateDisplay = (territory, product) => {
    const key = `${territory}-${product}`;
    const rate = matrix.rates[key] || 0;
    return (rate * 100).toFixed(1);
  };

  // Get cell background color based on rate
  const getCellColor = (territory, product) => {
    const key = `${territory}-${product}`;
    const rate = matrix.rates[key] || 0;
    
    if (rate === 0) return 'glass-morphism-dark';
    if (rate < 0.05) return 'glass-morphism-dark border border-red-400/20';
    if (rate < 0.07) return 'glass-morphism-dark border border-yellow-400/20';
    return 'glass-morphism-dark border border-green-400/20';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Commission Rate Matrix</h2>
          <p className="text-sm text-white/70 mt-1">
            Visual grid with territory/product intersections for rapid rate adjustments.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Bulk Edit Toggle */}
          {canEdit && !isPreviewMode && (
            <button
              onClick={() => setShowBulkEdit(!showBulkEdit)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                showBulkEdit ? 'btn-glass-primary' : 'glass-morphism text-white hover:glass-morphism-hover'
              }`}
            >
              <Icon name="Edit3" size={16} />
              <span>Bulk Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Bulk Edit Panel */}
      {showBulkEdit && (
        <div className="glass-morphism-elevated border border-neon-indigo/30 rounded-xl p-4">
          <h3 className="font-medium text-neon-indigo mb-3">Bulk Rate Update</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={bulkEditValue}
                onChange={(e) => setBulkEditValue(e.target.value)}
                placeholder="Rate (%)"
                className="input-glass-dark w-full"
              />
            </div>
            <button
              onClick={applyBulkEdit}
              className="btn-glass-primary"
            >
              Apply to All
            </button>
            <button
              onClick={() => setShowBulkEdit(false)}
              className="glass-morphism text-white/70 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Territory/Product Forms */}
      {canEdit && !isPreviewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add Territory */}
          <div className="glass-morphism-dark border border-white/10 rounded-xl p-4">
            <h3 className="font-medium text-white mb-3">Add Territory</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTerritory}
                onChange={(e) => setNewTerritory(e.target.value)}
                placeholder="Territory name"
                className="input-glass-dark flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addTerritory()}
              />
              <button
                onClick={addTerritory}
                disabled={!newTerritory.trim()}
                className="glass-morphism text-green-400 hover:glass-morphism-hover disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-all duration-300 border border-green-400/20"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Add Product */}
          <div className="glass-morphism-dark border border-white/10 rounded-xl p-4">
            <h3 className="font-medium text-white mb-3">Add Product</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Product name"
                className="input-glass-dark flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addProduct()}
              />
              <button
                onClick={addProduct}
                disabled={!newProduct.trim()}
                className="glass-morphism text-green-400 hover:glass-morphism-hover disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-all duration-300 border border-green-400/20"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Matrix Grid */}
      <div className="glass-morphism-dark border border-white/10 rounded-xl overflow-hidden">
        <div className="glass-morphism-elevated p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Commission Rate Grid</h3>
          <p className="text-sm text-white/70 mt-1">
            Click on cells to edit rates. Color coding: Red (&lt;5%), Yellow (5-7%), Green (&gt;7%)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="glass-morphism-elevated">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-white border-r border-white/10">
                  Territory \ Product
                </th>
                {matrix.products?.map((product) => (
                  <th key={product} className="px-4 py-3 text-center text-sm font-medium text-white border-r border-white/10">
                    <div className="flex items-center justify-center space-x-2">
                      <span>{product}</span>
                      {canEdit && !isPreviewMode && (
                        <button
                          onClick={() => removeProduct(product)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1 rounded transition-all duration-300"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {matrix.territories?.map((territory) => (
                <tr key={territory} className="hover:bg-white/5">
                  <td className="px-4 py-3 font-medium text-white border-r border-white/10 glass-morphism-elevated">
                    <div className="flex items-center justify-between">
                      <span>{territory}</span>
                      {canEdit && !isPreviewMode && (
                        <button
                          onClick={() => removeTerritory(territory)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1 rounded transition-all duration-300"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                  {matrix.products?.map((product) => {
                    const key = `${territory}-${product}`;
                    const hasError = validationErrors[key];
                    return (
                      <td
                        key={key}
                        className={`px-2 py-2 border-r border-white/10 ${getCellColor(territory, product)} transition-colors`}
                      >
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={getRateDisplay(territory, product)}
                            onChange={(e) => updateRate(territory, product, e.target.value)}
                            disabled={!canEdit || isPreviewMode}
                            className={`w-full px-2 py-1 text-center text-sm border-0 bg-transparent text-white focus:bg-white/10 focus:ring-2 focus:ring-neon-indigo rounded ${
                              hasError ? 'ring-2 ring-red-400' : ''
                            }`}
                            onFocus={() => setSelectedCell(key)}
                          />
                          <span className="absolute right-1 top-1 text-xs text-white/50">%</span>
                          {hasError && (
                            <div className="absolute top-full left-0 z-10 mt-1 p-1 bg-red-500 text-white text-xs rounded shadow-lg">
                              {hasError}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="glass-morphism-elevated p-4 border-t border-white/10">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 glass-morphism-dark border border-red-400/20 rounded"></div>
              <span className="text-white/70">Low Rate (&lt;5%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 glass-morphism-dark border border-yellow-400/20 rounded"></div>
              <span className="text-white/70">Medium Rate (5-7%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 glass-morphism-dark border border-green-400/20 rounded"></div>
              <span className="text-white/70">High Rate (&gt;7%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 glass-morphism-dark border border-white/10 rounded"></div>
              <span className="text-white/70">No Rate (0%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionRateMatrix;