import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { id: 1, title: 'Personal Info', icon: 'User' },
    { id: 2, title: 'Organization', icon: 'Building' },
    { id: 3, title: 'Terms & Privacy', icon: 'Shield' }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step?.id < currentStep 
                  ? 'bg-success border-success text-success-foreground' 
                  : step?.id === currentStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-surface border-border text-muted-foreground'
              }`}>
                {step?.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-xs font-medium ${
                  step?.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </p>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                step?.id < currentStep ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;