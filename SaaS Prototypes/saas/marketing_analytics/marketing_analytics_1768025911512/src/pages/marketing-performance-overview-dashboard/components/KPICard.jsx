import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, trend, isLoading }) => {
  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000)?.toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000)?.toFixed(1)}K`;
      }
      return val?.toLocaleString();
    }
    return val;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="glass-card p-6 hover:shadow-elevated transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
          <span className={`text-xs font-medium ${getChangeColor()}`}>
            {change}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <div className="h-8 w-24 bg-muted/20 rounded animate-pulse" />
          ) : (
            <span className="text-2xl font-bold text-foreground">
              {formatValue(value)}
            </span>
          )}
        </div>
        
        {trend && (
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-1 bg-muted/20 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  changeType === 'positive' ? 'bg-success' : 
                  changeType === 'negative' ? 'bg-destructive' : 'bg-muted-foreground'
                }`}
                style={{ width: `${Math.abs(change)}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;