import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const phrases = [
    "Technology with Soul",
    "Digital Experiences that Matter",
    "Innovation Meets Design",
    "Your Future Partner"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-muted pt-24">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-accent/10 to-trust/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-trust/10 to-primary/10 rounded-full blur-xl"
        />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
            We don't just build{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                technology
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Dynamic Tagline */}
        <motion.div variants={itemVariants} className="mb-8 h-20 flex items-center justify-center">
          <motion.h2
            key={currentPhrase}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-medium text-text-secondary"
          >
            {phrases?.[currentPhrase]}
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Where technical excellence meets creative vision. We craft digital experiences that don't just function—they inspire, engage, and transform the way people interact with technology.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            variant="default"
            size="lg"
            className="btn-magnetic animate-breathe min-w-48"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Start Your Project
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="btn-magnetic min-w-48"
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule Discovery Call
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold text-primary">150+</div>
            <div className="text-sm text-text-secondary">Projects Delivered</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-sm text-text-secondary">Client Satisfaction</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold text-primary">5+</div>
            <div className="text-sm text-text-secondary">Years Experience</div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-text-secondary">Support Available</div>
          </div>
        </motion.div>
      </motion.div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-text-secondary"
        >
          <span className="text-sm font-medium">Discover More</span>
          <Icon name="ChevronDown" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;