import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    console.log(`${provider} login initiated`);
    // Mock social login - in real app would redirect to OAuth provider
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/40" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('Google')}
          className="flex items-center justify-center space-x-2 py-3"
        >
          <Icon name="Chrome" size={20} />
          <span>Google</span>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('Apple')}
          className="flex items-center justify-center space-x-2 py-3"
        >
          <Icon name="Apple" size={20} />
          <span>Apple</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;