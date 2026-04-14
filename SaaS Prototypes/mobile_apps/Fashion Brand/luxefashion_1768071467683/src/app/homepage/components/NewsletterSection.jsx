'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const NewsletterSection = ({ newsletterData }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!email?.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Ghost Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[12vw] font-heading font-bold text-white opacity-5 select-none whitespace-nowrap">
          SUBSCRIBE
        </span>
      </div>
      <div className="relative z-10 w-full px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4 tracking-tight">
              {newsletterData?.title}
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-[rgba(196,196,196,1)]">
              {newsletterData?.description}
            </p>
          </div>

          {/* Newsletter Form */}
          {!isSubmitted ?
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-4 bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  disabled={isLoading} />

                </div>
                <button
                type="submit"
                disabled={isLoading || !email?.trim()}
                className="bg-accent text-accent-foreground px-8 py-4 font-heading font-bold text-sm uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press shadow-elevation-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

                  {isLoading ?
                <>
                      <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                      Subscribing...
                    </> :

                <>
                      Subscribe
                      <Icon name="PaperAirplaneIcon" size={16} />
                    </>
                }
                </button>
              </div>
            </form> :

          <div className="max-w-md mx-auto">
              <div className="bg-success/10 border border-success/20 p-6 text-center">
                <Icon name="CheckCircleIcon" size={48} className="text-success mx-auto mb-4" />
                <h3 className="font-heading font-bold text-xl text-primary-foreground mb-2">
                  Welcome to LuxeFashion!
                </h3>
                <p className="text-primary-foreground/80">
                  Thank you for subscribing. Check your email for a special welcome offer!
                </p>
              </div>
            </div>
          }

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {newsletterData?.benefits?.map((benefit, index) =>
            <div key={index} className="text-center">
                <Icon name={benefit?.icon} size={32} className="text-accent mx-auto mb-3" />
                <h4 className="font-heading font-bold text-primary-foreground mb-2">
                  {benefit?.title}
                </h4>
                <p className="text-sm text-[rgba(205,203,203,1)]">
                  {benefit?.description}
                </p>
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[rgba(201,201,201,1)]">By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.

            </p>
          </div>
        </div>
      </div>
    </section>);

};

NewsletterSection.propTypes = {
  newsletterData: PropTypes?.shape({
    title: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
    benefits: PropTypes?.arrayOf(
      PropTypes?.shape({
        title: PropTypes?.string?.isRequired,
        description: PropTypes?.string?.isRequired,
        icon: PropTypes?.string?.isRequired
      })
    )?.isRequired
  })?.isRequired
};

export default NewsletterSection;