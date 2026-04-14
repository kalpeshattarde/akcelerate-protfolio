import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = () => {
  const clientLogos = [
  { name: "Microsoft", logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f7c95937-1762235698198.png", logoAlt: "Microsoft company logo in blue and white" },
  { name: "Google", logo: "https://img.rocket.new/generatedImages/rocket_gen_img_107560646-1762235697876.png", logoAlt: "Google company logo with colorful letters" },
  { name: "Spotify", logo: "https://images.unsplash.com/photo-1634037227397-34c8c46d585c", logoAlt: "Spotify logo with green circular icon" },
  { name: "Airbnb", logo: "https://img.rocket.new/generatedImages/rocket_gen_img_16add5306-1762235698025.png", logoAlt: "Airbnb logo with pink and white branding" },
  { name: "Netflix", logo: "https://images.unsplash.com/photo-1662338035130-516cb712005a", logoAlt: "Netflix logo in red and black colors" },
  { name: "Uber", logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9050f71-1762235697302.png", logoAlt: "Uber company logo in black and white" }];


  const industryRecognition = [
  {
    award: "Innovation Studio of the Year",
    organization: "TechCrunch",
    year: "2023",
    description: "Recognized for breakthrough work in human-AI interaction design",
    icon: "Award",
    image: "https://images.unsplash.com/photo-1647801095388-a08bdf1a68be",
    imageAlt: "Golden trophy award on podium with spotlight and elegant backdrop"
  },
  {
    award: "Best UX Design Agency",
    organization: "Awwwards",
    year: "2023",
    description: "Honored for exceptional user experience design across multiple projects",
    icon: "Star",
    image: "https://images.unsplash.com/photo-1682975826318-7cf36d64082b",
    imageAlt: "Modern design award ceremony with geometric trophy and professional lighting"
  },
  {
    award: "Top 50 AI Companies",
    organization: "Forbes",
    year: "2022",
    description: "Listed among the most innovative AI companies globally",
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1577524079322-04b2fe784958",
    imageAlt: "Forbes magazine cover featuring technology and innovation theme"
  }];


  const teamCredentials = [
  {
    credential: "MIT Computer Science Alumni",
    count: "8",
    icon: "GraduationCap"
  },
  {
    credential: "Former FAANG Engineers",
    count: "12",
    icon: "Code"
  },
  {
    credential: "Published Researchers",
    count: "6",
    icon: "BookOpen"
  },
  {
    credential: "Industry Speakers",
    count: "15",
    icon: "Mic"
  }];


  const communityContributions = [
  {
    title: "FlowUI Component Library",
    description: "Open-source React component library used by 50K+ developers",
    stars: "15.8K",
    downloads: "2.1M",
    icon: "Package"
  },
  {
    title: "AI Ethics Framework",
    description: "Comprehensive guidelines for ethical AI development",
    citations: "450+",
    implementations: "200+",
    icon: "Shield"
  },
  {
    title: "Developer Mentorship Program",
    description: "Free mentorship for underrepresented developers",
    mentees: "300+",
    placements: "85%",
    icon: "Users"
  }];


  return (
    <section className="py-20 lg:py-32 bg-card relative overflow-hidden">
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

          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Icon name="CheckCircle" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Social Proof</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Trusted by
            <span className="block text-accent">Industry Leaders</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our work speaks for itself through the trust of leading companies, 
            industry recognition, and contributions to the global developer community.
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <h3 className="text-2xl font-bold text-text-primary text-center mb-12">
            Trusted by Leading Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clientLogos?.map((client, index) =>
            <motion.div
              key={index}
              className="flex items-center justify-center p-6 bg-background rounded-xl hover:shadow-medium transition-all duration-300 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}>

                <Image
                src={client?.logo}
                alt={client?.logoAlt}
                className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Industry Recognition */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Industry Recognition
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {industryRecognition?.map((recognition, index) =>
            <motion.div
              key={index}
              className="card-elevated p-8 text-center group hover:shadow-strong transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}>

                {/* Award Image */}
                <div className="relative mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <Image
                    src={recognition?.image}
                    alt={recognition?.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <Icon name={recognition?.icon} size={20} className="text-white" />
                  </div>
                </div>

                {/* Award Details */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-accent">{recognition?.year}</div>
                  <h4 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors duration-300">
                    {recognition?.award}
                  </h4>
                  <div className="text-sm font-medium text-text-secondary">{recognition?.organization}</div>
                  <p className="text-text-secondary leading-relaxed">{recognition?.description}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Team Credentials */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Team Credentials
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamCredentials?.map((credential, index) =>
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}>

                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={credential?.icon} size={28} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2">{credential?.count}</div>
                <div className="text-text-secondary font-medium">{credential?.credential}</div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Community Contributions */}
        <motion.div
          className="bg-background rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>

          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Community Contributions
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {communityContributions?.map((contribution, index) =>
            <motion.div
              key={index}
              className="card-elevated p-8 group hover:shadow-strong transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}>

                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-trust/10 rounded-xl flex items-center justify-center">
                    <Icon name={contribution?.icon} size={20} className="text-trust" />
                  </div>
                  <h4 className="text-xl font-bold text-text-primary group-hover:text-trust transition-colors duration-300">
                    {contribution?.title}
                  </h4>
                </div>
                
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {contribution?.description}
                </p>

                <div className="flex justify-between items-center text-sm">
                  {Object.entries(contribution)?.filter(([key]) => !['title', 'description', 'icon']?.includes(key))?.map(([key, value], idx) =>
                <div key={idx} className="text-center">
                      <div className="font-bold text-trust">{value}</div>
                      <div className="text-text-secondary capitalize">{key}</div>
                    </div>
                )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default SocialProof;