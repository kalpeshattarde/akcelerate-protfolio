'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import PhilosophySection from './PhilosophySection';
import FeaturedWorkSection from './FeaturedWorkSection';
import TestimonialsSection from './TestimonialsSection';
import RecognitionSection from './RecognitionSection';
import CapabilitiesSection from './CapabilitiesSection';
import InsightsSection from './InsightsSection';
import CTASection from './CTASection';
import FooterSection from './FooterSection';

const HomepageInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection isHydrated={isHydrated} />
      <PhilosophySection />
      <FeaturedWorkSection />
      <TestimonialsSection isHydrated={isHydrated} />
      <RecognitionSection />
      <CapabilitiesSection />
      <InsightsSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default HomepageInteractive;