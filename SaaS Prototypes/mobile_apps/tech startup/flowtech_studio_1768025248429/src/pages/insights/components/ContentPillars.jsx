import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContentPillars = () => {
  const pillars = [
  {
    id: 1,
    title: "Technology with Purpose",
    description: "How technical decisions impact human experiences",
    icon: "Heart",
    color: "primary",
    image: "https://images.unsplash.com/photo-1573497161854-72447225081d",
    alt: "Team of diverse professionals collaborating around a modern conference table with laptops and digital displays",
    articles: 42,
    readTime: "5-8 min reads"
  },
  {
    id: 2,
    title: "The Future of Digital Craft",
    description: "Emerging technologies through a design lens",
    icon: "Palette",
    color: "accent",
    image: "https://images.unsplash.com/photo-1660554253786-63fa532248bd",
    alt: "Designer working on futuristic interface designs with holographic elements and digital tools",
    articles: 38,
    readTime: "7-12 min reads"
  },
  {
    id: 3,
    title: "Building for Tomorrow",
    description: "Sustainable, scalable technology practices",
    icon: "TreePine",
    color: "trust",
    image: "https://images.unsplash.com/photo-1564547559170-3dc7fc9ef6a4",
    alt: "Modern sustainable office building with green technology and solar panels integrated into architecture",
    articles: 35,
    readTime: "6-10 min reads"
  },
  {
    id: 4,
    title: "Human-Centered Innovation",
    description: "Case studies in empathetic technology",
    icon: "Users",
    color: "secondary",
    image: "https://images.unsplash.com/photo-1573497020210-407242f00778",
    alt: "Diverse group of people using accessible technology interfaces designed for inclusive user experiences",
    articles: 29,
    readTime: "8-15 min reads"
  }];


  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary/10 border-primary/20',
      accent: 'text-accent bg-accent/10 border-accent/20',
      trust: 'text-trust bg-trust/10 border-trust/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Our Content Pillars
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Four foundational themes that guide our thought leadership and establish 
            FlowTech Studio as visionaries in the intersection of technology and human experience.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars?.map((pillar, index) =>
          <div
            key={pillar?.id}
            className="group card-elevated hover:shadow-strong transition-all duration-500 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                src={pillar?.image}
                alt={pillar?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Icon Badge */}
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getColorClasses(pillar?.color)}`}>
                  <Icon name={pillar?.icon} size={20} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
                  {pillar?.title}
                </h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {pillar?.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Icon name="FileText" size={14} />
                      <span>{pillar?.articles} articles</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{pillar?.readTime}</span>
                    </span>
                  </div>
                  <Icon
                  name="ArrowRight"
                  size={16}
                  className="text-primary group-hover:translate-x-1 transition-transform duration-300" />

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default ContentPillars;