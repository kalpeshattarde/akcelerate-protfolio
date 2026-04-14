import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
  {
    title: "Services",
    links: [
    { name: "Custom Development", href: "/services" },
    { name: "UX/UI Design", href: "/services" },
    { name: "Digital Strategy", href: "/services" },
    { name: "Cloud Solutions", href: "/services" }]

  },
  {
    title: "Company",
    links: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }]

  },
  {
    title: "Resources",
    links: [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Case Studies", href: "/portfolio" },
    { name: "Insights", href: "/insights" },
    { name: "Blog", href: "/insights" }]

  }];


  const socialLinks = [
  { name: "LinkedIn", icon: "Linkedin", href: "#" },
  { name: "Twitter", icon: "Twitter", href: "#" },
  { name: "GitHub", icon: "Github", href: "#" },
  { name: "Dribbble", icon: "Dribbble", href: "#" }];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const Logo = () =>
  <div className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center organic-shape transition-all duration-500 group-hover:shadow-glow">
          <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white">

            <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round" />

            <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round" />

            <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round" />

          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
          FlowTech Studio
        </h3>
        <p className="text-sm text-gray-300 font-medium tracking-wide group-hover:text-gray-200 transition-colors duration-300">
          Technology with Soul
        </p>
      </div>
    </div>;


  return (
    <footer className="bg-gradient-to-br from-primary via-secondary to-primary/80 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16">

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-5 bg-[rgba(255,255,255,0)]">
              <Logo />
              <p className="text-gray-200 mt-6 text-lg leading-relaxed max-w-md hover:text-white transition-colors duration-300">
                We craft digital experiences that don't just function—they inspire, engage, and transform the way people interact with technology.
              </p>
              
              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3 group">
                  <Icon name="Mail" size={18} className="text-accent group-hover:text-white transition-colors duration-300" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">hello@flowtechstudio.com</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Icon name="Phone" size={18} className="text-accent group-hover:text-white transition-colors duration-300" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <Icon name="MapPin" size={18} className="text-accent group-hover:text-white transition-colors duration-300" />
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4 hover:text-accent transition-colors duration-300">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks?.map((social) =>
                  <a
                    key={social?.name}
                    href={social?.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300 group"
                    aria-label={social?.name}>

                      <Icon
                      name={social?.icon}
                      size={18}
                      className="text-gray-200 group-hover:text-secondary transition-colors duration-300" />

                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            <div className="lg:col-span-7 grid md:grid-cols-3 gap-8 bg-[rgba(176,176,176,0)]">
              {footerSections?.map((section, index) =>
              <motion.div key={section?.title} variants={itemVariants}>
                  <h4 className="text-white font-semibold text-lg mb-6 hover:text-accent transition-colors duration-300">
                    {section?.title}
                  </h4>
                  <ul className="space-y-3">
                    {section?.links?.map((link) =>
                  <li key={link?.name}>
                        <Link
                      to={link?.href}
                      className="text-gray-200 hover:text-white transition-all duration-300 flex items-center group">

                          <span className="group-hover:translate-x-1 transition-transform duration-300 text-gray-200 group-hover:text-white">
                            {link?.name}
                          </span>
                          <Icon
                        name="ArrowRight"
                        size={14}
                        className="ml-2 opacity-0 group-hover:opacity-100 text-accent transition-all duration-300" />

                        </Link>
                      </li>
                  )}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 p-8 bg-gradient-to-r from-accent/20 to-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Digital Presence?
              </h3>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto hover:text-white transition-colors duration-300">
                Let's discuss how we can help you build technology solutions that drive real business results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  size="lg"
                  className="btn-magnetic animate-breathe"
                  iconName="ArrowRight"
                  iconPosition="right">

                  Start Your Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-magnetic border-white/30 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-300"
                  iconName="Calendar"
                  iconPosition="left">

                  Schedule Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="py-8 border-t border-white/20">

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-200 text-sm hover:text-white transition-colors duration-300">
              © {currentYear} FlowTech Studio. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );

};

export default Footer;