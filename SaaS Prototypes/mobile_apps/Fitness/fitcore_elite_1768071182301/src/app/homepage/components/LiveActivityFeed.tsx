'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ActivityItem {
  id: number;
  type: 'workout' | 'achievement' | 'milestone';
  user: {
    name: string;
    image: string;
    alt: string;
  };
  activity: string;
  timestamp: string;
  metrics?: {
    label: string;
    value: string;
  };
}

const LiveActivityFeed = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsHydrated(true);
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'achievement',
      user: {
        name: 'Marcus Chen',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_187b350ba-1763294180584.png",
        alt: 'Asian man with athletic build smiling confidently in gym setting'
      },
      activity: 'Hit new deadlift PR',
      timestamp: '2 min ago',
      metrics: {
        label: 'Weight',
        value: '405 lbs'
      }
    },
    {
      id: 2,
      type: 'workout',
      user: {
        name: 'Sarah Rodriguez',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6c9771d-1763300457898.png",
        alt: 'Hispanic woman in athletic wear performing workout with determination'
      },
      activity: 'Completed Cardio Warrior session',
      timestamp: '5 min ago'
    },
    {
      id: 3,
      type: 'milestone',
      user: {
        name: 'David Thompson',
        image: "https://images.unsplash.com/photo-1684756533757-95e2a0ef710b",
        alt: 'Caucasian man with beard in fitness attire showing strength and focus'
      },
      activity: 'Reached 100-day streak',
      timestamp: '8 min ago'
    },
    {
      id: 4,
      type: 'workout',
      user: {
        name: 'Elena Vasquez',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6c9771d-1763300457898.png",
        alt: 'Latina woman with ponytail in sports bra showing athletic physique'
      },
      activity: 'Finished Strength Elite training',
      timestamp: '12 min ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'TrophyIcon';
      case 'workout':
        return 'BoltIcon';
      case 'milestone':
        return 'StarIcon';
      default:
        return 'BoltIcon';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'text-warning';
      case 'workout':
        return 'text-primary';
      case 'milestone':
        return 'text-accent';
      default:
        return 'text-primary';
    }
  };

  if (!isHydrated) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-b from-deep-charcoal to-background">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/50 backdrop-blur-10 border border-border rounded-2xl p-6 sm:p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted/30 rounded w-1/3"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted/30 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="h-4 bg-muted/30 rounded w-3/4"></div>
                      <div className="h-3 bg-muted/30 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-deep-charcoal to-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Live Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-card/50 backdrop-blur-10 border border-border rounded-2xl p-6 sm:p-8 glass-morphism">
              <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse flex-shrink-0"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground break-words">Live Activity</h3>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-mono whitespace-nowrap">
                  {currentTime}
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="relative flex-shrink-0">
                      <AppImage
                        src={activity.user.image}
                        alt={activity.user.alt}
                        className="w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-full border-2 border-primary/30"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 sm:w-6 h-5 sm:h-6 bg-background rounded-full flex items-center justify-center border-2 border-background">
                        <Icon
                          name={getActivityIcon(activity.type) as any}
                          size={10}
                          className={getActivityColor(activity.type)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1 gap-1">
                        <span className="font-semibold text-foreground break-words">{activity.user.name}</span>
                        <span className="text-muted-foreground text-sm sm:text-base break-words">{activity.activity}</span>
                      </div>
                      
                      {activity.metrics && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-muted-foreground">{activity.metrics.label}:</span>
                          <span className="text-sm font-bold text-primary break-words">{activity.metrics.value}</span>
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Gym Stats */}
          <div className="space-y-4 sm:space-y-6">
            {/* Current Members */}
            <div className="bg-card/50 backdrop-blur-10 border border-border rounded-2xl p-4 sm:p-6 glass-morphism">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="UserGroupIcon" size={20} className="text-accent flex-shrink-0" />
                <h4 className="text-base sm:text-lg font-bold text-foreground break-words">Active Now</h4>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">47</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Members training</div>
            </div>
            
            {/* Energy Level */}
            <div className="bg-card/50 backdrop-blur-10 border border-border rounded-2xl p-4 sm:p-6 glass-morphism">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="BoltIcon" size={20} className="text-primary flex-shrink-0" />
                <h4 className="text-base sm:text-lg font-bold text-foreground break-words">Energy Level</h4>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex-1 bg-muted/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-sm font-bold text-primary whitespace-nowrap">87%</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Peak intensity</div>
            </div>
            
            {/* Equipment Status */}
            <div className="bg-card/50 backdrop-blur-10 border border-border rounded-2xl p-4 sm:p-6 glass-morphism">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="CogIcon" size={20} className="text-warning flex-shrink-0" />
                <h4 className="text-base sm:text-lg font-bold text-foreground break-words">Equipment</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">Available</span>
                  <span className="text-xs sm:text-sm font-bold text-success">94%</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">In Use</span>
                  <span className="text-xs sm:text-sm font-bold text-primary">23 units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivityFeed;