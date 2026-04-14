import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    bio: '',
    profilePhoto: null,
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const passwordRequirements = [
    { key: 'length', label: 'At least 8 characters', test: (pwd) => pwd?.length >= 8 },
    { key: 'uppercase', label: 'One uppercase letter', test: (pwd) => /[A-Z]/?.test(pwd) },
    { key: 'lowercase', label: 'One lowercase letter', test: (pwd) => /[a-z]/?.test(pwd) },
    { key: 'number', label: 'One number', test: (pwd) => /\d/?.test(pwd) },
    { key: 'special', label: 'One special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/?.test(pwd) }
  ];

  const validatePassword = (password) => {
    const requirements = {};
    let score = 0;

    passwordRequirements?.forEach(req => {
      const passed = req?.test(password);
      requirements[req.key] = passed;
      if (passed) score++;
    });

    setPasswordStrength({ score, requirements });
    return score;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Validate password strength
    if (field === 'password') {
      validatePassword(value);
    }

    // Validate confirm password
    if (field === 'confirmPassword' || (field === 'password' && formData?.confirmPassword)) {
      const password = field === 'password' ? value : formData?.password;
      const confirmPassword = field === 'confirmPassword' ? value : formData?.confirmPassword;
      
      if (confirmPassword && password !== confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleFileUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, profilePhoto: 'File size must be less than 5MB' }));
        return;
      }
      
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      setErrors(prev => ({ ...prev, profilePhoto: '' }));
    } else {
      setErrors(prev => ({ ...prev, profilePhoto: 'Please select a valid image file' }));
    }
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength?.score < 3) {
      newErrors.password = 'Password must meet at least 3 requirements';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.displayName?.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (formData?.displayName?.trim()?.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength?.score <= 1) return 'bg-error';
    if (passwordStrength?.score <= 2) return 'bg-warning';
    if (passwordStrength?.score <= 3) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength?.score <= 1) return 'Weak';
    if (passwordStrength?.score <= 2) return 'Fair';
    if (passwordStrength?.score <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl p-6 soft-shadow glassmorphism">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Join our community of content creators and readers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            className="mb-4"
          />

          {/* Display Name Field */}
          <Input
            label="Display Name"
            type="text"
            placeholder="How should we call you?"
            value={formData?.displayName}
            onChange={(e) => handleInputChange('displayName', e?.target?.value)}
            error={errors?.displayName}
            required
            className="mb-4"
          />

          {/* Password Field */}
          <div className="space-y-2">
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData?.password}
                onChange={(e) => handleInputChange('password', e?.target?.value)}
                error={errors?.password}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData?.password && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {getPasswordStrengthText()}
                  </span>
                </div>

                {/* Password Requirements */}
                <div className="grid grid-cols-1 gap-1">
                  {passwordRequirements?.map(req => (
                    <div key={req?.key} className="flex items-center space-x-2">
                      <Icon 
                        name={passwordStrength?.requirements?.[req?.key] ? "Check" : "X"} 
                        size={12} 
                        className={passwordStrength?.requirements?.[req?.key] ? "text-success" : "text-muted-foreground"}
                      />
                      <span className={`text-xs ${passwordStrength?.requirements?.[req?.key] ? "text-success" : "text-muted-foreground"}`}>
                        {req?.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          {/* Profile Photo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Profile Photo <span className="text-muted-foreground">(Optional)</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData?.profilePhoto ? (
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Image" size={16} className="text-success" />
                  <span className="text-sm text-foreground">{formData?.profilePhoto?.name}</span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, profilePhoto: null }))}
                    className="text-error hover:text-error/80"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Icon name="Upload" size={24} className="mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">Drop your photo here, or</p>
                    <label className="text-sm text-primary hover:text-primary/80 cursor-pointer">
                      browse files
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e?.target?.files?.[0] && handleFileUpload(e?.target?.files?.[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            {errors?.profilePhoto && (
              <p className="text-sm text-error">{errors?.profilePhoto}</p>
            )}
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Bio <span className="text-muted-foreground">(Optional)</span>
            </label>
            <textarea
              placeholder="Tell us a bit about yourself..."
              value={formData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              rows={3}
              maxLength={160}
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {formData?.bio?.length}/160 characters
              </span>
            </div>
          </div>

          {/* Terms and Privacy Checkboxes */}
          <div className="space-y-3">
            <Checkbox
              label={
                <span className="text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                    Terms of Service
                  </Link>
                </span>
              }
              checked={formData?.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
              error={errors?.agreeToTerms}
              required
            />

            <Checkbox
              label={
                <span className="text-sm">
                  I agree to the{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                    Privacy Policy
                  </Link>
                </span>
              }
              checked={formData?.agreeToPrivacy}
              onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
              error={errors?.agreeToPrivacy}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            className="mt-6"
          >
            Create Account
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;