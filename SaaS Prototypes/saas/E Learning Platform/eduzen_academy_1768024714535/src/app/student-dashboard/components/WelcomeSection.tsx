import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface WelcomeSectionProps {
  userName: string;
  currentStreak: number;
  totalHours: number;
  completedCourses: number;
}

const WelcomeSection = ({ userName, currentStreak, totalHours, completedCourses }: WelcomeSectionProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-2xl p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-semibold text-foreground mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-muted-foreground font-body">
            Your learning sanctuary awaits. Continue your journey of mindful growth.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="bg-card rounded-xl px-6 py-4 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Icon name="FireIcon" variant="solid" size={20} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-headline font-semibold text-foreground">{currentStreak}</p>
                <p className="text-xs text-muted-foreground font-body">Day Streak</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl px-6 py-4 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="ClockIcon" variant="solid" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-headline font-semibold text-foreground">{totalHours}</p>
                <p className="text-xs text-muted-foreground font-body">Hours Learned</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl px-6 py-4 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="AcademicCapIcon" variant="solid" size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-headline font-semibold text-foreground">{completedCourses}</p>
                <p className="text-xs text-muted-foreground font-body">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;