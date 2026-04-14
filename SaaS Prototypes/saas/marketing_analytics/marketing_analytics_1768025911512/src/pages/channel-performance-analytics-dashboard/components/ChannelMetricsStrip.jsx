import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ChannelMetricsStrip = () => {
  const [animatedValues, setAnimatedValues] = useState({
    impressions: 0,
    clicks: 0,
    conversions: 0,
    roas: 0
  });

  const metricsData = [
    {
      id: 'impressions',
      title: 'Total Impressions',
      value: 2847293,
      change: 12.5,
      trend: 'up',
      icon: 'Eye',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      sparklineData: [45, 52, 48, 61, 58, 67, 72, 69, 75, 82, 78, 85],
      format: 'number'
    },
    {
      id: 'clicks',
      title: 'Total Clicks',
      value: 156847,
      change: 8.3,
      trend: 'up',
      icon: 'MousePointer',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      sparklineData: [32, 38, 35, 42, 39, 45, 48, 44, 51, 56, 53, 58],
      format: 'number'
    },
    {
      id: 'conversions',
      title: 'Conversions',
      value: 8934,
      change: -2.1,
      trend: 'down',
      icon: 'Target',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      sparklineData: [28, 32, 29, 35, 31, 38, 34, 30, 33, 29, 26, 31],
      format: 'number'
    },
    {
      id: 'roas',
      title: 'ROAS',
      value: 4.2,
      change: 15.7,
      trend: 'up',
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      sparklineData: [3.2, 3.5, 3.8, 4.1, 3.9, 4.3, 4.6, 4.2, 4.5, 4.8, 4.4, 4.7],
      format: 'decimal'
    }
  ];

  useEffect(() => {
    const animateCounters = () => {
      metricsData?.forEach((metric) => {
        let start = 0;
        const end = metric?.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [metric?.id]: start
          }));
        }, 16);
      });
    };

    animateCounters();
  }, []);

  const formatValue = (value, format) => {
    if (format === 'number') {
      return Math.floor(value)?.toLocaleString();
    } else if (format === 'decimal') {
      return value?.toFixed(1);
    }
    return value;
  };

  const renderSparkline = (data, color) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    const points = data?.map((value, index) => {
      const x = (index / (data?.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="opacity-70"
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricsData?.map((metric) => (
        <div
          key={metric?.id}
          className="glass-card p-6 hover:shadow-elevated transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric?.trend === 'up' ? 'text-success' : 'text-destructive'
            }`}>
              <Icon 
                name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{Math.abs(metric?.change)}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric?.title}
            </h3>
            <div className="text-2xl font-bold text-foreground">
              {formatValue(animatedValues?.[metric?.id], metric?.format)}
            </div>
          </div>

          <div className="mt-4 h-8">
            {renderSparkline(metric?.sparklineData, metric?.color?.replace('text-', 'var(--color-'))}
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            vs. previous period
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelMetricsStrip;