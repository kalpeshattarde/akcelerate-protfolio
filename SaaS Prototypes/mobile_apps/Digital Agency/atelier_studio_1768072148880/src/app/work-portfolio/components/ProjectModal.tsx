'use client';

import { useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProjectModalProps {
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
  } | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose, isHydrated]);

  if (!isHydrated || !project) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-[20px] p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-surface border border-border rounded-lg shadow-dramatic my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-primary hover:bg-background transition-all duration-300"
          aria-label="Close modal"
        >
          <Icon name="XMarkIcon" size={24} />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-t-lg">
          <AppImage
            src={project.image}
            alt={project.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1.5 bg-accent/20 text-accent font-cta text-xs font-semibold uppercase tracking-wider rounded-md">
                {project.category}
              </span>
              <span className="px-3 py-1.5 bg-muted/50 text-text-secondary font-cta text-xs font-semibold uppercase tracking-wider rounded-md">
                {project.industry}
              </span>
              <span className="font-mono text-xs text-text-secondary ml-auto">
                {project.year}
              </span>
            </div>

            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-foreground mb-3">
              {project.title}
            </h2>
            <p className="font-cta text-lg text-primary uppercase tracking-wider">
              {project.client}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="font-body text-base text-text-secondary leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-headline text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="ExclamationTriangleIcon" size={20} className="text-warning" />
                The Challenge
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="LightBulbIcon" size={20} className="text-success" />
                Our Solution
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8 p-6 bg-muted/30 border border-border/30 rounded-lg">
            <h3 className="font-headline text-2xl font-bold text-foreground mb-6">
              Results That Matter
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {project.results.map((result, index) => (
                <div key={index} className="text-center">
                  <div className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {result.value}
                  </div>
                  <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <div className="mb-8">
              <h3 className="font-headline text-2xl font-bold text-foreground mb-6">
                Project Gallery
              </h3>
              
              {/* Main Gallery Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                <AppImage
                  src={project.gallery[selectedGalleryIndex].image}
                  alt={project.gallery[selectedGalleryIndex].alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {project.gallery.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedGalleryIndex(index)}
                    className={`relative aspect-video overflow-hidden rounded-md transition-all duration-300 ${
                      selectedGalleryIndex === index
                        ? 'ring-2 ring-primary scale-105' :'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <AppImage
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={project.testimonial.image}
                    alt={project.testimonial.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Icon name="ChatBubbleLeftIcon" size={24} className="text-primary mb-3" />
                  <p className="font-body text-base text-foreground leading-relaxed mb-4 italic">
                    &quot;{project.testimonial.quote}&quot;
                  </p>
                  <div>
                    <div className="font-cta text-sm font-semibold text-foreground">
                      {project.testimonial.author}
                    </div>
                    <div className="font-cta text-xs text-text-secondary">
                      {project.testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-border/30">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-muted/50 text-text-secondary font-cta text-xs rounded-md hover:bg-muted transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;