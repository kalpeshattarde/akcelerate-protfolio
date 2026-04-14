import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, onClick, loading = false }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 shadow-soft transition-smooth hover:shadow-elevated ${
        onClick ? 'cursor-pointer hover:border-accent' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {onClick && (
          <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
        )}
      </div>
      
      <div className="space-y-2">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-24 mb-2"></div>
            <div className="h-4 bg-muted rounded w-16"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-text-primary">{value}</div>
            {change && (
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
                <Icon name={getChangeIcon()} size={14} />
                <span>{change}</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default KPICard;