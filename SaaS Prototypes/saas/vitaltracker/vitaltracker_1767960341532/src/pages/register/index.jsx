import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import HealthPreferences from './components/HealthPreferences';
import SocialRegistration from './components/SocialRegistration';
import ProgressIndicator from './components/ProgressIndicator';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    marketingEmails: false
  });

  const [preferences, setPreferences] = useState({
    ageRange: '',
    activityLevel: '',
    wellnessGoals: []
  });

  const steps = [
    { id: 'account', title: 'Create Account', component: 'form' },
    { id: 'preferences', title: 'Health Preferences', component: 'preferences' },
    { id: 'complete', title: 'Complete Setup', component: 'complete' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePreferenceChange = (category, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
    
    // Clear error when user makes selection
    if (errors?.[category]) {
      setErrors(prev => ({ ...prev, [category]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      // Validate account creation form
      if (!formData?.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    } else if (step === 1) {
      // Validate health preferences
      if (!preferences?.ageRange) {
        newErrors.ageRange = 'Please select your age range';
      }

      if (!preferences?.activityLevel) {
        newErrors.activityLevel = 'Please select your activity level';
      }

      if (!preferences?.wellnessGoals || preferences?.wellnessGoals?.length === 0) {
        newErrors.wellnessGoals = 'Please select at least one wellness goal';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps?.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', { formData, preferences });
      
      // Navigate to dashboard with success message
      navigate('/dashboard', { 
        state: { 
          message: 'Welcome to VitalTracker! Your account has been created successfully.',
          isNewUser: true 
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`${provider} registration attempt`);
    // Simulate social registration
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard', { 
        state: { 
          message: `Welcome! You've successfully signed up with ${provider}.`,
          isNewUser: true 
        }
      });
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <RegistrationForm
              onSubmit={handleNext}
              isLoading={isLoading}
              errors={errors}
              formData={formData}
              onInputChange={handleInputChange}
            />
            <SocialRegistration onSocialRegister={handleSocialRegister} />
          </div>
        );
      case 1:
        return (
          <HealthPreferences
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">✓</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">You're all set!</h2>
              <p className="text-muted-foreground">
                Your VitalTracker account is ready. Let's start your wellness journey!
              </p>
            </div>
            <TrustSignals />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={steps?.length}
            steps={steps}
          />

          <div className="bg-card rounded-2xl shadow-wellness-lg border border-border/40 p-6 lg:p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            {currentStep > 0 && currentStep < steps?.length - 1 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border/40">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="px-6"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={handleNext}
                  loading={isLoading}
                  className="px-6"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border/40">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="px-6"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={handleNext}
                  loading={isLoading}
                  className="px-6"
                >
                  Complete Setup
                </Button>
              </div>
            )}

            {currentStep === steps?.length - 1 && (
              <div className="mt-8 pt-6 border-t border-border/40">
                <Button
                  type="button"
                  variant="default"
                  fullWidth
                  onClick={() => navigate('/dashboard')}
                  className="h-12 text-base font-medium"
                >
                  Start Using VitalTracker
                </Button>
              </div>
            )}

            {errors?.submit && (
              <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-sm text-error text-center">{errors?.submit}</p>
              </div>
            )}
          </div>

          {/* Additional Trust Signals */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground mb-4">
              Join over 100,000+ users who trust VitalTracker with their wellness journey
            </p>
            <div className="flex justify-center space-x-6 opacity-60">
              <div className="text-xs text-muted-foreground">🔒 HIPAA Compliant</div>
              <div className="text-xs text-muted-foreground">⭐ 4.9/5 Rating</div>
              <div className="text-xs text-muted-foreground">🏆 Award Winning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;