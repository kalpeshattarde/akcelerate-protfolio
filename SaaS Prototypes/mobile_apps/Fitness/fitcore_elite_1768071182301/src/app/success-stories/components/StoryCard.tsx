import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import BeforeAfterSlider from './BeforeAfterSlider';

interface StoryCardProps {
  story: {
    id: number;
    name: string;
    age: number;
    transformationType: string;
    timeline: string;
    beforeImage: string;
    afterImage: string;
    beforeAlt: string;
    afterAlt: string;
    profileImage: string;
    profileAlt: string;
    quote: string;
    achievements: string[];
    metrics: {
      label: string;
      before: string;
      after: string;
      improvement: string;
    }[];
    trainer: string;
    program: string;
  };
  onShare: (storyId: number) => void;
  onViewDetails: (storyId: number) => void;
}

const StoryCard = ({ story, onShare, onViewDetails }: StoryCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      {/* Before/After Slider */}
      <div className="relative flex-shrink-0">
        <BeforeAfterSlider
          beforeImage={story.beforeImage}
          afterImage={story.afterImage}
          beforeAlt={story.beforeAlt}
          afterAlt={story.afterAlt}
          className="h-48 sm:h-56 lg:h-64"
        />
        
        {/* Transformation Badge */}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold max-w-[calc(100%-6rem)] overflow-hidden">
          <span className="block truncate">{story.transformationType}</span>
        </div>
        
        {/* Timeline Badge */}
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium border border-border max-w-24 overflow-hidden">
          <span className="block truncate">{story.timeline}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Profile Section */}
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
            <AppImage
              src={story.profileImage}
              alt={story.profileAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-foreground break-words overflow-wrap-anywhere">
              {story.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground break-words overflow-wrap-anywhere">
              Age {story.age} • {story.program}
            </p>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-muted-foreground italic mb-3 sm:mb-4 border-l-4 border-primary/20 pl-3 sm:pl-4 text-sm sm:text-base break-words overflow-wrap-anywhere line-clamp-3">
          "{story.quote}"
        </blockquote>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {story.metrics.slice(0, 4).map((metric, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-2 sm:p-3 text-center min-w-0">
              <div className="text-xs text-muted-foreground mb-1 break-words overflow-wrap-anywhere">
                {metric.label}
              </div>
              <div className="flex items-center justify-center space-x-1 sm:space-x-2 min-w-0">
                <span className="text-xs sm:text-sm font-mono text-muted-foreground break-words overflow-wrap-anywhere flex-shrink min-w-0">
                  {metric.before}
                </span>
                <Icon name="ArrowRightIcon" size={10} className="text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-mono font-semibold text-foreground break-words overflow-wrap-anywhere flex-shrink min-w-0">
                  {metric.after}
                </span>
              </div>
              <div className="text-xs text-primary font-semibold mt-1 break-words overflow-wrap-anywhere">
                {metric.improvement}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-3 sm:mb-4 flex-grow">
          <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2">
            Key Achievements
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {story.achievements.slice(0, 3).map((achievement, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium max-w-full"
              >
                <Icon name="CheckIcon" size={10} className="mr-1 flex-shrink-0" />
                <span className="break-words overflow-wrap-anywhere">{achievement}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Trainer Info */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 min-w-0">
          <div className="flex items-center space-x-2 min-w-0">
            <Icon name="UserIcon" size={14} className="flex-shrink-0" />
            <span className="break-words overflow-wrap-anywhere">Trainer: {story.trainer}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 pt-3 sm:pt-4 border-t border-border mt-auto">
          <button
            onClick={() => onViewDetails(story.id)}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 text-xs sm:text-sm"
          >
            <Icon name="EyeIcon" size={14} />
            <span className="break-words">View Full Story</span>
          </button>
          
          <button
            onClick={() => onShare(story.id)}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
          >
            <Icon name="ShareIcon" size={14} />
            <span className="break-words">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;