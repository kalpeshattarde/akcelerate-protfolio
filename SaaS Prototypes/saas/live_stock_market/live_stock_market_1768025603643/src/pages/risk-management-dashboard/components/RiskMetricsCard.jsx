import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskMetricsCard = ({ title, value, change, threshold, status, icon, description }) => {
  const getStatusColor = () => {
    // Remove white card background, use transparent/background color instead with thin white border
    return 'bg-transparent text-foreground border border-white';
  };

  const getChangeColor = () => {
    if (change > 0) return 'text-loss';
    if (change < 0) return 'text-profit';
    return 'text-muted-foreground';
  };

  const getProgressWidth = () => {
    if (!threshold) return 0;
    return Math.min(100, (parseFloat(value?.replace('%', '')) / parseFloat(threshold?.replace('%', ''))) * 100);
  };

  return (
    <div className={`transition-all duration-100 ${getStatusColor()}`}>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-foreground flex items-center justify-center">
              <Icon name={icon} size={24} className="text-background" />
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-wide text-current brutalist-heading mb-1">
                {title}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-current opacity-75 brutalist-text">
                {description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-current brutalist-mono mb-1">
              {value}
            </div>
            {change !== undefined && (
              <div className={`text-sm font-black brutalist-mono ${getChangeColor()}`}>
                {change > 0 ? '+' : ''}{change?.toFixed(2)}%
              </div>
            )}
          </div>
        </div>

        {/* Threshold Progress Bar */}
        {threshold && (
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-current opacity-75">
              <span className="brutalist-text">THRESHOLD</span>
              <span className="brutalist-mono">{threshold}</span>
            </div>
            <div className="relative">
              <div className="w-full h-4 bg-muted/50">
                <div 
                  className="h-full bg-foreground transition-all duration-300 border-r-0"
                  style={{ width: `${getProgressWidth()}%` }}
                />
              </div>
              {/* Progress indicator */}
              <div 
                className="absolute top-0 w-1 h-4 bg-current opacity-50"
                style={{ left: `${getProgressWidth()}%` }}
              />
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-current opacity-75 brutalist-text">
              {getProgressWidth()?.toFixed(1)}% OF LIMIT
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskMetricsCard;