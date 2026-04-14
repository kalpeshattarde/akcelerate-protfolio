import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactMethods = () => {
  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Call Us Directly',
      description: 'Speak with our team for immediate assistance',
      value: '+1 (555) 123-4567',
      action: 'Call Now',
      href: 'tel:+15551234567',
      available: '9 AM - 6 PM PST'
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      description: 'Send us a detailed message about your project',
      value: 'hello@flowtechstudio.com',
      action: 'Send Email',
      href: 'mailto:hello@flowtechstudio.com',
      available: '24/7 Response'
    },
    {
      icon: 'Calendar',
      title: 'Schedule a Call',
      description: 'Book a consultation at your convenience',
      value: '30-min Strategy Session',
      action: 'Book Meeting',
      href: '#',
      available: 'Available Slots'
    },
    {
      icon: 'MessageSquare',
      title: 'Live Chat',
      description: 'Get instant answers to your questions',
      value: 'Chat Support',
      action: 'Start Chat',
      href: '#',
      available: 'Online Now'
    }
  ];

  const handleMethodClick = (method) => {
    if (method?.href === '#') {
      // Handle special cases like calendar booking or chat
      console.log(`Opening ${method?.title}`);
    } else {
      window.open(method?.href, '_blank');
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Multiple Ways to Connect
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Choose the communication method that works best for you. We're here to help 
            bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods?.map((method, index) => (
            <motion.div
              key={method?.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 text-center space-y-4 card-elevated group hover:shadow-strong transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <Icon 
                  name={method?.icon} 
                  size={24} 
                  className="text-primary" 
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {method?.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {method?.description}
                </p>
                <div className="text-primary font-medium text-sm mb-2">
                  {method?.value}
                </div>
                <div className="text-xs text-text-secondary mb-4">
                  {method?.available}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleMethodClick(method)}
                className="group-hover:border-primary group-hover:text-primary transition-colors duration-300"
              >
                {method?.action}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Icon name="Zap" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">
              Urgent Project?
            </h3>
          </div>
          <p className="text-text-secondary mb-4">
            For time-sensitive projects or emergencies, reach out directly to our priority line.
          </p>
          <Button
            variant="default"
            iconName="Phone"
            iconPosition="left"
            onClick={() => window.open('tel:+15551234567', '_blank')}
          >
            Priority Line: +1 (555) 123-4567
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMethods;