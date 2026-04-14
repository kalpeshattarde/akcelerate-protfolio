'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const PromoCode = ({ onPromoApply, appliedPromo, onPromoRemove }) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  const validPromoCodes = {
    'WELCOME10': { discount: 0.10, description: '10% off your first order' },
    'SAVE20': { discount: 0.20, description: '20% off orders over $100' },
    'LUXURY15': { discount: 0.15, description: '15% off luxury items' },
  };

  const handleApplyPromo = async () => {
    if (!promoCode?.trim()) {
      setError('Please enter a promo code');
      return;
    }

    setIsApplying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const upperCode = promoCode?.toUpperCase();
      if (validPromoCodes?.[upperCode]) {
        onPromoApply(upperCode, validPromoCodes?.[upperCode]?.discount);
        setPromoCode('');
      } else {
        setError('Invalid promo code. Please try again.');
      }
      setIsApplying(false);
    }, 1000);
  };

  const handleRemovePromo = () => {
    onPromoRemove();
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleApplyPromo();
    }
  };

  return (
    <div className="bg-background p-6 border border-border">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TicketIcon" size={20} className="text-accent" />
        <h3 className="font-heading font-bold text-lg text-foreground">Promo Code</h3>
      </div>
      {appliedPromo ? (
        <div className="flex items-center justify-between p-4 bg-success/10 border border-success">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircleIcon" size={20} className="text-success" />
            <div>
              <p className="font-medium text-success">{appliedPromo?.code} Applied</p>
              <p className="text-sm text-success/80">
                {validPromoCodes?.[appliedPromo?.code]?.description}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemovePromo}
            className="text-success hover:text-success/80 transition-colors btn-press"
            aria-label="Remove promo code"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Enter promo code"
                className={`w-full px-3 py-2 border rounded-none bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent ${
                  error ? 'border-error' : 'border-border'
                }`}
                disabled={isApplying}
              />
              {error && (
                <p className="mt-1 text-xs text-error flex items-center">
                  <Icon name="ExclamationTriangleIcon" size={12} className="mr-1" />
                  {error}
                </p>
              )}
            </div>
            <button
              onClick={handleApplyPromo}
              disabled={isApplying || !promoCode?.trim()}
              className="px-6 py-2 bg-accent text-accent-foreground font-heading font-semibold uppercase tracking-wide text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press"
            >
              {isApplying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Applying</span>
                </div>
              ) : (
                'Apply'
              )}
            </button>
          </div>

          {/* Available Promo Codes Hint */}
          <div className="p-3 bg-muted border border-border">
            <p className="text-xs text-muted-foreground mb-2">Available promo codes:</p>
            <div className="space-y-1">
              {Object.entries(validPromoCodes)?.map(([code, details]) => (
                <button
                  key={code}
                  onClick={() => setPromoCode(code)}
                  className="block text-xs text-accent hover:text-accent/80 transition-colors"
                >
                  {code} - {details?.description}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PromoCode.propTypes = {
  onPromoApply: PropTypes?.func?.isRequired,
  appliedPromo: PropTypes?.shape({
    code: PropTypes?.string?.isRequired,
    discount: PropTypes?.number?.isRequired,
  }),
  onPromoRemove: PropTypes?.func?.isRequired,
};

export default PromoCode;