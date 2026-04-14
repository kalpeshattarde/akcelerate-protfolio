import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, target, icon, color = 'primary' }) => {
  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `$${(val / 1000).toFixed(0)}K`;
      }
      return `$${val.toLocaleString()}`;
    }
    return val;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 bg-${color}/10 rounded-lg`}>
            <Icon name={icon} size={24} className={`text-${color}`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
            <div className="text-2xl font-bold text-text-primary mt-1">
              {formatValue(value)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon 
            name={getChangeIcon()} 
            size={16} 
            className={getChangeColor()}
          />
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
          <span className="text-sm text-text-secondary">vs target</span>
        </div>
        
        {target && (
          <div className="text-right">
            <div className="text-xs text-text-secondary">Target</div>
            <div className="text-sm font-medium text-text-primary">
              {formatValue(target)}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar for target achievement */}
      {target && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{Math.round((value / target) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                (value / target) >= 1 ? 'bg-success' : 
                (value / target) >= 0.8 ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${Math.min((value / target) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;