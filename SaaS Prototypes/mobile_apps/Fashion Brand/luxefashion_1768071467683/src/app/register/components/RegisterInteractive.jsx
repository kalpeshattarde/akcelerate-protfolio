'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import RegistrationForm from './RegistrationForm';
import SocialRegistration from './SocialRegistration';
import AccountBenefits from './AccountBenefits';
import RegistrationSuccess from './RegistrationSuccess';

const RegisterInteractive = ({ initialData }) => {
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form' | 'success'
  const [userData, setUserData] = useState(null);

  const handleRegistrationSuccess = (newUserData) => {
    setUserData(newUserData);
    setRegistrationStep('success');
  };

  if (registrationStep === 'success' && userData) {
    return <RegistrationSuccess userData={userData} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Registration Forms */}
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
                  Create Your Account
                </h1>
                <p className="text-muted-foreground text-lg">
                  Join the LuxeFashion community and discover exclusive luxury fashion collections
                </p>
              </div>

              {/* Social Registration */}
              <div>
                <h2 className="font-heading font-semibold text-lg text-foreground mb-4 text-center lg:text-left">
                  Quick Registration
                </h2>
                <SocialRegistration onRegistrationSuccess={handleRegistrationSuccess} />
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-muted-foreground">
                    Or create account with email
                  </span>
                </div>
              </div>

              {/* Registration Form */}
              <div>
                <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="lg:sticky lg:top-24">
              <AccountBenefits />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterInteractive.propTypes = {
  initialData: PropTypes?.object
};

export default RegisterInteractive;