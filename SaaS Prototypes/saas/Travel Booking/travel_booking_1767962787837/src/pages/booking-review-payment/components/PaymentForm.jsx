import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PaymentForm = ({ paymentDetails, onPaymentDetailsChange }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [currency, setCurrency] = useState('USD');
  
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };
  
  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };
  
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    onPaymentDetailsChange({
      target: {
        name: 'cardNumber',
        value: formattedValue
      }
    });
  };
  
  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    
    return digits;
  };
  
  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    onPaymentDetailsChange({
      target: {
        name: 'expiryDate',
        value: formattedValue
      }
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Currency Selection */}
      <div>
        <label htmlFor="currency" className="block text-sm text-text-secondary mb-1">
          Currency
        </label>
        <select
          id="currency"
          value={currency}
          onChange={handleCurrencyChange}
          className="input-field w-full sm:w-48"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
        </select>
      </div>
      
      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm text-text-secondary mb-2">
          Payment Method
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('credit-card')}
            className={`p-3 border rounded-lg flex items-center space-x-3 transition-all duration-200 ease-out ${
              paymentMethod === 'credit-card' ?'border-primary bg-primary-50' :'border-border hover:border-primary'
            }`}
          >
            <Icon name="CreditCard" size={20} className={paymentMethod === 'credit-card' ? 'text-primary' : 'text-text-secondary'} />
            <span className={paymentMethod === 'credit-card' ? 'text-primary' : 'text-text-secondary'}>
              Credit Card
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('paypal')}
            className={`p-3 border rounded-lg flex items-center space-x-3 transition-all duration-200 ease-out ${
              paymentMethod === 'paypal' ?'border-primary bg-primary-50' :'border-border hover:border-primary'
            }`}
          >
            <Icon name="CreditCard" size={20} className={paymentMethod === 'paypal' ? 'text-primary' : 'text-text-secondary'} />
            <span className={paymentMethod === 'paypal' ? 'text-primary' : 'text-text-secondary'}>
              PayPal
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('apple-pay')}
            className={`p-3 border rounded-lg flex items-center space-x-3 transition-all duration-200 ease-out ${
              paymentMethod === 'apple-pay' ?'border-primary bg-primary-50' :'border-border hover:border-primary'
            }`}
          >
            <Icon name="CreditCard" size={20} className={paymentMethod === 'apple-pay' ? 'text-primary' : 'text-text-secondary'} />
            <span className={paymentMethod === 'apple-pay' ? 'text-primary' : 'text-text-secondary'}>
              Apple Pay
            </span>
          </button>
        </div>
      </div>
      
      {/* Credit Card Form */}
      {paymentMethod === 'credit-card' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm text-text-secondary mb-1">
              Card Number*
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="input-field w-full pl-10"
                maxLength={19}
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Icon name="CreditCard" size={16} className="text-text-secondary" />
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="cardholderName" className="block text-sm text-text-secondary mb-1">
              Cardholder Name*
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={paymentDetails.cardholderName}
              onChange={onPaymentDetailsChange}
              placeholder="John Doe"
              className="input-field w-full"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm text-text-secondary mb-1">
                Expiry Date*
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                className="input-field w-full"
                maxLength={5}
                required
              />
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm text-text-secondary mb-1">
                CVV*
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={onPaymentDetailsChange}
                  placeholder="123"
                  className="input-field w-full"
                  maxLength={4}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200 ease-out"
                  title="CVV is the 3 or 4 digit security code on your card"
                >
                  <Icon name="HelpCircle" size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              name="saveCard"
              checked={paymentDetails.saveCard}
              onChange={onPaymentDetailsChange}
              className="h-4 w-4 rounded border-secondary-300 text-primary focus:ring-primary"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-text-secondary">
              Save this card for future bookings
            </label>
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            <div className="w-10 h-6 bg-secondary-100 rounded flex items-center justify-center">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
            </div>
            <div className="w-10 h-6 bg-secondary-100 rounded flex items-center justify-center">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
            </div>
            <div className="w-10 h-6 bg-secondary-100 rounded flex items-center justify-center">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
            </div>
            <div className="w-10 h-6 bg-secondary-100 rounded flex items-center justify-center">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
            </div>
          </div>
        </div>
      )}
      
      {/* PayPal Form */}
      {paymentMethod === 'paypal' && (
        <div className="border border-border rounded-lg p-4 text-center">
          <Icon name="CreditCard" size={40} className="text-primary mx-auto mb-3" />
          <p className="text-text-secondary mb-4">
            You will be redirected to PayPal to complete your payment securely.
          </p>
          <button
            type="button"
            className="py-2 px-4 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ease-out"
          >
            Continue to PayPal
          </button>
        </div>
      )}
      
      {/* Apple Pay Form */}
      {paymentMethod === 'apple-pay' && (
        <div className="border border-border rounded-lg p-4 text-center">
          <Icon name="CreditCard" size={40} className="text-primary mx-auto mb-3" />
          <p className="text-text-secondary mb-4">
            Click the button below to pay with Apple Pay.
          </p>
          <button
            type="button"
            className="py-2 px-4 bg-black text-white font-body-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 ease-out"
          >
            <Icon name="CreditCard" size={16} className="inline-block mr-2" />
            Pay
          </button>
        </div>
      )}
      
      {/* Security Information */}
      <div className="bg-secondary-100 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={20} className="text-text-primary mt-0.5" />
          <div>
            <h5 className="font-body-medium text-text-primary mb-1">
              Secure Payment
            </h5>
            <p className="text-sm text-text-secondary">
              Your payment information is encrypted and securely processed. We use 3-D Secure technology for additional verification when required by your bank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;