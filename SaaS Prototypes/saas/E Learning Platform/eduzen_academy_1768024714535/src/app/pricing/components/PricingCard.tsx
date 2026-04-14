import React from 'react';
import Icon from '@/components/ui/AppIcon';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingPeriod: string;
  popular?: boolean;
  features: string[];
  cta: string;
  badge?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelectPlan: (planId: string) => void;
}

const PricingCard = ({ plan, onSelectPlan }: PricingCardProps) => {
  return (
    <div
      className={`relative bg-card rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
        plan.popular
          ? 'border-2 border-primary shadow-lg scale-105'
          : 'border border-border hover:border-primary/50'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-block bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-sm font-cta font-semibold">
            Most Popular
          </span>
        </div>
      )}

      {plan.badge && !plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-block bg-accent text-accent-foreground px-6 py-1.5 rounded-full text-sm font-cta font-semibold">
            {plan.badge}
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="font-headline text-2xl font-semibold text-foreground mb-3">
          {plan.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground mb-6">
          {plan.description}
        </p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="font-headline text-5xl font-bold text-foreground">
            ${plan.price}
          </span>
          <span className="font-body text-muted-foreground">
            /{plan.billingPeriod}
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Icon
              name="CheckCircleIcon"
              variant="solid"
              size={20}
              className="text-success flex-shrink-0 mt-0.5"
            />
            <span className="font-body text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelectPlan(plan.id)}
        className={`w-full py-3.5 rounded-lg font-cta font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
          plan.popular
            ? 'bg-primary text-primary-foreground hover:shadow-cta'
            : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
};

export default PricingCard;