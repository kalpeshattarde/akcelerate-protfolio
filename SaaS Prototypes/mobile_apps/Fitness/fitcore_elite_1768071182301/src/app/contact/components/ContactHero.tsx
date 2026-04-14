import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactHeroProps {
  onScrollToContact: () => void;
}

const ContactHero = ({ onScrollToContact }: ContactHeroProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-background via-deep-charcoal to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary/50 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Icon name="ChatBubbleLeftRightIcon" size={16} className="mr-2" />
            Ready to Transform?
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Start Your
          <span className="block text-primary neon-glow">Elite Journey</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Connect with our elite trainers, book your consultation, and take the first step toward achieving peak performance. Multiple ways to reach us, one goal: your transformation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onScrollToContact}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-cta hover:shadow-neon flex items-center space-x-2"
          >
            <Icon name="RocketLaunchIcon" size={20} />
            <span>Book Free Consultation</span>
          </button>
          
          <a
            href="tel:+1-555-FITCORE"
            className="px-8 py-4 border border-border rounded-lg font-semibold text-lg text-foreground hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 flex items-center space-x-2"
          >
            <Icon name="PhoneIcon" size={20} />
            <span>Call Now</span>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="ClockIcon" size={24} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Quick Response</h3>
            <p className="text-sm text-muted-foreground">Within 2 hours</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="UserGroupIcon" size={24} className="text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Expert Guidance</h3>
            <p className="text-sm text-muted-foreground">Certified trainers</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Icon name="CheckCircleIcon" size={24} className="text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Free Trial</h3>
            <p className="text-sm text-muted-foreground">No commitment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;