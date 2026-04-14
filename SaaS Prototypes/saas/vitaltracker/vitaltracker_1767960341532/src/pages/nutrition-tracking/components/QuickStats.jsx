import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Meals Logged',
      value: stats?.mealsLogged,
      icon: 'Utensils',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Avg Calories',
      value: `${stats?.avgCalories}`,
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Streak Days',
      value: stats?.streakDays,
      icon: 'Flame',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Goal Achievement',
      value: `${stats?.goalAchievement}%`,
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card rounded-xl p-4 elevation-2">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${item?.bgColor}`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{item?.value}</p>
              <p className="text-xs text-muted-foreground">{item?.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;