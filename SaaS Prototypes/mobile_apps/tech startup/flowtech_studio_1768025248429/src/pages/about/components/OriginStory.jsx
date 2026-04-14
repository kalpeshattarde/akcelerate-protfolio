import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OriginStory = () => {
  const timelineEvents = [
  {
    year: "2016",
    title: "The Spark",
    description: `Two developers frustrated with soulless technology decided to create something different. \nOur founding vision: technology should enhance human potential, not replace human connection.`,
    icon: "Lightbulb",
    image: "https://images.unsplash.com/photo-1681164315051-add1906a9b07",
    imageAlt: "Two young professionals collaborating at a modern workspace with laptops and notebooks"
  },
  {
    year: "2018",
    title: "First Breakthrough",
    description: `Launched our first human-centered AI platform that revolutionized customer service. \nThis project established our reputation for combining technical excellence with emotional intelligence.`,
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1719343881239-1d6cf7a44558",
    imageAlt: "Modern office space with team members working on computers with data visualizations on screens"
  },
  {
    year: "2020",
    title: "Global Recognition",
    description: `Named 'Innovation Studio of the Year' by TechCrunch. \nOur remote-first culture during the pandemic became a model for distributed creative collaboration.`,
    icon: "Award",
    image: "https://images.unsplash.com/photo-1524771312278-52c8c053f630",
    imageAlt: "Professional award ceremony with golden trophy on stage with spotlight"
  },
  {
    year: "2022",
    title: "Ecosystem Expansion",
    description: `Launched FlowTech Labs — our open-source initiative. \nContributed 15+ tools to the developer community, impacting over 100,000 developers worldwide.`,
    icon: "Globe",
    image: "https://images.unsplash.com/photo-1585069034379-8e4362790d60",
    imageAlt: "Global network visualization with connected nodes and data streams across world map"
  },
  {
    year: "2024",
    title: "Future Vision",
    description: `Today, we're pioneering the next generation of empathetic technology. \nOur mission evolves: creating digital experiences that understand, adapt, and inspire human potential.`,
    icon: "Rocket",
    image: "https://images.unsplash.com/photo-1639091381285-e69c2b19ac58",
    imageAlt: "Futuristic workspace with holographic displays and team members collaborating on innovative technology"
  }];


  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-transparent to-accent"></div>
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
            <Icon name="BookOpen" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Our Origin Story</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            From Vision to
            <span className="block text-primary">Revolution</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Every great technology company starts with a simple belief. 
            Ours was that technology should feel human, not mechanical. 
            Here's how that belief shaped our journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2"></div>

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents?.map((event, index) =>
            <motion.div
              key={index}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`
              }
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}>

                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                  <div className="card-elevated p-8 group hover:shadow-strong transition-all duration-500">
                    {/* Year Badge */}
                    <div className="inline-flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full mb-4">
                      <Icon name={event?.icon} size={16} className="text-accent" />
                      <span className="text-sm font-bold text-accent">{event?.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                      {event?.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed mb-6 whitespace-pre-line">
                      {event?.description}
                    </p>

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg aspect-video">
                      <Image
                      src={event?.image}
                      alt={event?.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                      <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mission Evolution */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Our Mission Continues to Evolve
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
              {
                phase: "Past",
                title: "Build Better Software",
                description: "Focus on technical excellence and clean code architecture",
                icon: "Code"
              },
              {
                phase: "Present",
                title: "Create Human Experiences",
                description: "Blend technology with empathy to solve real human problems",
                icon: "Heart"
              },
              {
                phase: "Future",
                title: "Inspire Human Potential",
                description: "Technology that amplifies creativity and human connection",
                icon: "Sparkles"
              }]?.
              map((phase, index) =>
              <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name={phase?.icon} size={24} className="text-primary" />
                  </div>
                  <div className="text-sm font-medium text-accent mb-2">{phase?.phase}</div>
                  <h4 className="text-xl font-bold text-text-primary mb-3">{phase?.title}</h4>
                  <p className="text-text-secondary leading-relaxed">{phase?.description}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default OriginStory;