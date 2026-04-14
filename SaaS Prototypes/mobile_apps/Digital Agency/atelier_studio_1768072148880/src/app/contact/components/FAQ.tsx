'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const faqs: FAQItem[] = [
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary based on scope and complexity. A brand identity project typically takes 8-12 weeks, while a comprehensive web experience can range from 12-20 weeks. We provide detailed timelines during our initial consultation.',
    },
    {
      question: 'What is your minimum project budget?',
      answer: 'Our minimum project engagement starts at $25,000. This ensures we can dedicate the necessary time and resources to deliver exceptional results that align with our craft standards and your business objectives.',
    },
    {
      question: 'Do you work with startups?',
      answer: 'Yes, we work with select startups that demonstrate strong vision and commitment to exceptional design. We look for founders who understand the value of strategic creative investment and are building brands with long-term potential.',
    },
    {
      question: 'What is your creative process?',
      answer: 'Our process begins with deep discovery and strategic alignment, followed by conceptual exploration, iterative refinement, and meticulous execution. We believe in collaborative partnership and maintain transparent communication throughout every phase.',
    },
    {
      question: 'Do you offer ongoing support after project completion?',
      answer: 'Absolutely. We offer various retainer and support packages to ensure your digital presence continues to evolve. Many clients engage us for ongoing creative direction, content strategy, and technical maintenance.',
    },
    {
      question: 'Can we visit your studio?',
      answer: 'Yes, we welcome studio visits by appointment. Meeting in person allows us to better understand your vision and share our creative process. Contact us to schedule a consultation at our New York studio.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isHydrated) {
    return (
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto" />
            <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
            <div className="space-y-3 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg text-text-secondary">
            Common inquiries about our process, pricing, and partnerships
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors duration-300"
              >
                <h3 className="font-cta text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <Icon
                  name="ChevronDownIcon"
                  size={24}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="font-body text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-body text-text-secondary mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:hello@atelierstudio.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-cta font-semibold transition-colors duration-300"
          >
            <Icon name="EnvelopeIcon" size={20} />
            Email us directly
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;