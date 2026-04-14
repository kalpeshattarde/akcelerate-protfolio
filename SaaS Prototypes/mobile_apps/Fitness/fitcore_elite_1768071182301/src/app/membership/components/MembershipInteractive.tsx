'use client';

import React, { useState, useEffect, useRef } from 'react';
import MembershipHero from './MembershipHero';
import MembershipPlans from './MembershipPlans';
import ComparisonTable from './ComparisonTable';
import TrialBooking from './TrialBooking';
import MembershipCalculator from './MembershipCalculator';
import MemberTestimonials from './MemberTestimonials';
import MembershipFAQ from './MembershipFAQ';

const MembershipInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const plansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const scrollToPlans = () => {
    if (plansRef.current) {
      plansRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSelectPlan = (planId: string) => {
    if (!isHydrated) return;
    
    // Handle plan selection logic
    console.log('Selected plan:', planId);
    
    // Could navigate to checkout or show modal
    // For now, just scroll to trial booking
    const trialSection = document.getElementById('trial-booking');
    if (trialSection) {
      trialSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <MembershipHero onScrollToPlans={scrollToPlans} />

      {/* Membership Plans */}
      <div ref={plansRef}>
        <MembershipPlans onSelectPlan={handleSelectPlan} />
      </div>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Membership Calculator */}
      <MembershipCalculator />

      {/* Member Testimonials */}
      <MemberTestimonials />

      {/* Trial Booking */}
      <div id="trial-booking">
        <TrialBooking />
      </div>

      {/* FAQ Section */}
      <MembershipFAQ />
    </div>
  );
};

export default MembershipInteractive;