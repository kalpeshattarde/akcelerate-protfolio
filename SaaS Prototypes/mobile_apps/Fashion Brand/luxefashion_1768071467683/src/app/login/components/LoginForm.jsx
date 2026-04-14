'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const LoginForm = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    admin: { email: 'admin@luxefashion.com', password: 'Admin123!' },
    customer: { email: 'customer@example.com', password: 'Customer123!' },
    vip: { email: 'vip@luxefashion.com', password: 'VIP123!' }
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
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check against mock credentials
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        // Store auth token and user data
        const authToken = 'mock-jwt-token-' + Date.now();
        const userData = {
          email: formData?.email,
          name: formData?.email?.split('@')?.[0],
          loginTime: new Date()?.toISOString()
        };

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(userData));

        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }

        // Redirect to dashboard or intended page
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/user-account-dashboard';
        localStorage.removeItem('redirectAfterLogin');
        router?.push(redirectUrl);
      } else {
        setErrors({
          general: 'Invalid email or password. Try: admin@luxefashion.com / Admin123!'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      const authToken = `mock-${provider}-token-` + Date.now();
      const userData = {
        email: `user@${provider}.com`,
        name: `${provider} User`,
        provider: provider,
        loginTime: new Date()?.toISOString()
      };

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      router?.push('/user-account-dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border shadow-elevation-2 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            WELCOME BACK
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your LuxeFashion account
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 text-error text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="ExclamationTriangleIcon" size={16} />
              <span>{errors?.general}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors?.email ? 'border-error' : 'border-border'
                } bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Icon name="EnvelopeIcon" size={20} className="text-muted-foreground" />
              </div>
            </div>
            {errors?.email && (
              <p className="mt-1 text-sm text-error">{errors?.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData?.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 pr-12 border ${
                  errors?.password ? 'border-error' : 'border-border'
                } bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                <Icon name={showPassword ? "EyeSlashIcon" : "EyeIcon"} size={20} />
              </button>
            </div>
            {errors?.password && (
              <p className="mt-1 text-sm text-error">{errors?.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData?.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-accent bg-input border-border focus:ring-ring focus:ring-2"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-foreground">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3 px-6 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors btn-press disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              'SIGN IN'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-4 text-sm text-muted-foreground bg-card">or continue with</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-border bg-background text-foreground hover:bg-muted transition-colors btn-press disabled:opacity-50"
          >
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-border bg-background text-foreground hover:bg-muted transition-colors btn-press disabled:opacity-50"
          >
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">f</span>
            </div>
            <span>Continue with Facebook</span>
          </button>

          <button
            onClick={() => handleSocialLogin('apple')}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-border bg-background text-foreground hover:bg-muted transition-colors btn-press disabled:opacity-50"
          >
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <Icon name="DevicePhoneMobileIcon" size={12} className="text-white" />
            </div>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Guest Checkout */}
        <div className="mt-8 p-4 bg-muted/50 border border-border">
          <div className="text-center">
            <h3 className="font-medium text-foreground mb-2">Shop as Guest</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Continue shopping without creating an account
            </p>
            <Link
              href="/checkout"
              className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors font-medium text-sm"
            >
              <span>Continue as Guest</span>
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="ShieldCheckIcon" size={16} />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="LockClosedIcon" size={16} />
              <span>Privacy Protected</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <Link
              href="/privacy-policy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onLoginSuccess: PropTypes?.func
};

export default LoginForm;