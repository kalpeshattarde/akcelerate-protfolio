import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const KPIWidget = ({ 
  title, 
  value, 
  unit, 
  change, 
  trend, 
  icon, 
  color = 'primary',
  isLoading = false,
  onRefresh,
  onDrillDown 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animateValue, setAnimateValue] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setAnimateValue(true);
      const timer = setTimeout(() => setAnimateValue(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 1500);
    }
  };

  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'text-primary bg-primary/10 border-primary/20',
      success: 'text-success bg-success/10 border-success/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up' && change > 0) return 'text-success';
    if (trend === 'down' && change < 0) return 'text-error';
    if (trend === 'up' && change < 0) return 'text-error';
    if (trend === 'down' && change > 0) return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-card transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          {isRefreshing ? (
            <Icon name="Loader2" size={24} className="animate-spin" />
          ) : (
            <Icon name={icon} size={24} />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted transition-all duration-200"
            title="Refresh data"
          >
            <Icon name="RefreshCw" size={16} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
          {onDrillDown && (
            <button
              onClick={onDrillDown}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-muted transition-all duration-200"
              title="View details"
            >
              <Icon name="ExternalLink" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>

      {/* Value */}
      <div className="flex items-baseline space-x-2 mb-3">
        <span className={`text-3xl font-bold text-foreground transition-all duration-600 ${
          animateValue ? 'scale-105' : 'scale-100'
        }`}>
          {isLoading ? (
            <div className="w-20 h-8 bg-muted animate-pulse rounded" />
          ) : (
            value?.toLocaleString()
          )}
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>

      {/* Change Indicator */}
      {change !== undefined && (
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-sm font-medium">
              {Math.abs(change)}%
            </span>
          </div>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-card/80 rounded-lg flex items-center justify-center">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Loader2" size={16} className="animate-spin" />
            <span className="text-sm">Updating...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIWidget;