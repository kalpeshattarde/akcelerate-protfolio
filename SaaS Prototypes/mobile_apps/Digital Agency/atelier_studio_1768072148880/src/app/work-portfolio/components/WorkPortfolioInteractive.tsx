'use client';

import { useState, useEffect, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import FilterBar from './FilterBar';
import ProjectModal from './ProjectModal';
import Icon from '@/components/ui/AppIcon';

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  year: string;
  image: string;
  alt: string;
  tags: string[];
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    image: string;
    alt: string;
  };
  gallery: {
    image: string;
    alt: string;
  }[];
}

interface FilterState {
  category: string;
  industry: string;
  searchQuery: string;
}

const WorkPortfolioInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    industry: 'All',
    searchQuery: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Ethereal Luxury Redefined',
    client: 'Maison Lumière',
    category: 'Brand Experience',
    industry: 'Luxury Fashion',
    year: '2024',
    image: "https://images.unsplash.com/photo-1707376081814-bdba706c6f8e",
    alt: 'Elegant luxury fashion boutique interior with marble floors and gold accents',
    tags: ['E-commerce', 'Brand Identity', 'UX Design', 'Motion Design'],
    description: 'A transformative digital experience that elevated a heritage fashion house into the modern luxury landscape while preserving its timeless elegance.',
    fullDescription: 'Maison Lumière approached us with a vision to reimagine their digital presence for a new generation of luxury consumers. We crafted an immersive e-commerce platform that seamlessly blends editorial storytelling with sophisticated shopping experiences, creating a digital atelier that honors the brand\'s 150-year heritage while embracing contemporary innovation.',
    challenge: 'The brand needed to attract younger luxury consumers without alienating their established clientele. Their existing digital presence felt dated and failed to communicate the craftsmanship and exclusivity that defined their physical boutiques.',
    solution: 'We developed a cinematic digital experience featuring high-resolution product photography, behind-the-scenes craft videos, and an innovative virtual styling room. The platform uses subtle parallax scrolling and elegant micro-interactions to create a sense of luxury and attention to detail.',
    results: [
    { metric: 'Conversion Rate', value: '+156%' },
    { metric: 'Avg. Session Time', value: '8.5 min' },
    { metric: 'Mobile Revenue', value: '+240%' },
    { metric: 'Customer Satisfaction', value: '4.9/5' }],

    testimonial: {
      quote: 'Atelier Studio didn\'t just build us a website—they created a digital extension of our brand philosophy. The attention to detail and understanding of luxury consumer behavior is unparalleled.',
      author: 'Sophie Beaumont',
      role: 'Creative Director, Maison Lumière',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_13f238fa2-1763296134776.png",
      alt: 'Professional woman with blonde hair in elegant black blazer'
    },
    gallery: [
    { image: "https://images.unsplash.com/photo-1674822968853-e8cf0192a63b", alt: 'Luxury boutique interior with elegant displays' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_121081c5b-1764654995895.png", alt: 'Fashion model in designer clothing on runway' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1379d2420-1765462845749.png", alt: 'Close-up of luxury fashion accessories and jewelry' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_117d80a6e-1764682555973.png", alt: 'Elegant fashion photography with dramatic lighting' }]

  },
  {
    id: '2',
    title: 'Culinary Innovation Platform',
    client: 'Saveur Collective',
    category: 'Digital Product',
    industry: 'Food & Beverage',
    year: '2024',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b8dc3423-1765361597748.png",
    alt: 'Modern restaurant kitchen with chef preparing gourmet dishes',
    tags: ['Mobile App', 'Service Design', 'Social Platform', 'AI Integration'],
    description: 'An intelligent culinary platform connecting home chefs with professional techniques through AI-powered recipe adaptation and community-driven innovation.',
    fullDescription: 'Saveur Collective envisioned a platform that would democratize fine dining techniques while building a community of passionate food enthusiasts. We created an intelligent ecosystem that adapts professional recipes to home kitchens, provides real-time cooking guidance, and fosters meaningful connections between culinary creators.',
    challenge: 'Professional recipes often fail in home kitchens due to equipment limitations and ingredient availability. The client needed a solution that maintained culinary integrity while being accessible to home cooks of varying skill levels.',
    solution: 'We developed an AI-powered recipe adaptation engine that analyzes user equipment, dietary preferences, and skill level to customize professional recipes. The platform includes video tutorials, ingredient substitution suggestions, and a vibrant community where users share their culinary experiments.',
    results: [
    { metric: 'Active Users', value: '250K+' },
    { metric: 'Recipes Adapted', value: '1.2M' },
    { metric: 'Community Posts', value: '45K/mo' },
    { metric: 'App Rating', value: '4.8/5' }],

    testimonial: {
      quote: 'The platform has transformed how our community engages with fine dining. The AI adaptation is remarkably sophisticated, and the user experience feels effortless.',
      author: 'Marcus Chen',
      role: 'Founder & CEO, Saveur Collective',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1727ab9fc-1763292256189.png",
      alt: 'Asian male chef in professional kitchen uniform'
    },
    gallery: [
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c28c596d-1765057364490.png", alt: 'Professional chef preparing gourmet cuisine' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1044ce4e4-1765262213429.png", alt: 'Beautifully plated fine dining dish' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_16d3cc03e-1764754948174.png", alt: 'Fresh ingredients arranged on marble counter' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_10454ce9b-1764747414978.png", alt: 'Modern kitchen with professional cooking equipment' }]

  },
  {
    id: '3',
    title: 'Architectural Vision Showcase',
    client: 'Zenith Architecture',
    category: 'Portfolio Website',
    industry: 'Architecture',
    year: '2023',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd36698d-1765232258271.png",
    alt: 'Modern minimalist living room with floor-to-ceiling windows',
    tags: ['3D Visualization', 'WebGL', 'Portfolio', 'Interactive Design'],
    description: 'An immersive digital portfolio that showcases architectural excellence through interactive 3D models and cinematic project presentations.',
    fullDescription: 'Zenith Architecture needed a digital presence that matched the sophistication of their award-winning designs. We created an interactive portfolio platform featuring WebGL-powered 3D building explorations, allowing visitors to experience architectural spaces before they\'re built.',
    challenge: 'Traditional architectural portfolios fail to convey the spatial experience and design philosophy behind projects. The firm needed a way to communicate their vision beyond static images and floor plans.',
    solution: 'We developed a WebGL-based platform where visitors can explore 3D models of buildings, view projects from multiple perspectives, and understand design decisions through interactive annotations. The site features cinematic transitions and a sophisticated filtering system organized by project type and design philosophy.',
    results: [
    { metric: 'Client Inquiries', value: '+180%' },
    { metric: 'Avg. Engagement', value: '12 min' },
    { metric: 'Award Recognition', value: '3 Webby' },
    { metric: 'Industry Shares', value: '15K+' }],

    gallery: [
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1de8c5a1d-1765049759431.png", alt: 'Contemporary living space with natural lighting' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_17f864eec-1764718171737.png", alt: 'Modern architectural exterior at dusk' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a79bf646-1764689226963.png", alt: 'Minimalist interior design with designer furniture' },
    { image: "https://images.unsplash.com/photo-1725715077324-e6b1c78e3a86", alt: 'Architectural detail of modern building facade' }]

  },
  {
    id: '4',
    title: 'Wellness Revolution',
    client: 'Mindful Movement',
    category: 'Mobile Experience',
    industry: 'Health & Wellness',
    year: '2024',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_155a316f2-1765132774555.png",
    alt: 'Serene yoga studio with natural light and meditation space',
    tags: ['Health Tech', 'Wearable Integration', 'Personalization', 'Data Visualization'],
    description: 'A holistic wellness platform that combines mindfulness practices with biometric data to create personalized health journeys.',
    fullDescription: 'Mindful Movement sought to bridge the gap between ancient wellness practices and modern health technology. We created an intelligent platform that integrates with wearable devices to provide personalized meditation, yoga, and breathwork recommendations based on real-time biometric data.',
    challenge: 'Generic wellness apps fail to account for individual stress patterns and physiological responses. Users needed a solution that adapts to their unique wellness needs throughout the day.',
    solution: 'We developed a sophisticated algorithm that analyzes heart rate variability, sleep patterns, and activity levels to recommend optimal wellness practices. The app features guided sessions that adjust in real-time based on user response, creating a truly personalized experience.',
    results: [
    { metric: 'Daily Active Users', value: '180K' },
    { metric: 'Stress Reduction', value: '42%' },
    { metric: 'Session Completion', value: '89%' },
    { metric: 'User Retention', value: '76%' }],

    testimonial: {
      quote: 'This platform has revolutionized how we approach digital wellness. The integration of biometric data with mindfulness practices creates an experience that truly adapts to each individual.',
      author: 'Dr. Amara Patel',
      role: 'Chief Wellness Officer, Mindful Movement',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1299b7e54-1763296614902.png",
      alt: 'Professional woman with dark hair in medical attire'
    },
    gallery: [
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1534b8a05-1765118795540.png", alt: 'Peaceful meditation space with natural elements' },
    { image: "https://images.unsplash.com/photo-1554977929-0ed5ce8f1509", alt: 'Person practicing yoga in serene environment' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9e0c16d-1764676756614.png", alt: 'Wellness tracking device and health monitoring' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e8aa6e54-1764926873717.png", alt: 'Mindfulness practice in natural outdoor setting' }]

  },
  {
    id: '5',
    title: 'Financial Empowerment Hub',
    client: 'Prosperity Partners',
    category: 'Fintech Platform',
    industry: 'Financial Services',
    year: '2023',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13913910e-1764639852428.png",
    alt: 'Modern financial office with digital displays and data analytics',
    tags: ['Fintech', 'Data Visualization', 'Security', 'Accessibility'],
    description: 'A sophisticated wealth management platform that democratizes financial planning through intelligent automation and educational resources.',
    fullDescription: 'Prosperity Partners wanted to make professional-grade financial planning accessible to a broader audience. We created an intuitive platform that combines automated portfolio management with personalized financial education, empowering users to make informed investment decisions.',
    challenge: 'Traditional wealth management services are inaccessible to most people due to high minimum investments and complex interfaces. The client needed a solution that maintained professional-grade capabilities while being approachable for financial novices.',
    solution: 'We designed a progressive disclosure interface that reveals complexity gradually as users gain confidence. The platform features interactive financial simulations, goal-based planning tools, and AI-powered insights presented through elegant data visualizations.',
    results: [
    { metric: 'Assets Managed', value: '$2.4B' },
    { metric: 'User Growth', value: '+320%' },
    { metric: 'Financial Literacy', value: '+85%' },
    { metric: 'Platform Rating', value: '4.7/5' }],

    gallery: [
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cbf0802d-1764670183748.png", alt: 'Financial data visualization on modern displays' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1347fc095-1764670594817.png", alt: 'Professional financial planning consultation' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1265eb326-1765120169620.png", alt: 'Investment portfolio analysis on digital devices' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_125aaed75-1764676743248.png", alt: 'Modern fintech office environment' }]

  },
  {
    id: '6',
    title: 'Cultural Heritage Preservation',
    client: 'Museum of Tomorrow',
    category: 'Interactive Installation',
    industry: 'Arts & Culture',
    year: '2024',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ccde27d-1765262216953.png",
    alt: 'Museum visitor interacting with digital art installation',
    tags: ['AR/VR', 'Cultural Tech', 'Interactive Design', 'Education'],
    description: 'An immersive digital experience that brings historical artifacts to life through augmented reality and interactive storytelling.',
    fullDescription: 'The Museum of Tomorrow sought to engage younger audiences with historical collections through innovative technology. We created an AR-powered experience that allows visitors to interact with artifacts, view historical contexts, and explore stories behind cultural treasures.',
    challenge: 'Traditional museum experiences struggle to engage digital-native audiences. The institution needed to make historical artifacts relevant and exciting without compromising educational value or curatorial integrity.',
    solution: 'We developed a mobile AR application that overlays digital content onto physical exhibits. Visitors can see artifacts in their original contexts, interact with 3D reconstructions, and access multimedia stories through intuitive gesture controls.',
    results: [
    { metric: 'Visitor Engagement', value: '+210%' },
    { metric: 'Youth Visitors', value: '+165%' },
    { metric: 'Avg. Visit Time', value: '3.2 hrs' },
    { metric: 'Education Impact', value: '92%' }],

    testimonial: {
      quote: 'This project has transformed how we connect with visitors. The technology enhances rather than distracts from the artifacts, creating meaningful educational experiences.',
      author: 'Elena Rodriguez',
      role: 'Director of Digital Innovation, Museum of Tomorrow',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16d5f9a41-1763301212290.png",
      alt: 'Professional woman with glasses in museum setting'
    },
    gallery: [
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e5143093-1764762943498.png", alt: 'Interactive digital museum exhibit' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_12cf882e3-1765004959326.png", alt: 'Historical artifact with AR overlay' },
    { image: "https://images.unsplash.com/photo-1718099066109-81964e5df51f", alt: 'Modern museum interior with digital displays' },
    { image: "https://img.rocket.new/generatedImages/rocket_gen_img_1990f1fd5-1765955329849.png", alt: 'Visitors engaging with cultural technology' }]

  }];


  const categories = ['All', 'Brand Experience', 'Digital Product', 'Portfolio Website', 'Mobile Experience', 'Fintech Platform', 'Interactive Installation'];
  const industries = ['All', 'Luxury Fashion', 'Food & Beverage', 'Architecture', 'Health & Wellness', 'Financial Services', 'Arts & Culture'];

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesCategory = filters.category === 'All' || project.category === filters.category;
      const matchesIndustry = filters.industry === 'All' || project.industry === filters.industry;
      const matchesSearch = filters.searchQuery === '' ||
      project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      return matchesCategory && matchesIndustry && matchesSearch;
    });
  }, [filters, mockProjects]);

  const handleViewDetails = (id: string) => {
    const project = mockProjects.find((p) => p.id === id);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-20 bg-surface/50 animate-pulse" />
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) =>
            <div key={i} className="aspect-[4/3] bg-surface/50 rounded-lg animate-pulse" />
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-headline text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Crafted with
              <br />
              <span className="text-primary">Purpose & Precision</span>
            </h1>
            <p className="font-body text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Each project represents a unique collaboration where strategic thinking meets exceptional craft. Explore our curated collection of transformative digital experiences.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div>
              <div className="font-headline text-4xl font-bold text-primary mb-2">150+</div>
              <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">Projects Delivered</div>
            </div>
            <div>
              <div className="font-headline text-4xl font-bold text-primary mb-2">98%</div>
              <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">Client Satisfaction</div>
            </div>
            <div>
              <div className="font-headline text-4xl font-bold text-primary mb-2">45+</div>
              <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">Industry Awards</div>
            </div>
            <div>
              <div className="font-headline text-4xl font-bold text-primary mb-2">12</div>
              <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar
        categories={categories}
        industries={industries}
        onFilterChange={handleFilterChange}
      />

      {/* View Mode Toggle */}
      <div className="container mx-auto px-6 lg:px-12 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <p className="font-cta text-sm text-text-secondary">
            Showing <span className="text-primary font-semibold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-300 ${
              viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-text-secondary hover:bg-muted/50'}`
              }
              aria-label="Grid view">

              <Icon name="Squares2X2Icon" size={20} />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-md transition-all duration-300 ${
              viewMode === 'masonry' ? 'bg-primary text-primary-foreground' : 'bg-muted/30 text-text-secondary hover:bg-muted/50'}`
              }
              aria-label="Masonry view">

              <Icon name="Squares2X2Icon" size={20} className="rotate-45" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        {filteredProjects.length > 0 ?
        <div className={`grid gap-8 ${
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`
        }>
            {filteredProjects.map((project) =>
          <ProjectCard
            key={project.id}
            project={project}
            onViewDetails={handleViewDetails} />

          )}
          </div> :

        <div className="text-center py-20">
            <Icon name="MagnifyingGlassIcon" size={64} className="mx-auto text-text-secondary/30 mb-6" />
            <h3 className="font-headline text-2xl font-bold text-foreground mb-3">
              No Projects Found
            </h3>
            <p className="font-body text-text-secondary mb-6">
              Try adjusting your filters or search query to discover more work.
            </p>
            <button
            onClick={() => setFilters({ category: 'All', industry: 'All', searchQuery: '' })}
            className="px-6 py-3 bg-primary text-primary-foreground font-cta font-semibold text-sm rounded-md hover:bg-primary/90 transition-all duration-300">

              Clear All Filters
            </button>
          </div>
        }
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 lg:px-12 py-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 border border-primary/20 p-12 lg:p-16">
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Create Something Exceptional?
            </h2>
            <p className="font-body text-lg text-text-secondary mb-8 leading-relaxed">
              Let&apos;s discuss how we can bring your vision to life with the same dedication and craft you see in our portfolio.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-cta font-semibold text-base rounded-md hover:bg-primary/90 hover:-translate-y-1 hover:shadow-dramatic transition-all duration-300">

              Start a Conversation
              <Icon name="ArrowRightIcon" size={20} />
            </a>
          </div>
          
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute inset-0 bg-gradient-to-l from-primary to-transparent" />
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </div>);

};

export default WorkPortfolioInteractive;