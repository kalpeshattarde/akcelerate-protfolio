import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceComparison = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const plans = [
    {
      id: 'essential',
      name: 'Essential',
      subtitle: 'Perfect for startups',
      price: 'Starting at $15K',
      duration: '4-6 weeks',
      description: 'Core web presence with modern design and essential functionality',
      color: 'from-trust to-trust/60',
      popular: false,
      features: [
        { name: 'React 18+ Development', included: true },
        { name: 'Responsive Design', included: true },
        { name: 'Basic SEO Optimization', included: true },
        { name: 'Contact Forms', included: true },
        { name: 'Content Management', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Advanced Animations', included: false },
        { name: 'E-commerce Integration', included: false },
        { name: 'Custom API Development', included: false },
        { name: 'Performance Optimization', included: false },
        { name: '24/7 Support', included: false },
        { name: 'Advanced Security', included: false }
      ],
      includes: [
        'Modern React application',
        'Mobile-responsive design',
        'Basic content management',
        '3 months support',
        'Training documentation'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      subtitle: 'Most popular choice',
      price: 'Starting at $35K',
      duration: '6-10 weeks',
      description: 'Comprehensive solution with advanced features and integrations',
      color: 'from-primary to-primary/60',
      popular: true,
      features: [
        { name: 'React 18+ Development', included: true },
        { name: 'Responsive Design', included: true },
        { name: 'Basic SEO Optimization', included: true },
        { name: 'Contact Forms', included: true },
        { name: 'Content Management', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Advanced Animations', included: true },
        { name: 'E-commerce Integration', included: true },
        { name: 'Custom API Development', included: true },
        { name: 'Performance Optimization', included: true },
        { name: '24/7 Support', included: false },
        { name: 'Advanced Security', included: false }
      ],
      includes: [
        'Everything in Essential',
        'Advanced animations & interactions',
        'E-commerce capabilities',
        'Custom API development',
        'Performance optimization',
        '6 months support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'For complex projects',
      price: 'Starting at $75K',
      duration: '10-16 weeks',
      description: 'Full-scale digital platform with enterprise-grade features',
      color: 'from-accent to-accent/60',
      popular: false,
      features: [
        { name: 'React 18+ Development', included: true },
        { name: 'Responsive Design', included: true },
        { name: 'Basic SEO Optimization', included: true },
        { name: 'Contact Forms', included: true },
        { name: 'Content Management', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Advanced Animations', included: true },
        { name: 'E-commerce Integration', included: true },
        { name: 'Custom API Development', included: true },
        { name: 'Performance Optimization', included: true },
        { name: '24/7 Support', included: true },
        { name: 'Advanced Security', included: true }
      ],
      includes: [
        'Everything in Professional',
        'Enterprise-grade security',
        'Advanced integrations',
        'Custom dashboard development',
        'Dedicated project manager',
        '12 months support'
      ]
    }
  ];

  const allFeatures = [
    'React 18+ Development',
    'Responsive Design',
    'Basic SEO Optimization',
    'Contact Forms',
    'Content Management',
    'Basic Analytics',
    'Advanced Animations',
    'E-commerce Integration',
    'Custom API Development',
    'Performance Optimization',
    '24/7 Support',
    'Advanced Security'
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Layers" size={16} />
            <span>Service Packages</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Choose Your Perfect Solution
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Transparent pricing with comprehensive packages designed to meet different project scales and requirements
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans?.map((plan) => (
            <div
              key={plan?.id}
              className={`
                relative card-elevated p-8 transition-all duration-300 cursor-pointer
                ${selectedPlan === plan?.id 
                  ? 'ring-2 ring-primary shadow-strong scale-105' 
                  : 'hover:shadow-strong hover:scale-102'
                }
              `}
              onClick={() => setSelectedPlan(plan?.id)}
            >
              {/* Popular Badge */}
              {plan?.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${plan?.color} flex items-center justify-center`}>
                  <Icon name="Package" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">{plan?.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{plan?.subtitle}</p>
                <div className="text-3xl font-bold text-text-primary mb-1">{plan?.price}</div>
                <p className="text-sm text-text-secondary">{plan?.duration}</p>
              </div>

              {/* Plan Description */}
              <p className="text-text-secondary text-center mb-8 leading-relaxed">
                {plan?.description}
              </p>

              {/* What's Included */}
              <div className="mb-8">
                <h4 className="font-semibold text-text-primary mb-4">What's Included:</h4>
                <ul className="space-y-2">
                  {plan?.includes?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                variant={plan?.popular ? "default" : "outline"}
                fullWidth
                className="btn-magnetic"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-background rounded-2xl p-8 shadow-medium">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Detailed Feature Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-text-primary">Features</th>
                  {plans?.map((plan) => (
                    <th key={plan?.id} className="text-center py-4 px-4">
                      <div className="font-semibold text-text-primary">{plan?.name}</div>
                      <div className="text-sm text-text-secondary">{plan?.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures?.map((feature, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-card/50 transition-colors duration-200">
                    <td className="py-4 px-4 font-medium text-text-primary">{feature}</td>
                    {plans?.map((plan) => {
                      const planFeature = plan?.features?.find(f => f?.name === feature);
                      return (
                        <td key={plan?.id} className="text-center py-4 px-4">
                          {planFeature?.included ? (
                            <Icon name="Check" size={20} className="text-primary mx-auto" />
                          ) : (
                            <Icon name="X" size={20} className="text-text-secondary/40 mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Solutions CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Need Something Custom?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Every project is unique. Let's discuss your specific requirements and create a tailored solution that perfectly fits your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              className="btn-magnetic"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Discuss Custom Solution
            </Button>
            <Button
              variant="outline"
              iconName="Calculator"
              iconPosition="left"
            >
              Get Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;