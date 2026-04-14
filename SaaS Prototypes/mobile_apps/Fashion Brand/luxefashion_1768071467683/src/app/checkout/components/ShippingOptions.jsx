'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const ShippingOptions = ({ selectedOption, onOptionChange }) => {
  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 0,
      icon: 'TruckIcon',
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 15.00,
      icon: 'BoltIcon',
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 35.00,
      icon: 'RocketLaunchIcon',
      popular: true,
    },
  ];

  return (
    <div className="bg-background p-6 border border-border">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="TruckIcon" size={20} className="text-accent" />
        <h3 className="font-heading font-bold text-lg text-foreground">Shipping Options</h3>
      </div>
      <div className="space-y-3">
        {shippingOptions?.map((option) => (
          <div key={option?.id} className="relative">
            {option?.popular && (
              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 z-10">
                POPULAR
              </div>
            )}
            <label
              className={`block p-4 border cursor-pointer transition-colors hover:border-accent/50 ${
                selectedOption === option?.id
                  ? 'border-accent bg-accent/10' :'border-border bg-background'
              }`}
            >
              <input
                type="radio"
                name="shippingOption"
                value={option?.id}
                checked={selectedOption === option?.id}
                onChange={(e) => onOptionChange(e?.target?.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === option?.id
                        ? 'border-accent bg-accent' :'border-border bg-background'
                    }`}
                  >
                    {selectedOption === option?.id && (
                      <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                    )}
                  </div>
                  <Icon 
                    name={option?.icon} 
                    size={20} 
                    className={selectedOption === option?.id ? 'text-accent' : 'text-muted-foreground'} 
                  />
                  <div>
                    <p className={`font-medium ${selectedOption === option?.id ? 'text-accent' : 'text-foreground'}`}>
                      {option?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{option?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${selectedOption === option?.id ? 'text-accent' : 'text-foreground'}`}>
                    {option?.price === 0 ? 'FREE' : `$${option?.price?.toFixed(2)}`}
                  </p>
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Shipping Information</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Free shipping on orders over $100</li>
              <li>• Express and overnight shipping available for most locations</li>
              <li>• Tracking information will be provided via email</li>
              <li>• Signature required for orders over $500</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

ShippingOptions.propTypes = {
  selectedOption: PropTypes?.string?.isRequired,
  onOptionChange: PropTypes?.func?.isRequired,
};

export default ShippingOptions;