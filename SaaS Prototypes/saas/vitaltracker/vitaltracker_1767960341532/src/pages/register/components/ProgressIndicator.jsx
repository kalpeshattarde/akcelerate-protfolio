import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
              ${index < currentStep 
                ? 'bg-primary border-primary text-white' 
                : index === currentStep 
                  ? 'bg-primary border-primary text-white animate-pulse' :'bg-background border-border text-muted-foreground'
              }
            `}>
              {index < currentStep ? (
                <Icon name="Check" size={20} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            {index < steps?.length - 1 && (
              <div className={`
                w-16 sm:w-24 h-0.5 mx-2 transition-all duration-300
                ${index < currentStep ? 'bg-primary' : 'bg-border'}
              `} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-foreground mb-1">
          {steps?.[currentStep]?.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mt-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;