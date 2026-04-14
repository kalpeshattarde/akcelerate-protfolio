'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const SocialRegistration = ({ onRegistrationSuccess }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    google: false,
    facebook: false,
    apple: false
  });

  const handleSocialRegistration = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock social registration success
      const userData = {
        id: Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe@${provider}.com`,
        provider: provider,
        registrationDate: new Date()?.toISOString()
      };

      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', `mock-${provider}-token-` + Date.now());
      
      onRegistrationSuccess(userData);
      
      // Redirect to dashboard
      router?.push('/user-account-dashboard');
      
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  const socialProviders = [
    {
      name: 'google',
      label: 'Continue with Google',
      icon: 'GlobeAltIcon',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      name: 'facebook',
      label: 'Continue with Facebook',
      icon: 'ShareIcon',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverBg: 'hover:bg-blue-700'
    },
    {
      name: 'apple',
      label: 'Continue with Apple',
      icon: 'DevicePhoneMobileIcon',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-black',
      hoverBg: 'hover:bg-gray-900'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.name}
            onClick={() => handleSocialRegistration(provider?.name)}
            disabled={Object.values(isLoading)?.some(loading => loading)}
            className={`w-full flex items-center justify-center space-x-3 py-3 px-4 border ${provider?.borderColor} ${provider?.bgColor} ${provider?.textColor} ${provider?.hoverBg} disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press`}
          >
            {isLoading?.[provider?.name] ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon name={provider?.icon} size={20} />
            )}
            <span className="font-medium text-sm">
              {isLoading?.[provider?.name] ? 'Connecting...' : provider?.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

SocialRegistration.propTypes = {
  onRegistrationSuccess: PropTypes?.func?.isRequired
};

export default SocialRegistration;