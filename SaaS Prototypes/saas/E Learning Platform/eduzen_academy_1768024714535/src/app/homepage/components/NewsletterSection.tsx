'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const NewsletterSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  if (!isHydrated) {
    return (
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-[#5A7A5A]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="h-12 bg-primary-foreground/20 rounded-lg animate-pulse w-3/4 mx-auto"></div>
            <div className="h-6 bg-primary-foreground/20 rounded-lg animate-pulse w-2/3 mx-auto"></div>
            <div className="h-14 bg-primary-foreground/20 rounded-lg animate-pulse w-full max-w-md mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-[#5A7A5A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 rounded-full text-primary-foreground text-sm font-medium">
            <Icon name="EnvelopeIcon" size={16} variant="solid" />
            <span>Mindful Learning Tips</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-headline font-semibold text-primary-foreground">
            Nurture Your <span className="italic">Learning Journey</span>
          </h2>

          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto font-body leading-relaxed">
            Receive weekly insights on mindful learning practices, course recommendations, and exclusive content designed to support your growth.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent font-body"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-cta font-semibold hover:shadow-cta transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe
                  <Icon name="ArrowRightIcon" size={20} />
                </button>
              </div>
              <p className="text-sm text-primary-foreground/70 mt-4 font-body">
                Join 25,000+ mindful learners. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto p-6 bg-success/20 rounded-lg border border-success/30">
              <div className="flex items-center justify-center gap-2 text-primary-foreground">
                <Icon name="CheckCircleIcon" size={24} variant="solid" />
                <span className="font-medium">Thank you for subscribing!</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={18} variant="solid" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="EnvelopeIcon" size={18} variant="solid" />
              <span>Weekly insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="SparklesIcon" size={18} variant="solid" />
              <span>Exclusive content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;