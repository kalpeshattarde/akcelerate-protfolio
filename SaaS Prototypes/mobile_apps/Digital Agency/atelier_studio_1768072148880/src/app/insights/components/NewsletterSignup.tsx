'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const NewsletterSignup = () => {
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
      <div className="bg-surface rounded-lg p-8 lg:p-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
            <Icon name="EnvelopeIcon" size={32} className="text-primary" />
          </div>
          <h3 className="font-headline text-3xl font-bold text-foreground">
            Subscribe to Creative Insights
          </h3>
          <p className="font-body text-lg text-text-secondary">
            Receive our latest thoughts on craft, culture, and digital innovation directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-3 bg-background border border-border rounded-md font-body text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              disabled
            />
            <button
              type="submit"
              className="px-8 py-3 bg-accent text-accent-foreground font-cta font-semibold rounded-md"
              disabled
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg p-8 lg:p-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
          <Icon name="EnvelopeIcon" size={32} className="text-primary" />
        </div>
        <h3 className="font-headline text-3xl font-bold text-foreground">
          Subscribe to Creative Insights
        </h3>
        <p className="font-body text-lg text-text-secondary">
          Receive our latest thoughts on craft, culture, and digital innovation directly to your inbox.
        </p>

        {isSubmitted ? (
          <div className="flex items-center justify-center gap-2 text-success font-cta font-medium">
            <Icon name="CheckCircleIcon" size={24} />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-3 bg-background border border-border rounded-md font-body text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-accent text-accent-foreground font-cta font-semibold rounded-md hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-dramatic transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="font-body text-xs text-text-secondary">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;