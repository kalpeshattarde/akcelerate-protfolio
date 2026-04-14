import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BookingSummary = ({ bookingData, carbonOffset, isLoading, onSubmit }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const calculateSubtotal = () => {
    let subtotal = 0;
    if (bookingData.flight) {
      subtotal += bookingData.flight.price;
    }
    if (bookingData.hotel) {
      subtotal += bookingData.hotel.price;
    }
    if (bookingData.car) {
      subtotal += bookingData.car.price;
    }
    return subtotal;
  };
  
  const calculateTaxesAndFees = () => {
    let taxes = 0;
    let fees = 0;
    
    if (bookingData.flight) {
      taxes += bookingData.flight.taxes;
      fees += bookingData.flight.fees;
    }
    if (bookingData.hotel) {
      taxes += bookingData.hotel.taxes;
      fees += bookingData.hotel.fees;
    }
    if (bookingData.car) {
      taxes += bookingData.car.taxes;
      fees += bookingData.car.fees;
    }
    
    return { taxes, fees };
  };
  
  const subtotal = calculateSubtotal();
  const { taxes, fees } = calculateTaxesAndFees();
  const carbonOffsetAmount = carbonOffset ? bookingData.carbonOffsetPrice : 0;
  const total = subtotal + taxes + fees + carbonOffsetAmount;
  
  return (
    <div className="card overflow-hidden">
      <div className="p-4 bg-secondary-100 border-b border-border">
        <h2 className="text-lg font-heading-semibold text-text-primary">
          Price Summary
        </h2>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {/* Services Summary */}
          <div className="space-y-2">
            {bookingData.flight && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Plane" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Flight</span>
                </div>
                <span className="text-sm font-body-medium text-text-primary">
                  ${bookingData.flight.price.toFixed(2)}
                </span>
              </div>
            )}
            
            {bookingData.hotel && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Building2" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Hotel</span>
                </div>
                <span className="text-sm font-body-medium text-text-primary">
                  ${bookingData.hotel.price.toFixed(2)}
                </span>
              </div>
            )}
            
            {bookingData.car && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Car" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Car Rental</span>
                </div>
                <span className="text-sm font-body-medium text-text-primary">
                  ${bookingData.car.price.toFixed(2)}
                </span>
              </div>
            )}
          </div>
          
          <hr className="border-border" />
          
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Subtotal</span>
            <span className="text-sm font-body-medium text-text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          
          {/* Taxes and Fees */}
          <div className="flex items-center justify-between">
            <button 
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-sm text-text-secondary flex items-center space-x-1 hover:text-primary transition-colors duration-200 ease-out"
            >
              <span>Taxes & Fees</span>
              <Icon 
                name={showBreakdown ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </button>
            <span className="text-sm font-body-medium text-text-primary">
              ${(taxes + fees).toFixed(2)}
            </span>
          </div>
          
          {/* Taxes and Fees Breakdown */}
          {showBreakdown && (
            <div className="pl-4 space-y-2 animation-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Taxes</span>
                <span className="text-xs text-text-secondary">
                  ${taxes.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">Service Fees</span>
                <span className="text-xs text-text-secondary">
                  ${fees.toFixed(2)}
                </span>
              </div>
            </div>
          )}
          
          {/* Carbon Offset */}
          {carbonOffset && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Leaf" size={16} className="text-success" />
                <span className="text-sm text-success">Carbon Offset</span>
              </div>
              <span className="text-sm font-body-medium text-success">
                ${bookingData.carbonOffsetPrice.toFixed(2)}
              </span>
            </div>
          )}
          
          <hr className="border-border" />
          
          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-base font-body-medium text-text-primary">
              Total
            </span>
            <span className="text-xl font-heading-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>
          
          {/* Currency Note */}
          <p className="text-xs text-text-secondary">
            All prices are in {bookingData.currency}
          </p>
          
          {/* Complete Booking Button */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ease-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                Complete Booking
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </>
            )}
          </button>
          
          {/* Secure Payment Note */}
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Lock" size={16} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">
              Secure payment processing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;