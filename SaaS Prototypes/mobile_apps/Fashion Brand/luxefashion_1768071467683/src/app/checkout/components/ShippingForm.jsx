'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const ShippingForm = ({ formData, onFormChange, errors }) => {
  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onFormChange('shipping', { [name]: value });
  };

  const handleSameAsBillingChange = (e) => {
    setSameAsBilling(e?.target?.checked);
    if (e?.target?.checked && formData?.billing) {
      onFormChange('shipping', {
        firstName: formData?.billing?.firstName || '',
        lastName: formData?.billing?.lastName || '',
        address: formData?.billing?.address || '',
        city: formData?.billing?.city || '',
        state: formData?.billing?.state || '',
        zipCode: formData?.billing?.zipCode || '',
        country: formData?.billing?.country || '',
      });
    }
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
  ];

  return (
    <div className="bg-background p-6 border border-border">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="TruckIcon" size={20} className="text-accent" />
        <h3 className="font-heading font-bold text-lg text-foreground">Shipping Address</h3>
      </div>
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={handleSameAsBillingChange}
            className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
          />
          <span className="text-sm text-foreground">Same as billing address</span>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="shipping-firstName" className="block text-sm font-medium text-foreground mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="shipping-firstName"
            name="firstName"
            value={formData?.firstName || ''}
            onChange={handleInputChange}
            disabled={sameAsBilling}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.firstName ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter first name"
          />
          {errors?.firstName && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="shipping-lastName" className="block text-sm font-medium text-foreground mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="shipping-lastName"
            name="lastName"
            value={formData?.lastName || ''}
            onChange={handleInputChange}
            disabled={sameAsBilling}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.lastName ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter last name"
          />
          {errors?.lastName && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.lastName}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="shipping-address" className="block text-sm font-medium text-foreground mb-1">
            Street Address *
          </label>
          <input
            type="text"
            id="shipping-address"
            name="address"
            value={formData?.address || ''}
            onChange={handleInputChange}
            disabled={sameAsBilling}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.address ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter street address"
          />
          {errors?.address && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.address}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="shipping-city" className="block text-sm font-medium text-foreground mb-1">
            City *
          </label>
          <input
            type="text"
            id="shipping-city"
            name="city"
            value={formData?.city || ''}
            onChange={handleInputChange}
            disabled={sameAsBilling}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.city ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter city"
          />
          {errors?.city && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.city}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="shipping-state" className="block text-sm font-medium text-foreground mb-1">
            State/Province *
          </label>
          <input
            type="text"
            id="shipping-state"
            name="state"
            value={formData?.state || ''}
            onChange={handleInputChange}
            disabled={sameAsBilling}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.state ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter state/province"
          />
          {errors?.state && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.state}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="shipping-zipCode" className="block text-sm font-medium text-foreground mb-1">
            ZIP/Postal Code *
          </label>
          <input
            type="text"
            id="shipping-zipCode"
            name="zipCode"
            value={formData?.zipCode || ''}
            onChange={handleInputChange}
            disabled={sameAsBilling}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.zipCode ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter ZIP/postal code"
          />
          {errors?.zipCode && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.zipCode}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="shipping-country" className="block text-sm font-medium text-foreground mb-1">
            Country *
          </label>
          <select
            id="shipping-country"
            name="country"
            value={formData?.country || ''}
            onChange={handleInputChange}
            disabled={sameAsBilling}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.country ? 'border-error' : 'border-border'
            }`}
          >
            <option value="">Select country</option>
            {countries?.map((country) => (
              <option key={country?.code} value={country?.code}>
                {country?.name}
              </option>
            ))}
          </select>
          {errors?.country && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.country}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

ShippingForm.propTypes = {
  formData: PropTypes?.shape({
    firstName: PropTypes?.string,
    lastName: PropTypes?.string,
    address: PropTypes?.string,
    city: PropTypes?.string,
    state: PropTypes?.string,
    zipCode: PropTypes?.string,
    country: PropTypes?.string,
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  errors: PropTypes?.object?.isRequired,
};

export default ShippingForm;