import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TechStackVisualization = () => {
  const [activeLayer, setActiveLayer] = useState('frontend');

  const techLayers = {
    frontend: {
      name: 'Frontend Excellence',
      icon: 'Monitor',
      color: 'from-blue-500 to-purple-600',
      technologies: [
        { name: 'React 18+', description: 'Modern component architecture with concurrent features', icon: 'Atom' },
        { name: 'TypeScript', description: 'Type-safe development with enhanced IDE support', icon: 'Code' },
        { name: 'Framer Motion', description: 'Fluid animations and micro-interactions', icon: 'Zap' },
        { name: 'Tailwind CSS', description: 'Utility-first styling with design system', icon: 'Palette' }
      ]
    },
    backend: {
      name: 'Backend Infrastructure',
      icon: 'Server',
      color: 'from-green-500 to-teal-600',
      technologies: [
        { name: 'Next.js', description: 'Full-stack framework with SSR and API routes', icon: 'Globe' },
        { name: 'Node.js', description: 'High-performance JavaScript runtime', icon: 'Cpu' },
        { name: 'GraphQL', description: 'Efficient data fetching and type safety', icon: 'Database' },
        { name: 'PostgreSQL', description: 'Robust relational database with ACID compliance', icon: 'HardDrive' }
      ]
    },
    devops: {
      name: 'DevOps & Deployment',
      icon: 'Cloud',
      color: 'from-orange-500 to-red-600',
      technologies: [
        { name: 'Docker', description: 'Containerized applications for consistency', icon: 'Package' },
        { name: 'AWS/Vercel', description: 'Scalable cloud infrastructure and CDN', icon: 'CloudLightning' },
        { name: 'GitHub Actions', description: 'Automated CI/CD pipelines', icon: 'GitBranch' },
        { name: 'Monitoring', description: 'Real-time performance and error tracking', icon: 'Activity' }
      ]
    },
    mobile: {
      name: 'Mobile & Cross-Platform',
      icon: 'Smartphone',
      color: 'from-purple-500 to-pink-600',
      technologies: [
        { name: 'React Native', description: 'Native mobile apps with shared codebase', icon: 'Smartphone' },
        { name: 'PWA', description: 'Progressive web apps with offline capabilities', icon: 'Wifi' },
        { name: 'Responsive Design', description: 'Adaptive layouts for all screen sizes', icon: 'Layout' },
        { name: 'Touch Optimization', description: 'Gesture-friendly interactions', icon: 'Hand' }
      ]
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-text-primary mb-4"
          >
            Technology Stack Mastery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Our comprehensive technology ecosystem enables us to build scalable, performant, and future-ready solutions
          </motion.p>
        </div>

        {/* Layer Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(techLayers)?.map(([key, layer]) => (
            <motion.button
              key={key}
              onClick={() => setActiveLayer(key)}
              className={`
                relative px-6 py-4 rounded-xl font-medium transition-all duration-300
                ${activeLayer === key
                  ? 'text-white shadow-lg transform scale-105'
                  : 'text-text-secondary bg-card hover:bg-primary/10 hover:text-primary'
                }
              `}
              whileHover={{ scale: activeLayer === key ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <Icon name={layer?.icon} size={20} />
                <span>{layer?.name}</span>
              </div>
              
              {activeLayer === key && (
                <motion.div
                  layoutId="activeLayer"
                  className={`absolute inset-0 bg-gradient-to-r ${layer?.color} rounded-xl -z-10`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Technology Grid */}
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techLayers?.[activeLayer]?.technologies?.map((tech, index) => (
            <motion.div
              key={tech?.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-xl p-6 card-elevated hover:shadow-strong transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${techLayers?.[activeLayer]?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={tech?.icon} size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
                  {tech?.name}
                </h3>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {tech?.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-card rounded-2xl p-8 card-elevated"
        >
          <h3 className="text-2xl font-semibold text-text-primary mb-6 text-center">
            Full-Stack Architecture Flow
          </h3>
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
            {['User Interface', 'API Layer', 'Business Logic', 'Data Storage', 'Deployment']?.map((layer, index) => (
              <React.Fragment key={layer}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-3">
                    <Icon 
                      name={index === 0 ? 'Monitor' : index === 1 ? 'Layers' : index === 2 ? 'Cpu' : index === 3 ? 'Database' : 'Cloud'} 
                      size={24} 
                      className="text-white" 
                    />
                  </div>
                  <h4 className="font-medium text-text-primary">{layer}</h4>
                </div>
                {index < 4 && (
                  <Icon name="ArrowRight" size={20} className="text-text-secondary hidden lg:block" />
                )}
                {index < 4 && (
                  <Icon name="ArrowDown" size={20} className="text-text-secondary lg:hidden" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackVisualization;