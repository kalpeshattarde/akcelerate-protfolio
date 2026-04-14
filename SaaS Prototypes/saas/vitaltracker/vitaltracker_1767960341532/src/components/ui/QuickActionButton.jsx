import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Only show on dashboard
  if (location?.pathname !== '/dashboard') {
    return null;
  }

  const quickActions = [
    { 
      label: 'Log Water', 
      icon: 'Droplets', 
      color: 'bg-accent text-accent-foreground',
      action: () => console.log('Log water intake')
    },
    { 
      label: 'Quick Meal', 
      icon: 'Plus', 
      color: 'bg-secondary text-secondary-foreground',
      action: () => console.log('Add quick meal')
    },
    { 
      label: 'Start Activity', 
      icon: 'Play', 
      color: 'bg-success text-success-foreground',
      action: () => console.log('Start activity tracking')
    }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      {/* Quick Action Items */}
      {isExpanded && (
        <div className="flex flex-col space-y-2 animate-slide-up">
          {quickActions?.map((action, index) => (
            <div
              key={action?.label}
              className="flex items-center space-x-3 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-card text-card-foreground px-3 py-1 rounded-lg text-sm font-medium shadow-wellness elevation-2 whitespace-nowrap">
                {action?.label}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className={`w-12 h-12 rounded-full shadow-wellness-lg ${action?.color} hover:scale-105 transition-transform duration-200 haptic-feedback`}
                onClick={() => handleActionClick(action?.action)}
              >
                <Icon name={action?.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <Button
        variant="ghost"
        size="icon"
        className={`
          w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-wellness-lg hover:scale-105 transition-all duration-300 breathing-pulse
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}
        onClick={toggleExpanded}
        aria-label={isExpanded ? 'Close quick actions' : 'Open quick actions'}
      >
        <Icon name="Plus" size={24} />
      </Button>
      {/* Mobile repositioning */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.bottom-6.right-6 {
            bottom: 1.5rem;
            right: 50%;
            transform: translateX(50%);
          }
        }
      `}</style>
    </div>
  );
};

export default QuickActionButton;