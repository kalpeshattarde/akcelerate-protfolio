import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: "Step Master",
      description: "10,000 steps completed",
      icon: "Award",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      earned: true,
      earnedDate: "2025-10-10"
    },
    {
      id: 2,
      title: "Hydration Hero",
      description: "8 glasses of water daily",
      icon: "Droplets",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
      earned: true,
      earnedDate: "2025-10-09"
    },
    {
      id: 3,
      title: "Sleep Champion",
      description: "7+ hours sleep streak",
      icon: "Moon",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
      earned: false,
      progress: 85
    },
    {
      id: 4,
      title: "Calorie Crusher",
      description: "Weekly calorie goal met",
      icon: "Flame",
      color: "text-error",
      bgColor: "bg-error/10",
      borderColor: "border-error/20",
      earned: true,
      earnedDate: "2025-10-08"
    },
    {
      id: 5,
      title: "Consistency King",
      description: "7-day activity streak",
      icon: "Target",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      earned: false,
      progress: 60
    },
    {
      id: 6,
      title: "Weekend Warrior",
      description: "Active weekend completed",
      icon: "Zap",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      earned: true,
      earnedDate: "2025-10-06"
    }
  ];

  const earnedCount = achievements?.filter(a => a?.earned)?.length;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Achievement Badges</h3>
          <p className="text-sm text-muted-foreground">
            {earnedCount} of {achievements?.length} earned
          </p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Icon name="Trophy" size={20} className="text-warning" />
          <span className="text-sm font-medium text-foreground">{earnedCount}</span>
        </div>
      </div>
      {/* Enhanced Grid with Proper Text Overflow Management */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-full overflow-y-auto">
          {achievements?.map((achievement, index) => (
            <motion.div
              key={achievement?.id}
              className={`relative p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                achievement?.earned 
                  ? `${achievement?.bgColor} ${achievement?.borderColor}` 
                  : 'bg-muted/30 border-muted/40'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ minHeight: '120px' }}
            >
              {/* Achievement Icon - Fixed Size Container */}
              <div className={`flex items-center justify-center w-8 h-8 rounded-full mb-2 mx-auto flex-shrink-0 ${
                achievement?.earned ? achievement?.bgColor : 'bg-muted/50'
              }`}>
                <Icon 
                  name={achievement?.icon} 
                  size={16} 
                  className={achievement?.earned ? achievement?.color : 'text-muted-foreground'} 
                />
              </div>

              {/* Achievement Info - Proper Text Constraints */}
              <div className="text-center space-y-1 flex-1 min-h-0">
                <h4 className={`text-xs font-semibold text-constrained ${
                  achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
                }`} title={achievement?.title}>
                  {achievement?.title}
                </h4>
                <p className={`text-xs text-constrained-multiline leading-tight ${
                  achievement?.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'
                }`} title={achievement?.description}>
                  {achievement?.description}
                </p>

                {/* Progress or Status - Compact Layout */}
                <div className="pt-1">
                  {achievement?.earned ? (
                    <div className="flex items-center justify-center space-x-1">
                      <Icon name="Check" size={8} className="text-success flex-shrink-0" />
                      <span className="text-xs text-success font-medium">Earned</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="w-full bg-muted/50 rounded-full h-1">
                        <motion.div 
                          className={`h-1 rounded-full ${achievement?.color?.replace('text-', 'bg-')}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement?.progress}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {achievement?.progress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Earned Badge - Optimized Size and Position */}
              {achievement?.earned && (
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center wellness-elevation-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <Icon name="Check" size={8} color="white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {/* View All Button - Fixed at Bottom */}
      <motion.button
        className="w-full mt-4 py-2.5 text-sm font-medium text-primary hover:text-primary-foreground hover:bg-primary rounded-lg transition-all duration-200 flex-shrink-0"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        View All Achievements
      </motion.button>
    </div>
  );
};

export default AchievementBadges;