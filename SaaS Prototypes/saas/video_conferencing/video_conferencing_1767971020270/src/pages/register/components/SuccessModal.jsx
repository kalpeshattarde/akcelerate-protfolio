import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, userEmail, onClose }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleResendEmail = () => {
    // Mock resend email functionality
    console.log('Resending verification email to:', userEmail);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg shadow-floating max-w-md w-full p-6 animate-slide-in">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Account Created Successfully!</h2>
            <p className="text-muted-foreground">
              Welcome to VideoConf Platform. Your account has been created and you're ready to start.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Mail" size={20} className="text-accent mt-0.5" />
              <div className="text-left">
                <h4 className="font-medium text-foreground">Verification Email Sent</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  We've sent a verification email to <strong>{userEmail}</strong>. 
                  Please check your inbox and click the verification link to activate all features.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              className="w-full"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue to Dashboard
            </Button>

            <Button
              variant="outline"
              onClick={handleResendEmail}
              className="w-full"
              iconName="Mail"
              iconPosition="left"
            >
              Resend Verification Email
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={handleResendEmail}
                className="text-primary hover:underline"
              >
                resend verification email
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;