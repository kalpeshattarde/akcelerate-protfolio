import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-trust/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Technology
              <span className="block text-primary organic-shape inline-block px-4 py-2 bg-primary/10 rounded-2xl ml-4">
                with Soul
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We are FlowTech Studio — where cutting-edge innovation meets mindful design, 
              creating digital experiences that don't just function, but inspire. 
              The perfect synthesis of technical excellence and human-centered philosophy.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { number: "150+", label: "Projects Delivered", icon: "Rocket" },
              { number: "50+", label: "Happy Clients", icon: "Heart" },
              { number: "8", label: "Years Experience", icon: "Calendar" },
              { number: "25+", label: "Team Members", icon: "Users" }
            ]?.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-text-primary mb-2">{stat?.number}</div>
                <div className="text-sm text-text-secondary font-medium">{stat?.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex flex-col items-center space-y-2 text-text-secondary">
              <span className="text-sm font-medium">Discover Our Story</span>
              <div className="w-6 h-10 border-2 border-text-secondary rounded-full flex justify-center">
                <div className="w-1 h-3 bg-text-secondary rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;