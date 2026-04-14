import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SocialLogin = ({ onSuccess }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverBg: 'hover:bg-blue-700'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-black',
      textColor: 'text-white',
      borderColor: 'border-black',
      hoverBg: 'hover:bg-gray-800'
    }
  ];

  const handleSocialLogin = (provider) => {
    setLoadingProvider(provider.id);
    
    // Simulate social login process
    setTimeout(() => {
      setLoadingProvider(null);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="space-y-3">
      {socialProviders.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleSocialLogin(provider)}
          disabled={loadingProvider !== null}
          className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg font-body-medium transition-all duration-200 ease-out ${
            provider.bgColor
          } ${provider.textColor} ${provider.borderColor} ${provider.hoverBg} ${
            loadingProvider !== null ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loadingProvider === provider.id ? (
            <div className="flex items-center">
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
              Connecting...
            </div>
          ) : (
            <div className="flex items-center">
              <Icon name={provider.icon} size={20} className="mr-3" />
              Continue with {provider.name}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default SocialLogin;