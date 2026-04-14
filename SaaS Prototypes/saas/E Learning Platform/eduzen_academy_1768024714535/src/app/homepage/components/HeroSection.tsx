'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const HeroSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9F8] via-[#FEFEFE] to-[#E8EBE8] overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="h-16 bg-muted rounded-lg animate-pulse w-3/4 mx-auto"></div>
            <div className="h-6 bg-muted rounded-lg animate-pulse w-2/3 mx-auto"></div>
            <div className="flex justify-center gap-4">
              <div className="h-12 w-40 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-12 w-40 bg-muted rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9F8] via-[#FEFEFE] to-[#E8EBE8] overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Icon name="SparklesIcon" size={16} variant="solid" />
            <span>Welcome to Mindful Learning</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-semibold text-foreground leading-tight">
            Learning that honors
            <br />
            <span className="text-primary italic">your mind and time</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-body leading-relaxed">
            Experience education designed for human flourishing. Where knowledge meets wisdom in a sanctuary of focused, transformative learning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/course-catalog"
              className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-cta font-semibold text-base hover:shadow-cta transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              Explore Free Courses
              <Icon
                name="ArrowRightIcon"
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-card text-foreground border-2 border-border rounded-lg font-cta font-medium text-base hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-1"
            >
              View Pricing
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="AcademicCapIcon" size={20} variant="solid" className="text-primary" />
              <span>500+ Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="UserGroupIcon" size={20} variant="solid" className="text-primary" />
              <span>50,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="StarIcon" size={20} variant="solid" className="text-accent" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDownIcon" size={32} className="text-primary opacity-50" />
      </div>
    </section>
  );
};

export default HeroSection;