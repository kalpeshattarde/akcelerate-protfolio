import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StepCounter = ({ currentSteps, dailyGoal, onGoalUpdate }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displaySteps, setDisplaySteps] = useState(0);

  const progressPercentage = Math.min((currentSteps / dailyGoal) * 100, 100);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    // Animate step counter
    const stepTimer = setInterval(() => {
      setDisplaySteps(prev => {
        if (prev < currentSteps) {
          return Math.min(prev + Math.ceil((currentSteps - prev) / 10), currentSteps);
        }
        return prev;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(stepTimer);
    };
  }, [currentSteps]);

  const getMotivationalMessage = () => {
    const percentage = (currentSteps / dailyGoal) * 100;
    if (percentage >= 100) return "🎉 Goal achieved! Amazing work!";
    if (percentage >= 75) return "🔥 Almost there! Keep going!";
    if (percentage >= 50) return "💪 Halfway there! You're doing great!";
    if (percentage >= 25) return "🚀 Good start! Keep moving!";
    return "👟 Let's get those steps in!";
  };

  const handleGoalAdjustment = (adjustment) => {
    const newGoal = Math.max(1000, dailyGoal + adjustment);
    onGoalUpdate(newGoal);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 border border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Footprints" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Daily Steps</h3>
            <p className="text-sm text-muted-foreground">
              Real-time step tracking
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleGoalAdjustment(-1000)}
            iconName="Minus"
            disabled={dailyGoal <= 1000}
          />
          <span className="text-sm font-medium text-foreground px-2">
            Goal: {dailyGoal?.toLocaleString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleGoalAdjustment(1000)}
            iconName="Plus"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Progress Ring */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="transparent"
              className="opacity-20"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="var(--color-primary)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-out ${isAnimating ? 'breathing-pulse' : ''}`}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-foreground">
              {displaySteps?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">steps</div>
            <div className="text-xs text-primary font-medium mt-1">
              {progressPercentage?.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {Math.max(0, dailyGoal - currentSteps)?.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Remaining</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-secondary">
            {Math.round(currentSteps * 0.0005 * 10) / 10} km
          </div>
          <div className="text-xs text-muted-foreground">Distance</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">
            {Math.round(currentSteps * 0.04)}
          </div>
          <div className="text-xs text-muted-foreground">Calories</div>
        </div>
      </div>
      {/* Motivational Message */}
      <div className="bg-primary/5 rounded-lg p-4 text-center">
        <p className="text-sm font-medium text-foreground">
          {getMotivationalMessage()}
        </p>
        {progressPercentage < 100 && (
          <p className="text-xs text-muted-foreground mt-1">
            {Math.max(0, dailyGoal - currentSteps)?.toLocaleString()} more steps to reach your goal
          </p>
        )}
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => {
            // Reset daily steps (mock functionality)
            console.log('Reset daily steps');
          }}
        >
          Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconPosition="left"
          onClick={() => {
            // Share progress (mock functionality)
            console.log('Share progress');
          }}
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default StepCounter;