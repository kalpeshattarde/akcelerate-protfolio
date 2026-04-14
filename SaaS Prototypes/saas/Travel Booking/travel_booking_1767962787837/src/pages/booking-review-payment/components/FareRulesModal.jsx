import React from 'react';
import Icon from 'components/AppIcon';

const FareRulesModal = ({ isOpen, onClose, flightData }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-text-primary bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-heading-semibold text-text-primary">
            Fare Rules and Conditions
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
            <div>
              <h4 className="text-base font-body-medium text-text-primary mb-2">
                Fare Basis: {flightData.outbound.cabin}
              </h4>
              <p className="text-sm text-text-secondary">
                {flightData.outbound.airline} - {flightData.outbound.flightNumber} / {flightData.return?.flightNumber}
              </p>
            </div>
            
            <div>
              <h4 className="text-base font-body-medium text-text-primary mb-2">
                Cancellation Policy
              </h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name={flightData.refundable ? "Check" : "X"} size={16} className={flightData.refundable ? "text-success mt-0.5" : "text-error mt-0.5"} />
                  <div>
                    <p className="text-sm font-body-medium text-text-primary">
                      {flightData.refundable ? "Refundable" : "Non-refundable"}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {flightData.refundable 
                        ? "This ticket can be cancelled with a refund, subject to a cancellation fee of $150 per passenger. Cancellations must be made at least 24 hours before departure."
                        : "This ticket cannot be cancelled for a refund. However, it may be possible to cancel and retain the value as a credit for future travel, minus a cancellation fee."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-body-medium text-text-primary mb-2">
                Change Policy
              </h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="RefreshCw" size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-body-medium text-text-primary">
                      Changes permitted with fee
                    </p>
                    <p className="text-sm text-text-secondary">
                      Changes to this ticket are permitted for a fee of $100 per passenger per change. Any fare difference will also apply. Changes must be made at least 24 hours before departure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-body-medium text-text-primary mb-2">
                No-Show Policy
              </h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-body-medium text-text-primary">
                      No-show results in ticket forfeiture
                    </p>
                    <p className="text-sm text-text-secondary">
                      If you do not check in for your flight and do not notify the airline beforehand, your ticket will be considered a no-show and may be forfeited with no refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-body-medium text-text-primary mb-2">
                Baggage Allowance
              </h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="Luggage" size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-body-medium text-text-primary">
                      Checked Baggage
                    </p>
                    <p className="text-sm text-text-secondary">
                      {flightData.baggageIncluded 
                        ? "1 checked bag up to 23kg (50lbs) per passenger is included in your fare." 
                        : "No checked baggage is included in your fare. Checked bags can be purchased during check-in."}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Icon name="Briefcase" size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-body-medium text-text-primary">
                      Carry-on Baggage
                    </p>
                    <p className="text-sm text-text-secondary">
                      1 carry-on bag up to 7kg (15lbs) and 1 personal item are included in your fare.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-body-medium text-text-primary mb-2">
                Seat Selection
              </h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="Armchair" size={16} className="text-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-text-secondary">
                      Standard seat selection is included in your fare. Premium seats may be available for an additional fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-body-medium text-text-primary mb-2">
                Fare Rules Details
              </h4>
              <p className="text-sm text-text-secondary">
                This fare is subject to availability and may change until ticketed. The rules above are a summary; the full fare rules are governed by the airline's terms and conditions. In case of any discrepancy, the airline's terms and conditions shall prevail.
              </p>
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

export default FareRulesModal;