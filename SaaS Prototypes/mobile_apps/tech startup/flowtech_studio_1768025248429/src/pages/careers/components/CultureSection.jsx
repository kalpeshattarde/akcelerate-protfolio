import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CultureSection = () => {
  const cultureValues = [
  {
    id: 1,
    icon: "Heart",
    title: "Technology with Soul",
    description: "We believe technology should enhance human experiences, not replace them. Every line of code we write serves a purpose beyond functionality.",
    color: "text-primary"
  },
  {
    id: 2,
    icon: "Lightbulb",
    title: "Creative Innovation",
    description: "We\'re not just developers; we\'re digital craftspeople who blend technical excellence with creative vision to build the extraordinary.",
    color: "text-accent"
  },
  {
    id: 3,
    icon: "Users",
    title: "Collaborative Growth",
    description: "We grow together through mentorship, knowledge sharing, and celebrating each other's successes. Your growth is our collective success.",
    color: "text-trust"
  },
  {
    id: 4,
    icon: "Compass",
    title: "Purpose-Driven Work",
    description: "Every project we take on aligns with our mission to create meaningful digital experiences that make a positive impact on the world.",
    color: "text-primary"
  }];


  const workEnvironment = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1573497161854-72447225081d",
    alt: "Diverse team of professionals collaborating around a modern conference table with laptops and design sketches",
    title: "Collaborative Spaces",
    description: "Open, inspiring environments designed for creativity and collaboration"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1594732832278-abd644401426",
    alt: "Modern office workspace with natural lighting, plants, and ergonomic furniture setup",
    title: "Flexible Workspaces",
    description: "Choose where and how you work best - office, home, or anywhere in between"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1716703435453-a7733d600d68",
    alt: "Professional presenting innovative technology concepts on large interactive display to engaged team",
    title: "Innovation Labs",
    description: "Dedicated spaces for experimentation with cutting-edge technologies"
  }];


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Our Culture Canvas
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Where emotional intelligence meets artificial intelligence. 
            Discover what makes FlowTech Studio a place where technology and humanity thrive together.
          </p>
        </motion.div>

        {/* Culture Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {cultureValues?.map((value, index) =>
          <motion.div
            key={value?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card-elevated p-8 group hover:shadow-strong transition-all duration-300">

              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${value?.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={value?.icon} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {value?.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {value?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Work Environment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16">

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Where Magic Happens
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workEnvironment?.map((env, index) =>
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer">

                <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                  <Image
                  src={env.image}
                  alt={env.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                  {env.title}
                </h4>
                <p className="text-text-secondary">
                  {env.description}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12">

          <Icon name="Quote" size={48} className="text-primary mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-text-primary mb-6 leading-relaxed">
            "We don't just build technology; we craft digital experiences that matter. 
            Every team member is both an artist and an engineer."
          </blockquote>
          <cite className="text-lg text-text-secondary font-medium">
            — FlowTech Studio Philosophy
          </cite>
        </motion.div>
      </div>
    </section>);

};

export default CultureSection;