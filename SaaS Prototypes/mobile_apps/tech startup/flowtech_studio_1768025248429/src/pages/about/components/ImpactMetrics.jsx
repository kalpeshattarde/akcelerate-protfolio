import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ImpactMetrics = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [counters, setCounters] = useState({});

  const impactAreas = [
  {
    title: "Client Success",
    description: "Measurable outcomes for our partners",
    icon: "TrendingUp",
    color: "primary",
    metrics: [
    { label: "Average ROI Increase", value: "340%", suffix: "" },
    { label: "User Engagement Boost", value: "85%", suffix: "" },
    { label: "Time-to-Market Reduction", value: "60%", suffix: "" },
    { label: "Client Retention Rate", value: "96%", suffix: "" }],

    testimonial: {
      quote: "FlowTech didn\'t just build our platform — they transformed our entire approach to customer experience. Our user engagement increased by 85% within 6 months.",
      author: "Jennifer Walsh",
      role: "CEO, TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      imageAlt: "Professional headshot of blonde woman in business attire smiling confidently"
    }
  },
  {
    title: "Developer Community",
    description: "Contributing to the global tech ecosystem",
    icon: "Code",
    color: "accent",
    metrics: [
    { label: "Open Source Downloads", value: "2.1M", suffix: "+" },
    { label: "GitHub Stars", value: "15.8K", suffix: "" },
    { label: "Community Contributors", value: "450", suffix: "+" },
    { label: "Documentation Views", value: "500K", suffix: "/month" }],

    testimonial: {
      quote: "FlowTech's open-source tools have become essential in our development workflow. Their documentation and community support are exceptional.",
      author: "Alex Chen",
      role: "Senior Developer, Spotify",
      image: "https://images.unsplash.com/photo-1698072556534-40ec6e337311",
      imageAlt: "Professional headshot of Asian man with glasses in casual shirt smiling"
    }
  },
  {
    title: "Social Impact",
    description: "Technology for positive change",
    icon: "Heart",
    color: "trust",
    metrics: [
    { label: "Non-Profit Projects", value: "25", suffix: "" },
    { label: "Lives Impacted", value: "100K", suffix: "+" },
    { label: "Carbon Footprint Reduction", value: "40%", suffix: "" },
    { label: "Accessibility Compliance", value: "100%", suffix: "" }],

    testimonial: {
      quote: "Working with FlowTech on our accessibility platform was transformative. They helped us reach 10,000+ users with disabilities in our first year.",
      author: "Maria Rodriguez",
      role: "Director, AccessibilityFirst",
      image: "https://images.unsplash.com/photo-1672867209978-1183d00d4714",
      imageAlt: "Professional headshot of Hispanic woman with long dark hair in navy blazer"
    }
  },
  {
    title: "Innovation Leadership",
    description: "Pushing the boundaries of what\'s possible",
    icon: "Lightbulb",
    color: "warning",
    metrics: [
    { label: "Patents Filed", value: "8", suffix: "" },
    { label: "Research Papers", value: "12", suffix: "" },
    { label: "Conference Talks", value: "45", suffix: "" },
    { label: "Industry Awards", value: "15", suffix: "" }],

    testimonial: {
      quote: "FlowTech\'s research in human-AI interaction has influenced our entire product strategy. They\'re true thought leaders in the space.",
      author: "Dr. Sarah Kim",
      role: "Head of AI Research, Microsoft",
      image: "https://images.unsplash.com/photo-1704455304918-9096fc53e795",
      imageAlt: "Professional headshot of Korean woman with short black hair in white lab coat"
    }
  }];


  // Animated counter effect
  useEffect(() => {
    const animateCounters = () => {
      const currentMetrics = impactAreas?.[activeMetric]?.metrics;
      const newCounters = {};

      currentMetrics?.forEach((metric, index) => {
        const targetValue = parseFloat(metric?.value?.replace(/[^\d.]/g, ''));
        let currentValue = 0;
        const increment = targetValue / 50;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }

          newCounters[index] = currentValue;
          setCounters((prev) => ({ ...prev, [index]: currentValue }));
        }, 30);
      });
    };

    animateCounters();
  }, [activeMetric]);

  const formatCounterValue = (value, originalValue, suffix) => {
    if (!value) return originalValue;

    if (originalValue?.includes('K')) {
      return `${(value / 1000)?.toFixed(1)}K${suffix}`;
    } else if (originalValue?.includes('M')) {
      return `${(value / 1000000)?.toFixed(1)}M${suffix}`;
    } else if (originalValue?.includes('%')) {
      return `${Math.round(value)}%`;
    } else {
      return `${Math.round(value)}${suffix}`;
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Impact Metrics</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Measurable
            <span className="block text-primary">Change</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We don't just build technology — we create measurable impact. Here's how our work translates into real-world outcomes for our clients, 
            community, and society.
          </p>
        </motion.div>

        {/* Impact Area Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {impactAreas?.map((area, index) =>
          <button
            key={index}
            onClick={() => setActiveMetric(index)}
            className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
            activeMetric === index ?
            `bg-${area?.color} text-white shadow-lg scale-105` :
            'bg-background text-text-secondary hover:bg-card hover:shadow-medium'}`
            }>

              <Icon name={area?.icon} size={20} />
              <div className="text-left">
                <div className="font-semibold">{area?.title}</div>
                <div className="text-xs opacity-80">{area?.description}</div>
              </div>
            </button>
          )}
        </div>

        {/* Active Metric Display */}
        <motion.div
          key={activeMetric}
          className="grid lg:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>

          {/* Metrics Grid */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {impactAreas?.[activeMetric]?.metrics?.map((metric, index) =>
              <motion.div
                key={index}
                className="card-elevated p-8 text-center group hover:shadow-strong transition-all duration-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>

                  <div className={`text-4xl md:text-5xl font-bold text-${impactAreas?.[activeMetric]?.color} mb-4`}>
                    {formatCounterValue(counters?.[index], metric?.value, metric?.suffix)}
                  </div>
                  <div className="text-text-secondary font-medium">{metric?.label}</div>
                  <div className="mt-4 w-full bg-muted rounded-full h-2">
                    <motion.div
                    className={`h-2 bg-${impactAreas?.[activeMetric]?.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.2 }}>
                  </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Testimonial */}
          <div className="lg:col-span-1">
            <motion.div
              className="card-elevated p-8 h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>

              <Icon name="Quote" size={32} className={`text-${impactAreas?.[activeMetric]?.color} mb-6`} />
              
              <blockquote className="text-lg text-text-primary mb-6 leading-relaxed">
                "{impactAreas?.[activeMetric]?.testimonial?.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={impactAreas?.[activeMetric]?.testimonial?.image}
                    alt={impactAreas?.[activeMetric]?.testimonial?.imageAlt}
                    className="w-full h-full object-cover" />

                </div>
                <div>
                  <div className="font-semibold text-text-primary">
                    {impactAreas?.[activeMetric]?.testimonial?.author}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {impactAreas?.[activeMetric]?.testimonial?.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Global Impact Summary */}
        <motion.div
          className="mt-20 bg-background rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Global Impact at a Glance
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
            { number: "50+", label: "Countries Reached", icon: "Globe" },
            { number: "1M+", label: "End Users Served", icon: "Users" },
            { number: "$50M+", label: "Client Revenue Generated", icon: "DollarSign" },
            { number: "99.9%", label: "System Uptime", icon: "Shield" },
            { number: "24/7", label: "Support Coverage", icon: "Clock" }]?.
            map((stat, index) =>
            <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{stat?.number}</div>
                <div className="text-sm text-text-secondary font-medium">{stat?.label}</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default ImpactMetrics;