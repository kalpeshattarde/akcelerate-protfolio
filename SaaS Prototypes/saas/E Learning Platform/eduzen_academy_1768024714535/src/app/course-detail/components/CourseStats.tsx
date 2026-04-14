import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  icon: string;
  label: string;
  value: string;
}

interface CourseStatsProps {
  stats: Stat[];
}

const CourseStats = ({ stats }: CourseStatsProps) => {
  return (
    <section className="bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full">
                <Icon name={stat.icon as any} size={28} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-headline font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseStats;