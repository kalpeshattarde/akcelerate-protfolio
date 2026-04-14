import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatItem {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const TrainerStats = () => {
  const stats: StatItem[] = [
    {
      label: "Elite Trainers",
      value: "24",
      icon: "UserGroupIcon",
      color: "text-primary"
    },
    {
      label: "Specializations",
      value: "12+",
      icon: "AcademicCapIcon",
      color: "text-accent"
    },
    {
      label: "Success Stories",
      value: "500+",
      icon: "TrophyIcon",
      color: "text-warning"
    },
    {
      label: "Avg. Rating",
      value: "4.9",
      icon: "StarIcon",
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors duration-300"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted/50 ${stat.color} mb-4`}>
            <Icon name={stat.icon as any} size={24} />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TrainerStats;