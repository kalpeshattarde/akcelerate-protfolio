import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GoalSettingPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeGoal, setActiveGoal] = useState(null);
  const [goals, setGoals] = useState({
    steps: { current: 10000, target: 10000, unit: 'steps' },
    calories: { current: 2200, target: 2200, unit: 'kcal' },
    water: { current: 8, target: 8, unit: 'glasses' },
    sleep: { current: 8, target: 8, unit: 'hours' }
  });

  const goalTypes = [
    { key: 'steps', label: 'Daily Steps', icon: 'Footprints', color: 'text-primary' },
    { key: 'calories', label: 'Calorie Intake', icon: 'Flame', color: 'text-warning' },
    { key: 'water', label: 'Water Intake', icon: 'Droplets', color: 'text-accent' },
    { key: 'sleep', label: 'Sleep Hours', icon: 'Moon', color: 'text-secondary' }
  ];

  const handleGoalUpdate = (goalType, newTarget) => {
    setGoals(prev => ({
      ...prev,
      [goalType]: {
        ...prev?.[goalType],
        target: parseInt(newTarget) || 0
      }
    }));
  };

  const handleSaveGoal = () => {
    console.log('Goals updated:', goals);
    setActiveGoal(null);
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-wellness-lg flex items-center justify-center z-30 hover:scale-105 transition-transform duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        <Icon name="Target" size={24} />
      </motion.button>
      {/* Goal Setting Panel */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl shadow-wellness-lg z-50 max-h-[80vh] overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Set Your Goals</h3>
                    <p className="text-sm text-muted-foreground">Customize your daily wellness targets</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>

                {/* Goal Cards */}
                <div className="space-y-4">
                  {goalTypes?.map((goalType) => (
                    <motion.div
                      key={goalType?.key}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        activeGoal === goalType?.key
                          ? 'border-primary bg-primary/5' :'border-border/40 hover:border-border'
                      }`}
                      onClick={() => setActiveGoal(activeGoal === goalType?.key ? null : goalType?.key)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-muted/50">
                            <Icon name={goalType?.icon} size={20} className={goalType?.color} />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{goalType?.label}</h4>
                            <p className="text-sm text-muted-foreground">
                              Current: {goals?.[goalType?.key]?.target} {goals?.[goalType?.key]?.unit}
                            </p>
                          </div>
                        </div>
                        <Icon 
                          name={activeGoal === goalType?.key ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-muted-foreground" 
                        />
                      </div>

                      {/* Goal Input */}
                      <AnimatePresence>
                        {activeGoal === goalType?.key && (
                          <motion.div
                            className="mt-4 pt-4 border-t border-border/40"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <Input
                              label={`New ${goalType?.label} Target`}
                              type="number"
                              placeholder={`Enter target ${goals?.[goalType?.key]?.unit}`}
                              defaultValue={goals?.[goalType?.key]?.target}
                              onChange={(e) => handleGoalUpdate(goalType?.key, e?.target?.value)}
                              className="mb-3"
                            />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Recommended: {
                                goalType?.key === 'steps' ? '8,000-12,000' :
                                goalType?.key === 'calories' ? '1,800-2,500' :
                                goalType?.key === 'water' ? '6-10' : '7-9'
                              } {goals?.[goalType?.key]?.unit}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsExpanded(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleSaveGoal}
                  >
                    Save Goals
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoalSettingPanel;