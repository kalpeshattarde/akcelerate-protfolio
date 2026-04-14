'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const RegistrationSuccess = ({ userData }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircleIcon" size={32} className="text-success" />
      </div>
      {/* Success Message */}
      <div>
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Welcome to LuxeFashion!
        </h2>
        <p className="text-muted-foreground">
          Your account has been successfully created.
        </p>
      </div>
      {/* User Info */}
      <div className="bg-card border border-border p-4 text-left">
        <h3 className="font-medium text-card-foreground mb-3">Account Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="text-card-foreground">
              {userData?.firstName} {userData?.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="text-card-foreground">{userData?.email}</span>
          </div>
          {userData?.phone && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="text-card-foreground">{userData?.phone}</span>
            </div>
          )}
        </div>
      </div>
      {/* Email Verification Notice */}
      <div className="bg-warning/10 border border-warning p-4">
        <div className="flex items-start space-x-3">
          <Icon name="EnvelopeIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="font-medium text-sm text-foreground mb-1">
              Verify Your Email
            </h4>
            <p className="text-xs text-muted-foreground">
              We've sent a verification email to {userData?.email}. Please check your inbox and click the verification link to activate your account.
            </p>
          </div>
        </div>
      </div>
      {/* Welcome Offer */}
      <div className="bg-accent text-accent-foreground p-4">
        <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-1">
          Welcome Offer
        </h4>
        <p className="text-sm">
          Use code <strong>WELCOME15</strong> for 15% off your first order
        </p>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/user-account-dashboard"
          className="w-full bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-wide py-3 px-6 hover:bg-primary/90 transition-colors btn-press inline-block text-center"
        >
          Go to Dashboard
        </Link>
        
        <Link
          href="/product-catalog"
          className="w-full bg-transparent border border-border text-foreground font-heading font-bold text-sm uppercase tracking-wide py-3 px-6 hover:bg-muted transition-colors btn-press inline-block text-center"
        >
          Start Shopping
        </Link>
      </div>
      {/* Auto Redirect Notice */}
      {countdown > 0 && (
        <p className="text-xs text-muted-foreground">
          Redirecting to dashboard in {countdown} seconds...
        </p>
      )}
      {/* Next Steps */}
      <div className="text-left space-y-3">
        <h4 className="font-medium text-sm text-foreground">Next Steps:</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Icon name="CheckIcon" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">Account created</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="EnvelopeIcon" size={16} className="text-warning" />
            <span className="text-sm text-muted-foreground">Verify your email address</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="UserIcon" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Complete your profile</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="ShoppingBagIcon" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Start shopping luxury fashion</span>
          </div>
        </div>
      </div>
    </div>
  );
};

RegistrationSuccess.propTypes = {
  userData: PropTypes?.shape({
    firstName: PropTypes?.string?.isRequired,
    lastName: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
    phone: PropTypes?.string
  })?.isRequired
};

export default RegistrationSuccess;