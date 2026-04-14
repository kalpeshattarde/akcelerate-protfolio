// /home/ubuntu/app/procureflow/src/pages/purchase-order-detail-view/components/SupplierSummaryPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SupplierSummaryPanel = ({ purchaseOrder, isEditing }) => {
  const [editableData, setEditableData] = useState({
    deliveryAddress: { ...purchaseOrder.deliveryAddress },
    expectedDelivery: purchaseOrder.expectedDelivery
  });

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleInputChange = (section, field, value) => {
    setEditableData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-surface border border-border rounded-card shadow-elevation-sm">
      <div className="p-4 lg:p-6">
        <h2 className="text-lg font-heading-semibold text-text-primary mb-4 lg:mb-6">Purchase Order Summary</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Supplier Information */}
          <div className="space-y-4">
            <h3 className="text-base font-heading-medium text-text-primary flex items-center">
              <Icon name="Building" size={18} className="mr-2 text-text-secondary flex-shrink-0" />
              <span className="truncate">Supplier Information</span>
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Company Name</label>
                <p className="text-sm text-text-primary font-body-medium break-words">{purchaseOrder.supplier.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Contact Person</label>
                <p className="text-sm text-text-primary break-words">{purchaseOrder.supplier.contactPerson}</p>
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Email</label>
                <p className="text-sm text-text-primary break-all">{purchaseOrder.supplier.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Phone</label>
                <p className="text-sm text-text-primary">{purchaseOrder.supplier.phone}</p>
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Address</label>
                <div className="text-sm text-text-primary">
                  <p className="break-words">{purchaseOrder.supplier.address.street}</p>
                  <p className="break-words">{purchaseOrder.supplier.address.city}, {purchaseOrder.supplier.address.state} {purchaseOrder.supplier.address.zipCode}</p>
                  <p className="break-words">{purchaseOrder.supplier.address.country}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-body-medium text-text-secondary block mb-1">Payment Terms</label>
                  <p className="text-sm text-text-primary">{purchaseOrder.supplier.paymentTerms}</p>
                </div>
                <div>
                  <label className="text-sm font-body-medium text-text-secondary block mb-1">Tax ID</label>
                  <p className="text-sm text-text-primary">{purchaseOrder.supplier.taxId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <h3 className="text-base font-heading-medium text-text-primary flex items-center">
              <Icon name="MapPin" size={18} className="mr-2 text-text-secondary flex-shrink-0" />
              <span className="truncate">Delivery Information</span>
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Delivery Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.deliveryAddress.name}
                    onChange={(e) => handleInputChange('deliveryAddress', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                ) : (
                  <p className="text-sm text-text-primary font-body-medium break-words">{editableData.deliveryAddress.name}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Address</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editableData.deliveryAddress.street}
                      onChange={(e) => handleInputChange('deliveryAddress', 'street', e.target.value)}
                      placeholder="Street Address"
                      className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editableData.deliveryAddress.city}
                        onChange={(e) => handleInputChange('deliveryAddress', 'city', e.target.value)}
                        placeholder="City"
                        className="px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                      <input
                        type="text"
                        value={editableData.deliveryAddress.state}
                        onChange={(e) => handleInputChange('deliveryAddress', 'state', e.target.value)}
                        placeholder="State"
                        className="px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      value={editableData.deliveryAddress.zipCode}
                      onChange={(e) => handleInputChange('deliveryAddress', 'zipCode', e.target.value)}
                      placeholder="ZIP Code"
                      className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>
                ) : (
                  <div className="text-sm text-text-primary">
                    <p className="break-words">{editableData.deliveryAddress.street}</p>
                    <p className="break-words">{editableData.deliveryAddress.city}, {editableData.deliveryAddress.state} {editableData.deliveryAddress.zipCode}</p>
                    <p className="break-words">{editableData.deliveryAddress.country}</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Contact Person</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableData.deliveryAddress.contactPerson}
                    onChange={(e) => handleInputChange('deliveryAddress', 'contactPerson', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                ) : (
                  <p className="text-sm text-text-primary break-words">{editableData.deliveryAddress.contactPerson}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editableData.deliveryAddress.phone}
                    onChange={(e) => handleInputChange('deliveryAddress', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                ) : (
                  <p className="text-sm text-text-primary">{editableData.deliveryAddress.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Order Details & Financial Summary */}
          <div className="space-y-4 lg:col-span-2 xl:col-span-1">
            <h3 className="text-base font-heading-medium text-text-primary flex items-center">
              <Icon name="Calendar" size={18} className="mr-2 text-text-secondary flex-shrink-0" />
              <span className="truncate">Order Details</span>
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Created Date</label>
                <p className="text-sm text-text-primary">{formatDate(purchaseOrder.createdDate)}</p>
              </div>
              
              <div>
                <label className="text-sm font-body-medium text-text-secondary block mb-1">Expected Delivery</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editableData.expectedDelivery.toISOString().split('T')[0]}
                    onChange={(e) => handleInputChange('', 'expectedDelivery', new Date(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                ) : (
                  <p className="text-sm text-text-primary">{formatDate(editableData.expectedDelivery)}</p>
                )}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-base font-heading-medium text-text-primary mb-3 flex items-center">
                <Icon name="DollarSign" size={18} className="mr-2 text-text-secondary flex-shrink-0" />
                <span className="truncate">Financial Summary</span>
              </h4>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Subtotal</span>
                  <span className="text-sm text-text-primary font-body-medium break-words">
                    {formatCurrency(purchaseOrder.financials.subtotal)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Tax</span>
                  <span className="text-sm text-text-primary font-body-medium break-words">
                    {formatCurrency(purchaseOrder.financials.taxTotal)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Shipping</span>
                  <span className="text-sm text-text-primary font-body-medium break-words">
                    {formatCurrency(purchaseOrder.financials.shippingCost)}
                  </span>
                </div>
                
                {purchaseOrder.financials.discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">Discount</span>
                    <span className="text-sm text-success font-body-medium break-words">
                      -{formatCurrency(purchaseOrder.financials.discount)}
                    </span>
                  </div>
                )}
                
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-heading-medium text-text-primary">Grand Total</span>
                    <span className="text-base font-heading-semibold text-text-primary break-words">
                      {formatCurrency(purchaseOrder.financials.grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierSummaryPanel;