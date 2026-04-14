import React from 'react';
import Icon from '../AppIcon';

const BookingProgressIndicator = ({ currentStep = 1, completedSteps = [], onStepClick }) => {
  const steps = [
    { id: 1, name: 'Search', icon: 'Search', path: '/search-results-dashboard' },
    { id: 2, name: 'Select', icon: 'CheckCircle', path: '/search-results-dashboard' },
    { id: 3, name: 'Review', icon: 'FileText', path: '/booking-review-payment' },
    { id: 4, name: 'Payment', icon: 'CreditCard', path: '/booking-review-payment' },
    { id: 5, name: 'Confirmation', icon: 'CheckCircle2', path: '/user-dashboard-trip-management' },
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'completed';
    return 'upcoming';
  };

  const handleStepClick = (step) => {
    if (onStepClick && (completedSteps.includes(step.id) || step.id <= currentStep)) {
      onStepClick(step);
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Progress Indicator */}
        <div className="hidden md:flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const isClickable = completedSteps.includes(step.id) || step.id <= currentStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleStepClick(step)}
                    disabled={!isClickable}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ease-out ${
                      status === 'completed'
                        ? 'bg-success text-white'
                        : status === 'current' ?'bg-primary text-white' :'bg-secondary-200 text-text-secondary'
                    } ${
                      isClickable 
                        ? 'hover:scale-105 cursor-pointer' :'cursor-not-allowed'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step.icon} size={20} />
                    )}
                  </button>
                  <span className={`mt-2 text-xs font-body-medium ${
                    status === 'current' ?'text-primary' 
                      : status === 'completed' ?'text-success' :'text-text-secondary'
                  }`}>
                    {step.name}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors duration-200 ${
                    completedSteps.includes(step.id) || step.id < currentStep
                      ? 'bg-success' :'bg-secondary-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Indicator */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body-medium text-text-primary">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-text-secondary">
              {steps.find(s => s.id === currentStep)?.name}
            </span>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <div
                  key={step.id}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-200 ease-out ${
                    status === 'completed'
                      ? 'bg-success text-white'
                      : status === 'current' ?'bg-primary text-white' :'bg-secondary-200 text-text-secondary'
                  }`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={12} />
                  ) : (
                    step.id
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;