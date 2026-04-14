import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIMetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  trend, 
  icon, 
  format = 'currency',
  sparklineData = []
}) => {
  const formatValue = (val) => {
    if (format === 'currency') {
      return `$${val.toLocaleString()}`;
    } else if (format === 'percentage') {
      return `${val}%`;
    } else if (format === 'number') {
      return val.toLocaleString();
    } else if (format === 'days') {
      return `${val} days`;
    }
    return val;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const generateSparklinePath = () => {
    if (!sparklineData.length) return '';
    
    const width = 60;
    const height = 20;
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    
    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return `M ${points.replace(/,/g, ' L ').replace(' L ', ' ')}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
          </div>
        </div>
        
        {sparklineData.length > 0 && (
          <div className="flex items-center">
            <svg width="60" height="20" className="text-primary">
              <path
                d={generateSparklinePath()}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-60"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold text-text-primary">
          {formatValue(value)}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-sm font-medium">
              {Math.abs(change)}%
            </span>
          </div>
          <span className="text-sm text-text-secondary">vs last period</span>
        </div>
      </div>
    </div>
  );
};

export default KPIMetricCard;