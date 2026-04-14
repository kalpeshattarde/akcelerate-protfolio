import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionButton = ({ 
  userRole = 'user',
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on meeting room page to avoid interference
  const shouldHide = location?.pathname === '/meeting-room';

  const quickActions = [
    {
      id: 'instant-meeting',
      label: 'Start Instant Meeting',
      icon: 'Video',
      action: () => {
        navigate('/meeting-room');
        setIsExpanded(false);
      },
      color: 'bg-primary hover:bg-primary/90'
    },
    {
      id: 'join-meeting',
      label: 'Join Meeting',
      icon: 'UserPlus',
      action: () => {
        // Open join meeting modal or navigate to join page
        console.log('Join meeting');
        setIsExpanded(false);
      },
      color: 'bg-accent hover:bg-accent/90'
    },
    {
      id: 'schedule-meeting',
      label: 'Schedule Meeting',
      icon: 'Calendar',
      action: () => {
        navigate('/schedule-meeting');
        setIsExpanded(false);
      },
      color: 'bg-success hover:bg-success/90'
    }
  ];

  if (shouldHide) return null;

  return (
    <>
      {/* Main Floating Button */}
      <div className={`fixed bottom-6 right-6 z-80 ${className}`}>
        <div className="relative">
          {/* Expanded Actions */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-3 animate-slide-in">
              {quickActions?.map((action, index) => (
                <div
                  key={action?.id}
                  className="flex items-center justify-end space-x-3"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="bg-surface border border-border rounded-lg px-3 py-2 shadow-elevated">
                    <span className="text-sm font-medium text-foreground whitespace-nowrap">
                      {action?.label}
                    </span>
                  </div>
                  <button
                    onClick={action?.action}
                    className={`w-12 h-12 rounded-full ${action?.color} text-white shadow-floating hover:shadow-lg transition-all duration-200 flex items-center justify-center transform hover:scale-105`}
                    aria-label={action?.label}
                  >
                    <Icon name={action?.icon} size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Main Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-floating hover:shadow-lg transition-all duration-200 flex items-center justify-center transform hover:scale-105 ${
              isExpanded ? 'rotate-45' : ''
            }`}
            aria-label={isExpanded ? 'Close quick actions' : 'Open quick actions'}
            aria-expanded={isExpanded}
          >
            <Icon name="Plus" size={24} />
          </button>
        </div>
      </div>
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-70 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default QuickActionButton;