import React from 'react';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import RegisterPrompt from './components/RegisterPrompt';
import TrustSignals from './components/TrustSignals';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - VitalTracker | Your Wellness Journey Starts Here</title>
        <meta name="description" content="Sign in to VitalTracker to continue your personalized health and wellness tracking journey. Secure access to your health metrics, goals, and progress reports." />
        <meta name="keywords" content="login, sign in, health tracking, wellness app, VitalTracker" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Main Content Container */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Welcome & Form */}
              <div className="order-2 lg:order-1">
                <WelcomeHeader />
                <LoginForm />
                <SocialLogin />
              </div>

              {/* Right Column - Register Prompt */}
              <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
                <RegisterPrompt />
              </div>
            </div>

            {/* Trust Signals */}
            <TrustSignals />
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;