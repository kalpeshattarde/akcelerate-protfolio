'use client';

import { useState } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProjectCardProps {
  project: {
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
    results: {
      metric: string;
      value: string;
    }[];
  };
  onViewDetails: (id: string) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-surface border border-border/50 transition-all duration-500 hover:border-primary/30 hover:shadow-dramatic cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(project.id)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <AppImage
          src={project.image}
          alt={project.alt}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-90' : 'opacity-70'
        }`} />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-md">
          <span className="font-cta text-xs font-semibold text-accent-foreground uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        {/* View Details Button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-cta font-semibold text-sm rounded-md hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">
            View Case Study
            <Icon name="ArrowRightIcon" size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Client & Year */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-cta text-xs font-medium text-text-secondary uppercase tracking-wider">
            {project.client}
          </span>
          <span className="font-mono text-xs text-text-secondary">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-muted/50 text-text-secondary font-cta text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Results Preview */}
        {project.results.length > 0 && (
          <div className="pt-4 border-t border-border/30">
            <div className="grid grid-cols-2 gap-4">
              {project.results.slice(0, 2).map((result, index) => (
                <div key={index}>
                  <div className="font-headline text-2xl font-bold text-primary mb-1">
                    {result.value}
                  </div>
                  <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;