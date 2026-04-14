import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CorporateFeature {
  icon: string;
  title: string;
  description: string;
}

interface CorporatePricingProps {
  features: CorporateFeature[];
  onRequestQuote: () => void;
}

const CorporatePricing = ({ features, onRequestQuote }: CorporatePricingProps) => {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-3xl p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Corporate Learning Solutions
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Empower your team with mindful learning experiences designed for organizational growth and employee well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon
                  name={feature.icon as any}
                  variant="outline"
                  size={24}
                  className="text-primary"
                />
              </div>
              <h3 className="font-headline text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border text-center">
          <h3 className="font-headline text-2xl font-semibold text-foreground mb-4">
            Ready to Transform Your Team?
          </h3>
          <p className="font-body text-muted-foreground mb-6 max-w-xl mx-auto">
            Schedule a free consultation to discuss your organization's learning needs and receive a custom quote tailored to your team size and goals.
          </p>
          <button
            onClick={onRequestQuote}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-cta font-semibold text-sm hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5"
          >
            Request Custom Quote
            <Icon name="ArrowRightIcon" variant="outline" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CorporatePricing;