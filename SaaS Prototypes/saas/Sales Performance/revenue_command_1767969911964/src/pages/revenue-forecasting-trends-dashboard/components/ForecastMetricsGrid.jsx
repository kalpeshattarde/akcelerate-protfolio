import React from 'react';
import Icon from '../../../components/AppIcon';

const ForecastMetricsGrid = () => {
  const metrics = [
    {
      id: 'accuracy',
      title: 'Forecast Accuracy',
      value: '87.3%',
      change: '+2.1%',
      trend: 'up',
      description: 'Model prediction accuracy over last 6 months',
      icon: 'Target',
      color: 'success',
      details: [
        { label: 'MAE', value: '$234K' },
        { label: 'RMSE', value: '$412K' },
        { label: 'MAPE', value: '12.7%' }
      ]
    },
    {
      id: 'seasonal',
      title: 'Seasonal Trends',
      value: 'Q4 Peak',
      change: '+18%',
      trend: 'up',
      description: 'Quarterly revenue pattern analysis',
      icon: 'Calendar',
      color: 'primary',
      details: [
        { label: 'Q1 Avg', value: '$2.1M' },
        { label: 'Q4 Avg', value: '$3.2M' },
        { label: 'Seasonality', value: '52%' }
      ]
    },
    {
      id: 'growth',
      title: 'YoY Growth Rate',
      value: '+24.5%',
      change: '+3.2%',
      trend: 'up',
      description: 'Year-over-year revenue growth trajectory',
      icon: 'TrendingUp',
      color: 'success',
      details: [
        { label: 'Current YoY', value: '24.5%' },
        { label: 'Projected YoY', value: '27.8%' },
        { label: 'Industry Avg', value: '18.2%' }
      ]
    },
    {
      id: 'coverage',
      title: 'Pipeline Coverage',
      value: '2.3x',
      change: '-0.2x',
      trend: 'down',
      description: 'Pipeline value vs quarterly target ratio',
      icon: 'Layers',
      color: 'warning',
      details: [
        { label: 'Target', value: '$8.5M' },
        { label: 'Pipeline', value: '$19.6M' },
        { label: 'Weighted', value: '$12.1M' }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      success: 'text-success bg-success/10 border-success/20',
      primary: 'text-primary bg-primary/10 border-primary/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      error: 'text-error bg-error/10 border-error/20'
    };
    return colors[color] || colors.primary;
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-card transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
              <Icon name={metric.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor(metric.trend)}`}>
              <Icon name={getTrendIcon(metric.trend)} size={14} />
              <span className="font-medium">{metric.change}</span>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="text-sm font-medium text-text-secondary mb-1">{metric.title}</h3>
            <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
          </div>

          <p className="text-sm text-text-secondary mb-4">{metric.description}</p>

          <div className="space-y-2">
            {metric.details.map((detail, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">{detail.label}:</span>
                <span className="font-medium text-text-primary">{detail.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors">
              <span>View Details</span>
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastMetricsGrid;