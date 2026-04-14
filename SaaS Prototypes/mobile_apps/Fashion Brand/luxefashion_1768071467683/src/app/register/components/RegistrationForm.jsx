'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
    subscribeNewsletter: true,
    subscribePromotions: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData?.password?.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/?.test(formData?.password) },
    { text: 'One lowercase letter', met: /[a-z]/?.test(formData?.password) },
    { text: 'One number', met: /\d/?.test(formData?.password) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/?.test(formData?.password) }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 20;
    if (/[A-Z]/?.test(password)) strength += 20;
    if (/[a-z]/?.test(password)) strength += 20;
    if (/\d/?.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/?.test(password)) strength += 20;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength < 80) {
      newErrors.password = 'Password does not meet security requirements';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData?.phone && !/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        phone: formData?.phone,
        subscribeNewsletter: formData?.subscribeNewsletter,
        subscribePromotions: formData?.subscribePromotions,
        registrationDate: new Date()?.toISOString()
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      
      onRegistrationSuccess(userData);
      
      // Redirect to dashboard
      router?.push('/user-account-dashboard');
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-error';
    if (passwordStrength < 80) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 80) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${errors?.firstName ? 'border-error' : 'border-border'} bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors`}
              placeholder="John"
              disabled={isLoading}
            />
            {errors?.firstName && (
              <p className="mt-1 text-sm text-error">{errors?.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${errors?.lastName ? 'border-error' : 'border-border'} bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors`}
              placeholder="Doe"
              disabled={isLoading}
            />
            {errors?.lastName && (
              <p className="mt-1 text-sm text-error">{errors?.lastName}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border ${errors?.email ? 'border-error' : 'border-border'} bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors`}
            placeholder="john@example.com"
            disabled={isLoading}
          />
          {errors?.email && (
            <p className="mt-1 text-sm text-error">{errors?.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 border ${errors?.password ? 'border-error' : 'border-border'} bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors`}
              placeholder="Create a strong password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? "EyeSlashIcon" : "EyeIcon"} size={20} />
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Password Strength</span>
                <span className={`text-xs font-medium ${passwordStrength < 40 ? 'text-error' : passwordStrength < 80 ? 'text-warning' : 'text-success'}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted h-2">
                <div 
                  className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}

          {/* Password Requirements */}
          {formData?.password && (
            <div className="mt-3 space-y-1">
              {passwordRequirements?.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon 
                    name={req?.met ? "CheckIcon" : "XMarkIcon"} 
                    size={16} 
                    className={req?.met ? 'text-success' : 'text-muted-foreground'} 
                  />
                  <span className={`text-xs ${req?.met ? 'text-success' : 'text-muted-foreground'}`}>
                    {req?.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {errors?.password && (
            <p className="mt-1 text-sm text-error">{errors?.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 border ${errors?.confirmPassword ? 'border-error' : 'border-border'} bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors`}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showConfirmPassword ? "EyeSlashIcon" : "EyeIcon"} size={20} />
            </button>
          </div>
          {errors?.confirmPassword && (
            <p className="mt-1 text-sm text-error">{errors?.confirmPassword}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border ${errors?.phone ? 'border-error' : 'border-border'} bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors`}
            placeholder="+1 (555) 123-4567"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            We'll only use this for order updates and account security
          </p>
          {errors?.phone && (
            <p className="mt-1 text-sm text-error">{errors?.phone}</p>
          )}
        </div>

        {/* Marketing Preferences */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Marketing Preferences</h3>
          
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="subscribeNewsletter"
              name="subscribeNewsletter"
              checked={formData?.subscribeNewsletter}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-accent bg-input border-border focus:ring-ring"
              disabled={isLoading}
            />
            <div>
              <label htmlFor="subscribeNewsletter" className="text-sm text-foreground cursor-pointer">
                Subscribe to our newsletter
              </label>
              <p className="text-xs text-muted-foreground">
                Get exclusive access to new collections and styling tips
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="subscribePromotions"
              name="subscribePromotions"
              checked={formData?.subscribePromotions}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-accent bg-input border-border focus:ring-ring"
              disabled={isLoading}
            />
            <div>
              <label htmlFor="subscribePromotions" className="text-sm text-foreground cursor-pointer">
                Receive promotional offers
              </label>
              <p className="text-xs text-muted-foreground">
                Be the first to know about sales and special events
              </p>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            className={`mt-1 w-4 h-4 text-accent bg-input border-border focus:ring-ring ${errors?.agreeToTerms ? 'border-error' : ''}`}
            disabled={isLoading}
          />
          <div>
            <label htmlFor="agreeToTerms" className="text-sm text-foreground cursor-pointer">
              I agree to the{' '}
              <Link href="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              {' '}*
            </label>
            {errors?.agreeToTerms && (
              <p className="mt-1 text-sm text-error">{errors?.agreeToTerms}</p>
            )}
          </div>
        </div>

        {/* Submit Error */}
        {errors?.submit && (
          <div className="p-3 bg-error/10 border border-error text-error text-sm">
            {errors?.submit}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent text-accent-foreground font-heading font-bold text-sm uppercase tracking-wide py-4 px-6 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
              <span>Creating Account...</span>
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

RegistrationForm.propTypes = {
  onRegistrationSuccess: PropTypes?.func?.isRequired
};

export default RegistrationForm;