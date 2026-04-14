import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Certification {
  name: string;
  organization: string;
  year: number;
}

interface Specialization {
  name: string;
  level: 'Expert' | 'Advanced' | 'Specialist';
}

interface Trainer {
  id: number;
  name: string;
  title: string;
  image: string;
  alt: string;
  experience: number;
  specializations: Specialization[];
  certifications: Certification[];
  rating: number;
  clientCount: number;
  bio: string;
  availability: 'Available' | 'Busy' | 'Booked';
  hourlyRate: number;
  videoIntro?: string;
}

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard = ({ trainer }: TrainerCardProps) => {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-success bg-success/10 border-success/20';
      case 'Busy':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'Booked':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getSpecializationColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'Advanced':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'Specialist':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  return (
    <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-neon transition-all duration-300 hover:scale-105">
      {/* Header Section */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-border group-hover:border-primary/30 transition-colors duration-300">
            <AppImage
              src={trainer.image}
              alt={trainer.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-lg text-xs font-medium border ${getAvailabilityColor(trainer.availability)}`}>
            {trainer.availability}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {trainer.name}
          </h3>
          <p className="text-muted-foreground font-medium mb-2">{trainer.title}</p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="StarIcon" size={16} className="text-warning" />
              <span className="text-foreground font-medium">{trainer.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="UserGroupIcon" size={16} />
              <span>{trainer.clientCount} clients</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="ClockIcon" size={16} />
              <span>{trainer.experience}+ years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Specializations</h4>
        <div className="flex flex-wrap gap-2">
          {trainer.specializations.map((spec, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-lg text-xs font-medium border ${getSpecializationColor(spec.level)}`}
            >
              {spec.name}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {trainer.bio}
        </p>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Key Certifications</h4>
        <div className="space-y-2">
          {trainer.certifications.slice(0, 2).map((cert, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-foreground font-medium">{cert.name}</span>
              <span className="text-muted-foreground">{cert.organization} • {cert.year}</span>
            </div>
          ))}
          {trainer.certifications.length > 2 && (
            <p className="text-xs text-muted-foreground">
              +{trainer.certifications.length - 2} more certifications
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-sm">
          <span className="text-muted-foreground">Starting at </span>
          <span className="text-foreground font-bold">${trainer.hourlyRate}/hour</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {trainer.videoIntro && (
            <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Icon name="PlayIcon" size={16} />
            </button>
          )}
          <Link
            href={`/trainers/${trainer.id}`}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;