import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TeamIntroduction = () => {
  const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    alt: "Professional headshot of Asian woman with shoulder-length black hair in navy blazer smiling confidently",
    bio: "Visionary leader with 15+ years in tech innovation and strategic partnerships.",
    expertise: ["Strategic Planning", "Digital Transformation", "Team Leadership"],
    contact: "sarah@flowtechstudio.com"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    image: "https://images.unsplash.com/photo-1723865145841-91fc27b3b305",
    alt: "Professional portrait of Hispanic man with short dark hair and beard in white shirt against modern office background",
    bio: "Technical architect passionate about building scalable solutions that matter.",
    expertise: ["Full-Stack Development", "Cloud Architecture", "AI/ML"],
    contact: "marcus@flowtechstudio.com"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1624484631620-9e53e4aed980",
    alt: "Creative portrait of blonde woman with wavy hair in casual black top smiling warmly in bright studio setting",
    bio: "Design thinking expert who transforms complex problems into intuitive experiences.",
    expertise: ["UX/UI Design", "Design Systems", "User Research"],
    contact: "emily@flowtechstudio.com"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Head of Partnerships",
    image: "https://images.unsplash.com/photo-1676989880361-091e12efc056",
    alt: "Professional headshot of Korean man with glasses and short black hair in dark suit jacket smiling confidently",
    bio: "Relationship builder focused on creating meaningful, long-term partnerships.",
    expertise: ["Business Development", "Client Relations", "Strategic Alliances"],
    contact: "david@flowtechstudio.com"
  }];


  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Meet Your Future Partners
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our leadership team combines technical excellence with creative vision. 
            Get to know the people who will be dedicated to your project's success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers?.map((member, index) =>
          <motion.div
            key={member?.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card rounded-xl overflow-hidden card-elevated group">

              {/* Profile Image */}
              <div className="relative overflow-hidden">
                <Image
                src={member?.image}
                alt={member?.alt}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {member?.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {member?.role}
                  </p>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed">
                  {member?.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {member?.expertise?.map((skill, skillIndex) =>
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">

                      {skill}
                    </span>
                )}
                </div>

                {/* Contact */}
                <div className="pt-2 border-t border-border">
                  <a
                  href={`mailto:${member?.contact}`}
                  className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200 text-sm">

                    <Icon name="Mail" size={14} />
                    <span>{member?.contact}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-card rounded-xl p-8">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-text-secondary text-sm">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-text-secondary text-sm">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-text-secondary text-sm">Industries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24h</div>
              <div className="text-text-secondary text-sm">Average Response Time</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default TeamIntroduction;