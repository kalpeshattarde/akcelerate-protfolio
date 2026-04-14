'use client';

import { useState } from 'react';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';

const LoginInteractive = ({ pageData }) => {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSuccess = (userData) => {
    setLoginSuccess(true);
    // Additional success handling can be added here
    console.log('Login successful for:', userData?.email);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-lg mx-auto">
            <LoginHeader 
              title={pageData?.title}
              subtitle={pageData?.subtitle}
            />
            
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            
            {loginSuccess && (
              <div className="mt-6 p-4 bg-success/10 border border-success/20 text-success text-center">
                <p className="font-medium">Login successful! Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

LoginInteractive.propTypes = {
  pageData: PropTypes?.shape({
    title: PropTypes?.string?.isRequired,
    subtitle: PropTypes?.string
  })?.isRequired
};

export default LoginInteractive;