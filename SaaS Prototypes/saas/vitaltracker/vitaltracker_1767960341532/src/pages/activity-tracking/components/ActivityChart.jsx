import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const ActivityChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { name: 'Mon', steps: 8500, calories: 420, duration: 45 },
    { name: 'Tue', steps: 12000, calories: 580, duration: 60 },
    { name: 'Wed', steps: 6800, calories: 340, duration: 30 },
    { name: 'Thu', steps: 15000, calories: 720, duration: 75 },
    { name: 'Fri', steps: 9200, calories: 460, duration: 50 },
    { name: 'Sat', steps: 18000, calories: 850, duration: 90 },
    { name: 'Sun', steps: 14500, calories: 680, duration: 70 }
  ];

  const monthlyData = [
    { name: 'Week 1', steps: 65000, calories: 3200, duration: 350 },
    { name: 'Week 2', steps: 72000, calories: 3600, duration: 380 },
    { name: 'Week 3', steps: 58000, calories: 2900, duration: 320 },
    { name: 'Week 4', steps: 81000, calories: 4050, duration: 420 }
  ];

  const dailyData = [
    { name: '6 AM', steps: 0, calories: 0, duration: 0 },
    { name: '9 AM', steps: 2500, calories: 120, duration: 15 },
    { name: '12 PM', steps: 5800, calories: 280, duration: 30 },
    { name: '3 PM', steps: 8200, calories: 400, duration: 45 },
    { name: '6 PM', steps: 12500, calories: 620, duration: 65 },
    { name: '9 PM', steps: 15000, calories: 750, duration: 80 }
  ];

  const getChartData = () => {
    switch (timeRange) {
      case 'day': return dailyData;
      case 'month': return monthlyData;
      default: return weeklyData;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border/40 rounded-lg p-3 shadow-wellness elevation-2">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground capitalize">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">
                {entry?.value?.toLocaleString()}
                {entry?.dataKey === 'steps' ? ' steps' : 
                 entry?.dataKey === 'calories' ? ' cal' : ' min'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 border border-border/40">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Activity Trends</h3>
            <p className="text-sm text-muted-foreground">
              Track your progress over time
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Time Range Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { key: 'day', label: 'Day', icon: 'Clock' },
              { key: 'week', label: 'Week', icon: 'Calendar' },
              { key: 'month', label: 'Month', icon: 'CalendarDays' }
            ]?.map((range) => (
              <button
                key={range?.key}
                onClick={() => setTimeRange(range?.key)}
                className={`
                  flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${timeRange === range?.key 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={range?.icon} size={14} />
                <span>{range?.label}</span>
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`
                p-2 rounded-md transition-all duration-200
                ${chartType === 'line' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`
                p-2 rounded-md transition-all duration-200
                ${chartType === 'bar' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="steps" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-secondary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="duration" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="steps" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="calories" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="duration" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border/40">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Steps</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-muted-foreground">Calories</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Duration (min)</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;