'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  tax, 
  total, 
  onApplyPromoCode, 
  onSelectShipping,
  selectedShipping 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 0, days: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 15.00, days: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 35.00, days: '1 business day' }
  ];

  const handleApplyPromo = async () => {
    if (!promoCode?.trim()) return;
    
    setIsApplyingPromo(true);
    try {
      const result = await onApplyPromoCode(promoCode);
      setPromoApplied(result);
      if (result?.success) {
        setPromoCode('');
      }
    } catch (error) {
      console.error('Failed to apply promo code:', error);
      setPromoApplied({ success: false, message: 'Failed to apply promo code' });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleShippingChange = (shippingId) => {
    const selectedOption = shippingOptions?.find(option => option?.id === shippingId);
    onSelectShipping(selectedOption);
  };

  return (
    <div className="bg-card border border-border p-6 sticky top-24">
      <h2 className="font-heading font-bold text-xl text-foreground mb-6">
        Order Summary
      </h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            placeholder="Enter code"
            disabled={isApplyingPromo}
            className="flex-1 px-3 py-2 border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
          <button
            onClick={handleApplyPromo}
            disabled={!promoCode?.trim() || isApplyingPromo}
            className="px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed btn-press"
          >
            {isApplyingPromo ? 'Applying...' : 'Apply'}
          </button>
        </div>
        
        {promoApplied && (
          <p className={`text-sm mt-2 ${promoApplied?.success ? 'text-success' : 'text-error'}`}>
            {promoApplied?.message}
          </p>
        )}
      </div>
      {/* Shipping Options */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Shipping Options</h3>
        <div className="space-y-2">
          {shippingOptions?.map((option) => (
            <label key={option?.id} className="flex items-center gap-3 p-3 border border-border hover:bg-muted cursor-pointer transition-colors">
              <input
                type="radio"
                name="shipping"
                value={option?.id}
                checked={selectedShipping?.id === option?.id}
                onChange={() => handleShippingChange(option?.id)}
                className="w-4 h-4 text-accent border-border focus:ring-accent"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{option?.name}</p>
                    <p className="text-sm text-muted-foreground">{option?.days}</p>
                  </div>
                  <p className="font-medium text-foreground">
                    {option?.price === 0 ? 'FREE' : `$${option?.price?.toFixed(2)}`}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Order Totals */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-foreground">
          <span>Subtotal</span>
          <span>${subtotal?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping?.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between text-foreground">
          <span>Tax</span>
          <span>${tax?.toFixed(2)}</span>
        </div>
        
        {promoApplied?.success && promoApplied?.discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount ({promoApplied?.code})</span>
            <span>-${promoApplied?.discount?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between font-heading font-bold text-lg text-foreground">
            <span>Total</span>
            <span>${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Icon name="ShieldCheckIcon" size={16} />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="LockClosedIcon" size={16} />
          <span>SSL Encrypted</span>
        </div>
      </div>
      {/* Checkout Button */}
      <button className="w-full bg-accent text-accent-foreground font-heading font-bold text-lg py-4 hover:bg-accent/90 transition-colors btn-press">
        PROCEED TO CHECKOUT
      </button>
      {/* Payment Icons */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground mb-2">We Accept</p>
        <div className="flex justify-center gap-2">
          <div className="w-8 h-5 bg-muted flex items-center justify-center text-xs font-bold">VISA</div>
          <div className="w-8 h-5 bg-muted flex items-center justify-center text-xs font-bold">MC</div>
          <div className="w-8 h-5 bg-muted flex items-center justify-center text-xs font-bold">AMEX</div>
          <div className="w-8 h-5 bg-muted flex items-center justify-center text-xs font-bold">PP</div>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  subtotal: PropTypes?.number?.isRequired,
  shipping: PropTypes?.number?.isRequired,
  tax: PropTypes?.number?.isRequired,
  total: PropTypes?.number?.isRequired,
  onApplyPromoCode: PropTypes?.func?.isRequired,
  onSelectShipping: PropTypes?.func?.isRequired,
  selectedShipping: PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    name: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    days: PropTypes?.string?.isRequired
  })
};

export default OrderSummary;