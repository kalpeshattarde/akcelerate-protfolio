import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClientSuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);

  const successStories = [
  {
    id: 1,
    client: {
      name: "TechFlow Dynamics",
      industry: "Enterprise Software",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_14f33a03e-1762235698305.png",
      logoAlt: "TechFlow Dynamics logo featuring modern geometric design in blue and white"
    },
    project: "AI-Powered Analytics Platform",
    challenge: "Legacy system modernization with 10M+ daily transactions requiring zero downtime migration and 99.9% uptime guarantee.",
    solution: "Microservices architecture with gradual migration strategy, implementing real-time analytics and machine learning capabilities.",
    results: [
    { metric: "Performance Boost", value: "340%", icon: "TrendingUp" },
    { metric: "Cost Reduction", value: "65%", icon: "DollarSign" },
    { metric: "User Satisfaction", value: "98%", icon: "Heart" },
    { metric: "Deployment Speed", value: "85% faster", icon: "Zap" }],

    testimonial: {
      quote: "FlowTech Studio transformed our entire digital infrastructure. Their technical expertise combined with genuine care for our business outcomes made them true partners, not just vendors.",
      author: "Sarah Chen",
      role: "CTO, TechFlow Dynamics",
      avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in navy blazer"
    },
    timeline: "8 months",
    teamSize: "12 specialists"
  },
  {
    id: 2,
    client: {
      name: "GreenTech Innovations",
      industry: "Sustainable Technology",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d92e5ca4-1762235698440.png",
      logoAlt: "GreenTech Innovations circular logo with leaf motif in green and earth tones"
    },
    project: "Carbon Tracking Mobile Platform",
    challenge: "Building a comprehensive carbon footprint tracking system for enterprises with complex supply chain integrations and real-time reporting.",
    solution: "React Native app with IoT sensor integration, blockchain verification, and AI-powered recommendations for carbon reduction strategies.",
    results: [
    { metric: "Carbon Tracked", value: "2.5M tons", icon: "Leaf" },
    { metric: "Enterprise Clients", value: "150+", icon: "Building" },
    { metric: "Cost Savings", value: "$12M", icon: "DollarSign" },
    { metric: "App Rating", value: "4.9/5", icon: "Star" }],

    testimonial: {
      quote: "The platform FlowTech built doesn't just track carbon—it's revolutionizing how companies think about sustainability. The user experience makes complex environmental data accessible and actionable.",
      author: "Marcus Rodriguez",
      role: "Founder & CEO, GreenTech Innovations",
      avatar: "https://images.unsplash.com/photo-1636955031709-e3a4a671ede8",
      avatarAlt: "Professional headshot of Hispanic man with beard wearing white shirt and dark jacket"
    },
    timeline: "10 months",
    teamSize: "8 specialists"
  },
  {
    id: 3,
    client: {
      name: "HealthConnect Pro",
      industry: "Healthcare Technology",
      logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17dddf7b1-1762235699231.png",
      logoAlt: "HealthConnect Pro medical cross logo in blue and white with modern typography"
    },
    project: "Telemedicine Platform",
    challenge: "HIPAA-compliant telehealth solution supporting 50,000+ concurrent users with end-to-end encryption and seamless provider-patient interactions.",
    solution: "Scalable cloud architecture with WebRTC video calls, AI-powered symptom assessment, and integrated EHR systems with advanced security protocols.",
    results: [
    { metric: "Patient Consultations", value: "1M+", icon: "Users" },
    { metric: "Provider Satisfaction", value: "96%", icon: "ThumbsUp" },
    { metric: "Response Time", value: "< 2 seconds", icon: "Clock" },
    { metric: "Security Score", value: "100%", icon: "Shield" }],

    testimonial: {
      quote: "FlowTech's deep understanding of healthcare regulations and user experience created a platform that doctors love to use and patients trust. It's transformed how we deliver care.",
      author: "Dr. Emily Watson",
      role: "Chief Medical Officer, HealthConnect Pro",
      avatar: "https://images.unsplash.com/photo-1701212959262-d4d78ae19325",
      avatarAlt: "Professional headshot of woman doctor with blonde hair in white medical coat"
    },
    timeline: "12 months",
    teamSize: "15 specialists"
  }];


  const currentStory = successStories?.[activeStory];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-text-primary mb-4">

            Client Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto">

            Real partnerships, measurable impact, and transformative results that speak to our commitment to client success
          </motion.p>
        </div>

        {/* Story Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 bg-muted rounded-full p-2">
            {successStories?.map((story, index) =>
            <button
              key={story?.id}
              onClick={() => setActiveStory(index)}
              className={`
                  flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300
                  ${activeStory === index ?
              'bg-primary text-white shadow-lg' :
              'text-text-secondary hover:text-primary hover:bg-primary/10'}
                `
              }>

                <Image
                src={story?.client?.logo}
                alt={story?.client?.logoAlt}
                className="w-6 h-6 rounded object-contain" />

                <span className="font-medium text-sm hidden sm:block">{story?.client?.name}</span>
              </button>
            )}
          </div>
        </div>

        {/* Story Content */}
        <motion.div
          key={activeStory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Story Details */}
          <div className="space-y-8">
            {/* Client Header */}
            <div className="flex items-center space-x-4">
              <Image
                src={currentStory?.client?.logo}
                alt={currentStory?.client?.logoAlt}
                className="w-16 h-16 rounded-xl object-contain bg-white p-2 shadow-md" />

              <div>
                <h3 className="text-2xl font-semibold text-text-primary">{currentStory?.client?.name}</h3>
                <p className="text-text-secondary">{currentStory?.client?.industry}</p>
              </div>
            </div>

            {/* Project Info */}
            <div>
              <h4 className="text-xl font-semibold text-text-primary mb-3">{currentStory?.project}</h4>
              <div className="flex items-center space-x-6 text-sm text-text-secondary mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>{currentStory?.timeline}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span>{currentStory?.teamSize}</span>
                </div>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                  <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                  Challenge
                </h5>
                <p className="text-text-secondary text-sm leading-relaxed">{currentStory?.challenge}</p>
              </div>
              <div>
                <h5 className="font-semibold text-text-primary mb-2 flex items-center">
                  <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
                  Solution
                </h5>
                <p className="text-text-secondary text-sm leading-relaxed">{currentStory?.solution}</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-primary/5 rounded-xl p-6">
              <blockquote className="text-text-primary italic mb-4">
                "{currentStory?.testimonial?.quote}"
              </blockquote>
              <div className="flex items-center space-x-3">
                <Image
                  src={currentStory?.testimonial?.avatar}
                  alt={currentStory?.testimonial?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                <div>
                  <p className="font-medium text-text-primary">{currentStory?.testimonial?.author}</p>
                  <p className="text-sm text-text-secondary">{currentStory?.testimonial?.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 gap-6">
            {currentStory?.results?.map((result, index) =>
            <motion.div
              key={result?.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 text-center card-elevated hover:shadow-strong transition-all duration-300">

                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={result?.icon} size={24} className="text-white" />
                </div>
                <h4 className="text-2xl font-bold text-primary mb-2">{result?.value}</h4>
                <p className="text-text-secondary text-sm">{result?.metric}</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {successStories?.map((_, index) =>
          <button
            key={index}
            onClick={() => setActiveStory(index)}
            className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${activeStory === index ? 'bg-primary scale-125' : 'bg-border hover:bg-primary/50'}
              `} />

          )}
        </div>
      </div>
    </section>);

};

export default ClientSuccessStories;