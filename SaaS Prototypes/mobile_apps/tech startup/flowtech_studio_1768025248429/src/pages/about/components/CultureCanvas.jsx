import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CultureCanvas = () => {
  const [activeValue, setActiveValue] = useState(0);

  const coreValues = [
  {
    title: "Human-First Technology",
    description: `Every line of code we write serves human needs. \nWe ask 'How does this make someone's life better?' before 'How technically impressive is this?'`,
    icon: "Heart",
    color: "primary",
    principles: [
    "Empathy drives our design decisions",
    "User research informs every feature",
    "Accessibility is never an afterthought",
    "We measure success by human impact"],

    image: "https://images.unsplash.com/photo-1714976326715-96d4a22f8da8",
    imageAlt: "Diverse team of professionals collaborating around a table with laptops and design sketches"
  },
  {
    title: "Continuous Learning",
    description: `Technology evolves rapidly, and so do we. \nWe invest 20% of our time in learning new skills, exploring emerging technologies, and sharing knowledge.`,
    icon: "BookOpen",
    color: "accent",
    principles: [
    "Weekly tech talks and knowledge sharing",
    "Conference attendance and speaking opportunities",
    "Internal hackathons and innovation days",
    "Mentorship programs for skill development"],

    image: "https://images.unsplash.com/photo-1597378611316-e62e042e11f2",
    imageAlt: "Professional workshop setting with people learning and taking notes in modern classroom"
  },
  {
    title: "Transparent Collaboration",
    description: `Great ideas come from everywhere. \nWe maintain open communication, share decision-making processes, and celebrate diverse perspectives.`,
    icon: "Users",
    color: "trust",
    principles: [
    "Open-book company financials",
    "Democratic decision-making process",
    "Regular all-hands transparency meetings",
    "Cross-functional team collaboration"],

    image: "https://images.unsplash.com/photo-1690192078982-d3d2f89059ee",
    imageAlt: "Open office space with team members collaborating on whiteboards and sharing ideas"
  },
  {
    title: "Sustainable Innovation",
    description: `We build for the long term — both in technology choices and environmental impact. \nOur solutions should benefit current and future generations.`,
    icon: "Leaf",
    color: "success",
    principles: [
    "Carbon-neutral hosting and operations",
    "Sustainable technology architecture",
    "Long-term thinking in product decisions",
    "Community impact measurement"],

    image: "https://images.unsplash.com/photo-1680781336783-8382d382e892",
    imageAlt: "Modern sustainable office building with green plants and natural lighting"
  }];


  const workPhilosophy = [
  {
    title: "Async-First Communication",
    description: "Deep work requires uninterrupted time. We default to asynchronous communication and respect focus time.",
    icon: "Clock"
  },
  {
    title: "Outcome Over Output",
    description: "We measure success by impact achieved, not hours worked or features shipped.",
    icon: "Target"
  },
  {
    title: "Psychological Safety",
    description: "Everyone feels safe to share ideas, make mistakes, and learn from failures without judgment.",
    icon: "Shield"
  },
  {
    title: "Work-Life Integration",
    description: "We support flexible schedules and remote work to help team members thrive personally and professionally.",
    icon: "Balance"
  }];


  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="culture-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#culture-pattern)" />
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="inline-flex items-center space-x-2 bg-trust/10 px-4 py-2 rounded-full mb-6">
            <Icon name="Palette" size={16} className="text-trust" />
            <span className="text-sm font-medium text-trust">Culture Canvas</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Values in
            <span className="block text-trust">Action</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our culture isn't just words on a wall — it's the daily practices, 
            decisions, and interactions that define how we work together to create meaningful technology.
          </p>
        </motion.div>

        {/* Core Values Interactive Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">Core Values</h3>
          
          {/* Values Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {coreValues?.map((value, index) =>
            <button
              key={index}
              onClick={() => setActiveValue(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeValue === index ?
              `bg-${value?.color} text-white shadow-lg` :
              'bg-muted text-text-secondary hover:bg-card'}`
              }>

                <Icon name={value?.icon} size={16} />
                <span className="font-medium">{value?.title}</span>
              </button>
            )}
          </div>

          {/* Active Value Display */}
          <motion.div
            key={activeValue}
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-${coreValues?.[activeValue]?.color}/10 rounded-xl flex items-center justify-center`}>
                  <Icon name={coreValues?.[activeValue]?.icon} size={24} className={`text-${coreValues?.[activeValue]?.color}`} />
                </div>
                <h4 className="text-2xl font-bold text-text-primary">{coreValues?.[activeValue]?.title}</h4>
              </div>
              
              <p className="text-lg text-text-secondary leading-relaxed whitespace-pre-line">
                {coreValues?.[activeValue]?.description}
              </p>

              <div className="space-y-3">
                <h5 className="text-lg font-semibold text-text-primary">How we practice this:</h5>
                {coreValues?.[activeValue]?.principles?.map((principle, index) =>
                <div key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className={`text-${coreValues?.[activeValue]?.color} mt-1 flex-shrink-0`} />
                    <span className="text-text-secondary">{principle}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden organic-shape">
                <Image
                  src={coreValues?.[activeValue]?.image}
                  alt={coreValues?.[activeValue]?.imageAlt}
                  className="w-full h-full object-cover" />

              </div>
              <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-${coreValues?.[activeValue]?.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Icon name={coreValues?.[activeValue]?.icon} size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Work Philosophy */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">Work Philosophy</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workPhilosophy?.map((philosophy, index) =>
            <motion.div
              key={index}
              className="card-elevated p-6 text-center group hover:shadow-strong transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}>

                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={philosophy?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                  {philosophy?.title}
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {philosophy?.description}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Culture in Numbers */}
        <motion.div
          className="bg-card rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">Culture in Numbers</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            { number: "4.9/5", label: "Employee Satisfaction", icon: "Star" },
            { number: "95%", label: "Team Retention Rate", icon: "Users" },
            { number: "20%", label: "Learning Time Weekly", icon: "BookOpen" },
            { number: "100%", label: "Remote Work Support", icon: "Home" }]?.
            map((stat, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat?.icon} size={24} className="text-accent" />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2">{stat?.number}</div>
                <div className="text-sm text-text-secondary font-medium">{stat?.label}</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default CultureCanvas;