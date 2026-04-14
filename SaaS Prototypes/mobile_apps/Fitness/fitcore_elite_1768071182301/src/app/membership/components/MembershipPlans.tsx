import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string;
  originalPrice?: number;
  badge?: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

interface MembershipPlansProps {
  onSelectPlan: (planId: string) => void;
}

const MembershipPlans = ({ onSelectPlan }: MembershipPlansProps) => {
  const plans: MembershipPlan[] = [
    {
      id: 'foundation',
      name: 'Foundation',
      tagline: 'Start Your Journey',
      price: 89,
      period: 'month',
      description: 'Perfect for fitness beginners ready to build solid fundamentals with professional guidance.',
      features: [
        { name: 'Gym Access (6am-10pm)', included: true },
        { name: 'Basic Equipment Access', included: true },
        { name: 'Locker Room Access', included: true },
        { name: 'Mobile App Access', included: true },
        { name: 'Group Classes (2/week)', included: true },
        { name: 'Personal Training Sessions', included: false },
        { name: '24/7 Access', included: false },
        { name: 'Nutrition Consultation', included: false },
        { name: 'Recovery Suite Access', included: false },
        { name: 'Guest Passes', included: false }
      ],
      cta: 'Start Foundation'
    },
    {
      id: 'elite',
      name: 'Elite',
      tagline: 'Serious Performance',
      price: 189,
      period: 'month',
      originalPrice: 229,
      badge: 'Most Popular',
      popular: true,
      description: 'Comprehensive training ecosystem for dedicated athletes pursuing measurable performance gains.',
      features: [
        { name: '24/7 Gym Access', included: true },
        { name: 'All Equipment Access', included: true },
        { name: 'Unlimited Group Classes', included: true },
        { name: 'Personal Training (2/month)', included: true },
        { name: 'Nutrition Consultation', included: true },
        { name: 'Recovery Suite Access', included: true },
        { name: 'Guest Passes (4/month)', included: true },
        { name: 'Performance Analytics', included: true },
        { name: 'Priority Booking', included: true },
        { name: 'Exclusive Events Access', included: false }
      ],
      cta: 'Join Elite'
    },
    {
      id: 'champion',
      name: 'Champion',
      tagline: 'Ultimate Excellence',
      price: 349,
      period: 'month',
      badge: 'Premium',
      description: 'The pinnacle of fitness membership for elite performers who demand the absolute best.',
      features: [
        { name: '24/7 VIP Access', included: true },
        { name: 'All Premium Equipment', included: true },
        { name: 'Unlimited Everything', included: true },
        { name: 'Personal Training (8/month)', included: true },
        { name: 'Dedicated Nutrition Coach', included: true },
        { name: 'Full Recovery Suite', included: true },
        { name: 'Unlimited Guest Passes', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Exclusive Events Access', included: true },
        { name: 'Concierge Services', included: true }
      ],
      cta: 'Become Champion'
    }
  ];

  return (
    <section id="membership-plans" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Choose Your <span className="text-primary">Elite Path</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Every membership tier is designed to deliver exceptional results. 
            Select the level that matches your commitment to excellence.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex items-center justify-center mb-8 sm:mb-12">
          <div className="bg-muted/50 p-1 rounded-lg flex items-center space-x-1">
            <button className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
              Monthly
            </button>
            <button className="px-3 sm:px-4 py-2 text-muted-foreground hover:text-foreground rounded-md text-sm font-medium transition-colors">
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-card border rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-primary shadow-neon bg-gradient-to-b from-primary/5 to-transparent' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-primary font-medium mb-3 sm:mb-4">{plan.tagline}</p>
                
                {/* Pricing */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground font-mono">${plan.price}</span>
                    <span className="text-muted-foreground text-sm sm:text-base">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-xs sm:text-sm text-muted-foreground line-through">
                      Was ${plan.originalPrice}/{plan.period}
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed px-2">{plan.description}</p>
              </div>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      feature.included 
                        ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
                    }`}>
                      <Icon 
                        name={feature.included ? "CheckIcon" : "XMarkIcon"} 
                        size={12} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs sm:text-sm ${
                        feature.included ? 'text-foreground' : 'text-muted-foreground'
                      } break-words`}>
                        {feature.name}
                      </span>
                      {feature.description && (
                        <p className="text-xs text-muted-foreground mt-1 break-words">{feature.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSelectPlan(plan.id)}
                className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-cta hover:shadow-neon'
                    : 'bg-muted text-foreground hover:bg-muted/80 border border-border hover:border-primary/50'
                }`}
              >
                {plan.cta}
              </button>

              {/* Trial Info */}
              <div className="text-center mt-3 sm:mt-4">
                <p className="text-xs text-muted-foreground">
                  7-day free trial • No commitment • Cancel anytime
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Not sure which plan is right for you?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
              Schedule a complimentary consultation with our fitness experts to find your perfect fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">
                <Icon name="CalendarIcon" size={20} />
                <span>Book Consultation</span>
              </button>
              <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted/50 transition-colors flex items-center justify-center space-x-2">
                <Icon name="PhoneIcon" size={20} />
                <span>Call (555) 123-4567</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;