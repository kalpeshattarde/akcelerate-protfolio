import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const actionCards = [
    {
      title: "Start a Project",
      description: "Ready to transform your ideas into reality? Let\'s discuss your next breakthrough project.",
      icon: "Rocket",
      color: "primary",
      link: "/contact",
      buttonText: "Get Started"
    },
    {
      title: "Join Our Team",
      description: "Be part of a team that\'s shaping the future of technology with human-centered design.",
      icon: "Users",
      color: "accent",
      link: "/careers",
      buttonText: "View Openings"
    },
    {
      title: "Partner with Us",
      description: "Explore collaboration opportunities and strategic partnerships for mutual growth.",
      icon: "Handshake",
      color: "trust",
      link: "/contact",
      buttonText: "Partner Up"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-trust/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-8">
            Ready to Create
            <span className="block text-primary">Something Amazing?</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12">
            Whether you're looking to build the next breakthrough product, 
            join our innovative team, or explore partnership opportunities — 
            we're here to make it happen together.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="btn-magnetic animate-breathe"
              >
                Start a Conversation
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                variant="outline"
                size="lg"
                iconName="Eye"
                iconPosition="left"
                className="btn-magnetic"
              >
                View Our Work
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {actionCards?.map((card, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-elevated p-8 text-center h-full flex flex-col justify-between hover:shadow-strong transition-all duration-500 group-hover:-translate-y-2">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-20 h-20 bg-${card?.color}/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-${card?.color}/20 transition-colors duration-300 organic-shape`}>
                    <Icon name={card?.icon} size={32} className={`text-${card?.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 mb-8">
                  <h3 className={`text-2xl font-bold text-text-primary mb-4 group-hover:text-${card?.color} transition-colors duration-300`}>
                    {card?.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {card?.description}
                  </p>
                </div>

                {/* CTA Button */}
                <Link to={card?.link}>
                  <Button
                    variant={card?.color === 'primary' ? 'default' : 'outline'}
                    fullWidth
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="btn-magnetic"
                  >
                    {card?.buttonText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div 
          className="bg-card rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-text-primary mb-8">
            Let's Connect
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: "Mail",
                title: "Email Us",
                value: "hello@flowtech.studio",
                description: "For project inquiries and partnerships"
              },
              {
                icon: "Phone",
                title: "Call Us",
                value: "+1 (555) 123-4567",
                description: "Monday to Friday, 9 AM - 6 PM PST"
              },
              {
                icon: "MapPin",
                title: "Visit Us",
                value: "San Francisco, CA",
                description: "Schedule a visit to our studio"
              }
            ]?.map((contact, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={contact?.icon} size={24} className="text-primary" />
                </div>
                <h4 className="text-lg font-bold text-text-primary mb-2">{contact?.title}</h4>
                <div className="text-primary font-medium mb-2">{contact?.value}</div>
                <p className="text-sm text-text-secondary">{contact?.description}</p>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {[
              { name: "LinkedIn", icon: "Linkedin" },
              { name: "Twitter", icon: "Twitter" },
              { name: "GitHub", icon: "Github" },
              { name: "Dribbble", icon: "Dribbble" }
            ]?.map((social, index) => (
              <a
                key={index}
                href="#"
                className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Icon name={social?.icon} size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;