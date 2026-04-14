import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSocialRegister }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-50 hover:border-red-200',
      textColor: 'text-red-600'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'hover:bg-gray-50 hover:border-gray-200',
      textColor: 'text-gray-900'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:bg-blue-50 hover:border-blue-200',
      textColor: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/40" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            type="button"
            variant="outline"
            onClick={() => onSocialRegister(provider?.name?.toLowerCase())}
            className={`h-12 ${provider?.color} transition-all duration-200 hover:scale-105`}
          >
            <div className="flex items-center space-x-2">
              <Icon name={provider?.icon} size={20} className={provider?.textColor} />
              <span className="font-medium">{provider?.name}</span>
            </div>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground leading-relaxed">
          By signing up, you agree to our data handling practices and privacy policy
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;