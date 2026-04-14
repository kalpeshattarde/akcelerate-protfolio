import React from 'react';
import Icon from 'components/AppIcon';

const CancellationPolicyModal = ({ isOpen, onClose, bookingData }) => {
  if (!isOpen) return null;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="fixed inset-0 bg-text-primary bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-heading-semibold text-text-primary">
            Cancellation and Refund Policies
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-200 ease-out"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Flight Cancellation Policy */}
            {bookingData.flight && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-secondary-100 p-3 flex items-center space-x-2">
                  <Icon name="Plane" size={18} className="text-primary" />
                  <h4 className="font-body-medium text-text-primary">
                    Flight Cancellation Policy
                  </h4>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        bookingData.flight.refundable 
                          ? 'bg-success-100 text-success' :'bg-warning-100 text-warning'
                      }`}>
                        <Icon name={bookingData.flight.refundable ? "Check" : "X"} size={16} />
                      </div>
                      <div>
                        <p className="font-body-medium text-text-primary">
                          {bookingData.flight.refundable ? "Refundable" : "Non-refundable"}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {bookingData.flight.refundable 
                            ? "This flight can be cancelled with a refund, subject to a cancellation fee." :"This flight cannot be cancelled for a refund. Changes may be possible for a fee."}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pl-11">
                      <h5 className="text-sm font-body-medium text-text-primary mb-2">
                        Cancellation Fees
                      </h5>
                      <ul className="space-y-2 text-sm text-text-secondary">
                        <li className="flex items-start space-x-2">
                          <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                          <span>More than 7 days before departure: $150 per passenger</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                          <span>2-7 days before departure: $250 per passenger</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                          <span>Less than 48 hours before departure: No refund</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Hotel Cancellation Policy */}
            {bookingData.hotel && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-secondary-100 p-3 flex items-center space-x-2">
                  <Icon name="Building2" size={18} className="text-primary" />
                  <h4 className="font-body-medium text-text-primary">
                    Hotel Cancellation Policy
                  </h4>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        bookingData.hotel.refundable 
                          ? 'bg-success-100 text-success' :'bg-warning-100 text-warning'
                      }`}>
                        <Icon name={bookingData.hotel.refundable ? "Check" : "X"} size={16} />
                      </div>
                      <div>
                        <p className="font-body-medium text-text-primary">
                          {bookingData.hotel.refundable ? "Free cancellation" : "Non-refundable"}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {bookingData.hotel.refundable 
                            ? `Free cancellation until ${formatDate(bookingData.hotel.cancellationDeadline)}` 
                            : "This hotel booking cannot be cancelled for a refund."}
                        </p>
                      </div>
                    </div>
                    
                    {bookingData.hotel.refundable && (
                      <div className="pl-11">
                        <h5 className="text-sm font-body-medium text-text-primary mb-2">
                          Cancellation Timeline
                        </h5>
                        <ul className="space-y-2 text-sm text-text-secondary">
                          <li className="flex items-start space-x-2">
                            <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                            <span>Until {formatDate(bookingData.hotel.cancellationDeadline)}: Full refund</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                            <span>After {formatDate(bookingData.hotel.cancellationDeadline)}: No refund</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Car Rental Cancellation Policy */}
            {bookingData.car && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-secondary-100 p-3 flex items-center space-x-2">
                  <Icon name="Car" size={18} className="text-primary" />
                  <h4 className="font-body-medium text-text-primary">
                    Car Rental Cancellation Policy
                  </h4>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-success-100 text-success">
                        <Icon name="Check" size={16} />
                      </div>
                      <div>
                        <p className="font-body-medium text-text-primary">
                          Free cancellation
                        </p>
                        <p className="text-sm text-text-secondary">
                          This car rental can be cancelled for free up to 24 hours before pickup.
                        </p>
                      </div>
                    </div>
                    
                    <div className="pl-11">
                      <h5 className="text-sm font-body-medium text-text-primary mb-2">
                        Cancellation Timeline
                      </h5>
                      <ul className="space-y-2 text-sm text-text-secondary">
                        <li className="flex items-start space-x-2">
                          <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                          <span>More than 24 hours before pickup: Full refund</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                          <span>Less than 24 hours before pickup: One day charge</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
                          <span>No-show: Full rental amount charged</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* General Cancellation Information */}
            <div className="bg-secondary-100 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-text-primary mt-0.5" />
                <div>
                  <h5 className="font-body-medium text-text-primary mb-1">
                    How to Cancel or Modify Your Booking
                  </h5>
                  <p className="text-sm text-text-secondary">
                    To cancel or modify your booking, please go to "My Trips" in your account dashboard or contact our customer service team at support@travelhub.com or +1-800-123-4567. Please have your booking reference number ({bookingData.id}) ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 ease-out"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicyModal;