import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';

const ClientLogos = () => {
  const clients = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1768483cf-1762235698618.png",
    logoAlt: "TechCorp Solutions company logo featuring modern geometric design in blue and gray"
  },
  {
    id: 2,
    name: "InnovateLab",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_111eca764-1762235699735.png",
    logoAlt: "InnovateLab startup logo with minimalist typography and orange accent color"
  },
  {
    id: 3,
    name: "Digital Dynamics",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d65c4e17-1762235698443.png",
    logoAlt: "Digital Dynamics corporate logo featuring abstract digital pattern in teal and white"
  },
  {
    id: 4,
    name: "FutureScale",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15c3a46bb-1762235698295.png",
    logoAlt: "FutureScale technology company logo with futuristic font and gradient background"
  },
  {
    id: 5,
    name: "CloudVision",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1b61b2d60-1762235697563.png",
    logoAlt: "CloudVision enterprise logo featuring cloud icon with modern sans-serif typography"
  },
  {
    id: 6,
    name: "NextGen Systems",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1010b81ec-1762235697821.png",
    logoAlt: "NextGen Systems logo with bold lettermark design in dark blue and silver colors"
  }];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">

          <h3 className="text-lg font-medium text-text-secondary mb-2">
            Trusted by Industry Leaders
          </h3>
          <p className="text-3xl font-semibold text-text-primary">
            Partnering with <span className="text-primary">Visionary Companies</span>
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">

          {clients?.map((client, index) =>
          <motion.div
            key={client?.id}
            variants={logoVariants}
            animate={floatingAnimation}
            style={{ animationDelay: `${index * 0.5}s` }}
            className="group relative flex items-center justify-center p-6 bg-card rounded-xl hover:bg-white hover:shadow-medium transition-all duration-300 cursor-pointer">

              <div className="relative w-full h-16 flex items-center justify-center">
                <Image
                src={client?.logo}
                alt={client?.logoAlt}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100" />

                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-text-primary text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {client?.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-text-primary" />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-text-secondary">Client Retention Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">150+</div>
            <div className="text-text-secondary">Successful Projects</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">5+</div>
            <div className="text-text-secondary">Years of Excellence</div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default ClientLogos;