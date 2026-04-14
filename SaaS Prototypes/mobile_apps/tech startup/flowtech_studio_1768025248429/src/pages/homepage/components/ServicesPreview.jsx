import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesPreview = () => {
  const services = [
    {
      id: 1,
      icon: "Code",
      title: "Custom Development",
      description: "Tailored solutions built with cutting-edge technologies that scale with your business growth and evolving needs.",
      features: ["React & Next.js", "Node.js Backend", "Cloud Architecture", "API Integration"],
      color: "from-primary to-primary/80"
    },
    {
      id: 2,
      icon: "Palette",
      title: "UX/UI Design",
      description: "Human-centered design that creates intuitive, beautiful interfaces your users will love to interact with.",
      features: ["User Research", "Prototyping", "Design Systems", "Accessibility"],
      color: "from-accent to-accent/80"
    },
    {
      id: 3,
      icon: "Zap",
      title: "Digital Strategy",
      description: "Strategic consulting that aligns technology decisions with business objectives for maximum impact.",
      features: ["Tech Audits", "Roadmap Planning", "Performance Optimization", "Growth Strategy"],
      color: "from-trust to-trust/80"
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

  const cardVariants = {
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

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We combine technical mastery with creative vision to deliver solutions that don't just meet requirements—they exceed expectations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {services?.map((service) => (
            <motion.div
              key={service?.id}
              variants={cardVariants}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-strong transition-all duration-500 card-elevated"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service?.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={service?.icon} size={28} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                {service?.title}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {service?.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-text-secondary">
                    <Icon name="Check" size={16} className="text-primary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/services">
            <Button
              variant="outline"
              size="lg"
              className="btn-magnetic"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;