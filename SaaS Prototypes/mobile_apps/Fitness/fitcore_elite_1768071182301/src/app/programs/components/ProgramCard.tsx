import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProgramCardProps {
  program: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    alt: string;
    level: string;
    duration: string;
    sessions: number;
    equipment: string[];
    highlights: string[];
    color: string;
    category: 'strength' | 'cardio' | 'hybrid';
  };
}

const ProgramCard = ({ program }: ProgramCardProps) => {
  const levelColors = {
    'Beginner': 'text-green-400 bg-green-400/10',
    'Intermediate': 'text-yellow-400 bg-yellow-400/10',
    'Advanced': 'text-red-400 bg-red-400/10',
    'Elite': 'text-primary bg-primary/10'
  };

  const categoryIcons = {
    strength: 'FireIcon',
    cardio: 'BoltIcon',
    hybrid: 'StarIcon'
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={program.image}
          alt={program.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-${program.color}/30`}>
            <Icon name={categoryIcons[program.category] as any} size={16} className={`text-${program.color}`} />
            <span className={`text-sm font-semibold text-${program.color}`}>{program.category.toUpperCase()}</span>
          </div>
        </div>

        {/* Level Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${levelColors[program.level as keyof typeof levelColors] || levelColors.Beginner}`}>
            {program.level}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {program.title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">{program.subtitle}</p>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {program.description}
        </p>

        {/* Program Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="ClockIcon" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">{program.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CalendarIcon" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">{program.sessions} Sessions</span>
          </div>
        </div>

        {/* Equipment Tags */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-2 font-semibold">EQUIPMENT REQUIRED</p>
          <div className="flex flex-wrap gap-2">
            {program.equipment.slice(0, 3).map((item, index) => (
              <span key={index} className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md font-mono">
                {item}
              </span>
            ))}
            {program.equipment.length > 3 && (
              <span className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md font-mono">
                +{program.equipment.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-3 font-semibold">PROGRAM HIGHLIGHTS</p>
          <div className="space-y-2">
            {program.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={14} className="text-primary flex-shrink-0" />
                <span className="text-xs text-muted-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/programs/${program.id}`}
          className="block w-full py-3 bg-primary text-primary-foreground text-center font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          Explore Program
        </Link>
      </div>
    </div>
  );
};

export default ProgramCard;