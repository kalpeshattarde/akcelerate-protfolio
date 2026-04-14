'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

interface CapabilityCardProps {
  capability: Capability;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CapabilityCard({ capability, isSelected, onSelect }: CapabilityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const expertiseColors = {
    mastery: 'text-primary border-primary/30 bg-primary/5',
    advanced: 'text-secondary border-secondary/30 bg-secondary/5',
    proficient: 'text-accent border-accent/30 bg-accent/5'
  };

  return (
    <div
      className={`group relative bg-surface border border-border rounded-lg overflow-hidden transition-all duration-500 ${
        isSelected ? 'shadow-dramatic' : 'hover:shadow-subtle'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={capability.image}
          alt={capability.alt}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
        
        {/* Expertise Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-block px-3 py-1 border rounded-full font-cta text-xs font-medium ${expertiseColors[capability.expertise]}`}>
            {capability.expertise.charAt(0).toUpperCase() + capability.expertise.slice(1)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <p className="font-cta text-xs text-text-secondary uppercase tracking-wider mb-2">
            {capability.subtitle}
          </p>
          <h3 className="font-headline text-2xl font-bold text-foreground mb-3">
            {capability.title}
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {capability.description}
          </p>
        </div>

        {/* Quick Info */}
        <div className="flex items-center gap-6 mb-4 pb-4 border-b border-border">
          <div>
            <p className="font-cta text-xs text-text-secondary mb-1">Timeline</p>
            <p className="font-body text-sm text-foreground font-medium">{capability.timeline}</p>
          </div>
          <div>
            <p className="font-cta text-xs text-text-secondary mb-1">Investment</p>
            <p className="font-body text-sm text-foreground font-medium">{capability.investment}</p>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={onSelect}
          className="w-full flex items-center justify-between py-3 px-4 bg-muted/50 hover:bg-muted rounded-md transition-colors duration-300"
        >
          <span className="font-cta text-sm font-medium text-foreground">
            {isSelected ? 'Hide Details' : 'View Process & Deliverables'}
          </span>
          <Icon
            name="ChevronDownIcon"
            size={20}
            className={`text-primary transition-transform duration-300 ${
              isSelected ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        {/* Expanded Details */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isSelected ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          {/* Process */}
          <div className="mb-6">
            <h4 className="font-headline text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="CogIcon" size={20} className="text-primary" />
              Our Process
            </h4>
            <ul className="space-y-2">
              {capability.process.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-full font-cta text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <span className="font-body text-sm text-text-secondary pt-0.5">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="mb-6">
            <h4 className="font-headline text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Icon name="DocumentCheckIcon" size={20} className="text-primary" />
              Deliverables
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {capability.deliverables.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={16} className="text-success flex-shrink-0" />
                  <span className="font-body text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Case Studies */}
          {capability.caseStudies.length > 0 && (
            <div>
              <h4 className="font-headline text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Icon name="SparklesIcon" size={20} className="text-primary" />
                Related Work
              </h4>
              <div className="flex flex-wrap gap-2">
                {capability.caseStudies.map((study, index) => (
                  <a
                    key={index}
                    href="/work-portfolio"
                    className="px-3 py-1.5 bg-surface border border-border rounded-md font-cta text-xs text-foreground hover:text-primary hover:border-primary/30 transition-colors duration-300"
                  >
                    {study}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}