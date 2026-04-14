'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'membership' | 'training' | 'facility' | 'trial';
}

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQ[] = [
    {
      id: 1,
      category: 'trial',
      question: 'What does the free consultation include?',
      answer: 'Your free consultation includes a comprehensive fitness assessment, goal-setting session with an elite trainer, facility tour, and personalized program recommendations. We\'ll also discuss membership options that best fit your needs. The consultation typically lasts 60-90 minutes and there\'s absolutely no obligation to join.'
    },
    {
      id: 2,
      category: 'membership',
      question: 'What are your membership options and pricing?',
      answer: 'We offer three membership tiers: Essential ($149/month), Elite ($249/month), and Ultimate ($399/month). Each tier includes different levels of access to trainers, classes, and amenities. Elite and Ultimate members get 24/7 facility access, priority booking, and exclusive perks. Contact us for detailed pricing and current promotions.'
    },
    {
      id: 3,
      category: 'training',
      question: 'Are your trainers certified and experienced?',
      answer: 'All our trainers hold advanced certifications from recognized organizations like NASM, ACSM, or NSCA. Many have additional specializations in areas like sports performance, corrective exercise, or nutrition. Our team includes former professional athletes, competition coaches, and specialists with 5+ years of experience.'
    },
    {
      id: 4,
      category: 'facility',
      question: 'What equipment and amenities do you offer?',
      answer: 'Our 15,000 sq ft facility features state-of-the-art equipment including Olympic lifting platforms, functional training areas, cardio machines with entertainment systems, recovery suites with saunas and cold therapy, nutrition bar, locker rooms with premium amenities, and dedicated spaces for group classes and personal training.'
    },
    {
      id: 5,
      category: 'trial',
      question: 'Can I try a class before committing to membership?',
      answer: 'Absolutely! We offer complimentary trial classes for prospective members. You can book up to 2 trial classes in different formats (strength training, HIIT, yoga, etc.) to experience our training style and community. Trial classes must be booked in advance and include a brief orientation.'
    },
    {
      id: 6,
      category: 'membership',
      question: 'Do you offer corporate or group memberships?',
      answer: 'Yes, we have comprehensive corporate wellness programs starting at 5+ employees. Benefits include discounted rates, flexible billing, wellness challenges, lunch-and-learn sessions, and dedicated account management. We also offer family plans and group training packages for friends training together.'
    },
    {
      id: 7,
      category: 'training',
      question: 'How do you customize training programs?',
      answer: 'Every member receives a personalized program based on their fitness assessment, goals, medical history, and preferences. We use movement screens, body composition analysis, and performance testing to create data-driven programs. Programs are regularly updated based on progress and evolving goals.'
    },
    {
      id: 8,
      category: 'facility',
      question: 'What are your safety and cleanliness protocols?',
      answer: 'We maintain the highest standards of cleanliness with professional-grade sanitization, HEPA air filtration, and regular deep cleaning. All equipment is sanitized between uses, and we provide sanitizing stations throughout the facility. Our staff is trained in emergency procedures and CPR/AED certified.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: 'QuestionMarkCircleIcon' },
    { id: 'trial', name: 'Trial & Consultation', icon: 'ClipboardDocumentCheckIcon' },
    { id: 'membership', name: 'Membership', icon: 'CreditCardIcon' },
    { id: 'training', name: 'Training', icon: 'AcademicCapIcon' },
    { id: 'facility', name: 'Facility', icon: 'BuildingOfficeIcon' }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h3>
        <p className="text-muted-foreground">
          Find answers to common questions about our programs, membership, and facility.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Icon name={category.icon as any} size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors duration-300"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-300"
            >
              <span className="font-medium text-foreground pr-4">{faq.question}</span>
              <Icon
                name={openFAQ === faq.id ? "ChevronUpIcon" : "ChevronDownIcon"}
                size={20}
                className={`text-muted-foreground transition-transform duration-300 ${
                  openFAQ === faq.id ? 'text-primary' : ''
                }`}
              />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-4">
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg text-center">
        <h4 className="font-semibold text-foreground mb-2">Still Have Questions?</h4>
        <p className="text-muted-foreground mb-4">
          Our team is here to help you find the perfect fitness solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+15553482673"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <Icon name="PhoneIcon" size={16} />
            <span>Call Us Now</span>
          </a>
          <a
            href="mailto:elite@fitcore.com"
            className="px-6 py-3 border border-border rounded-lg font-medium text-foreground hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Icon name="EnvelopeIcon" size={16} />
            <span>Send Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;