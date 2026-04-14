import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'success'
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Mock registration function
  const handleRegistration = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      
      // Store registered email for success screen
      setRegisteredEmail(formData?.email);
      
      // Move to success step
      setRegistrationStep('success');
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  // Mock social registration function
  const handleSocialRegistration = async (providerId) => {
    setIsLoading(true);
    
    try {
      // Simulate social auth delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Social registration with:', providerId);
      
      // Mock successful social registration - redirect to homepage
      navigate('/homepage');
      
    } catch (error) {
      console.error('Social registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock resend verification function
  const handleResendVerification = async (email) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Resending verification email to:', email);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
            
            {/* Left Side - Welcome Content (Desktop Only) */}
            <div className="hidden lg:block lg:w-1/2 lg:max-w-lg">
              <div className="sticky top-24">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
                      Join ContentHub Pro
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Connect with a community of passionate writers and readers. Share your stories, discover amazing content, and grow your audience.
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="font-heading font-medium text-foreground">
                          Rich Content Editor
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Create beautiful articles with our intuitive editor
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="font-heading font-medium text-foreground">
                          Analytics Dashboard
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Track your content performance and audience engagement
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="font-heading font-medium text-foreground">
                          Community Features
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Engage with readers through comments and discussions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-card border border-border rounded-xl p-6 soft-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-heading font-semibold">
                        S
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground italic mb-2">
                          "ContentHub Pro has transformed how I share my ideas. The platform is intuitive and the community is incredibly supportive."
                        </p>
                        <div>
                          <p className="font-heading font-medium text-foreground text-sm">
                            Sarah Chen
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tech Writer & Content Creator
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Forms */}
            <div className="w-full lg:w-1/2 lg:max-w-md">
              {registrationStep === 'form' ? (
                <div className="space-y-6">
                  {/* Registration Form */}
                  <RegistrationForm 
                    onSubmit={handleRegistration}
                    isLoading={isLoading}
                  />
                  
                  {/* Social Registration */}
                  <SocialRegistration 
                    onSocialRegister={handleSocialRegistration}
                    isLoading={isLoading}
                  />
                </div>
              ) : (
                /* Success Screen */
                (<RegistrationSuccess 
                  email={registeredEmail}
                  onResendVerification={handleResendVerification}
                />)
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© {new Date()?.getFullYear()} ContentHub Pro</span>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="/help" className="hover:text-foreground transition-colors">
                Help
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Follow us:</span>
              <div className="flex space-x-2">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <div className="w-3 h-3 bg-current rounded-full"></div>
                  </div>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <div className="w-3 h-3 bg-current rounded-full"></div>
                  </div>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <div className="w-3 h-3 bg-current rounded-full"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;