import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementTimeline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: "10K Steps Streak",
      description: "Achieved 10,000+ steps for 7 consecutive days",
      date: "2024-10-08",
      category: "activity",
      badge: "🏃‍♂️",
      points: 100,
      milestone: true
    },
    {
      id: 2,
      title: "Hydration Hero",
      description: "Maintained optimal water intake for 30 days",
      date: "2024-10-05",
      category: "hydration",
      badge: "💧",
      points: 150,
      milestone: false
    },
    {
      id: 3,
      title: "Sleep Champion",
      description: "Averaged 8+ hours of quality sleep for 2 weeks",
      date: "2024-10-01",
      category: "sleep",
      badge: "😴",
      points: 120,
      milestone: false
    },
    {
      id: 4,
      title: "Calorie Balance Master",
      description: "Maintained healthy calorie balance for 21 days",
      date: "2024-09-28",
      category: "nutrition",
      badge: "🥗",
      points: 200,
      milestone: true
    },
    {
      id: 5,
      title: "First Week Complete",
      description: "Successfully tracked all metrics for your first week",
      date: "2024-09-25",
      category: "general",
      badge: "🎯",
      points: 50,
      milestone: false
    },
    {
      id: 6,
      title: "Weight Goal Achieved",
      description: "Reached your target weight of 70kg",
      date: "2024-09-20",
      category: "weight",
      badge: "⚖️",
      points: 300,
      milestone: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Achievements', icon: 'Trophy' },
    { value: 'activity', label: 'Activity', icon: 'Activity' },
    { value: 'nutrition', label: 'Nutrition', icon: 'Apple' },
    { value: 'hydration', label: 'Hydration', icon: 'Droplets' },
    { value: 'sleep', label: 'Sleep', icon: 'Moon' },
    { value: 'weight', label: 'Weight', icon: 'Scale' },
    { value: 'general', label: 'General', icon: 'Star' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const totalPoints = achievements?.reduce((sum, achievement) => sum + achievement?.points, 0);
  const milestoneCount = achievements?.filter(achievement => achievement?.milestone)?.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 border border-border/40">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Trophy" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Achievement Timeline</h3>
            <p className="text-sm text-muted-foreground">
              {totalPoints} points earned • {milestoneCount} milestones reached
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Button
              key={category?.value}
              variant={selectedCategory === category?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category?.value)}
              iconName={category?.icon}
              iconPosition="left"
            >
              {category?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAchievements?.map((achievement, index) => (
          <div
            key={achievement?.id}
            className={`
              relative flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 hover:bg-muted/30
              ${achievement?.milestone ? 'bg-success/5 border border-success/20' : 'bg-muted/10'}
            `}
          >
            {/* Timeline connector */}
            {index < filteredAchievements?.length - 1 && (
              <div className="absolute left-8 top-16 w-0.5 h-8 bg-border/40" />
            )}

            {/* Badge */}
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-full text-2xl flex-shrink-0
              ${achievement?.milestone 
                ? 'bg-success/20 ring-2 ring-success/30' :'bg-muted/50'
              }
            `}>
              {achievement?.badge}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-foreground flex items-center space-x-2">
                    <span>{achievement?.title}</span>
                    {achievement?.milestone && (
                      <Icon name="Crown" size={16} className="text-success" />
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement?.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(achievement?.date)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} className="text-warning" />
                      <span className="text-xs font-medium text-warning">
                        +{achievement?.points} points
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share2"
                  className="flex-shrink-0"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-muted/30 rounded-full mx-auto mb-4">
            <Icon name="Trophy" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">No achievements yet</h4>
          <p className="text-sm text-muted-foreground">
            Keep tracking your wellness metrics to unlock achievements!
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-border/40 space-y-3 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAchievements?.length} achievement{filteredAchievements?.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Timeline
          </Button>
          <Button variant="ghost" size="sm" iconName="Settings">
            Manage Goals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AchievementTimeline;