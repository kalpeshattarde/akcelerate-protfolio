import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import SignInForm from './components/SignInForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import PassportScanner from './components/PassportScanner';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassportScanner, setShowPassportScanner] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAuthSuccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/search-results-dashboard');
    }, 1500);
  };

  const handlePassportScan = () => {
    setShowPassportScanner(true);
  };

  const handlePassportScanComplete = (data) => {
    setShowPassportScanner(false);
    // Handle passport data
    console.log('Passport data:', data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/login-register" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Plane" size={20} color="white" />
                </div>
                <span className="text-xl font-heading-semibold text-text-primary">
                  TravelHub Pro
                </span>
              </div>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <select className="text-sm text-text-secondary bg-transparent border-none focus:outline-none cursor-pointer">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="min-h-[calc(100vh-4rem)] flex">
          {/* Left Side - Form */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full space-y-8">
              {/* Welcome Message */}
              <div className="text-center">
                <h2 className="text-3xl font-heading-bold text-text-primary">
                  {activeTab === 'signin' ? 'Welcome back' : 'Create your account'}
                </h2>
                <p className="mt-2 text-text-secondary">
                  {activeTab === 'signin' ?'Sign in to access your travel bookings and preferences' :'Join thousands of travelers who trust TravelHub Pro'
                  }
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => handleTabChange('signin')}
                  className={`flex-1 py-2 px-4 text-sm font-body-medium rounded-md transition-all duration-200 ease-out ${
                    activeTab === 'signin' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleTabChange('register')}
                  className={`flex-1 py-2 px-4 text-sm font-body-medium rounded-md transition-all duration-200 ease-out ${
                    activeTab === 'register' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Social Login */}
              <SocialLogin onSuccess={handleAuthSuccess} />

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-text-secondary">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Forms */}
              {activeTab === 'signin' ? (
                <SignInForm onSuccess={handleAuthSuccess} isLoading={isLoading} />
              ) : (
                <RegisterForm 
                  onSuccess={handleAuthSuccess} 
                  onPassportScan={handlePassportScan}
                  isLoading={isLoading} 
                />
              )}

              {/* Footer Links */}
              <div className="text-center text-sm text-text-secondary">
                <p>
                  By continuing, you agree to our{' '}
                  <Link to="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Background Image (Desktop Only) */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 opacity-90" />
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Travel destination"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center text-white">
                <h3 className="text-4xl font-heading-bold mb-6">
                  Your Journey Starts Here
                </h3>
                <p className="text-xl opacity-90 mb-8">
                  Discover amazing destinations, book with confidence, and create unforgettable memories.
                </p>
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="Plane" size={24} color="white" />
                    </div>
                    <p className="text-sm font-body-medium">Flights</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="Building" size={24} color="white" />
                    </div>
                    <p className="text-sm font-body-medium">Hotels</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="Car" size={24} color="white" />
                    </div>
                    <p className="text-sm font-body-medium">Car Rentals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Passport Scanner Modal */}
      {showPassportScanner && (
        <PassportScanner
          onComplete={handlePassportScanComplete}
          onClose={() => setShowPassportScanner(false)}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-primary font-body-medium">Signing you in...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;