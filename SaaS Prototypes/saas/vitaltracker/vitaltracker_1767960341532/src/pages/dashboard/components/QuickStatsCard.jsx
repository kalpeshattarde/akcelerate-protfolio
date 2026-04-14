import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const QuickStatsCard = () => {
  const quickStats = [
    {
      id: 1,
      label: "Active Minutes",
      value: 45,
      unit: "min",
      icon: "Clock",
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "+12%"
    },
    {
      id: 2,
      label: "Heart Rate",
      value: 72,
      unit: "bpm",
      icon: "Heart",
      color: "text-error",
      bgColor: "bg-error/10",
      change: "-3%"
    },
    {
      id: 3,
      label: "Distance",
      value: 3.2,
      unit: "km",
      icon: "MapPin",
      color: "text-success",
      bgColor: "bg-success/10",
      change: "+8%"
    },
    {
      id: 4,
      label: "Calories Burned",
      value: 420,
      unit: "kcal",
      icon: "Flame",
      color: "text-warning",
      bgColor: "bg-warning/10",
      change: "+15%"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header - Fixed Height */}
      <div className="wellness-header flex-shrink-0 min-h-[40px]">
        <h3 className="wellness-title-tertiary text-constrained">Today's Quick Stats</h3>
        <Icon name="BarChart3" size={20} className="text-muted-foreground flex-shrink-0" />
      </div>
      {/* Content Container - Scrollable if needed */}
      <div className="wellness-content-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 wellness-gap-sm">
          {quickStats?.map((stat, index) => (
            <motion.div
              key={stat?.id}
              className="flex items-center space-x-3 wellness-spacing-xs rounded-xl hover:bg-muted/30 transition-colors duration-200 wellness-interactive min-h-[70px] border border-wellness-light"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Icon - Fixed Size */}
              <div className={`p-2.5 rounded-lg ${stat?.bgColor} flex-shrink-0 wellness-elevation-1`}>
                <Icon name={stat?.icon} size={18} className={stat?.color} />
              </div>
              
              {/* Content - With Text Constraints */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline space-x-1">
                  <p className="wellness-text-primary font-semibold text-constrained">
                    {stat?.value}
                  </p>
                  <span className="wellness-text-secondary text-constrained">
                    {stat?.unit}
                  </span>
                </div>
                <p className="wellness-text-secondary text-constrained-multiline leading-tight">
                  {stat?.label}
                </p>
                <p className={`text-xs font-medium text-constrained ${
                  stat?.change?.startsWith('+') ? 'text-success' : 'text-error'
                }`}>
                  {stat?.change} from yesterday
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCard;