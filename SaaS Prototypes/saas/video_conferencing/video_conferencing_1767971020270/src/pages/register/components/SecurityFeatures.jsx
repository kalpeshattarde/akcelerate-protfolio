import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecurityFeatures = ({ onVerificationComplete, isVisible }) => {
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaChallenge, setCaptchaChallenge] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '×'];
    const operator = operators?.[Math.floor(Math.random() * operators?.length)];
    
    let answer;
    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = Math.abs(num1 - num2);
        break;
      case '×':
        answer = num1 * num2;
        break;
      default:
        answer = num1 + num2;
    }

    setCaptchaChallenge(`${num1} ${operator} ${num2} = ?`);
    setCaptchaAnswer(answer?.toString());
  };

  useEffect(() => {
    if (isVisible) {
      generateCaptcha();
    }
  }, [isVisible]);

  const handleCaptchaSubmit = () => {
    if (captchaValue === captchaAnswer) {
      setIsVerified(true);
      setCaptchaError('');
      onVerificationComplete(true);
    } else {
      setCaptchaError('Incorrect answer. Please try again.');
      generateCaptcha();
      setCaptchaValue('');
    }
  };

  const handleRefreshCaptcha = () => {
    generateCaptcha();
    setCaptchaValue('');
    setCaptchaError('');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={16} className="text-accent" />
        </div>
        <h3 className="text-lg font-medium text-foreground">Security Verification</h3>
      </div>
      {!isVerified ? (
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-surface border border-border rounded px-4 py-2 font-mono text-lg">
                  {captchaChallenge}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleRefreshCaptcha}
                  iconName="RotateCcw"
                />
              </div>
            </div>
          </div>

          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Input
                label="Enter the answer"
                type="text"
                placeholder="Your answer"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e?.target?.value)}
                error={captchaError}
                onKeyPress={(e) => e?.key === 'Enter' && handleCaptchaSubmit()}
              />
            </div>
            <Button
              type="button"
              onClick={handleCaptchaSubmit}
              disabled={!captchaValue?.trim()}
              iconName="Check"
            >
              Verify
            </Button>
          </div>

          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={14} className="mt-0.5" />
            <p>Complete this simple math problem to verify you're human.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-3 text-success">
          <Icon name="CheckCircle" size={20} />
          <span className="font-medium">Security verification completed successfully!</span>
        </div>
      )}
      <div className="border-t border-border pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <Icon name="Lock" size={14} className="text-accent mt-0.5" />
            <div>
              <p className="font-medium text-foreground">End-to-End Encryption</p>
              <p className="text-muted-foreground">All communications are encrypted</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Eye" size={14} className="text-accent mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Privacy Protected</p>
              <p className="text-muted-foreground">Your data is never shared</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;