import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Milestone {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
}

interface LearningPathCardProps {
  pathTitle: string;
  progress: number;
  milestones: Milestone[];
}

const LearningPathCard = ({ pathTitle, progress, milestones }: LearningPathCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-headline font-semibold text-foreground">{pathTitle}</h3>
        <span className="text-sm font-body font-medium text-primary">{progress}% Complete</span>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex items-start gap-4">
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                milestone.completed 
                  ? 'bg-success text-white' 
                  : milestone.current 
                  ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
              }`}>
                {milestone.completed ? (
                  <Icon name="CheckIcon" size={16} variant="solid" />
                ) : (
                  <span className="text-xs font-body font-semibold">{index + 1}</span>
                )}
              </div>
              {index < milestones.length - 1 && (
                <div className={`absolute left-1/2 top-8 w-0.5 h-6 -translate-x-1/2 ${
                  milestone.completed ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
            <div className="flex-1 pt-1">
              <p className={`text-sm font-body ${
                milestone.completed || milestone.current 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground'
              }`}>
                {milestone.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathCard;