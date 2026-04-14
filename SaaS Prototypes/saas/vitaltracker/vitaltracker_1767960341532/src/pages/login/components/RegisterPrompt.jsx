import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const RegisterPrompt = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="text-center p-6 bg-card/50 rounded-lg border border-border/20">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          New to VitalTracker?
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Join thousands of users on their wellness journey. Track your health metrics, set goals, and achieve better well-being.
        </p>
        
        <Link to="/register">
          <Button variant="outline" fullWidth>
            Create Your Account
          </Button>
        </Link>
        
        <p className="text-xs text-muted-foreground mt-3">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPrompt;