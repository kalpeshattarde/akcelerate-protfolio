import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface AchievementBadgeProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

const AchievementBadge = ({ 
  title, 
  description, 
  icon, 
  earned, 
  earnedDate 
}: AchievementBadgeProps) => {
  return (
    <div className={`bg-card rounded-xl p-5 border transition-all duration-300 ${
      earned 
        ? 'border-primary shadow-sm hover:shadow-md hover:-translate-y-1' 
        : 'border-border opacity-60'
    }`}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
          earned 
            ? 'bg-gradient-to-br from-primary to-accent' :'bg-muted'
        }`}>
          <Icon 
            name={icon as any} 
            variant="solid" 
            size={28} 
            className={earned ? 'text-white' : 'text-muted-foreground'} 
          />
        </div>
        <h4 className={`text-sm font-headline font-semibold mb-1 ${
          earned ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {title}
        </h4>
        <p className="text-xs text-muted-foreground font-body mb-2">{description}</p>
        {earned && earnedDate && (
          <span className="text-xs text-primary font-body font-medium">
            Earned {earnedDate}
          </span>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;