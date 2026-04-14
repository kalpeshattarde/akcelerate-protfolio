import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  label: string;
  value: string;
  icon: string;
  trend?: string;
}

interface StatsOverviewProps {
  stats: Stat[];
  className?: string;
}

const StatsOverview = ({ stats, className = '' }: StatsOverviewProps) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
            <Icon 
              name={stat.icon as any} 
              size={20} 
              className="text-primary sm:w-6 sm:h-6" 
            />
          </div>
          
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 font-mono break-words overflow-wrap-anywhere">
            {stat.value}
          </div>
          
          <div className="text-xs sm:text-sm text-muted-foreground mb-2 break-words overflow-wrap-anywhere">
            {stat.label}
          </div>
          
          {stat.trend && (
            <div className="text-xs text-primary font-semibold break-words overflow-wrap-anywhere">
              {stat.trend}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;