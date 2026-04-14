import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import OriginStory from './components/OriginStory';
import LeadershipCollective from './components/LeadershipCollective';
import CultureCanvas from './components/CultureCanvas';
import ImpactMetrics from './components/ImpactMetrics';
import SocialProof from './components/SocialProof';
import CallToAction from './components/CallToAction';

const About = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us - FlowTech Studio | Technology with Soul</title>
        <meta 
          name="description" 
          content="Discover FlowTech Studio's journey from vision to revolution. Meet our leadership collective, explore our culture of human-centered innovation, and see the measurable impact we create for clients worldwide." 
        />
        <meta name="keywords" content="FlowTech Studio, about us, technology company, human-centered design, innovation, leadership team, company culture, tech startup" />
        <meta property="og:title" content="About Us - FlowTech Studio | Technology with Soul" />
        <meta property="og:description" content="The perfect synthesis of technical excellence and human-centered design philosophy. Discover our story, team, and impact." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - FlowTech Studio" />
        <meta name="twitter:description" content="Technology with Soul - Where cutting-edge innovation meets mindful design" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Origin Story */}
          <OriginStory />
          
          {/* Leadership Collective */}
          <LeadershipCollective />
          
          {/* Culture Canvas */}
          <CultureCanvas />
          
          {/* Impact Metrics */}
          <ImpactMetrics />
          
          {/* Social Proof */}
          <SocialProof />
          
          {/* Call to Action */}
          <CallToAction />
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-primary via-secondary to-primary/80 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">FlowTech Studio</h3>
                    <p className="text-sm text-gray-200">Technology with Soul</p>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed mb-6">
                  Creating digital experiences that don't just function, but inspire. 
                  The perfect synthesis of technical excellence and human-centered philosophy.
                </p>
                <div className="flex space-x-4">
                  {['Linkedin', 'Twitter', 'Github', 'Dribbble']?.map((social) => (
                    <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300">
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5 bg-white rounded-sm"></div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Company</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'About Us', path: '/about' },
                    { name: 'Our Team', path: '/about#team' },
                    { name: 'Careers', path: '/careers' },
                    { name: 'Contact', path: '/contact' }
                  ]?.map((link) => (
                    <li key={link?.name}>
                      <a href={link?.path} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Services</h4>
                <ul className="space-y-3">
                  {[
                    { name: 'Web Development', path: '/services' },
                    { name: 'Mobile Apps', path: '/services' },
                    { name: 'AI Solutions', path: '/services' },
                    { name: 'Consulting', path: '/services' }
                  ]?.map((link) => (
                    <li key={link?.name}>
                      <a href={link?.path} className="text-gray-200 hover:text-white transition-colors duration-200">
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-200 text-sm">
                © {new Date()?.getFullYear()} FlowTech Studio. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-200 hover:text-white text-sm transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;