'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Award {
  id: number;
  title: string;
  organization: string;
  year: number;
  category: string;
  description: string;
  icon: string;
}

interface AwardCardProps {
  award: Award;
}

const AwardCard = ({ award }: AwardCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-surface/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-surface/80 transition-all duration-500 hover:shadow-dramatic">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name={award.icon as any} size={24} className="text-primary" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-cta font-semibold rounded-full">
                {award.year}
              </span>
            </div>
          </div>
          
          <h3 className="font-headline text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {award.title}
          </h3>
          
          <p className="font-body text-sm text-text-secondary mb-2">
            {award.organization}
          </p>
          
          <span className="inline-block px-3 py-1 bg-muted/50 text-text-secondary text-xs font-cta rounded-full">
            {award.category}
          </span>
          
          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              {award.description}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/20 transition-all duration-300"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          <Icon 
            name="ChevronDownIcon" 
            size={20} 
            className={`text-text-secondary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default AwardCard;