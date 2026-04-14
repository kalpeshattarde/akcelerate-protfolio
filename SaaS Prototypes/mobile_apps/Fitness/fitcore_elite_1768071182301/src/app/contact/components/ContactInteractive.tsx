'use client';

import React, { useRef } from 'react';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import LocationMap from './LocationMap';
import FAQSection from './FAQSection';
import LiveChatWidget from './LiveChatWidget';

const ContactInteractive = () => {
  const contactFormRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactFormRef?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ContactHero onScrollToContact={scrollToContact} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div ref={contactFormRef}>
            <ContactForm id="main-contact-form" />
          </div>

          {/* Contact Information */}
          <div>
            <ContactInfo />
          </div>
        </div>

        {/* Location & Map Section */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visit Our Elite Facility
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience our world-class training environment in the heart of Los Angeles. 
              State-of-the-art equipment, premium amenities, and expert guidance await.
            </p>
          </div>
          <LocationMap />
        </div>

        {/* FAQ Section */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Questions & Answers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant answers to the most common questions about our programs, 
              membership options, and elite training experience.
            </p>
          </div>
          <FAQSection />
        </div>
      </div>

      {/* Live Chat Widget */}
      <LiveChatWidget />
    </div>
  );
};

export default ContactInteractive;