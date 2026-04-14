import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('whitepapers');

  const categories = [
  { id: 'whitepapers', label: 'Whitepapers', icon: 'FileText', count: 25 },
  { id: 'frameworks', label: 'Frameworks', icon: 'Grid3x3', count: 18 },
  { id: 'templates', label: 'Templates', icon: 'Layout', count: 32 },
  { id: 'toolkits', label: 'Toolkits', icon: 'Wrench', count: 15 }];


  const resources = {
    whitepapers: [
    {
      id: 1,
      title: "The Complete Guide to Human-Centered AI Implementation",
      description: `A comprehensive 45-page whitepaper detailing our proprietary methodology for implementing AI systems that prioritize human welfare and ethical considerations.\n\nIncludes case studies from Fortune 500 implementations and measurable impact metrics.`,
      downloadCount: 2847,
      pages: 45,
      fileSize: "2.3 MB",
      format: "PDF",
      image: "https://images.unsplash.com/photo-1695720247431-2790feab65c0",
      alt: "Professional document cover showing AI ethics framework diagrams and human-centered design principles",
      tags: ["AI Ethics", "Implementation", "Strategy"],
      featured: true,
      premium: false
    },
    {
      id: 2,
      title: "Sustainable Technology Practices for Modern Enterprises",
      description: `Research-backed strategies for building environmentally conscious technology infrastructure while maintaining competitive performance.\n\nFeatures real-world case studies and ROI calculations for sustainable tech investments.`,
      downloadCount: 1923,
      pages: 38,
      fileSize: "1.8 MB",
      format: "PDF",
      image: "https://images.unsplash.com/photo-1601193449935-a09c86757c45",
      alt: "Green technology concept showing sustainable server infrastructure with renewable energy integration",
      tags: ["Sustainability", "Enterprise", "Green Tech"],
      featured: true,
      premium: true
    },
    {
      id: 3,
      title: "The Psychology of Digital Interactions: A UX Research Compendium",
      description: `Deep dive into cognitive science principles that drive effective digital experiences, compiled from 3 years of user research across 50+ projects.\n\nIncludes practical application guidelines and testing methodologies.`,
      downloadCount: 3156,
      pages: 52,
      fileSize: "3.1 MB",
      format: "PDF",
      image: "https://images.unsplash.com/photo-1572982408141-5444f29ca3ca",
      alt: "UX research visualization showing user behavior patterns and psychological interaction models",
      tags: ["UX Research", "Psychology", "Digital Design"],
      featured: false,
      premium: false
    }],

    frameworks: [
    {
      id: 4,
      title: "FlowTech Design System Framework",
      description: `Our complete design system framework that has powered over 100 successful product launches.\n\nIncludes component libraries, design tokens, and implementation guidelines for React, Vue, and Angular.`,
      downloadCount: 4521,
      pages: 28,
      fileSize: "5.2 MB",
      format: "ZIP",
      image: "https://images.unsplash.com/photo-1710787554730-1b416f226a21",
      alt: "Modern design system components displayed on multiple screens showing consistent UI patterns",
      tags: ["Design System", "Components", "Frontend"],
      featured: true,
      premium: false
    },
    {
      id: 5,
      title: "Agile Innovation Methodology",
      description: `Our proprietary framework for rapid innovation that combines design thinking with agile development practices.\n\nProven to reduce time-to-market by 40% while improving product-market fit scores.`,
      downloadCount: 2134,
      pages: 35,
      fileSize: "2.7 MB",
      format: "PDF",
      image: "https://images.unsplash.com/photo-1690192078982-d3d2f89059ee",
      alt: "Agile team collaboration workspace with sprint boards and innovation methodology diagrams",
      tags: ["Agile", "Innovation", "Methodology"],
      featured: false,
      premium: true
    }],

    templates: [
    {
      id: 6,
      title: "Product Discovery Canvas Collection",
      description: `A comprehensive set of 12 canvas templates for product discovery, user research, and strategic planning.\n\nUsed by product teams at leading tech companies to streamline their discovery process.`,
      downloadCount: 5678,
      pages: 24,
      fileSize: "4.1 MB",
      format: "Figma + PDF",
      image: "https://images.unsplash.com/photo-1473754964246-70d746d9af90",
      alt: "Product discovery canvas templates laid out showing user journey mapping and strategic planning tools",
      tags: ["Product Management", "Templates", "Strategy"],
      featured: true,
      premium: false
    },
    {
      id: 7,
      title: "UX Research Plan Templates",
      description: `Ready-to-use research plan templates covering usability testing, user interviews, surveys, and analytics setup.\n\nIncludes sample scripts, consent forms, and analysis frameworks.`,
      downloadCount: 3892,
      pages: 18,
      fileSize: "1.9 MB",
      format: "DOC + PDF",
      image: "https://images.unsplash.com/photo-1527219525722-f9767a7f2884",
      alt: "UX research documentation and templates spread across desk with user interview notes",
      tags: ["UX Research", "Templates", "User Testing"],
      featured: false,
      premium: false
    }],

    toolkits: [
    {
      id: 8,
      title: "Performance Optimization Toolkit",
      description: `Complete toolkit for web performance optimization including automated testing scripts, monitoring dashboards, and optimization checklists.\n\nHelps achieve Core Web Vitals compliance and sub-second load times.`,
      downloadCount: 2756,
      pages: 42,
      fileSize: "8.3 MB",
      format: "ZIP",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      alt: "Web performance monitoring dashboard showing optimization metrics and speed analysis tools",
      tags: ["Performance", "Web Development", "Optimization"],
      featured: true,
      premium: true
    }]

  };

  const currentResources = resources?.[activeCategory] || [];

  const ResourceCard = ({ resource }) =>
  <div className="group card-elevated hover:shadow-strong transition-all duration-500 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
        src={resource?.image}
        alt={resource?.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {resource?.featured &&
        <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>Featured</span>
            </span>
        }
          {resource?.premium &&
        <span className="bg-warning text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Crown" size={12} />
              <span>Premium</span>
            </span>
        }
        </div>

        {/* Format */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
          {resource?.format}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300">
          {resource?.title}
        </h3>
        
        <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
          {resource?.description?.split('\n')?.[0]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource?.tags?.map((tag, index) =>
        <span
          key={index}
          className="bg-muted text-text-secondary px-2 py-1 rounded text-xs font-medium">

              {tag}
            </span>
        )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Icon name="Download" size={14} />
              <span>{resource?.downloadCount?.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="FileText" size={14} />
              <span>{resource?.pages} pages</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="HardDrive" size={14} />
              <span>{resource?.fileSize}</span>
            </span>
          </div>
        </div>

        {/* Download Button */}
        <Button
        variant={resource?.premium ? "default" : "outline"}
        fullWidth
        className="btn-magnetic"
        iconName="Download"
        iconPosition="left">

          {resource?.premium ? "Get Premium Access" : "Download Free"}
        </Button>
      </div>
    </div>;


  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Resource Library
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Access our comprehensive collection of frameworks, templates, and toolkits. 
            Everything you need to implement our methodologies in your own projects.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories?.map((category) =>
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                ${activeCategory === category?.id ?
            'bg-primary text-white shadow-md' :
            'bg-card text-text-secondary hover:bg-primary/10 hover:text-primary'}
              `
            }>

              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {category?.count}
              </span>
            </button>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentResources?.map((resource) =>
          <ResourceCard key={resource?.id} resource={resource} />
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <h3 className="text-2xl font-semibold text-text-primary mb-4">
            Want Access to Premium Resources?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Join our exclusive community to get access to premium frameworks, 
            advanced toolkits, and direct consultation with our experts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="default"
              size="lg"
              className="btn-magnetic"
              iconName="Crown"
              iconPosition="left">

              Get Premium Access
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-magnetic"
              iconName="MessageCircle"
              iconPosition="left">

              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default ResourceLibrary;