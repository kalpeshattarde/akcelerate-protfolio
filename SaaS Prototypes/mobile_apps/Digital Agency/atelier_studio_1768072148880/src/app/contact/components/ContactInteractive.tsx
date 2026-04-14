'use client';

import React from 'react';
import ContactHero from './ContactHero';
import ProjectInquiryForm from './ProjectInquiryForm';
import ContactInfo from './ContactInfo';
import StudioLocation from './StudioLocation';
import FAQ from './FAQ';
import Testimonials from './Testimonials';
import Footer from './Footer';

const ContactInteractive: React.FC = () => {
  return (
    <>
      <ContactHero
        title="Let's Create Something Exceptional"
        subtitle="Share your vision with us. Whether you're launching a new brand or transforming an existing one, we're here to bring your creative ambitions to life."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ProjectInquiryForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <StudioLocation />
      <FAQ />
      <Footer />
    </>
  );
};

export default ContactInteractive;