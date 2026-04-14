import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection: React.FC = () => {
  return (
    <section className="px-6 lg:px-12 py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          Ready to Create Something Exceptional?
        </h2>
        <p className="font-body text-lg text-text-secondary mb-12 leading-relaxed max-w-2xl mx-auto">
          Let's collaborate to transform your vision into a digital experience that resonates, inspires, and endures.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-cta font-semibold text-base rounded-md hover:bg-accent/90 hover:-translate-y-1 hover:shadow-dramatic transition-all duration-300"
          >
            Start a Conversation
            <Icon 
              name="ArrowRightIcon" 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </Link>

          <Link
            href="/work-portfolio"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-border text-foreground font-cta font-semibold text-base rounded-md hover:border-primary hover:text-primary transition-all duration-300"
          >
            View Our Work
            <Icon 
              name="ArrowRightIcon" 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;