import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OpenPositions = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Positions', count: 12 },
    { id: 'engineering', name: 'Engineering', count: 6 },
    { id: 'design', name: 'Design', count: 3 },
    { id: 'product', name: 'Product', count: 2 },
    { id: 'operations', name: 'Operations', count: 1 }
  ];

  const positions = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our frontend team to build next-generation user interfaces that blend technical excellence with creative vision.",
      requirements: ["Expert in React 18+ and TypeScript", "Experience with Framer Motion", "Strong design sensibility", "Passion for performance optimization"],
      benefits: ["Competitive salary + equity", "Flexible work arrangements", "Learning budget $3000/year", "Top-tier health benefits"],
      posted: "2 days ago",
      applicants: 24,
      urgent: false
    },
    {
      id: 2,
      title: "Creative Technologist",
      department: "design",
      location: "Remote / New York",
      type: "Full-time",
      experience: "3+ years",
      description: "Bridge the gap between design and development, creating innovative digital experiences that push the boundaries of what's possible.",
      requirements: ["Proficiency in design tools and code", "Experience with WebGL/Three.js", "Understanding of motion design", "Portfolio showcasing creative projects"],
      benefits: ["Competitive salary + equity", "Creative project time 20%", "Conference attendance budget", "State-of-the-art equipment"],
      posted: "1 week ago",
      applicants: 18,
      urgent: true
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Build and maintain the infrastructure that powers our innovative applications, ensuring scalability and security at every level.",
      requirements: ["Kubernetes and Docker expertise", "AWS/GCP experience", "Infrastructure as Code", "Security-first mindset"],
      benefits: ["Competitive salary + equity", "Remote-first culture", "Professional development budget", "Flexible PTO policy"],
      posted: "3 days ago",
      applicants: 31,
      urgent: false
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "design",
      location: "Remote / Los Angeles",
      type: "Full-time",
      experience: "3+ years",
      description: "Craft beautiful, intuitive interfaces that make complex technology feel simple and delightful to use.",
      requirements: ["Strong portfolio in digital design", "Figma and prototyping skills", "User research experience", "Understanding of accessibility"],
      benefits: ["Competitive salary + equity", "Design conference budget", "Flexible work schedule", "Mentorship opportunities"],
      posted: "5 days ago",
      applicants: 42,
      urgent: false
    },
    {
      id: 5,
      title: "Product Manager",
      department: "product",
      location: "San Francisco / Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Drive product strategy and execution for our next-generation platform, working closely with engineering and design teams.",
      requirements: ["Technical product management experience", "Data-driven decision making", "Excellent communication skills", "Startup experience preferred"],
      benefits: ["Competitive salary + equity", "Product conference budget", "Flexible work arrangements", "Stock option program"],
      posted: "1 week ago",
      applicants: 15,
      urgent: true
    },
    {
      id: 6,
      title: "Machine Learning Engineer",
      department: "engineering",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Develop AI-powered features that enhance user experiences while maintaining our commitment to ethical and responsible AI.",
      requirements: ["Python and ML frameworks", "Experience with LLMs", "Understanding of AI ethics", "Research background preferred"],
      benefits: ["Competitive salary + equity", "Research publication support", "GPU compute budget", "Conference speaking opportunities"],
      posted: "4 days ago",
      applicants: 28,
      urgent: false
    }
  ];

  const filteredPositions = selectedDepartment === 'all' 
    ? positions 
    : positions?.filter(pos => pos?.department === selectedDepartment);

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
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Open Positions
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Ready to build the future with us? Explore opportunities to join our team of creative technologists 
            and help shape the next generation of digital experiences.
          </p>
        </motion.div>

        {/* Department Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {departments?.map((dept) => (
            <button
              key={dept?.id}
              onClick={() => setSelectedDepartment(dept?.id)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2
                ${selectedDepartment === dept?.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-card text-text-secondary hover:bg-primary/10 hover:text-primary'
                }
              `}
            >
              <span>{dept?.name}</span>
              <span className={`
                px-2 py-1 rounded-full text-xs font-semibold
                ${selectedDepartment === dept?.id
                  ? 'bg-white/20 text-white' :'bg-primary/10 text-primary'
                }
              `}>
                {dept?.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Positions Grid */}
        <div className="space-y-6">
          {filteredPositions?.map((position, index) => (
            <motion.div
              key={position?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-elevated p-8 hover:shadow-strong transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Position Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
                          {position?.title}
                        </h3>
                        {position?.urgent && (
                          <span className="px-2 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-3">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={14} />
                          <span>{position?.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{position?.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="TrendingUp" size={14} />
                          <span>{position?.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={14} />
                          <span>{position?.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {position?.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                      <Icon name="CheckCircle" size={16} className="mr-2 text-primary" />
                      Key Requirements
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {position?.requirements?.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2 text-sm text-text-secondary">
                          <Icon name="Dot" size={12} className="text-primary mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                      <Icon name="Gift" size={16} className="mr-2 text-accent" />
                      What We Offer
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {position?.benefits?.map((benefit, benefitIndex) => (
                        <span
                          key={benefitIndex}
                          className="px-3 py-1 bg-trust/10 text-trust text-sm font-medium rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <span>Posted {position?.posted}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex flex-col space-y-3 lg:ml-8">
                  <Button
                    variant="default"
                    className="btn-magnetic whitespace-nowrap"
                    iconName="Send"
                    iconPosition="right"
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap"
                    iconName="Bookmark"
                    iconPosition="left"
                  >
                    Save Job
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Positions Message */}
        {filteredPositions?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No positions found
            </h3>
            <p className="text-text-secondary">
              Try selecting a different department or check back soon for new opportunities.
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-4">
            Don't See Your Perfect Role?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your portfolio and let us know 
            how you'd like to contribute to our mission of building technology with soul.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="btn-magnetic"
            iconName="Mail"
            iconPosition="left"
          >
            Send Us Your Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenPositions;