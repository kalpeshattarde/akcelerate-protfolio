import React from 'react';
import Icon from '../../../components/AppIcon';

const PipelineMetricsCards = () => {
  const metricsData = [
    {
      id: 1,
      title: "Pipeline Velocity",
      value: "18.5",
      unit: "days",
      change: -2.3,
      trend: "down",
      icon: "Zap",
      description: "Avg. deal cycle time",
      isRealTime: true,
      lastUpdate: "2s ago"
    },
    {
      id: 2,
      title: "Stage Conversion",
      value: "73.2",
      unit: "%",
      change: 5.8,
      trend: "up",
      icon: "TrendingUp",
      description: "Lead to opportunity",
      isRealTime: true,
      lastUpdate: "1s ago"
    },
    {
      id: 3,
      title: "Deal Aging Alerts",
      value: "24",
      unit: "deals",
      change: -3,
      trend: "down",
      icon: "AlertTriangle",
      description: "Stalled >30 days",
      isRealTime: true,
      lastUpdate: "3s ago",
      severity: "warning"
    },
    {
      id: 4,
      title: "Forecast Accuracy",
      value: "94.7",
      unit: "%",
      change: 1.2,
      trend: "up",
      icon: "Target",
      description: "This quarter",
      isRealTime: true,
      lastUpdate: "1s ago"
    },
    {
      id: 5,
      title: "Pipeline Value",
      value: "$2.4M",
      unit: "",
      change: 12.5,
      trend: "up",
      icon: "DollarSign",
      description: "Total weighted",
      isRealTime: true,
      lastUpdate: "2s ago"
    },
    {
      id: 6,
      title: "Win Rate",
      value: "68.3",
      unit: "%",
      change: -1.5,
      trend: "down",
      icon: "Award",
      description: "Last 30 days",
      isRealTime: true,
      lastUpdate: "4s ago"
    },
    {
      id: 7,
      title: "Active Deals",
      value: "147",
      unit: "deals",
      change: 8,
      trend: "up",
      icon: "Activity",
      description: "In progress",
      isRealTime: true,
      lastUpdate: "1s ago"
    },
    {
      id: 8,
      title: "Quota Attainment",
      value: "87.2",
      unit: "%",
      change: 3.4,
      trend: "up",
      icon: "BarChart3",
      description: "Month to date",
      isRealTime: true,
      lastUpdate: "2s ago"
    }
  ];

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'error':
        return 'border-error/20 bg-error/5';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
      {metricsData.map((metric) => (
        <div
          key={metric.id}
          className={`
            relative p-4 rounded-lg border transition-all duration-200 hover:shadow-card
            ${getSeverityColor(metric.severity)}
          `}
        >
          {/* Real-time indicator */}
          {metric.isRealTime && (
            <div className="absolute top-2 right-2 flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs text-text-secondary">{metric.lastUpdate}</span>
            </div>
          )}

          {/* Icon */}
          <div className="flex items-center justify-between mb-3">
            <div className={`
              p-2 rounded-lg
              ${metric.severity === 'warning' ? 'bg-warning/10' : 
                metric.severity === 'error' ? 'bg-error/10' : 'bg-primary/10'}
            `}>
              <Icon 
                name={metric.icon} 
                size={16} 
                className={`
                  ${metric.severity === 'warning' ? 'text-warning' : 
                    metric.severity === 'error' ? 'text-error' : 'text-primary'}
                `}
              />
            </div>
          </div>

          {/* Value */}
          <div className="mb-2">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-text-primary">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-sm text-text-secondary">
                  {metric.unit}
                </span>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <div className="mb-3">
            <h3 className="text-sm font-medium text-text-primary mb-1">
              {metric.title}
            </h3>
            <p className="text-xs text-text-secondary">
              {metric.description}
            </p>
          </div>

          {/* Change indicator */}
          <div className="flex items-center space-x-1">
            <Icon 
              name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
              className={getTrendColor(metric.trend)}
            />
            <span className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PipelineMetricsCards;