import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const CheckoutProgress = ({ currentStep, steps }) => {
  return (
    <div className="w-full bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isLast = index === steps?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm
                      ${isCompleted 
                        ? 'bg-success text-success-foreground' 
                        : isActive 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Icon name="CheckIcon" size={16} />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`font-heading font-semibold text-sm ${isActive ? 'text-accent' : 'text-foreground'}`}>
                      {step?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step?.description}</p>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`h-0.5 ${
                        isCompleted ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

CheckoutProgress.propTypes = {
  currentStep: PropTypes?.number?.isRequired,
  steps: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};

export default CheckoutProgress;