import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CourseCardProps {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  thumbnailAlt: string;
  lastAccessed: string;
  duration: string;
}

const CourseCard = ({ 
  id, 
  title, 
  instructor, 
  progress, 
  thumbnail, 
  thumbnailAlt,
  lastAccessed, 
  duration 
}: CourseCardProps) => {
  return (
    <Link href="/course-detail" className="group">
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <AppImage 
            src={thumbnail}
            alt={thumbnailAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <Icon name="ClockIcon" size={14} className="text-muted-foreground" />
            <span className="text-xs font-body font-medium text-foreground">{duration}</span>
          </div>
        </div>
        
        <div className="p-5">
          <h4 className="text-lg font-headline font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground font-body mb-4">{instructor}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-body">Progress</span>
              <span className="text-foreground font-body font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground font-body">Last accessed {lastAccessed}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;