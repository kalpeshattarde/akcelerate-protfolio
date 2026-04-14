import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickAddButtons = ({ onQuickAdd }) => {
  const quickActivities = [
    {
      id: 'walking',
      name: 'Walking',
      icon: 'Footprints',
      color: 'bg-primary text-primary-foreground',
      defaultDuration: 30,
      defaultCalories: 150,
      defaultSteps: 3000
    },
    {
      id: 'running',
      name: 'Running',
      icon: 'Zap',
      color: 'bg-secondary text-secondary-foreground',
      defaultDuration: 20,
      defaultCalories: 300,
      defaultSteps: 2500
    },
    {
      id: 'cycling',
      name: 'Cycling',
      icon: 'Bike',
      color: 'bg-accent text-accent-foreground',
      defaultDuration: 45,
      defaultCalories: 400,
      defaultSteps: 0
    },
    {
      id: 'swimming',
      name: 'Swimming',
      icon: 'Waves',
      color: 'bg-success text-success-foreground',
      defaultDuration: 30,
      defaultCalories: 350,
      defaultSteps: 0
    },
    {
      id: 'yoga',
      name: 'Yoga',
      icon: 'Heart',
      color: 'bg-warning text-warning-foreground',
      defaultDuration: 60,
      defaultCalories: 200,
      defaultSteps: 0
    },
    {
      id: 'strength',
      name: 'Strength',
      icon: 'Dumbbell',
      color: 'bg-error text-error-foreground',
      defaultDuration: 45,
      defaultCalories: 250,
      defaultSteps: 0
    }
  ];

  const handleQuickAdd = (activity) => {
    const newActivity = {
      id: Date.now(),
      type: activity?.id,
      name: activity?.name,
      duration: activity?.defaultDuration,
      calories: activity?.defaultCalories,
      steps: activity?.defaultSteps,
      intensity: 'moderate',
      date: new Date()?.toISOString()?.split('T')?.[0],
      timestamp: new Date()?.toISOString()
    };
    
    onQuickAdd(newActivity);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 border border-border/40">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
          <Icon name="Zap" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Add Activity</h3>
          <p className="text-sm text-muted-foreground">
            Log common activities with one click
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActivities?.map((activity) => (
          <button
            key={activity?.id}
            onClick={() => handleQuickAdd(activity)}
            className={`
              group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 hover:scale-105 haptic-feedback
              ${activity?.color} shadow-wellness elevation-1
            `}
          >
            <div className="flex items-center justify-center w-12 h-12 mb-2">
              <Icon name={activity?.icon} size={24} />
            </div>
            <span className="text-sm font-medium">{activity?.name}</span>
            <span className="text-xs opacity-80 mt-1">
              {activity?.defaultDuration} min
            </span>
            
            {/* Hover Tooltip */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              <div className="text-center">
                <div>{activity?.defaultDuration} min • {activity?.defaultCalories} cal</div>
                {activity?.defaultSteps > 0 && (
                  <div>{activity?.defaultSteps?.toLocaleString()} steps</div>
                )}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
            </div>
          </button>
        ))}
      </div>
      {/* Usage Stats */}
      <div className="mt-6 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Most used this week:</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Footprints" size={14} className="text-primary" />
              <span className="text-foreground font-medium">Walking (5x)</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} className="text-secondary" />
              <span className="text-foreground font-medium">Running (3x)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddButtons;