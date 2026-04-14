import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MetricRing = ({ 
  title, 
  value = 0, 
  target = 100, 
  unit = '', 
  icon = 'Circle', 
  color = '#52C41A', 
  bgColor = 'wellness-green',
  percentage = 0, 
  trend = 0,
  onClick,
  isGoalAchieved = false
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [previousPercentage, setPreviousPercentage] = useState(0);

  // Calculate stroke dash array for the progress ring
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Trigger celebration animation when goal is achieved
  useEffect(() => {
    if (percentage >= 100 && previousPercentage < 100) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
    setPreviousPercentage(percentage);
  }, [percentage, previousPercentage]);

  // Determine trend configuration
  const getTrendConfig = () => {
    if (trend > 0) {
      return { 
        icon: 'TrendingUp', 
        color: 'text-success', 
        bg: 'bg-success/10',
        text: `+${trend}%` 
      };
    } else if (trend < 0) {
      return { 
        icon: 'TrendingDown', 
        color: 'text-destructive', 
        bg: 'bg-destructive/10',
        text: `${trend}%` 
      };
    }
    return { 
      icon: 'Minus', 
      color: 'text-muted-foreground', 
      bg: 'bg-muted/10',
      text: '0%' 
    };
  };

  const trendConfig = getTrendConfig();

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    if (percentage >= 100) return { text: 'Excellent! 🎉', style: 'status-excellent' };
    if (percentage >= 75) return { text: 'Almost there! ⚡', style: 'status-good' };
    if (percentage >= 50) return { text: 'Great progress! 💪', style: 'status-good' };
    if (percentage >= 25) return { text: 'Keep going! 🌟', style: 'status-fair' };
    return { text: "Let's get started! 🚀", style: 'status-poor' };
  };

  const motivation = getMotivationalMessage();

  // Format display value
  const formatValue = (val) => {
    if (typeof val !== 'number') return val;
    return val % 1 !== 0 ? val?.toFixed(1) : val?.toLocaleString();
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden p-1">
      {/* Celebration Particles */}
      <AnimatePresence>
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-20">
            {[...Array(8)]?.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                  backgroundColor: color,
                  left: '50%',
                  top: '50%'
                }}
                initial={{ 
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 1 
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45) * 60,
                  y: Math.sin(i * 45) * 60,
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  ease: "easeOut",
                  times: [0, 0.2, 1]
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      {/* Header Section - Enhanced with Better Text Constraints and Fixed Height */}
      <div className="flex items-start justify-between mb-3 min-h-[56px] flex-shrink-0">
        <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 wellness-elevation-1"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon name={icon} size={20} color={color} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="wellness-text-accent text-constrained leading-tight mb-1 font-semibold">
              {title}
            </h3>
            <div className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium wellness-elevation-1 ${motivation?.style}`}>
              <span className="text-constrained">{motivation?.text}</span>
            </div>
          </div>
        </div>
        
        {/* Trend Indicator - Enhanced with Better Spacing */}
        {trend !== 0 && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${trendConfig?.bg} ${trendConfig?.color} flex-shrink-0 wellness-elevation-1`}>
            <Icon name={trendConfig?.icon} size={12} />
            <span className="text-xs font-medium whitespace-nowrap">{trendConfig?.text}</span>
          </div>
        )}
      </div>
      {/* Progress Ring Section - Enhanced with Fixed Dimensions and Better Centering */}
      <div className="flex items-center justify-center mb-3 flex-shrink-0 min-h-[130px] max-h-[130px]">
        <div className="relative">
          <svg 
            className="w-28 h-28 transform -rotate-90" 
            viewBox="0 0 100 100"
          >
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="3"
              fill="none"
              className="progress-ring-bg"
            />
            
            {/* Progress Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke={color}
              strokeWidth="3"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="progress-ring-fill"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ 
                duration: 1.5, 
                ease: [0.4, 0, 0.2, 1],
                delay: 0.3 
              }}
            />
            
            {/* Glow Effect for High Progress */}
            {percentage >= 75 && (
              <motion.circle
                cx="50"
                cy="50"
                r={radius}
                stroke={color}
                strokeWidth="1"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                opacity="0.3"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.4, 0, 0.2, 1],
                  delay: 0.5 
                }}
              />
            )}
          </svg>

          {/* Center Content - Enhanced Layout with Better Text Sizing */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="text-xl font-bold text-foreground leading-none text-constrained max-w-16">
                {formatValue(value)}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium text-constrained">
                {unit}
              </div>
            </motion.div>
          </div>

          {/* Achievement Badge - Enhanced */}
          {percentage >= 100 && (
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center wellness-elevation-2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 20,
                delay: 1.2
              }}
            >
              <Icon name="Check" size={10} color="white" />
            </motion.div>
          )}
        </div>
      </div>
      {/* Enhanced Progress Stats - Improved Layout and Spacing */}
      <div className="flex-1 min-h-0 space-y-2.5 overflow-hidden">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-medium text-constrained">Progress</span>
            <span 
              className="font-semibold whitespace-nowrap text-xs"
              style={{ color }}
            >
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full wellness-elevation-1"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ 
                duration: 1.2, 
                ease: [0.4, 0, 0.2, 1],
                delay: 0.5 
              }}
            />
          </div>
        </div>

        {/* Target Information */}
        <div className="flex justify-between items-center text-xs min-h-[18px]">
          <span className="text-muted-foreground text-constrained">Target</span>
          <span className="font-medium text-foreground text-constrained">
            {formatValue(target)} {unit}
          </span>
        </div>

        {/* Remaining/Exceeded - Enhanced Layout */}
        <div className="min-h-[18px]">
          {percentage < 100 ? (
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground text-constrained">Remaining</span>
              <span className="font-medium text-foreground text-constrained">
                {formatValue(Math.max(0, target - value))} {unit}
              </span>
            </div>
          ) : (
            <div className="flex justify-between items-center text-xs">
              <span className="text-success text-constrained">Exceeded by</span>
              <span className="font-medium text-success text-constrained">
                {formatValue(Math.max(0, value - target))} {unit}
              </span>
            </div>
          )}
        </div>

        {/* Additional Parameters Section - Optimized for Space */}
        <div className="space-y-1.5 pt-2 border-t border-border/20 max-h-32 overflow-y-auto wellness-content-scroll">
          {title === 'Daily Steps' && (
            <>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Distance</span>
                <span className="font-medium text-foreground text-constrained">
                  6.2 km
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Active Min</span>
                <span className="font-medium text-foreground text-constrained">
                  45 min
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Calories</span>
                <span className="font-medium text-foreground text-constrained">
                  420 kcal
                </span>
              </div>
            </>
          )}

          {title === 'Calories Burned' && (
            <>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Basal Rate</span>
                <span className="font-medium text-foreground text-constrained">
                  1,680 kcal
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Active Rate</span>
                <span className="font-medium text-foreground text-constrained">
                  170 kcal
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Burn Rate</span>
                <span className="font-medium text-foreground text-constrained">
                  95 kcal/hr
                </span>
              </div>
            </>
          )}

          {title === 'Water Intake' && (
            <>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Last Intake</span>
                <span className="font-medium text-foreground text-constrained">
                  2:30 PM
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Avg Glass</span>
                <span className="font-medium text-foreground text-constrained">
                  250 ml
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Hydration</span>
                <span className="font-medium text-foreground text-constrained">
                  81%
                </span>
              </div>
            </>
          )}

          {title === 'Sleep Quality' && (
            <>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Deep Sleep</span>
                <span className="font-medium text-foreground text-constrained">
                  2.1 hrs
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Light Sleep</span>
                <span className="font-medium text-foreground text-constrained">
                  4.6 hrs
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground text-constrained">Sleep Score</span>
                <span className="font-medium text-foreground text-constrained">
                  82/100
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </div>
  );
};

export default MetricRing;