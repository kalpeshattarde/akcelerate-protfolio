import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface UpcomingSessionCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  instructor: string;
}

const UpcomingSessionCard = ({ 
  title, 
  date, 
  time, 
  type, 
  instructor 
}: UpcomingSessionCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 border border-border hover:border-primary transition-all duration-300 hover:shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name="CalendarIcon" variant="solid" size={24} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-headline font-semibold text-foreground mb-1 truncate">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground font-body mb-2">{instructor}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-body">
            <span className="flex items-center gap-1">
              <Icon name="CalendarDaysIcon" size={14} />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="ClockIcon" size={14} />
              {time}
            </span>
            <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium">
              {type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionCard;