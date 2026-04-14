import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  metric?: string;
  icon: string;
}

interface ProgressTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const ProgressTimeline = ({ events, className = '' }: ProgressTimelineProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative flex items-start space-x-4">
            {/* Timeline Dot */}
            <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Icon 
                name={event.icon as any} 
                size={20} 
                className="text-primary-foreground" 
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 pb-8">
              <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {event.title}
                  </h4>
                  <span className="text-sm text-muted-foreground font-mono">
                    {event.date}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-3">
                  {event.description}
                </p>
                
                {event.metric && (
                  <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    <Icon name="TrophyIcon" size={16} className="mr-2" />
                    {event.metric}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTimeline;