import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedArticles = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
  { id: 'all', label: 'All Articles', count: 150 },
  { id: 'technology', label: 'Technology', count: 42 },
  { id: 'design', label: 'Design', count: 38 },
  { id: 'innovation', label: 'Innovation', count: 35 },
  { id: 'case-studies', label: 'Case Studies', count: 29 }];


  const articles = [
  {
    id: 1,
    title: "The Psychology of Micro-Interactions: How Small Details Create Big Impact",
    excerpt: `Exploring how thoughtful micro-interactions can transform user experience from functional to delightful.\n\nWe dive deep into the cognitive science behind user engagement and demonstrate practical implementation strategies that have increased user retention by 340% across our client projects.`,
    category: "design",
    readTime: 8,
    publishDate: "2024-10-28",
    author: {
      name: "Sarah Chen",
      role: "UX Research Director",
      avatar: "https://images.unsplash.com/photo-1646041805292-fd77781436f9",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair wearing navy blazer"
    },
    image: "https://images.unsplash.com/photo-1571101628768-6bae026844b6",
    alt: "Close-up view of designer\'s hands creating interactive prototypes on tablet with stylus and design elements",
    tags: ["UX Design", "Psychology", "Micro-interactions"],
    featured: true,
    interactive: true
  },
  {
    id: 2,
    title: "Building Sustainable AI: Ethical Frameworks for Responsible Innovation",
    excerpt: `A comprehensive guide to implementing ethical AI practices that prioritize human welfare while maintaining competitive advantage.\n\nThis whitepaper presents our proprietary framework used by Fortune 500 companies to audit and improve their AI systems.`,
    category: "technology",
    readTime: 12,
    publishDate: "2024-10-25",
    author: {
      name: "Dr. Marcus Rodriguez",
      role: "AI Ethics Lead",
      avatar: "https://images.unsplash.com/photo-1713946598186-8e28275719b9",
      avatarAlt: "Professional portrait of Hispanic man with beard wearing dark suit and glasses"
    },
    image: "https://images.unsplash.com/photo-1706697420556-232ec4e5d181",
    alt: "Futuristic AI interface showing ethical decision trees and human-centered design principles",
    tags: ["AI Ethics", "Sustainability", "Innovation"],
    featured: true,
    downloadable: true
  },
  {
    id: 3,
    title: "Case Study: Transforming Healthcare Through Empathetic Technology",
    excerpt: `How we redesigned a patient management system to reduce administrative burden by 60% while improving patient satisfaction scores.\n\nA deep dive into our human-centered design process and the measurable impact on both healthcare providers and patients.`,
    category: "case-studies",
    readTime: 15,
    publishDate: "2024-10-22",
    author: {
      name: "Elena Vasquez",
      role: "Healthcare Innovation Lead",
      avatar: "https://images.unsplash.com/photo-1592041828835-4216e6af4a78",
      avatarAlt: "Professional headshot of Latina woman with curly hair wearing white medical coat"
    },
    image: "https://images.unsplash.com/photo-1630548862870-f77276c93f33",
    alt: "Healthcare professional using modern tablet interface in hospital setting with patient care dashboard",
    tags: ["Healthcare", "Case Study", "UX Design"],
    featured: true,
    videoContent: true
  },
  {
    id: 4,
    title: "The Future of Web Performance: Beyond Core Web Vitals",
    excerpt: `Exploring next-generation performance metrics and optimization strategies that go beyond traditional measurements.\n\nLearn about our proprietary performance monitoring system that has helped clients achieve 99.9% uptime and sub-second load times.`,
    category: "technology",
    readTime: 10,
    publishDate: "2024-10-20",
    author: {
      name: "Alex Thompson",
      role: "Performance Engineering Lead",
      avatar: "https://images.unsplash.com/photo-1548778797-7d8cf3eefd24",
      avatarAlt: "Professional portrait of Caucasian man with beard wearing casual button-up shirt"
    },
    image: "https://images.unsplash.com/photo-1651990892631-723da6447d7d",
    alt: "Multiple computer monitors displaying web performance analytics and optimization dashboards",
    tags: ["Performance", "Web Development", "Optimization"],
    featured: false,
    liveDemo: true
  },
  {
    id: 5,
    title: "Designing for Accessibility: Beyond Compliance to True Inclusion",
    excerpt: `Moving beyond WCAG guidelines to create genuinely inclusive digital experiences that serve all users.\n\nOur comprehensive approach has helped clients expand their addressable market by 25% while improving overall user satisfaction.`,
    category: "design",
    readTime: 9,
    publishDate: "2024-10-18",
    author: {
      name: "Jordan Kim",
      role: "Accessibility Design Lead",
      avatar: "https://images.unsplash.com/photo-1503087065990-e2ef69dc88b4",
      avatarAlt: "Professional headshot of Asian man with short black hair wearing navy blue sweater"
    },
    image: "https://images.unsplash.com/photo-1565687999932-cf35bd872e77",
    alt: "Person using assistive technology to navigate accessible website interface on computer screen",
    tags: ["Accessibility", "Inclusive Design", "UX"],
    featured: false,
    interactive: true
  },
  {
    id: 6,
    title: "Innovation Lab: Prototyping the Next Generation of Digital Experiences",
    excerpt: `Inside our innovation lab where we experiment with emerging technologies to create tomorrow's digital experiences.\n\nGet exclusive access to our latest prototypes and research findings that are shaping the future of human-computer interaction.`,
    category: "innovation",
    readTime: 7,
    publishDate: "2024-10-15",
    author: {
      name: "Dr. Priya Patel",
      role: "Innovation Research Director",
      avatar: "https://images.unsplash.com/photo-1619734174708-709be4bd4153",
      avatarAlt: "Professional portrait of Indian woman with long dark hair wearing business attire"
    },
    image: "https://images.unsplash.com/photo-1685431967329-297f5544ef57",
    alt: "Modern innovation lab with researchers testing VR headsets and interactive prototypes",
    tags: ["Innovation", "Prototyping", "Research"],
    featured: false,
    betaAccess: true
  }];


  const filteredArticles = activeFilter === 'all' ?
  articles :
  articles?.filter((article) => article?.category === activeFilter);

  const featuredArticles = articles?.filter((article) => article?.featured);
  const regularArticles = filteredArticles?.filter((article) => !article?.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const ArticleCard = ({ article, featured = false }) =>
  <article className={`group card-elevated hover:shadow-strong transition-all duration-500 overflow-hidden ${featured ? 'md:col-span-2' : ''}`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
        <Image
        src={article?.image}
        alt={article?.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Content Type Badges */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {article?.interactive &&
        <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="MousePointer" size={12} />
              <span>Interactive</span>
            </span>
        }
          {article?.downloadable &&
        <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>Download</span>
            </span>
        }
          {article?.videoContent &&
        <span className="bg-trust text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Play" size={12} />
              <span>Video</span>
            </span>
        }
          {article?.liveDemo &&
        <span className="bg-secondary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Monitor" size={12} />
              <span>Demo</span>
            </span>
        }
          {article?.betaAccess &&
        <span className="bg-warning text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Icon name="Zap" size={12} />
              <span>Beta</span>
            </span>
        }
        </div>

        {/* Reading Time */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
          <Icon name="Clock" size={12} />
          <span>{article?.readTime} min read</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
          <span className="capitalize font-medium text-primary">{article?.category?.replace('-', ' ')}</span>
          <span>{formatDate(article?.publishDate)}</span>
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300 ${featured ? 'text-xl' : 'text-lg'}`}>
          {article?.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
          {article?.excerpt?.split('\n')?.[0]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article?.tags?.map((tag, index) =>
        <span
          key={index}
          className="bg-muted text-text-secondary px-2 py-1 rounded text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200">

              {tag}
            </span>
        )}
        </div>

        {/* Author & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
            src={article?.author?.avatar}
            alt={article?.author?.avatarAlt}
            className="w-8 h-8 rounded-full object-cover" />

            <div>
              <div className="text-sm font-medium text-text-primary">{article?.author?.name}</div>
              <div className="text-xs text-text-secondary">{article?.author?.role}</div>
            </div>
          </div>
          <Icon
          name="ArrowRight"
          size={16}
          className="text-primary group-hover:translate-x-1 transition-transform duration-300" />

        </div>
      </div>
    </article>;


  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Featured Articles & Insights
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Dive deep into our latest thinking on technology, design, and innovation. 
            Each piece is crafted to provide actionable insights and inspire meaningful change.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters?.map((filter) =>
          <button
            key={filter?.id}
            onClick={() => setActiveFilter(filter?.id)}
            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeFilter === filter?.id ?
            'bg-primary text-white shadow-md' :
            'bg-background text-text-secondary hover:bg-primary/10 hover:text-primary'}
              `
            }>

              {filter?.label} ({filter?.count})
            </button>
          )}
        </div>

        {/* Featured Articles */}
        {activeFilter === 'all' &&
        <div className="mb-16">
            <h3 className="text-2xl font-semibold text-text-primary mb-8 flex items-center">
              <Icon name="Star" size={20} className="text-accent mr-2" />
              Featured Content
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles?.map((article) =>
            <ArticleCard key={article?.id} article={article} featured />
            )}
            </div>
          </div>
        }

        {/* Regular Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles?.map((article) =>
          <ArticleCard key={article?.id} article={article} />
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="btn-magnetic"
            iconName="RefreshCw"
            iconPosition="left">

            Load More Articles
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedArticles;