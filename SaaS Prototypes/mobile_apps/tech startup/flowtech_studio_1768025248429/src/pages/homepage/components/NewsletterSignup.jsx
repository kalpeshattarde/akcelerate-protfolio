import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    {
      icon: "Lightbulb",
      title: "Industry Insights",
      description: "Latest trends and innovations in technology"
    },
    {
      icon: "BookOpen",
      title: "Case Studies",
      description: "Deep dives into our most successful projects"
    },
    {
      icon: "Users",
      title: "Expert Tips",
      description: "Actionable advice from our team of specialists"
    },
    {
      icon: "Calendar",
      title: "Event Access",
      description: "Exclusive invitations to webinars and workshops"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-12 shadow-strong"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-text-primary mb-4">
              Welcome to the FlowTech Family!
            </h3>
            <p className="text-xl text-text-secondary mb-8">
              Thank you for subscribing. You'll receive our latest insights and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => setIsSubscribed(false)}
              >
                Explore Our Services
              </Button>
              <Button
                variant="outline"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content Side */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              Stay Ahead of the{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Curve
              </span>
            </h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Join thousands of tech leaders who rely on our insights to make informed decisions about their digital transformation journey.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit?.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      {benefit?.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {benefit?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div variants={itemVariants}>
            <div className="bg-card rounded-2xl p-8 shadow-strong">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Get Weekly Insights
                </h3>
                <p className="text-text-secondary">
                  No spam, just valuable content. Unsubscribe anytime.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  required
                  className="mb-4"
                />

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  disabled={!email || isLoading}
                  iconName="Send"
                  iconPosition="right"
                  className="btn-magnetic animate-breathe"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                </Button>

                <p className="text-xs text-text-secondary text-center">
                  By subscribing, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                </p>
              </form>

              {/* Social Proof */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} />
                    <span>5,000+ subscribers</span>
                  </div>
                  <div className="w-1 h-1 bg-text-secondary rounded-full" />
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} className="text-accent" />
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;