import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeadershipCollective = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const leaders = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Co-Founder & CEO",
    expertise: "Visionary Leadership",
    bio: `Sarah combines 12 years of Silicon Valley experience with a philosophy degree from Stanford. \nShe believes technology should amplify human creativity, not replace it. \nUnder her leadership, FlowTech has grown from 2 to 25+ team members while maintaining our core values.`,
    image: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    imageAlt: "Professional headshot of Asian woman with shoulder-length black hair in navy blazer smiling confidently",
    credentials: ["Stanford MBA", "Forbes 30 Under 30", "TEDx Speaker"],
    socialLinks: {
      linkedin: "sarah-chen-flowtech",
      twitter: "sarahc_tech"
    },
    achievements: [
    "Led $5M Series A funding round",
    "Keynote at TechCrunch Disrupt 2023",
    "Published \'Human-Centered AI\' whitepaper"]

  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Co-Founder & CTO",
    expertise: "Technical Architecture",
    bio: `Marcus is our technical visionary with 15 years building scalable systems at Google and Spotify. \nHe's passionate about creating technology that feels magical but works reliably. \nHis open-source contributions have been downloaded over 2 million times.`,
    image: "https://images.unsplash.com/photo-1636955031709-e3a4a671ede8",
    imageAlt: "Professional headshot of Hispanic man with short dark hair and beard in dark suit jacket",
    credentials: ["MIT Computer Science", "Google Senior Engineer", "Open Source Contributor"],
    socialLinks: {
      linkedin: "marcus-rodriguez-cto",
      github: "marcustech"
    },
    achievements: [
    "Architected systems serving 10M+ users",
    "Created FlowTech\'s core AI framework",
    "Mentored 50+ junior developers"]

  },
  {
    id: 3,
    name: "Elena Kowalski",
    role: "Head of Design",
    expertise: "Human Experience Design",
    bio: `Elena brings 10 years of design leadership from IDEO and Airbnb. \nShe champions the belief that great design is invisible — it just works. \nHer user research methodologies have become industry standards for empathetic design.`,
    image: "https://images.unsplash.com/photo-1663342850408-86bbc6953457",
    imageAlt: "Professional headshot of blonde woman with blue eyes in white blouse smiling warmly",
    credentials: ["IDEO Design Fellow", "Airbnb Senior Designer", "UX Research Certified"],
    socialLinks: {
      linkedin: "elena-kowalski-design",
      dribbble: "elenadesigns"
    },
    achievements: [
    "Designed award-winning mobile apps",
    "Led design for 3 unicorn startups",
    "Published UX research methodology"]

  },
  {
    id: 4,
    name: "David Kim",
    role: "Head of Engineering",
    expertise: "Scalable Systems",
    bio: `David is our engineering excellence champion with deep expertise in distributed systems. \nFormerly at Netflix, he ensures our technology scales beautifully under pressure. \nHis team consistently delivers zero-downtime deployments and sub-100ms response times.`,
    image: "https://images.unsplash.com/photo-1492140377033-831754a4702f",
    imageAlt: "Professional headshot of Korean man with glasses and short black hair in gray sweater",
    credentials: ["Netflix Senior Engineer", "AWS Solutions Architect", "Kubernetes Certified"],
    socialLinks: {
      linkedin: "david-kim-engineering",
      github: "davidkimtech"
    },
    achievements: [
    "Built systems handling 1B+ requests/day",
    "Reduced infrastructure costs by 40%",
    "Led migration to microservices architecture"]

  }];


  return (
    <section className="py-20 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Icon name="Users" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Leadership Collective</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Creative
            <span className="block text-accent">Technologists</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our leadership team combines deep technical expertise with creative vision. 
            We're not just building technology — we're crafting the future of human-computer interaction.
          </p>
        </motion.div>

        {/* Leadership Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {leaders?.map((leader, index) =>
          <motion.div
            key={leader?.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedMember(leader)}>

              <div className="card-elevated p-6 text-center hover:shadow-strong transition-all duration-500 group-hover:-translate-y-2">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden organic-shape">
                    <Image
                    src={leader?.image}
                    alt={leader?.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={16} className="text-white" />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                  {leader?.name}
                </h3>
                <p className="text-sm font-medium text-accent mb-2">{leader?.role}</p>
                <p className="text-xs text-text-secondary mb-4">{leader?.expertise}</p>

                {/* Credentials */}
                <div className="space-y-1">
                  {leader?.credentials?.slice(0, 2)?.map((credential, idx) =>
                <div key={idx} className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">
                      {credential}
                    </div>
                )}
                </div>

                {/* Hover Indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-center space-x-1 text-primary">
                    <span className="text-xs font-medium">View Profile</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Team Philosophy */}
        <motion.div
          className="text-center bg-background rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <Icon name="Quote" size={32} className="text-primary mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-text-primary mb-6 leading-relaxed">
            "We believe the best technology is created by diverse minds working in harmony. 
            Our leadership team represents different backgrounds, perspectives, and expertise areas — 
            united by a shared vision of human-centered innovation."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              {leaders?.slice(0, 4)?.map((leader, index) =>
              <div key={index} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                  <Image
                  src={leader?.image}
                  alt={leader?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
              )}
            </div>
            <span className="text-sm font-medium text-text-secondary">FlowTech Leadership Team</span>
          </div>
        </motion.div>
      </div>
      {/* Detailed Profile Modal */}
      {selectedMember &&
      <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
          className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}>

            {/* Close Button */}
            <button
            onClick={() => setSelectedMember(null)}
            className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors duration-200">

              <Icon name="X" size={24} />
            </button>

            {/* Profile Header */}
            <div className="flex items-start space-x-6 mb-8">
              <div className="w-24 h-24 rounded-2xl overflow-hidden organic-shape flex-shrink-0">
                <Image
                src={selectedMember?.image}
                alt={selectedMember?.imageAlt}
                className="w-full h-full object-cover" />

              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-text-primary mb-2">{selectedMember?.name}</h3>
                <p className="text-lg font-medium text-accent mb-2">{selectedMember?.role}</p>
                <p className="text-text-secondary mb-4">{selectedMember?.expertise}</p>
                
                {/* Social Links */}
                <div className="flex space-x-3">
                  {Object.entries(selectedMember?.socialLinks)?.map(([platform, handle]) =>
                <div key={platform} className="flex items-center space-x-1 text-sm text-text-secondary">
                      <Icon name={platform === 'linkedin' ? 'Linkedin' : platform === 'twitter' ? 'Twitter' : 'Github'} size={16} />
                      <span>{handle}</span>
                    </div>
                )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-text-primary mb-4">Background</h4>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">{selectedMember?.bio}</p>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-text-primary mb-4">Key Achievements</h4>
              <div className="space-y-2">
                {selectedMember?.achievements?.map((achievement, index) =>
              <div key={index} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-text-secondary">{achievement}</span>
                  </div>
              )}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <h4 className="text-xl font-bold text-text-primary mb-4">Credentials</h4>
              <div className="flex flex-wrap gap-2">
                {selectedMember?.credentials?.map((credential, index) =>
              <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {credential}
                  </span>
              )}
              </div>
            </div>
          </motion.div>
        </div>
      }
    </section>);

};

export default LeadershipCollective;