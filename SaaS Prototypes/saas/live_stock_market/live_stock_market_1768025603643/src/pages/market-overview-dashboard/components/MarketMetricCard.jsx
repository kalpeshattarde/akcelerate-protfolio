import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketMetricCard = ({ 
  title, 
  value, 
  change, 
  changePercent, 
  sparklineData = [], 
  isPositive = true,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-20 mb-2"></div>
        <div className="h-8 bg-muted rounded w-24 mb-2"></div>
        <div className="h-4 bg-muted rounded w-16"></div>
      </div>
    );
  }

  const generateSparklinePath = (data) => {
    if (!data || data?.length === 0) return '';
    
    // Proper dimensions with safe boundaries
    const svgWidth = 48;
    const svgHeight = 16;
    const padding = 3; // Increased padding for stroke safety
    const actualWidth = svgWidth - (padding * 2);
    const actualHeight = svgHeight - (padding * 2);
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return data?.map((point, index) => {
        const x = padding + (index / (data?.length - 1)) * actualWidth;
        const y = padding + actualHeight - ((point - min) / range) * actualHeight;
        return `${index === 0 ? 'M' : 'L'} ${x?.toFixed(2)} ${y?.toFixed(2)}`;
      })?.join(' ');
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
      isPositive ? 'border-l-4 border-l-success' : 'border-l-4 border-l-error'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground truncate pr-2">{title}</h3>
        <div className={`p-1 rounded-full flex-shrink-0 ${isPositive ? 'bg-success/10' : 'bg-error/10'}`}>
          <Icon 
            name={isPositive ? "TrendingUp" : "TrendingDown"} 
            size={12} 
            className={isPositive ? 'text-success' : 'text-error'} 
          />
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-2xl font-bold text-foreground font-mono truncate">
            {value}
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? '+' : ''}{change}
            </span>
            <span className={`text-xs ${isPositive ? 'text-success' : 'text-error'}`}>
              ({isPositive ? '+' : ''}{changePercent}%)
            </span>
          </div>
        </div>
        
        {sparklineData?.length > 0 && (
          <div className="flex-shrink-0">
            <div className="w-12 h-4 relative">
              <svg 
                width="48" 
                height="16" 
                viewBox="0 0 48 16"
                className="absolute inset-0 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <clipPath id={`clip-${title?.replace(/\s+/g, '-')}`}>
                    <rect x="0" y="0" width="48" height="16" />
                  </clipPath>
                </defs>
                <path
                  d={generateSparklinePath(sparklineData)}
                  stroke={isPositive ? 'rgb(46, 125, 50)' : 'rgb(198, 40, 40)'}
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  clipPath={`url(#clip-${title?.replace(/\s+/g, '-')})`}
                  className="drop-shadow-sm"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketMetricCard;