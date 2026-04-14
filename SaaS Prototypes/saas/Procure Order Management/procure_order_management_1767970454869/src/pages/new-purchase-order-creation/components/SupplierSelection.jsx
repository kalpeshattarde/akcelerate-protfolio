import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SupplierSelection = ({ suppliers, selectedSupplier, onSupplierChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  }, [searchTerm, suppliers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSupplierSelect = (supplier) => {
    onSupplierChange(supplier);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (selectedSupplier) {
      setSearchTerm(selectedSupplier.name);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className="bg-surface rounded-card border border-border p-6">
      <h2 className="text-lg font-heading-semibold text-text-primary mb-4">
        Supplier Information
      </h2>
      
      <div className="relative" ref={dropdownRef}>
        <label className="block text-sm font-body-medium text-text-primary mb-2">
          Select Supplier *
        </label>
        
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={isOpen ? searchTerm : (selectedSupplier ? selectedSupplier.name : '')}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Search suppliers by name or code..."
            className={`w-full px-3 py-2 pr-10 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              error ? 'border-error' : 'border-border'
            }`}
          />
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
          />
        </div>

        {error && (
          <p className="text-error text-xs mt-1">{error}</p>
        )}

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-dropdown w-full mt-1 bg-surface border border-border rounded-card shadow-elevation-lg max-h-60 overflow-y-auto">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <button
                  key={supplier.id}
                  type="button"
                  onClick={() => handleSupplierSelect(supplier)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary-50 transition-smooth border-b border-border last:border-b-0"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-body-medium text-text-primary">{supplier.name}</div>
                      <div className="text-sm text-text-secondary">{supplier.code}</div>
                      <div className="text-xs text-text-secondary mt-1">{supplier.email}</div>
                    </div>
                    <div className="text-xs text-text-secondary text-right">
                      <div>{supplier.paymentTerms}</div>
                      <div>{supplier.phone}</div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-text-secondary text-center">
                No suppliers found matching "{searchTerm}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Supplier Details */}
      {selectedSupplier && (
        <div className="mt-4 p-4 bg-secondary-50 rounded-button">
          <h3 className="font-body-medium text-text-primary mb-2">Supplier Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Address:</span>
              <div className="text-text-primary">{selectedSupplier.address}</div>
            </div>
            <div>
              <span className="text-text-secondary">Payment Terms:</span>
              <div className="text-text-primary">{selectedSupplier.paymentTerms}</div>
            </div>
            <div>
              <span className="text-text-secondary">Phone:</span>
              <div className="text-text-primary">{selectedSupplier.phone}</div>
            </div>
            <div>
              <span className="text-text-secondary">Tax ID:</span>
              <div className="text-text-primary">{selectedSupplier.taxId}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierSelection;