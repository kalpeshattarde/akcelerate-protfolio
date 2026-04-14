import React from 'react';
import Icon from '../../../components/AppIcon';

const CalorieProgressRing = ({ consumed, burned, goal }) => {
  const netCalories = consumed - burned;
  const progressPercentage = Math.min((consumed / goal) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const getProgressColor = () => {
    if (progressPercentage <= 50) return '#10B981';
    if (progressPercentage <= 80) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Daily Calories</h3>
        <Icon name="Target" size={20} className="text-muted-foreground" />
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={getProgressColor()}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{consumed}</span>
            <span className="text-xs text-muted-foreground">consumed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-muted-foreground">Goal</div>
          <div className="text-lg font-semibold text-foreground">{goal}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Burned</div>
          <div className="text-lg font-semibold text-success">{burned}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Net</div>
          <div className={`text-lg font-semibold ${netCalories > 0 ? 'text-warning' : 'text-success'}`}>
            {netCalories > 0 ? '+' : ''}{netCalories}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieProgressRing;