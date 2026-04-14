import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What\'s your typical project timeline?",
      answer: `Project timelines vary based on scope and complexity. A typical web application takes 8-16 weeks, while mobile apps range from 12-20 weeks. We provide detailed timelines during our initial consultation and maintain transparent communication throughout the process.`
    },
    {
      question: "How do you handle project communication?",
      answer: `We believe in transparent, regular communication. You'll have a dedicated project manager, weekly progress calls, access to our project dashboard, and direct communication channels with the development team. We adapt our communication style to your preferences.`
    },
    {
      question: "What technologies do you specialize in?",
      answer: `We're technology-agnostic and choose the best tools for each project. Our core expertise includes React, Node.js, Python, cloud platforms (AWS, Azure, GCP), mobile development (React Native, Flutter), and emerging technologies like AI/ML integration.`
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: `Absolutely. We offer comprehensive post-launch support including maintenance, updates, performance monitoring, and feature enhancements. Our support packages are flexible and can be customized based on your needs.`
    },
    {
      question: "How do you ensure project quality?",
      answer: `Quality is built into our process through code reviews, automated testing, continuous integration, user testing, and iterative feedback loops. We follow industry best practices and maintain high standards throughout development.`
    },
    {
      question: "What\'s your approach to project pricing?",
      answer: `We offer transparent, value-based pricing tailored to your specific needs. After understanding your requirements, we provide detailed proposals with clear deliverables and timelines. We also offer flexible payment structures to accommodate different business needs.`
    },
    {
      question: "Can you work with our existing team?",
      answer: `Yes, we excel at collaborative partnerships. We can integrate with your existing team, provide technical leadership, or work as an extension of your development capabilities. We adapt to your workflow and communication preferences.`
    },
    {
      question: "Do you sign NDAs and ensure data security?",
      answer: `Absolutely. We take confidentiality and data security seriously. We're happy to sign NDAs, follow your security protocols, and implement enterprise-grade security measures. Your intellectual property and data are always protected.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get quick answers to common questions about our process, 
            technology, and partnership approach.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs?.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden card-elevated"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-text-primary pr-4">
                  {faq?.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Icon 
                    name="ChevronDown" 
                    size={20} 
                    className="text-text-secondary" 
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-border">
                      <p className="text-text-secondary leading-relaxed pt-4">
                        {faq?.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-card rounded-xl p-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="HelpCircle" size={24} className="text-primary" />
            <h3 className="text-xl font-bold text-text-primary">
              Still Have Questions?
            </h3>
          </div>
          <p className="text-text-secondary mb-6">
            Can't find the answer you're looking for? Our team is here to help 
            with any specific questions about your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@flowtechstudio.com"
              className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Icon name="Mail" size={18} />
              <span>Email Us</span>
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              <Icon name="Phone" size={18} />
              <span>Call Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;