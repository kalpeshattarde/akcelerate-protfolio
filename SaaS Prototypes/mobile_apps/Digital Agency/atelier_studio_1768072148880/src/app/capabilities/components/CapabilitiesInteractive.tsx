'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import HeroSection from './HeroSection';
import CapabilityCard from './CapabilityCard';
import ProcessVisualization from './ProcessVisualization';
import TechnologyStack from './TechnologyStack';
import InquiryForm from './InquiryForm';
import Footer from './Footer';

interface Capability {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  expertise: 'mastery' | 'advanced' | 'proficient';
  process: string[];
  deliverables: string[];
  timeline: string;
  investment: string;
  image: string;
  alt: string;
  caseStudies: string[];
}

export default function CapabilitiesInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'mastery' | 'advanced' | 'proficient'>('all');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const capabilities: Capability[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity & Strategy',
    subtitle: 'Foundational Craft',
    description: 'We architect brand systems that transcend visual identity, creating cohesive narratives that resonate across every touchpoint. Our approach combines strategic positioning with artistic expression, ensuring your brand communicates with clarity and distinction.',
    expertise: 'mastery',
    process: [
    'Brand Discovery & Audit',
    'Strategic Positioning',
    'Visual Language Development',
    'Brand Guidelines Creation',
    'Implementation Strategy'],

    deliverables: [
    'Brand Strategy Document',
    'Visual Identity System',
    'Typography & Color Palette',
    'Brand Guidelines',
    'Asset Library'],

    timeline: '8-12 weeks',
    investment: '$45,000 - $85,000',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c61aa094-1764679321957.png",
    alt: 'Modern minimalist brand identity design with geometric shapes and warm amber accents on dark background',
    caseStudies: ['Luxury Fashion Rebrand', 'Tech Startup Identity']
  },
  {
    id: 'digital-experience',
    title: 'Digital Experience Design',
    subtitle: 'Interactive Mastery',
    description: 'We craft digital experiences that marry aesthetic sophistication with intuitive functionality. Every interaction is purposeful, every animation serves the narrative, creating journeys that engage and inspire.',
    expertise: 'mastery',
    process: [
    'User Research & Analysis',
    'Information Architecture',
    'Interaction Design',
    'Visual Design System',
    'Prototyping & Testing'],

    deliverables: [
    'UX Strategy Document',
    'Wireframes & User Flows',
    'High-Fidelity Designs',
    'Interactive Prototypes',
    'Design System'],

    timeline: '10-16 weeks',
    investment: '$65,000 - $120,000',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19952ca4d-1765315317496.png",
    alt: 'Sleek digital interface design showcasing modern UX patterns with copper gradient accents and sophisticated typography',
    caseStudies: ['E-commerce Platform', 'Cultural Institution Portal']
  },
  {
    id: 'web-development',
    title: 'Web Development & Engineering',
    subtitle: 'Technical Excellence',
    description: 'Our development philosophy prioritizes performance, accessibility, and maintainability. We build with modern frameworks and best practices, ensuring your digital presence is both beautiful and robust.',
    expertise: 'mastery',
    process: [
    'Technical Architecture',
    'Frontend Development',
    'Backend Integration',
    'Performance Optimization',
    'Quality Assurance'],

    deliverables: [
    'Production-Ready Code',
    'CMS Integration',
    'API Development',
    'Performance Reports',
    'Documentation'],

    timeline: '12-20 weeks',
    investment: '$75,000 - $150,000',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12225c17b-1765211045033.png",
    alt: 'Clean code editor displaying modern web development with TypeScript and React components on dark theme',
    caseStudies: ['Agency Website', 'SaaS Platform']
  },
  {
    id: 'motion-design',
    title: 'Motion Design & Animation',
    subtitle: 'Kinetic Storytelling',
    description: 'Motion breathes life into static designs. We create animations that guide attention, communicate hierarchy, and add layers of meaning to your digital experiences through thoughtful choreography.',
    expertise: 'advanced',
    process: [
    'Motion Strategy',
    'Storyboarding',
    'Animation Development',
    'Sound Design Integration',
    'Implementation'],

    deliverables: [
    'Motion Guidelines',
    'Animated Assets',
    'Micro-interactions',
    'Video Content',
    'Implementation Code'],

    timeline: '6-10 weeks',
    investment: '$35,000 - $65,000',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1adf5f86d-1764655704801.png",
    alt: 'Dynamic motion graphics with flowing amber and copper gradients creating cinematic visual effects',
    caseStudies: ['Product Launch Campaign', 'Brand Film']
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy & Copywriting',
    subtitle: 'Narrative Architecture',
    description: 'Words shape perception. Our content strategists craft narratives that align with your brand voice, engage your audience, and drive meaningful action through thoughtful messaging.',
    expertise: 'advanced',
    process: [
    'Content Audit',
    'Voice & Tone Development',
    'Content Architecture',
    'Copywriting',
    'Editorial Guidelines'],

    deliverables: [
    'Content Strategy',
    'Voice & Tone Guide',
    'Website Copy',
    'Editorial Calendar',
    'SEO Optimization'],

    timeline: '6-8 weeks',
    investment: '$25,000 - $45,000',
    image: "https://images.unsplash.com/photo-1639153696879-e86e3a292685",
    alt: 'Elegant typography and written content displayed on vintage typewriter with warm lighting',
    caseStudies: ['Brand Messaging', 'Editorial Platform']
  },
  {
    id: '3d-visualization',
    title: '3D Visualization & CGI',
    subtitle: 'Dimensional Craft',
    description: 'We push beyond the constraints of photography, creating photorealistic 3D visualizations and abstract compositions that elevate product presentation and brand storytelling.',
    expertise: 'proficient',
    process: [
    'Concept Development',
    '3D Modeling',
    'Texturing & Lighting',
    'Rendering',
    'Post-Production'],

    deliverables: [
    '3D Models',
    'Rendered Images',
    'Animation Sequences',
    'Interactive 3D',
    'Asset Files'],

    timeline: '8-12 weeks',
    investment: '$40,000 - $80,000',
    image: "https://images.unsplash.com/photo-1727800922927-5680eb164ede",
    alt: 'Abstract 3D geometric shapes with metallic copper and gold materials floating in dark cinematic space',
    caseStudies: ['Product Visualization', 'Abstract Brand Film']
  }];


  const filteredCapabilities = activeFilter === 'all' ?
  capabilities :
  capabilities.filter((cap) => cap.expertise === activeFilter);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20" />
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection />

      {/* Capabilities Grid Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-16">
            <div>
              <h2 className="font-headline text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Our Disciplines
              </h2>
              <p className="font-body text-base text-text-secondary max-w-2xl">
                Each capability represents years of refinement, combining strategic thinking with artistic execution.
              </p>
            </div>

            <div className="flex gap-2">
              {(['all', 'mastery', 'advanced', 'proficient'] as const).map((filter) =>
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-cta text-sm font-medium rounded-md transition-all duration-300 ${
                activeFilter === filter ?
                'bg-primary text-primary-foreground' :
                'bg-surface text-text-secondary hover:text-foreground hover:bg-muted'}`
                }>

                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              )}
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCapabilities.map((capability) =>
            <CapabilityCard
              key={capability.id}
              capability={capability}
              isSelected={selectedCapability === capability.id}
              onSelect={() => setSelectedCapability(
                selectedCapability === capability.id ? null : capability.id
              )} />

            )}
          </div>
        </div>
      </section>

      <ProcessVisualization />
      <TechnologyStack />
      <InquiryForm />
      <Footer />
    </div>);

}