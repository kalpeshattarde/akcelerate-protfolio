import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialKPICard = ({ title, value, trend, trendValue, benchmark, icon, color = 'primary' }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getColorClasses = () => {
    const colors = {
      primary: 'border-primary/20 bg-primary/5',
      success: 'border-success/20 bg-success/5',
      warning: 'border-warning/20 bg-warning/5',
      destructive: 'border-destructive/20 bg-destructive/5'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className={`glass-card p-6 ${getColorClasses()} hover:shadow-elevated transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center`}>
            <Icon name={icon} size={20} className={`text-${color}`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              {trendValue && (
                <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
                  <Icon name={getTrendIcon()} size={16} />
                  <span className="text-sm font-medium">{trendValue}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {benchmark && (
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">vs Industry</span>
            <span className={`font-medium ${benchmark?.status === 'above' ? 'text-success' : benchmark?.status === 'below' ? 'text-destructive' : 'text-warning'}`}>
              {benchmark?.value}
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1.5 mt-2">
            <div 
              className={`h-1.5 rounded-full ${benchmark?.status === 'above' ? 'bg-success' : benchmark?.status === 'below' ? 'bg-destructive' : 'bg-warning'}`}
              style={{ width: `${benchmark?.percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialKPICard;