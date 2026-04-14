import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Icon name="AlertTriangle" size={64} className="text-warning mx-auto mb-4" />
          <h1 className="text-4xl font-heading-bold text-text-primary mb-2">404</h1>
          <h2 className="text-xl font-heading-medium text-text-secondary mb-4">Page Not Found</h2>
          <p className="text-text-secondary">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/procurement-kanban-dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth font-body-medium"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Go to Dashboard
          </Link>
          
          <div className="text-sm text-text-secondary">
            <Link
              to="/procurement-kanban-dashboard"
              className="text-primary hover:text-primary-700 transition-smooth"
            >
              Return to Procurement Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;