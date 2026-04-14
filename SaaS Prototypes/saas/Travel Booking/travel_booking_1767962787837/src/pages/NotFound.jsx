import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="MapPin" size={48} color="var(--color-primary)" />
          </div>
          <h1 className="text-6xl font-heading-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-heading-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/search-results-dashboard"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-body-medium rounded-lg hover:bg-primary-700 transition-all duration-200 ease-out"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Go to Dashboard
          </Link>
          
          <Link
            to="/login-register"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-secondary-100 text-secondary-700 font-body-medium rounded-lg hover:bg-secondary-200 transition-all duration-200 ease-out"
          >
            <Icon name="User" size={20} className="mr-2" />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;