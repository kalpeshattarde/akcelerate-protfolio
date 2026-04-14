import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CultureSection from './components/CultureSection';
import TeamSection from './components/TeamSection';
import OpenPositions from './components/OpenPositions';
import BenefitsSection from './components/BenefitsSection';
import ApplicationProcess from './components/ApplicationProcess';

const CareersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Careers - Join Our Creative Technology Team | FlowTech Studio</title>
        <meta 
          name="description" 
          content="Join FlowTech Studio's team of creative technologists. Explore career opportunities where technical excellence meets creative vision. Build technology with soul." 
        />
        <meta name="keywords" content="careers, jobs, creative technologist, react developer, designer, remote work, tech startup" />
        <meta property="og:title" content="Careers - Join Our Creative Technology Team | FlowTech Studio" />
        <meta property="og:description" content="Join FlowTech Studio's team of creative technologists. Explore career opportunities where technical excellence meets creative vision." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/careers" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          <CultureSection />
          <TeamSection />
          <OpenPositions />
          <BenefitsSection />
          <ApplicationProcess />
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-primary via-secondary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">FlowTech Studio</h3>
                </div>
                <p className="text-gray-200 mb-4 max-w-md">
                  Building the future of digital experiences where technology meets soul. 
                  Join us in creating meaningful innovation.
                </p>
                <p className="text-sm text-gray-300">
                  © {new Date()?.getFullYear()} FlowTech Studio. All rights reserved.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="/insights" className="hover:text-white transition-colors">Insights</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-4">Get in Touch</h4>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>careers@flowtech.studio</li>
                  <li>+1 (555) 123-4567</li>
                  <li>San Francisco, CA</li>
                  <li>Remote Worldwide</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CareersPage;