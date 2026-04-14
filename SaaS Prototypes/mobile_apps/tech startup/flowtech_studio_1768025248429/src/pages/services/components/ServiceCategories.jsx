import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCategories = () => {
  const [activeCategory, setActiveCategory] = useState('development');

  const categories = [
    {
      id: 'development',
      name: 'Digital Development',
      icon: 'Code2',
      description: 'Next-generation web applications with React 18+, TypeScript, and modern architecture',
      color: 'from-primary to-primary/80'
    },
    {
      id: 'design',
      name: 'Experience Design',
      icon: 'Palette',
      description: 'Human-centered design that bridges technical capability with emotional connection',
      color: 'from-accent to-accent/80'
    },
    {
      id: 'strategy',
      name: 'Digital Strategy',
      icon: 'Target',
      description: 'Technology roadmaps that align with business vision and market opportunities',
      color: 'from-trust to-trust/80'
    },
    {
      id: 'optimization',
      name: 'Performance Engineering',
      icon: 'Zap',
      description: 'Core Web Vitals optimization, accessibility excellence, and scalable architecture',
      color: 'from-secondary to-secondary/80'
    }
  ];

  const services = {
    development: [
      {
        title: 'React 18+ Applications',
        description: 'Server-side rendering with Next.js, component architecture with TypeScript for maintainability',
        features: ['SSR/SSG Optimization', 'Component Design Systems', 'TypeScript Integration', 'Performance Monitoring'],
        icon: 'Layers'
      },
      {
        title: 'Progressive Web Apps',
        description: 'Offline capabilities, push notifications, and app-like mobile experiences',
        features: ['Offline Functionality', 'Push Notifications', 'App Shell Architecture', 'Service Workers'],
        icon: 'Smartphone'
      },
      {
        title: 'API-First Architecture',
        description: 'Scalable backend integration for dynamic content and seamless user interactions',
        features: ['RESTful APIs', 'GraphQL Integration', 'Real-time Updates', 'Microservices'],
        icon: 'Database'
      }
    ],
    design: [
      {
        title: 'Motion Design Systems',
        description: 'Framer Motion integration with organic timing curves and magnetic interactions',
        features: ['Micro-interactions', 'Scroll Animations', 'Gesture Recognition', 'Responsive Motion'],
        icon: 'Sparkles'
      },
      {
        title: 'Accessibility Excellence',
        description: 'WCAG 2.1 AA compliance with enhanced keyboard navigation and screen reader support',
        features: ['Screen Reader Optimization', 'Keyboard Navigation', 'Color Contrast', 'Focus Management'],
        icon: 'Eye'
      },
      {
        title: 'Design Token Systems',
        description: 'Consistent design language across platforms with component-scoped styling',
        features: ['Design Tokens', 'Component Libraries', 'Style Guides', 'Brand Consistency'],
        icon: 'Palette'
      }
    ],
    strategy: [
      {
        title: 'Technology Consulting',
        description: 'Strategic technology decisions that impact human experiences and business outcomes',
        features: ['Tech Stack Selection', 'Architecture Planning', 'Scalability Assessment', 'Risk Analysis'],
        icon: 'Lightbulb'
      },
      {
        title: 'Digital Transformation',
        description: 'Modernization strategies for legacy systems with minimal disruption',
        features: ['Legacy Migration', 'Process Optimization', 'Team Training', 'Change Management'],
        icon: 'RefreshCw'
      },
      {
        title: 'Innovation Workshops',
        description: 'Collaborative sessions to identify opportunities and define technical roadmaps',
        features: ['Ideation Sessions', 'Prototype Development', 'Feasibility Studies', 'MVP Planning'],
        icon: 'Users'
      }
    ],
    optimization: [
      {
        title: 'Performance Optimization',
        description: 'Core Web Vitals focus with image optimization, code splitting, and lazy loading',
        features: ['Core Web Vitals', 'Image Optimization', 'Code Splitting', 'Caching Strategies'],
        icon: 'Gauge'
      },
      {
        title: 'Security Implementation',
        description: 'Enterprise-grade security without friction in user experience',
        features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Data Protection'],
        icon: 'Shield'
      },
      {
        title: 'Analytics Integration',
        description: 'User behavior tracking with privacy-first approach and conversion optimization',
        features: ['Privacy-First Analytics', 'Conversion Tracking', 'A/B Testing', 'Performance Metrics'],
        icon: 'BarChart3'
      }
    ]
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Our Service Universe
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Comprehensive solutions that span the entire digital ecosystem, from strategic vision to technical execution
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`
                flex items-center space-x-3 px-6 py-3 rounded-lg transition-all duration-300
                ${activeCategory === category?.id
                  ? 'bg-primary text-white shadow-medium'
                  : 'bg-card text-text-secondary hover:bg-primary/10 hover:text-primary'
                }
              `}
            >
              <Icon name={category?.icon} size={20} />
              <span className="font-medium">{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Description */}
        <div className="text-center mb-12">
          <div className={`inline-block p-6 rounded-xl bg-gradient-to-r ${categories?.find(c => c?.id === activeCategory)?.color} text-white mb-4`}>
            <Icon name={categories?.find(c => c?.id === activeCategory)?.icon} size={32} />
          </div>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {categories?.find(c => c?.id === activeCategory)?.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.[activeCategory]?.map((service, index) => (
            <div
              key={index}
              className="card-elevated p-6 hover:shadow-strong transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={service?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">{service?.title}</h3>
              </div>
              
              <p className="text-text-secondary mb-6 leading-relaxed">
                {service?.description}
              </p>
              
              <div className="space-y-2">
                {service?.features?.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;