'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const BillingForm = ({ formData, onFormChange, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onFormChange('billing', { [name]: value });
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
        <Icon name="CreditCardIcon" size={20} className="text-accent" />
        <h3 className="font-heading font-bold text-lg text-foreground">Billing Address</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="billing-firstName" className="block text-sm font-medium text-foreground mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="billing-firstName"
            name="firstName"
            value={formData?.firstName || ''}
            onChange={handleInputChange}
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
          <label htmlFor="billing-lastName" className="block text-sm font-medium text-foreground mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="billing-lastName"
            name="lastName"
            value={formData?.lastName || ''}
            onChange={handleInputChange}
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
          <label htmlFor="billing-email" className="block text-sm font-medium text-foreground mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="billing-email"
            name="email"
            value={formData?.email || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
              errors?.email ? 'border-error' : 'border-border'
            }`}
            placeholder="Enter email address"
          />
          {errors?.email && (
            <p className="mt-1 text-xs text-error flex items-center">
              <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
              {errors?.email}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="billing-address" className="block text-sm font-medium text-foreground mb-1">
            Street Address *
          </label>
          <input
            type="text"
            id="billing-address"
            name="address"
            value={formData?.address || ''}
            onChange={handleInputChange}
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
          <label htmlFor="billing-city" className="block text-sm font-medium text-foreground mb-1">
            City *
          </label>
          <input
            type="text"
            id="billing-city"
            name="city"
            value={formData?.city || ''}
            onChange={handleInputChange}
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
          <label htmlFor="billing-state" className="block text-sm font-medium text-foreground mb-1">
            State/Province *
          </label>
          <input
            type="text"
            id="billing-state"
            name="state"
            value={formData?.state || ''}
            onChange={handleInputChange}
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
          <label htmlFor="billing-zipCode" className="block text-sm font-medium text-foreground mb-1">
            ZIP/Postal Code *
          </label>
          <input
            type="text"
            id="billing-zipCode"
            name="zipCode"
            value={formData?.zipCode || ''}
            onChange={handleInputChange}
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
          <label htmlFor="billing-country" className="block text-sm font-medium text-foreground mb-1">
            Country *
          </label>
          <select
            id="billing-country"
            name="country"
            value={formData?.country || ''}
            onChange={handleInputChange}
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

BillingForm.propTypes = {
  formData: PropTypes?.shape({
    firstName: PropTypes?.string,
    lastName: PropTypes?.string,
    email: PropTypes?.string,
    address: PropTypes?.string,
    city: PropTypes?.string,
    state: PropTypes?.string,
    zipCode: PropTypes?.string,
    country: PropTypes?.string,
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  errors: PropTypes?.object?.isRequired,
};

export default BillingForm;