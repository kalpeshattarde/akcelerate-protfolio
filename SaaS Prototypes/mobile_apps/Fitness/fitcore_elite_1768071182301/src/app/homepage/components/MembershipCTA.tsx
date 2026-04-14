import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface MembershipTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const MembershipCTA = () => {
  const membershipTiers: MembershipTier[] = [
    {
      name: 'Elite Starter',
      price: '$149',
      period: '/month',
      features: ['Gym Access', 'Group Classes', 'Basic Nutrition Guide'],
      cta: 'Start Journey'
    },
    {
      name: 'Elite Performance',
      price: '$299',
      period: '/month',
      features: ['Everything in Starter', 'Personal Training (4x/month)', 'Advanced Analytics', 'Recovery Sessions'],
      popular: true,
      cta: 'Go Elite'
    },
    {
      name: 'Elite Champion',
      price: '$499',
      period: '/month',
      features: ['Everything in Performance', 'Unlimited Personal Training', '24/7 Facility Access', 'Nutrition Coaching', 'Priority Booking'],
      cta: 'Become Champion'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-deep-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-error/10 border border-error/20 rounded-full text-error text-sm font-medium mb-6">
            <Icon name="CreditCardIcon" size={16} />
            <span>Membership Tiers</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="block text-transparent bg-gradient-to-r from-error to-primary bg-clip-text">
              Elite Level
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Select the membership tier that aligns with your fitness goals and commitment level. Each tier is designed to deliver maximum value and results.
          </p>
        </div>

        {/* Membership Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {membershipTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-card/50 backdrop-blur-10 border rounded-2xl p-8 glass-morphism transition-all duration-300 hover:scale-105 ${
                tier.popular 
                  ? 'border-primary shadow-neon' 
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Tier Name */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Icon name="CheckIcon" size={16} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* CTA Button */}
              <Link
                href="/membership"
                className={`group relative block w-full py-4 rounded-lg font-semibold text-center transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation ${
                  tier.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-cta hover:shadow-neon'
                    : 'bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-primary-foreground'
                }`}
                aria-label={`Select ${tier.name} membership tier`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {tier.cta}
                  <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                {tier.popular && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Life?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the elite community of high-performers who demand excellence in every aspect of their fitness journey. Your transformation starts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold overflow-hidden transition-all duration-300 shadow-cta hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
              aria-label="Start your free trial membership"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Free Trial
                <Icon name="PlayIcon" size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background active:scale-95 touch-manipulation"
              aria-label="Schedule a consultation with our team"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Schedule Consultation
                <Icon name="CalendarDaysIcon" size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipCTA;