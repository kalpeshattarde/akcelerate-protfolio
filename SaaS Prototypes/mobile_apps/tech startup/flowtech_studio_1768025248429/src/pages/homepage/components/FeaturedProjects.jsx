import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
  {
    id: 1,
    title: "FinTech Revolution Platform",
    category: "Financial Technology",
    description: "A comprehensive digital banking platform that revolutionized how users manage their finances with AI-powered insights and seamless user experience.",
    image: "https://images.unsplash.com/photo-1735469157670-1212e570eadc",
    imageAlt: "Modern financial dashboard interface showing charts and analytics on multiple screens",
    technologies: ["React", "Node.js", "AI/ML", "Blockchain"],
    metrics: {
      users: "500K+",
      growth: "300%",
      satisfaction: "98%"
    },
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Healthcare Connect Hub",
    category: "Healthcare Technology",
    description: "An integrated telemedicine platform connecting patients with healthcare providers through secure, HIPAA-compliant video consultations and health monitoring.",
    image: "https://images.unsplash.com/photo-1666886573531-48d2e3c2b684",
    imageAlt: "Healthcare professional using tablet device in modern medical facility with patient consultation interface",
    technologies: ["Next.js", "WebRTC", "FHIR", "Cloud Security"],
    metrics: {
      consultations: "1M+",
      providers: "10K+",
      uptime: "99.9%"
    },
    color: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "E-Commerce Evolution",
    category: "Retail Technology",
    description: "A next-generation e-commerce platform with AR product visualization, personalized recommendations, and omnichannel inventory management.",
    image: "https://images.unsplash.com/photo-1649424221028-8e7d31f2e3c9",
    imageAlt: "Modern e-commerce interface showing product catalog with augmented reality features on mobile and desktop devices",
    technologies: ["React Native", "AR/VR", "Machine Learning", "Microservices"],
    metrics: {
      revenue: "$50M+",
      conversion: "45%",
      retention: "85%"
    },
    color: "from-orange-500 to-red-600"
  }];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Discover how we've transformed ideas into powerful digital solutions that drive real business results.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Project Navigation */}
          <motion.div variants={itemVariants} className="space-y-6">
            {projects?.map((project, index) =>
            <motion.div
              key={project?.id}
              onClick={() => setActiveProject(index)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              activeProject === index ?
              'bg-card shadow-medium border-l-4 border-primary' :
              'bg-background hover:bg-card hover:shadow-subtle'}`
              }
              whileHover={{ x: 5 }}>

                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${project?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                  activeProject === index ? 'text-primary' : 'text-text-primary'}`
                  }>
                      {project?.title}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-2">{project?.category}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {project?.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Project Display */}
          <motion.div variants={itemVariants} className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl overflow-hidden shadow-strong">

                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={projects?.[activeProject]?.image}
                    alt={projects?.[activeProject]?.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white text-xl font-semibold mb-2">
                      {projects?.[activeProject]?.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects?.[activeProject]?.technologies?.map((tech, index) =>
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">

                          {tech}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Metrics */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(projects?.[activeProject]?.metrics)?.map(([key, value], index) =>
                    <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-xs text-text-secondary capitalize">{key}</div>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="btn-magnetic">

                    View Case Study
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16">

          <Link to="/portfolio">
            <Button
              variant="default"
              size="lg"
              className="btn-magnetic animate-breathe"
              iconName="ArrowRight"
              iconPosition="right">

              Explore Full Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>);

};

export default FeaturedProjects;