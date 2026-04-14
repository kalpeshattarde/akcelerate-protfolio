import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/" className="inline-flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
          <Icon name="Heart" size={28} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">VitalTracker</span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-lg">
          Continue your wellness journey with personalized health tracking
        </p>
      </div>

      {/* Demo Credentials Info */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">Demo Account</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Use <strong>demo@vitaltracker.com</strong> / <strong>demo123</strong> to explore the app
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;