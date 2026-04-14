'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const PaymentForm = ({ formData, onFormChange, errors }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(formData?.paymentMethod || 'card');

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onFormChange('payment', { [name]: value });
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    onFormChange('payment', { paymentMethod: method });
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e?.target?.value);
    onFormChange('payment', { cardNumber: formatted });
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCardIcon' },
    { id: 'paypal', name: 'PayPal', icon: 'CurrencyDollarIcon' },
    { id: 'apple', name: 'Apple Pay', icon: 'DevicePhoneMobileIcon' },
    { id: 'google', name: 'Google Pay', icon: 'DevicePhoneMobileIcon' },
  ];

  return (
    <div className="bg-background p-6 border border-border">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="LockClosedIcon" size={20} className="text-accent" />
        <h3 className="font-heading font-bold text-lg text-foreground">Payment Information</h3>
      </div>
      {/* Payment Method Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Payment Method</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {paymentMethods?.map((method) => (
            <button
              key={method?.id}
              type="button"
              onClick={() => handlePaymentMethodChange(method?.id)}
              className={`p-3 border rounded-none flex flex-col items-center space-y-2 transition-colors btn-press ${
                selectedPaymentMethod === method?.id
                  ? 'border-accent bg-accent/10 text-accent' :'border-border bg-background text-foreground hover:border-accent/50'
              }`}
            >
              <Icon name={method?.icon} size={20} />
              <span className="text-xs font-medium">{method?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Card Payment Form */}
      {selectedPaymentMethod === 'card' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-1">
              Card Number *
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData?.cardNumber || ''}
              onChange={handleCardNumberChange}
              maxLength="19"
              className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                errors?.cardNumber ? 'border-error' : 'border-border'
              }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors?.cardNumber && (
              <p className="mt-1 text-xs text-error flex items-center">
                <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
                {errors?.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-foreground mb-1">
                Expiry Date *
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData?.expiryDate || ''}
                onChange={handleInputChange}
                maxLength="5"
                className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors?.expiryDate ? 'border-error' : 'border-border'
                }`}
                placeholder="MM/YY"
              />
              {errors?.expiryDate && (
                <p className="mt-1 text-xs text-error flex items-center">
                  <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
                  {errors?.expiryDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-1">
                CVV *
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData?.cvv || ''}
                onChange={handleInputChange}
                maxLength="4"
                className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors?.cvv ? 'border-error' : 'border-border'
                }`}
                placeholder="123"
              />
              {errors?.cvv && (
                <p className="mt-1 text-xs text-error flex items-center">
                  <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
                  {errors?.cvv}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-foreground mb-1">
              Name on Card *
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData?.cardName || ''}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                errors?.cardName ? 'border-error' : 'border-border'
              }`}
              placeholder="Enter name as it appears on card"
            />
            {errors?.cardName && (
              <p className="mt-1 text-xs text-error flex items-center">
                <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
                {errors?.cardName}
              </p>
            )}
          </div>
        </div>
      )}
      {/* Alternative Payment Methods */}
      {selectedPaymentMethod !== 'card' && (
        <div className="text-center py-8">
          <Icon name="InformationCircleIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-foreground font-medium mb-2">
            You will be redirected to {paymentMethods?.find(m => m?.id === selectedPaymentMethod)?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            Complete your payment securely through their platform
          </p>
        </div>
      )}
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-muted border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheckIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Secure Payment</p>
            <p className="text-xs text-muted-foreground">
              Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentForm.propTypes = {
  formData: PropTypes?.shape({
    paymentMethod: PropTypes?.string,
    cardNumber: PropTypes?.string,
    expiryDate: PropTypes?.string,
    cvv: PropTypes?.string,
    cardName: PropTypes?.string,
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  errors: PropTypes?.object?.isRequired,
};

export default PaymentForm;