import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          disabled={isLoading}
          onClick={() => onSocialLogin(provider?.id)}
          className={`${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} transition-all duration-200 micro-interaction`}
        >
          <div className="flex items-center justify-center space-x-3">
            <Icon name={provider?.icon} size={20} />
            <span className="font-medium">Continue with {provider?.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;