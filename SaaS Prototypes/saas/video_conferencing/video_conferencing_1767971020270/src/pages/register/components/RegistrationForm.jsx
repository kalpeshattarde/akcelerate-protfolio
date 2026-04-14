import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    role: '',
    department: '',
    phoneNumber: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    marketingConsent: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailAvailable, setEmailAvailable] = useState(null);

  const roleOptions = [
    { value: 'standard', label: 'Standard User', description: 'Join and host meetings' },
    { value: 'moderator', label: 'Moderator', description: 'Manage participants and settings' },
    { value: 'admin', label: 'Administrator', description: 'Full system access and management' }
  ];

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'other', label: 'Other' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Special handling for password strength
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Email availability check (mock)
    if (field === 'email' && validateEmail(value)) {
      setTimeout(() => {
        // Mock email availability check
        const unavailableEmails = ['admin@example.com', 'test@test.com'];
        setEmailAvailable(!unavailableEmails?.includes(value));
      }, 500);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (emailAvailable === false) {
        newErrors.email = 'This email is already registered';
      }
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (passwordStrength < 75) {
        newErrors.password = 'Password must be stronger';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData?.companyName?.trim()) newErrors.companyName = 'Company name is required';
      if (!formData?.role) newErrors.role = 'Please select a role';
      if (!formData?.department) newErrors.department = 'Please select a department';
    }

    if (step === 3) {
      if (!formData?.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms of service';
      if (!formData?.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Personal Information</h2>
            <p className="text-muted-foreground mt-2">Let's start with your basic details</p>
          </div>

          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />

          <div className="relative">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />
            {formData?.email && validateEmail(formData?.email) && (
              <div className="absolute right-3 top-9">
                {emailAvailable === null ? (
                  <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                ) : emailAvailable ? (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                ) : (
                  <Icon name="XCircle" size={16} className="text-error" />
                )}
              </div>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            {formData?.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Password strength:</span>
                  <span className={`font-medium ${passwordStrength >= 75 ? 'text-success' : passwordStrength >= 50 ? 'text-accent' : 'text-warning'}`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
        </div>
      )}
      {/* Step 2: Organization Information */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Organization Details</h2>
            <p className="text-muted-foreground mt-2">Tell us about your organization</p>
          </div>

          <Input
            label="Company Name"
            type="text"
            placeholder="Enter your company name"
            value={formData?.companyName}
            onChange={(e) => handleInputChange('companyName', e?.target?.value)}
            error={errors?.companyName}
            required
          />

          <Select
            label="Role"
            placeholder="Select your role"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          <Select
            label="Department"
            placeholder="Select your department"
            options={departmentOptions}
            value={formData?.department}
            onChange={(value) => handleInputChange('department', value)}
            error={errors?.department}
            required
          />

          <Input
            label="Phone Number (Optional)"
            type="tel"
            placeholder="Enter your phone number"
            value={formData?.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
            description="We'll use this for account recovery"
          />
        </div>
      )}
      {/* Step 3: Terms and Agreements */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Terms & Privacy</h2>
            <p className="text-muted-foreground mt-2">Please review and accept our policies</p>
          </div>

          <div className="space-y-4 bg-muted rounded-lg p-4">
            <Checkbox
              label="I agree to the Terms of Service"
              description="By checking this, you agree to our terms and conditions"
              checked={formData?.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
              error={errors?.agreeToTerms}
              required
            />

            <Checkbox
              label="I agree to the Privacy Policy"
              description="We'll handle your data according to our privacy policy"
              checked={formData?.agreeToPrivacy}
              onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
              error={errors?.agreeToPrivacy}
              required
            />

            <Checkbox
              label="I'd like to receive product updates and marketing communications"
              description="You can unsubscribe at any time"
              checked={formData?.marketingConsent}
              onChange={(e) => handleInputChange('marketingConsent', e?.target?.checked)}
            />
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Your data is secure</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  We use enterprise-grade encryption to protect your information and never share your data with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Step {currentStep} of 3
        </div>

        {currentStep < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            loading={isLoading}
            disabled={!formData?.agreeToTerms || !formData?.agreeToPrivacy}
            iconName="UserPlus"
            iconPosition="left"
          >
            Create Account
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;