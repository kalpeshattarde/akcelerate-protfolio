import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const SleepTrendChart = ({ sleepData }) => {
  const [chartType, setChartType] = useState('duration'); // 'duration', 'quality', 'consistency'
  const [timeRange, setTimeRange] = useState('week'); // 'week', 'month'

  const getChartData = () => {
    const dataRange = timeRange === 'week' ? sleepData?.slice(-7) : sleepData?.slice(-30);
    
    return dataRange?.map(sleep => ({
      date: new Date(sleep.date)?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      fullDate: sleep?.date,
      duration: parseFloat(sleep?.duration?.replace('h', '')),
      quality: sleep?.quality,
      consistency: sleep?.consistency || 85,
      bedtime: sleep?.bedtime,
      wakeTime: sleep?.wakeTime
    }));
  };

  const chartData = getChartData();

  const getChartConfig = () => {
    switch (chartType) {
      case 'duration':
        return {
          dataKey: 'duration',
          color: '#5DB075',
          name: 'Sleep Duration (hours)',
          unit: 'h'
        };
      case 'quality':
        return {
          dataKey: 'quality',
          color: '#3B82F6',
          name: 'Sleep Quality',
          unit: '%'
        };
      case 'consistency':
        return {
          dataKey: 'consistency',
          color: '#34D399',
          name: 'Sleep Consistency',
          unit: '%'
        };
      default:
        return {
          dataKey: 'duration',
          color: '#5DB075',
          name: 'Sleep Duration (hours)',
          unit: 'h'
        };
    }
  };

  const config = getChartConfig();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border/40 rounded-lg p-3 shadow-wellness elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium" style={{ color: config?.color }}>
              {config?.name}: {payload?.[0]?.value}{config?.unit}
            </span>
          </p>
          {chartType === 'duration' && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p>Bedtime: {new Date(`2000-01-01T${data.bedtime}`)?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
              <p>Wake: {new Date(`2000-01-01T${data.wakeTime}`)?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const getAverageValue = () => {
    const values = chartData?.map(item => item?.[config?.dataKey]);
    const average = values?.reduce((sum, val) => sum + val, 0) / values?.length;
    return average?.toFixed(1);
  };

  const getTrendDirection = () => {
    if (chartData?.length < 2) return 'stable';
    const firstValue = chartData?.[0]?.[config?.dataKey];
    const lastValue = chartData?.[chartData?.length - 1]?.[config?.dataKey];
    const difference = lastValue - firstValue;
    
    if (Math.abs(difference) < 0.1) return 'stable';
    return difference > 0 ? 'up' : 'down';
  };

  const trendDirection = getTrendDirection();
  const trendIcon = trendDirection === 'up' ? 'TrendingUp' : trendDirection === 'down' ? 'TrendingDown' : 'Minus';
  const trendColor = trendDirection === 'up' ? 'text-success' : trendDirection === 'down' ? 'text-error' : 'text-muted-foreground';

  return (
    <div className="bg-card rounded-xl p-6 shadow-wellness elevation-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sleep Trends</h3>
            <p className="text-sm text-muted-foreground">
              {timeRange === 'week' ? 'Last 7 days' : 'Last 30 days'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={chartType}
            onChange={(e) => setChartType(e?.target?.value)}
            className="px-3 py-1 text-sm bg-muted/50 border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="duration">Duration</option>
            <option value="quality">Quality</option>
            <option value="consistency">Consistency</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="px-3 py-1 text-sm bg-muted/50 border border-border/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-foreground">
            {getAverageValue()}{config?.unit}
          </div>
          <div className="text-sm text-muted-foreground">Average {config?.name?.split(' ')?.[1]}</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className={`flex items-center justify-center space-x-1 text-2xl font-bold ${trendColor}`}>
            <Icon name={trendIcon} size={20} />
            <span>Trend</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {trendDirection === 'up' ? 'Improving' : trendDirection === 'down' ? 'Declining' : 'Stable'}
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'consistency' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={config?.dataKey} 
                fill={config?.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={config?.dataKey} 
                stroke={config?.color}
                strokeWidth={3}
                dot={{ fill: config?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: config?.color, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SleepTrendChart;