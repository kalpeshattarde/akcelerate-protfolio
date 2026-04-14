import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamSection = () => {
  const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Lead Creative Technologist",
    image: "https://images.unsplash.com/photo-1628595556262-4cffd053a4bf",
    alt: "Professional Asian woman with shoulder-length black hair smiling confidently in modern office setting",
    bio: "Bridges the gap between design and development, creating experiences that feel magical yet functional.",
    expertise: ["React", "Design Systems", "UX Engineering"],
    social: { linkedin: "#", github: "#" },
    quote: "Technology should feel like poetry in motion."
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Senior Full-Stack Architect",
    image: "https://images.unsplash.com/photo-1548778797-7d8cf3eefd24",
    alt: "Hispanic man with beard wearing casual button-up shirt in bright modern workspace",
    bio: "Passionate about building scalable systems that grow with our clients\' ambitions and dreams.",
    expertise: ["Node.js", "Cloud Architecture", "DevOps"],
    social: { linkedin: "#", github: "#" },
    quote: "Great architecture is invisible until you need it."
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "AI/ML Innovation Lead",
    image: "https://images.unsplash.com/photo-1735107939902-0bc9abefe5c4",
    alt: "South Asian woman with long dark hair in professional blazer presenting at whiteboard",
    bio: "Explores the intersection of artificial intelligence and human creativity to build empathetic technology.",
    expertise: ["Machine Learning", "Python", "Data Science"],
    social: { linkedin: "#", github: "#" },
    quote: "AI should amplify human potential, not replace it."
  },
  {
    id: 4,
    name: "David Kim",
    role: "Product Strategy Director",
    image: "https://images.unsplash.com/photo-1576078855245-301a0bf949cb",
    alt: "Asian man in navy suit jacket with warm smile in contemporary office environment",
    bio: "Translates complex technical possibilities into meaningful product experiences that users love.",
    expertise: ["Product Strategy", "User Research", "Analytics"],
    social: { linkedin: "#", github: "#" },
    quote: "Every feature should tell a story worth experiencing."
  },
  {
    id: 5,
    name: "Elena Volkov",
    role: "DevOps & Security Specialist",
    image: "https://images.unsplash.com/photo-1628252170152-82df929414f8",
    alt: "Eastern European woman with blonde hair in casual sweater working on laptop in modern office",
    bio: "Ensures our innovations are built on rock-solid foundations with security and performance at the core.",
    expertise: ["Kubernetes", "Security", "Infrastructure"],
    social: { linkedin: "#", github: "#" },
    quote: "Security isn't a feature, it's a foundation."
  },
  {
    id: 6,
    name: "James Thompson",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1661435805954-a32cc950edd8",
    alt: "Caucasian man with styled brown hair in creative workspace surrounded by design materials",
    bio: "Shapes the visual and experiential language that makes our technology feel human and approachable.",
    expertise: ["Brand Design", "Motion Graphics", "Creative Strategy"],
    social: { linkedin: "#", github: "#" },
    quote: "Design is not just how it looks, but how it feels."
  }];


  const achievements = [
  {
    id: 1,
    icon: "Award",
    title: "Industry Recognition",
    items: ["Webby Awards Winner 2023", "CSS Design Awards", "FWA Site of the Day"]
  },
  {
    id: 2,
    icon: "BookOpen",
    title: "Knowledge Sharing",
    items: ["50+ Conference Talks", "Open Source Contributors", "Technical Blog Authors"]
  },
  {
    id: 3,
    icon: "Users",
    title: "Community Impact",
    items: ["Mentorship Programs", "Coding Bootcamp Partners", "Diversity Initiatives"]
  }];


  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Meet Our Leadership Collective
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Creative technologists who believe in the power of human-centered innovation. 
            Each bringing unique perspectives to our shared mission of building technology with soul.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers?.map((member, index) =>
          <motion.div
            key={member?.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card-elevated group hover:shadow-strong transition-all duration-300">

              {/* Profile Image */}
              <div className="relative overflow-hidden rounded-t-lg h-64">
                <Image
                src={member?.image}
                alt={member?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Social Links */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                  href={member?.social?.linkedin}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">

                    <Icon name="Linkedin" size={16} className="text-white" />
                  </a>
                  <a
                  href={member?.social?.github}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">

                    <Icon name="Github" size={16} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-1">
                  {member?.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {member?.role}
                </p>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {member?.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member?.expertise?.map((skill, skillIndex) =>
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">

                      {skill}
                    </span>
                )}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-text-secondary italic border-l-2 border-primary/20 pl-3">
                  "{member?.quote}"
                </blockquote>
              </div>
            </motion.div>
          )}
        </div>

        {/* Team Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Our Collective Impact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements?.map((achievement, index) =>
            <motion.div
              key={achievement?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center">

                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-4">
                  <Icon name={achievement?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-text-primary mb-4">
                  {achievement?.title}
                </h4>
                <ul className="space-y-2">
                  {achievement?.items?.map((item, itemIndex) =>
                <li key={itemIndex} className="text-text-secondary">
                      {item}
                    </li>
                )}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default TeamSection;