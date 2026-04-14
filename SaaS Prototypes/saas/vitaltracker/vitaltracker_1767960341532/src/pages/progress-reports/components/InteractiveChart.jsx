import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const InteractiveChart = ({ title, data, metrics, chartType = 'line' }) => {
  const [activeMetrics, setActiveMetrics] = useState(metrics?.slice(0, 2));
  const [currentChartType, setCurrentChartType] = useState(chartType);

  const chartTypes = [
    { type: 'line', icon: 'TrendingUp', label: 'Line Chart' },
    { type: 'area', icon: 'AreaChart', label: 'Area Chart' },
    { type: 'bar', icon: 'BarChart3', label: 'Bar Chart' }
  ];

  const metricColors = {
    steps: '#5DB075',
    calories: '#3B82F6',
    hydration: '#34D399',
    sleep: '#8B5CF6',
    weight: '#F59E0B',
    mood: '#EF4444'
  };

  const toggleMetric = (metric) => {
    setActiveMetrics(prev => 
      prev?.includes(metric) 
        ? prev?.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border/40 rounded-lg p-3 shadow-wellness elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (currentChartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {activeMetrics?.map((metric) => (
              <Area
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={metricColors?.[metric]}
                fill={metricColors?.[metric]}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {activeMetrics?.map((metric) => (
              <Bar
                key={metric}
                dataKey={metric}
                fill={metricColors?.[metric]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {activeMetrics?.map((metric) => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={metricColors?.[metric]}
                strokeWidth={3}
                dot={{ fill: metricColors?.[metric], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: metricColors?.[metric], strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2 border border-border/40">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">Interactive data visualization</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {chartTypes?.map((type) => (
            <Button
              key={type?.type}
              variant={currentChartType === type?.type ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentChartType(type?.type)}
              iconName={type?.icon}
              iconPosition="left"
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Active Metrics</h4>
        <div className="flex flex-wrap gap-2">
          {metrics?.map((metric) => (
            <button
              key={metric}
              onClick={() => toggleMetric(metric)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 touch-target
                ${activeMetrics?.includes(metric)
                  ? 'bg-primary text-primary-foreground shadow-wellness-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: metricColors?.[metric] }}
              />
              <span className="capitalize">{metric}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-border/40 space-y-3 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          Showing data for {activeMetrics?.length} metric{activeMetrics?.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Chart
          </Button>
          <Button variant="ghost" size="sm" iconName="Share2">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveChart;