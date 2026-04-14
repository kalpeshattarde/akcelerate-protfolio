import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionWidget = () => {
  const [activeAction, setActiveAction] = useState(null);
  const [waterCount, setWaterCount] = useState(0);
  const [mealType, setMealType] = useState('');

  const quickActions = [
    {
      id: 'water',
      title: 'Log Water',
      description: 'Quick water intake logging',
      icon: 'Droplets',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    },
    {
      id: 'meal',
      title: 'Quick Meal',
      description: 'Add meal or snack',
      icon: 'Plus',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20'
    },
    {
      id: 'activity',
      title: 'Start Activity',
      description: 'Begin workout tracking',
      icon: 'Play',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    }
  ];

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', icon: 'Coffee' },
    { id: 'lunch', label: 'Lunch', icon: 'Sandwich' },
    { id: 'dinner', label: 'Dinner', icon: 'UtensilsCrossed' },
    { id: 'snack', label: 'Snack', icon: 'Cookie' }
  ];

  const handleWaterLog = (glasses) => {
    setWaterCount(prev => prev + glasses);
    console.log(`Logged ${glasses} glasses of water. Total: ${waterCount + glasses}`);
    setTimeout(() => setActiveAction(null), 1000);
  };

  const handleMealLog = (type) => {
    setMealType(type);
    console.log(`Logged ${type} meal`);
    setTimeout(() => setActiveAction(null), 1000);
  };

  const handleActivityStart = () => {
    console.log('Started activity tracking');
    setTimeout(() => setActiveAction(null), 1000);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-muted-foreground" />
      </div>
      {/* Enhanced Grid Layout with Proper Z-index Management */}
      <div className="quick-actions-grid flex-1 min-h-0 relative">
        {quickActions?.map((action) => (
          <motion.div
            key={action?.id}
            className={`quick-action-card relative ${
              activeAction === action?.id
                ? `${action?.bgColor} ${action?.borderColor}`
                : 'border-border/40 hover:border-border hover:bg-muted/30'
            }`}
            onClick={() => setActiveAction(activeAction === action?.id ? null : action?.id)}
            whileHover={{ scale: activeAction === action?.id ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Default Action Content */}
            <div className={`flex flex-col items-center text-center space-y-2 ${
              activeAction === action?.id ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-200`}>
              <div className={`p-2.5 rounded-full ${action?.bgColor}`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm text-constrained">{action?.title}</h4>
                <p className="text-xs text-muted-foreground text-constrained-multiline">{action?.description}</p>
              </div>
            </div>

            {/* Expanded Content - Enhanced with Better Positioning */}
            <AnimatePresence>
              {activeAction === action?.id && (
                <motion.div
                  className="quick-action-expanded"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {action?.id === 'water' && (
                    <div className="flex flex-col items-center space-y-3 h-full justify-center">
                      <Icon name="Droplets" size={28} className="text-accent" />
                      <p className="text-sm font-medium text-foreground">Log Water Intake</p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWaterLog(1)}
                        >
                          +1
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWaterLog(2)}
                        >
                          +2
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleWaterLog(3)}
                        >
                          +3
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">glasses</p>
                    </div>
                  )}

                  {action?.id === 'meal' && (
                    <div className="flex flex-col items-center space-y-3 h-full justify-center">
                      <Icon name="Plus" size={28} className="text-secondary" />
                      <p className="text-sm font-medium text-foreground">Quick Meal Log</p>
                      <div className="grid grid-cols-2 gap-1.5 w-full">
                        {mealTypes?.map((meal) => (
                          <Button
                            key={meal?.id}
                            size="sm"
                            variant="outline"
                            onClick={() => handleMealLog(meal?.label)}
                            iconName={meal?.icon}
                            iconPosition="left"
                            className="text-xs py-1.5"
                          >
                            {meal?.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {action?.id === 'activity' && (
                    <div className="flex flex-col items-center space-y-3 h-full justify-center">
                      <Icon name="Play" size={28} className="text-success" />
                      <p className="text-sm font-medium text-foreground">Start Activity</p>
                      <div className="flex flex-col space-y-2 w-full">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={handleActivityStart}
                          iconName="Timer"
                          iconPosition="left"
                          className="text-xs"
                        >
                          Start Workout
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleActivityStart}
                          iconName="Footprints"
                          iconPosition="left"
                          className="text-xs"
                        >
                          Track Walk
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Close Button - Enhanced Positioning */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 w-6 h-6"
                    onClick={(e) => {
                      e?.stopPropagation();
                      setActiveAction(null);
                    }}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionWidget;