import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const WeeklyChart = () => {
  const [activeChart, setActiveChart] = useState('steps');

  const weeklyData = [
    { day: 'Mon', steps: 8500, calories: 2100, water: 6, sleep: 7.5 },
    { day: 'Tue', steps: 12000, calories: 2300, water: 8, sleep: 8.0 },
    { day: 'Wed', steps: 9500, calories: 1950, water: 7, sleep: 6.5 },
    { day: 'Thu', steps: 11200, calories: 2250, water: 9, sleep: 7.8 },
    { day: 'Fri', steps: 13500, calories: 2400, water: 8, sleep: 8.2 },
    { day: 'Sat', steps: 15000, calories: 2600, water: 10, sleep: 9.0 },
    { day: 'Sun', steps: 7800, calories: 1800, water: 5, sleep: 8.5 }
  ];

  const chartOptions = [
    { key: 'steps', label: 'Steps', color: '#5DB075', icon: 'Footprints' },
    { key: 'calories', label: 'Calories', color: '#F59E0B', icon: 'Flame' },
    { key: 'water', label: 'Water', color: '#3B82F6', icon: 'Droplets' },
    { key: 'sleep', label: 'Sleep', color: '#8B5CF6', icon: 'Moon' }
  ];

  const activeOption = chartOptions?.find(option => option?.key === activeChart);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border/40 rounded-xl p-3 wellness-elevation-2">
          <p className="wellness-text-accent mb-1">{label}</p>
          <p className="wellness-text-primary" style={{ color: activeOption?.color }}>
            {`${activeOption?.label}: ${payload?.[0]?.value}${
              activeChart === 'steps' ? '' : 
              activeChart === 'calories' ? ' kcal' :
              activeChart === 'water' ? ' glasses' : ' hours'
            }`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Section - Fixed Height */}
      <div className="wellness-header flex-shrink-0 min-h-[60px]">
        <h3 className="wellness-title-tertiary text-constrained">Weekly Progress</h3>
        
        {/* Chart Type Selector - Enhanced Responsive Design */}
        <div className="flex items-center flex-wrap wellness-gap-xs">
          {chartOptions?.map((option) => (
            <motion.button
              key={option?.key}
              onClick={() => setActiveChart(option?.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 touch-target-sm ${
                activeChart === option?.key
                  ? 'bg-primary text-primary-foreground wellness-elevation-1'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-wellness-light'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon name={option?.icon} size={16} className="flex-shrink-0" />
              <span className="hidden sm:inline text-constrained">{option?.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Chart Container - Fixed Height with Responsive Behavior */}
      <div className="flex-1 min-h-0 mb-4">
        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeChart === 'steps' || activeChart === 'calories' ? (
              <BarChart 
                data={weeklyData} 
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3} 
                />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey={activeChart} 
                  fill={activeOption?.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart 
                data={weeklyData} 
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  opacity={0.3} 
                />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey={activeChart} 
                  stroke={activeOption?.color}
                  strokeWidth={3}
                  dot={{ 
                    fill: activeOption?.color, 
                    strokeWidth: 2, 
                    r: 4,
                    stroke: '#fff'
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: activeOption?.color, 
                    strokeWidth: 2,
                    fill: '#fff'
                  }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      {/* Weekly Summary - Fixed Height Footer */}
      <div className="flex-shrink-0 pt-4 border-t border-wellness-light min-h-[80px]">
        <div className="grid grid-cols-3 wellness-gap-sm text-center">
          <div className="space-y-1">
            <p className="wellness-text-secondary">This Week</p>
            <p className="wellness-text-accent text-constrained">
              {weeklyData
                ?.reduce((sum, day) => sum + day?.[activeChart], 0)
                ?.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="wellness-text-secondary">Daily Avg</p>
            <p className="wellness-text-accent text-constrained">
              {Math.round(weeklyData?.reduce((sum, day) => sum + day?.[activeChart], 0) / 7)?.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="wellness-text-secondary">Best Day</p>
            <p className="font-medium text-constrained" style={{ color: activeOption?.color }}>
              {weeklyData?.reduce((best, day) => 
                day?.[activeChart] > best?.[activeChart] ? day : best
              )?.day}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;