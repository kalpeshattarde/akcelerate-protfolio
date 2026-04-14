import React from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryDetails = ({ deliveryAddress, notes, onAddressChange, onNotesChange, error }) => {
  const commonAddresses = [
    "123 Main Office Building, San Francisco, CA 94105",
    "456 Warehouse District, Austin, TX 78701",
    "789 Corporate Campus, New York, NY 10001",
    "321 Regional Office, Seattle, WA 98101"
  ];

  return (
    <div className="bg-surface rounded-card border border-border p-6">
      <h2 className="text-lg font-heading-semibold text-text-primary mb-4">
        Delivery Details
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            Delivery Address *
          </label>
          <textarea
            value={deliveryAddress}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Enter complete delivery address..."
            rows={3}
            className={`w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
              error ? 'border-error' : 'border-border'
            }`}
          />
          {error && (
            <p className="text-error text-xs mt-1">{error}</p>
          )}
          
          {/* Quick Address Selection */}
          <div className="mt-2">
            <p className="text-xs text-text-secondary mb-2">Quick select common addresses:</p>
            <div className="flex flex-wrap gap-2">
              {commonAddresses.map((address, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onAddressChange(address)}
                  className="text-xs px-2 py-1 bg-secondary-100 text-text-secondary rounded-button hover:bg-secondary-200 transition-smooth"
                >
                  {address.split(',')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-body-medium text-text-primary mb-2">
            Special Instructions / Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add any special delivery instructions, handling requirements, or additional notes..."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <div className="flex items-center mt-2 text-xs text-text-secondary">
            <Icon name="Info" size={12} className="mr-1" />
            Include any specific delivery time preferences, contact person, or handling instructions
          </div>
        </div>

        {/* Delivery Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Delivery Priority
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="standard">Standard Delivery</option>
              <option value="expedited">Expedited Delivery</option>
              <option value="urgent">Urgent Delivery</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-body-medium text-text-primary mb-2">
              Preferred Time
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="business">Business Hours (9 AM - 5 PM)</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;