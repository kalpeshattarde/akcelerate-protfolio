'use client';

import React, { useState } from 'react';
import PricingCard, { type PricingPlan } from './PricingCard';
import ComparisonTable from './ComparisonTable';
import CorporatePricing from './CorporatePricing';
import FAQSection, { type FAQ } from './FAQSection';
import TrustSignals from './TrustSignals';
import PaymentMethods from './PaymentMethods';

const PricingInteractive = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for curious learners beginning their journey',
      price: billingCycle === 'monthly' ? 29 : 24,
      billingPeriod: billingCycle === 'monthly' ? 'month' : 'month (billed annually)',
      features: [
        'Access to 50+ foundational courses',
        'Community forum participation',
        'Mobile app access',
        'Progress tracking dashboard',
        'Email support',
        'Monthly live Q&A sessions',
      ],
      cta: 'Start Free Trial',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For dedicated learners seeking mastery',
      price: billingCycle === 'monthly' ? 79 : 65,
      billingPeriod: billingCycle === 'monthly' ? 'month' : 'month (billed annually)',
      popular: true,
      features: [
        'Unlimited access to all courses',
        'Priority community support',
        'Downloadable course materials',
        'Personalized learning paths',
        'Weekly live workshops',
        'Certificate of completion',
        'Offline course downloads',
        '1-on-1 instructor consultations (2/month)',
      ],
      cta: 'Start Free Trial',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive solution for organizations',
      price: billingCycle === 'monthly' ? 199 : 165,
      billingPeriod: billingCycle === 'monthly' ? 'month' : 'month (billed annually)',
      badge: 'Best Value',
      features: [
        'Everything in Professional',
        'Team management dashboard',
        'Custom learning tracks',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'API access for LMS integration',
        'White-label options',
        'Unlimited 1-on-1 consultations',
        'Custom content creation',
      ],
      cta: 'Contact Sales',
    },
  ];

  const comparisonFeatures = [
    {
      name: 'Course Library Access',
      starter: '50+ courses',
      professional: 'Unlimited',
      enterprise: 'Unlimited + Custom',
    },
    {
      name: 'Community Forum',
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Mobile App',
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Progress Tracking',
      starter: true,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Downloadable Materials',
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Live Workshops',
      starter: 'Monthly',
      professional: 'Weekly',
      enterprise: 'Daily',
    },
    {
      name: 'Certificates',
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: 'Offline Access',
      starter: false,
      professional: true,
      enterprise: true,
    },
    {
      name: '1-on-1 Consultations',
      starter: false,
      professional: '2/month',
      enterprise: 'Unlimited',
    },
    {
      name: 'Team Management',
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: 'Custom Learning Paths',
      starter: false,
      professional: false,
      enterprise: true,
    },
    {
      name: 'API Access',
      starter: false,
      professional: false,
      enterprise: true,
    },
  ];

  const corporateFeatures = [
    {
      icon: 'UserGroupIcon',
      title: 'Team Dashboards',
      description: 'Monitor team progress, engagement, and skill development with comprehensive analytics.',
    },
    {
      icon: 'ChartBarIcon',
      title: 'Advanced Analytics',
      description: 'Track learning outcomes, ROI, and employee satisfaction with detailed reporting.',
    },
    {
      icon: 'AcademicCapIcon',
      title: 'Custom Content',
      description: 'Create organization-specific courses aligned with your business objectives.',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Enterprise Security',
      description: 'SSO integration, GDPR compliance, and enterprise-grade data protection.',
    },
    {
      icon: 'CogIcon',
      title: 'LMS Integration',
      description: 'Seamless integration with your existing learning management systems.',
    },
    {
      icon: 'UserIcon',
      title: 'Dedicated Support',
      description: 'Personal account manager and priority technical support for your team.',
    },
  ];

  const faqs: FAQ[] = [
    {
      question: 'What is included in the free trial?',
      answer: 'All plans include a 14-day free trial with full access to plan features. No credit card required to start. You can cancel anytime during the trial period without being charged.',
    },
    {
      question: 'Can I switch plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee on all plans. If you\'re not satisfied with your learning experience, contact us within 30 days of purchase for a full refund—no questions asked.',
    },
    {
      question: 'How does annual billing work?',
      answer: 'Annual billing gives you 2 months free compared to monthly pricing. You\'ll be charged once per year, and you can cancel anytime. If you cancel, you\'ll retain access until the end of your billing period.',
    },
    {
      question: 'Do you offer student or nonprofit discounts?',
      answer: 'Yes! We offer 40% discounts for students with valid .edu email addresses and 30% discounts for registered nonprofit organizations. Contact our support team to verify eligibility.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise plans. All payments are processed securely through Stripe with 256-bit SSL encryption.',
    },
    {
      question: 'Can I share my account with others?',
      answer: 'Individual plans are for single-user access only. For teams, we offer Enterprise plans with multi-user licenses, team management features, and volume discounts based on team size.',
    },
    {
      question: 'What happens if I cancel my subscription?',
      answer: 'You can cancel anytime from your account settings. You\'ll retain full access to all features until the end of your current billing period. Your progress and certificates will be saved for 90 days if you decide to return.',
    },
  ];

  const trustSignals = [
    {
      icon: 'ShieldCheckIcon',
      title: 'SSL Certified',
      description: '256-bit encryption for all transactions',
    },
    {
      icon: 'LockClosedIcon',
      title: 'GDPR Compliant',
      description: 'Full data privacy protection',
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Accredited',
      description: 'Recognized educational standards',
    },
    {
      icon: 'EyeSlashIcon',
      title: 'Privacy First',
      description: 'Your data is never sold',
    },
  ];

  const handleSelectPlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
    alert(`Redirecting to checkout for ${planId} plan...`);
  };

  const handleRequestQuote = () => {
    console.log('Corporate quote requested');
    alert('Thank you for your interest! Our sales team will contact you within 24 hours.');
  };

  const handleToggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="space-y-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-lg font-cta font-medium text-sm transition-all duration-300 ${
              billingCycle === 'monthly' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2.5 rounded-lg font-cta font-medium text-sm transition-all duration-300 relative ${
              billingCycle === 'annual' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
              Save 17%
            </span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Compare All Features
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Find the perfect plan for your learning journey
            </p>
          </div>
          <ComparisonTable features={comparisonFeatures} />
        </div>

        <div className="mb-20">
          <CorporatePricing
            features={corporateFeatures}
            onRequestQuote={handleRequestQuote}
          />
        </div>

        <div className="mb-20">
          <TrustSignals signals={trustSignals} />
        </div>

        <div className="mb-20">
          <PaymentMethods />
        </div>

        <div>
          <FAQSection
            faqs={faqs}
            expandedIndex={expandedFAQ}
            onToggle={handleToggleFAQ}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingInteractive;