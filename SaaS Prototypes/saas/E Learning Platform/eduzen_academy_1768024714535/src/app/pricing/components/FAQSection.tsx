import React from 'react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  expandedIndex: number | null;
  onToggle: (index: number) => void;
}

const FAQSection = ({ faqs, expandedIndex, onToggle }: FAQSectionProps) => {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl lg:text-4xl font-semibold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="font-body text-lg text-muted-foreground">
          Everything you need to know about our pricing and plans
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50"
          >
            <button
              onClick={() => onToggle(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/20 transition-colors duration-200"
            >
              <span className="font-headline text-lg font-semibold text-foreground pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                  expandedIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 font-body text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;