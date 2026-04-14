import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import SupplierSelection from './components/SupplierSelection';
import DeliveryDetails from './components/DeliveryDetails';
import LineItemsSection from './components/LineItemsSection';
import OrderSummary from './components/OrderSummary';
import BulkImportModal from './components/BulkImportModal';
import TemplateSelector from './components/TemplateSelector';

const NewPurchaseOrderCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    supplier: null,
    poNumber: '',
    requestedBy: 'John Doe',
    department: 'IT',
    deliveryAddress: '',
    requiredDate: '',
    notes: '',
    lineItems: [
      {
        id: 1,
        productCode: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 8.25,
        total: 0
      }
    ]
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Mock suppliers data
  const suppliers = [
    {
      id: 1,
      name: "TechCorp Solutions",
      code: "TECH001",
      email: "orders@techcorp.com",
      phone: "(555) 123-4567",
      address: "123 Technology Drive, San Francisco, CA 94105",
      paymentTerms: "Net 30",
      taxId: "12-3456789"
    },
    {
      id: 2,
      name: "Office Supplies Plus",
      code: "OSP002",
      email: "sales@officesupplies.com",
      phone: "(555) 987-6543",
      address: "456 Business Park, Austin, TX 78701",
      paymentTerms: "Net 15",
      taxId: "98-7654321"
    },
    {
      id: 3,
      name: "Industrial Equipment Co",
      code: "IEC003",
      email: "procurement@industrial.com",
      phone: "(555) 456-7890",
      address: "789 Manufacturing Blvd, Detroit, MI 48201",
      paymentTerms: "Net 45",
      taxId: "45-6789012"
    }
  ];

  // Mock product catalog
  const productCatalog = [
    {
      code: "LAPTOP001",
      description: "Dell Latitude 7420 Laptop - 14\" FHD, Intel i7, 16GB RAM, 512GB SSD",
      unitPrice: 1299.99,
      category: "Electronics"
    },
    {
      code: "CHAIR001",
      description: "Ergonomic Office Chair - Adjustable Height, Lumbar Support",
      unitPrice: 299.99,
      category: "Furniture"
    },
    {
      code: "PRINTER001",
      description: "HP LaserJet Pro M404n Monochrome Printer",
      unitPrice: 199.99,
      category: "Electronics"
    },
    {
      code: "DESK001",
      description: "Standing Desk Converter - Dual Monitor Support",
      unitPrice: 399.99,
      category: "Furniture"
    }
  ];

  // Auto-generate PO number
  useEffect(() => {
    if (!formData.poNumber) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      setFormData(prev => ({
        ...prev,
        poNumber: `PO-${year}${month}${day}-${random}`
      }));
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData.supplier || formData.lineItems.some(item => item.description)) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleSaveDraft();
            break;
          case 'Enter':
            if (e.target.closest('.line-items-section')) {
              e.preventDefault();
              handleAddLineItem();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSupplierChange = (supplier) => {
    setFormData(prev => ({
      ...prev,
      supplier,
      deliveryAddress: supplier ? supplier.address : ''
    }));
    setValidationErrors(prev => ({ ...prev, supplier: null }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setValidationErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedLineItems = [...formData.lineItems];
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [field]: value
    };

    // Auto-calculate total
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? value : updatedLineItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? value : updatedLineItems[index].unitPrice;
      updatedLineItems[index].total = quantity * unitPrice;
    }

    setFormData(prev => ({
      ...prev,
      lineItems: updatedLineItems
    }));
  };

  const handleProductCodeLookup = (index, productCode) => {
    const product = productCatalog.find(p => p.code === productCode);
    if (product) {
      handleLineItemChange(index, 'description', product.description);
      handleLineItemChange(index, 'unitPrice', product.unitPrice);
    }
  };

  const handleAddLineItem = () => {
    const newLineItem = {
      id: Date.now(),
      productCode: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 8.25,
      total: 0
    };
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newLineItem]
    }));
  };

  const handleRemoveLineItem = (index) => {
    if (formData.lineItems.length > 1) {
      const updatedLineItems = formData.lineItems.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        lineItems: updatedLineItems
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.supplier) {
      errors.supplier = 'Please select a supplier';
    }

    if (!formData.requiredDate) {
      errors.requiredDate = 'Required date is mandatory';
    } else {
      const selectedDate = new Date(formData.requiredDate);
      const today = new Date();
      if (selectedDate <= today) {
        errors.requiredDate = 'Required date must be in the future';
      }
    }

    if (!formData.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required';
    }

    const validLineItems = formData.lineItems.filter(item => 
      item.description.trim() && item.quantity > 0 && item.unitPrice > 0
    );

    if (validLineItems.length === 0) {
      errors.lineItems = 'At least one valid line item is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveDraft = async () => {
    setIsDraftSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsDraftSaving(false);
    setLastSaved(new Date());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate back to dashboard with success message
      navigate('/procurement-kanban-dashboard', { 
        state: { 
          message: `Purchase Order ${formData.poNumber} created successfully!`,
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error creating purchase order:', error);
      setValidationErrors({ submit: 'Failed to create purchase order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotals = () => {
    const subtotal = formData.lineItems.reduce((sum, item) => sum + item.total, 0);
    const tax = formData.lineItems.reduce((sum, item) => 
      sum + (item.total * (item.taxRate / 100)), 0
    );
    const grandTotal = subtotal + tax;

    return { subtotal, tax, grandTotal };
  };

  const { subtotal, tax, grandTotal } = calculateTotals();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole="procurement" />
      <Header userRole="procurement" userName="John Doe" />
      
      <main className="lg:ml-60 pt-20 lg:pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <button
                  onClick={() => navigate('/procurement-kanban-dashboard')}
                  className="p-2 rounded-button hover:bg-secondary-100 transition-smooth"
                  title="Back to Dashboard"
                >
                  <Icon name="ArrowLeft" size={20} className="text-text-secondary" />
                </button>
                <h1 className="text-2xl font-heading-bold text-text-primary">
                  Create New Purchase Order
                </h1>
              </div>
              <p className="text-text-secondary">
                Fill in the details below to create a new purchase order
              </p>
              {lastSaved && (
                <p className="text-xs text-success mt-1">
                  <Icon name="Check" size={12} className="inline mr-1" />
                  Draft saved at {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth"
              >
                <Icon name="FileTemplate" size={16} className="mr-2" />
                Templates
              </button>
              <button
                onClick={() => setShowBulkImport(true)}
                className="flex items-center px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth"
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Bulk Import
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={isDraftSaving}
                className="flex items-center px-4 py-2 bg-secondary-100 text-text-primary rounded-button hover:bg-secondary-200 transition-smooth disabled:opacity-50"
              >
                {isDraftSaving ? (
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                ) : (
                  <Icon name="Save" size={16} className="mr-2" />
                )}
                Save Draft
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="bg-surface rounded-card border border-border p-6">
                  <h2 className="text-lg font-heading-semibold text-text-primary mb-4">
                    Basic Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-2">
                        PO Number
                      </label>
                      <input
                        type="text"
                        value={formData.poNumber}
                        onChange={(e) => handleInputChange('poNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-secondary-50"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-2">
                        Requested By
                      </label>
                      <input
                        type="text"
                        value={formData.requestedBy}
                        onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-2">
                        Department
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="IT">Information Technology</option>
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-body-medium text-text-primary mb-2">
                        Required Date *
                      </label>
                      <input
                        type="date"
                        value={formData.requiredDate}
                        onChange={(e) => handleInputChange('requiredDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                          validationErrors.requiredDate ? 'border-error' : 'border-border'
                        }`}
                      />
                      {validationErrors.requiredDate && (
                        <p className="text-error text-xs mt-1">{validationErrors.requiredDate}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Supplier Selection */}
                <SupplierSelection
                  suppliers={suppliers}
                  selectedSupplier={formData.supplier}
                  onSupplierChange={handleSupplierChange}
                  error={validationErrors.supplier}
                />

                {/* Delivery Details */}
                <DeliveryDetails
                  deliveryAddress={formData.deliveryAddress}
                  notes={formData.notes}
                  onAddressChange={(value) => handleInputChange('deliveryAddress', value)}
                  onNotesChange={(value) => handleInputChange('notes', value)}
                  error={validationErrors.deliveryAddress}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Line Items */}
                <LineItemsSection
                  lineItems={formData.lineItems}
                  productCatalog={productCatalog}
                  onLineItemChange={handleLineItemChange}
                  onProductCodeLookup={handleProductCodeLookup}
                  onAddLineItem={handleAddLineItem}
                  onRemoveLineItem={handleRemoveLineItem}
                  error={validationErrors.lineItems}
                />

                {/* Order Summary */}
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  grandTotal={grandTotal}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-6 border-t border-border">
              <div className="mb-4 sm:mb-0">
                {validationErrors.submit && (
                  <p className="text-error text-sm">{validationErrors.submit}</p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/procurement-kanban-dashboard')}
                  className="px-6 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Create Purchase Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Modals */}
      {showBulkImport && (
        <BulkImportModal
          onClose={() => setShowBulkImport(false)}
          onImport={(data) => {
            setFormData(prev => ({ ...prev, lineItems: data }));
            setShowBulkImport(false);
          }}
        />
      )}

      {showTemplates && (
        <TemplateSelector
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={(template) => {
            setFormData(prev => ({ ...prev, ...template }));
            setShowTemplates(false);
          }}
        />
      )}
    </div>
  );
};

export default NewPurchaseOrderCreation;