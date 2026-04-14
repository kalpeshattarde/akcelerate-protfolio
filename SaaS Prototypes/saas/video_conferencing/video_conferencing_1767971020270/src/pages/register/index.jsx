import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import SecurityFeatures from './components/SecurityFeatures';
import SuccessModal from './components/SuccessModal';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSecurityVerification, setShowSecurityVerification] = useState(false);
  const [securityVerified, setSecurityVerified] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setRegisteredEmail(formData?.email);
    
    try {
      // Show security verification
      setShowSecurityVerification(true);
      
      // Wait for security verification
      if (!securityVerified) {
        setIsLoading(false);
        return;
      }

      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      
      setIsLoading(false);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false);
    }
  };

  const handleSecurityVerification = (verified) => {
    setSecurityVerified(verified);
    if (verified) {
      setShowSecurityVerification(false);
      // Continue with registration process
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessModal(true);
      }, 1000);
    }
  };

  const handleBackToLogin = () => {
    navigate('/dashboard'); // Since login page doesn't exist, navigate to dashboard
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
                <Icon name="Video" size={20} color="white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">VideoConf</h1>
            </Link>
            
            <Button
              variant="ghost"
              onClick={handleBackToLogin}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Join thousands of teams using VideoConf for seamless collaboration
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} />

          {/* Registration Form */}
          <div className="bg-surface border border-border rounded-lg shadow-elevated p-6">
            <RegistrationForm 
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Security Features */}
          {showSecurityVerification && (
            <div className="mt-6">
              <SecurityFeatures
                onVerificationComplete={handleSecurityVerification}
                isVisible={showSecurityVerification}
              />
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-8 space-y-6">
            {/* Features Preview */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">What you'll get:</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Video" size={16} className="text-primary" />
                  <span className="text-sm text-foreground">HD video conferencing with up to 100 participants</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-foreground">End-to-end encryption for all meetings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Cloud" size={16} className="text-accent" />
                  <span className="text-sm text-foreground">Cloud recording and storage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="BarChart3" size={16} className="text-warning" />
                  <span className="text-sm text-foreground">Advanced analytics and reporting</span>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={14} />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={14} />
                  <span>SOC 2 Certified</span>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  onClick={handleBackToLogin}
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        userEmail={registeredEmail}
        onClose={() => setShowSuccessModal(false)}
      />
      {/* Footer */}
      <footer className="border-t border-border bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date()?.getFullYear()} VideoConf Platform. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <Link to="#" className="hover:text-primary transition-micro">Terms of Service</Link>
              <span>•</span>
              <Link to="#" className="hover:text-primary transition-micro">Privacy Policy</Link>
              <span>•</span>
              <Link to="#" className="hover:text-primary transition-micro">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;