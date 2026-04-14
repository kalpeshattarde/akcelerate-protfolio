'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'cancellation' | 'benefits';
}

const MembershipFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('general');

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: 'general',
      question: 'What makes FitCore Elite different from other gyms?',
      answer: 'FitCore Elite combines cutting-edge technology with elite-level training expertise. Our facility features premium equipment, 24/7 access for most memberships, personalized training programs, and a comprehensive wellness ecosystem including nutrition coaching and recovery services. We focus on measurable results and performance optimization rather than just basic gym access.'
    },
    {
      id: '2',
      category: 'general',
      question: 'Do I need to be in shape to join?',
      answer: 'Absolutely not! FitCore Elite welcomes members at all fitness levels. Our Foundation membership is specifically designed for beginners, and all our trainers are experienced in working with people just starting their fitness journey. We provide proper guidance, support, and progressive programming to help you build confidence and achieve your goals safely.'
    },
    {
      id: '3',
      category: 'pricing',
      question: 'Are there any hidden fees or additional costs?',
      answer: 'No hidden fees! Our membership prices include everything listed in each tier. The only additional costs would be optional services like extra personal training sessions beyond your included amount, specialized workshops, or premium supplements. We believe in transparent pricing and will always discuss any optional add-ons upfront.'
    },
    {
      id: '4',
      category: 'pricing',
      question: 'Do you offer discounts for annual memberships?',
      answer: 'Yes! Annual memberships receive a 20% discount compared to monthly rates. We also offer corporate discounts for companies with 5+ employees, military/veteran discounts, and student rates. Family plans are available for households with multiple members. Contact us to learn about current promotions and eligibility requirements.'
    },
    {
      id: '5',
      category: 'cancellation',
      question: 'What is your cancellation policy?',
      answer: 'We offer flexible cancellation options. Monthly memberships can be cancelled with 30 days notice. Annual memberships have a 60-day notice period but include a 30-day satisfaction guarantee. If you\'re not completely satisfied within your first month, we\'ll provide a full refund. Life happens, and we work with members facing genuine hardships.'
    },
    {
      id: '6',
      category: 'cancellation',
      question: 'Can I freeze my membership temporarily?',
      answer: 'Yes! Members can freeze their membership for up to 3 months per year for medical reasons, travel, or other life circumstances. Freezes require 7 days notice and a small administrative fee of $15/month to maintain your membership benefits and rates. This is much more cost-effective than cancelling and rejoining later.'
    },
    {
      id: '7',
      category: 'benefits',
      question: 'What equipment and facilities are included?',
      answer: 'All memberships include access to our complete strength training area, cardio equipment, functional training space, and group fitness studios. Elite and Champion members also get access to our recovery suite with sauna, steam room, cold plunge, and massage chairs. Champion members have access to our exclusive VIP training area and premium equipment.'
    },
    {
      id: '8',
      category: 'benefits',
      question: 'How do personal training sessions work?',
      answer: 'Personal training sessions are 60 minutes and can be scheduled through our app or front desk. Elite members get 2 sessions per month, Champion members get 8. Sessions can be used for strength training, technique coaching, program design, or specialized goals. Unused sessions roll over for up to 2 months, and additional sessions can be purchased at member rates.'
    },
    {
      id: '9',
      category: 'general',
      question: 'What are your operating hours?',
      answer: 'Foundation members have access from 6am-10pm daily. Elite and Champion members enjoy 24/7 access using their key fob. Staffed hours are 5am-11pm Monday-Friday, 6am-10pm weekends. Personal training and group classes are available during staffed hours, with some early morning and late evening options for Elite/Champion members.'
    },
    {
      id: '10',
      category: 'benefits',
      question: 'Do you provide nutrition coaching?',
      answer: 'Yes! Elite members receive quarterly nutrition consultations, while Champion members get a dedicated nutrition coach. Services include meal planning, macro tracking, supplement guidance, and ongoing support. Our registered dietitians work with your trainer to ensure your nutrition supports your fitness goals and lifestyle.'
    }
  ];

  const categories = [
    { id: 'general', name: 'General', icon: 'InformationCircleIcon' },
    { id: 'pricing', name: 'Pricing', icon: 'CurrencyDollarIcon' },
    { id: 'benefits', name: 'Benefits', icon: 'GiftIcon' },
    { id: 'cancellation', name: 'Cancellation', icon: 'XCircleIcon' }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredFAQs = faqData.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about FitCore Elite memberships, policies, and benefits.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={category.icon as any} size={20} />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">{item.question}</h3>
                    <Icon
                      name={openItems.includes(item.id) ? "ChevronUpIcon" : "ChevronDownIcon"}
                      size={24}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </button>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    openItems.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed pt-4">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
              <Icon name="QuestionMarkCircleIcon" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our membership specialists are here to help you find the perfect fit for your fitness journey. 
                Get personalized answers and guidance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2">
                  <Icon name="ChatBubbleLeftRightIcon" size={20} />
                  <span>Live Chat Support</span>
                </button>
                <button className="px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted/50 transition-colors flex items-center space-x-2">
                  <Icon name="PhoneIcon" size={20} />
                  <span>Call (555) 123-4567</span>
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Support Hours: Monday-Friday 5am-11pm • Weekends 6am-10pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipFAQ;