import React from 'react';
import Icon from '../../../components/AppIcon';

const SleepGoalProgress = ({ currentSleep, sleepGoal, weeklyAverage }) => {
  const calculateProgress = (current, goal) => {
    const currentHours = parseFloat(current?.replace('h', ''));
    const goalHours = parseFloat(goal?.replace('h', ''));
    return Math.min((currentHours / goalHours) * 100, 100);
  };

  const progress = calculateProgress(currentSleep, sleepGoal);
  const weeklyProgress = calculateProgress(weeklyAverage, sleepGoal);

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'text-success';
    if (progress >= 70) return 'text-warning';
    return 'text-error';
  };

  const getProgressBg = (progress) => {
    if (progress >= 90) return 'bg-success';
    if (progress >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const CircularProgress = ({ progress, size = 120, strokeWidth = 8, color = '#5DB075' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusMessage = () => {
    if (progress >= 100) return "Perfect! You've reached your sleep goal.";
    if (progress >= 90) return "Great job! Almost at your goal.";
    if (progress >= 70) return "Good progress towards your sleep goal.";
    return "You need more sleep to reach your goal.";
  };

  const getRecommendation = () => {
    const currentHours = parseFloat(currentSleep?.replace('h', ''));
    const goalHours = parseFloat(sleepGoal?.replace('h', ''));
    const deficit = goalHours - currentHours;

    if (deficit <= 0) return "Maintain your excellent sleep routine!";
    if (deficit <= 1) return `Try to sleep ${Math.round(deficit * 60)} minutes earlier tonight.`;
    return `Consider going to bed ${Math.round(deficit)} hours earlier to meet your goal.`;
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Target" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sleep Goal</h3>
            <p className="text-sm text-muted-foreground">Daily target: {sleepGoal}</p>
          </div>
        </div>
      </div>

      {/* Progress Rings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Today's Progress */}
        <div className="text-center">
          <CircularProgress 
            progress={progress} 
            color={progress >= 90 ? '#10B981' : progress >= 70 ? '#F59E0B' : '#EF4444'}
          />
          <div className="mt-4">
            <div className="text-lg font-semibold text-foreground">Today</div>
            <div className="text-sm text-muted-foreground">{currentSleep} of {sleepGoal}</div>
            <div className={`text-sm font-medium ${getProgressColor(progress)}`}>
              {getStatusMessage()}
            </div>
          </div>
        </div>

        {/* Weekly Average */}
        <div className="text-center">
          <CircularProgress 
            progress={weeklyProgress} 
            color={weeklyProgress >= 90 ? '#10B981' : weeklyProgress >= 70 ? '#F59E0B' : '#EF4444'}
          />
          <div className="mt-4">
            <div className="text-lg font-semibold text-foreground">Weekly Avg</div>
            <div className="text-sm text-muted-foreground">{weeklyAverage} of {sleepGoal}</div>
            <div className={`text-sm font-medium ${getProgressColor(weeklyProgress)}`}>
              {weeklyProgress >= 90 ? 'Excellent consistency!' : 'Room for improvement'}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg flex-shrink-0 mt-0.5">
            <Icon name="Lightbulb" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Sleep Recommendation</h4>
            <p className="text-sm text-muted-foreground">{getRecommendation()}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{sleepGoal}</div>
          <div className="text-xs text-muted-foreground">Daily Goal</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{currentSleep}</div>
          <div className="text-xs text-muted-foreground">Last Night</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{weeklyAverage}</div>
          <div className="text-xs text-muted-foreground">Week Avg</div>
        </div>
      </div>
    </div>
  );
};

export default SleepGoalProgress;