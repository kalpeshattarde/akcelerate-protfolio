import React from 'react';
import Icon from '../../../components/AppIcon';

const BenchmarkComparisonBars = () => {
  const benchmarkData = [
    {
      metric: 'Cost Per Lead (CPL)',
      ourValue: 24.50,
      unit: '$',
      quartiles: {
        top: 18.20,
        median: 28.40,
        bottom: 35.60
      },
      position: 'top',
      improvement: '+15% vs median'
    },
    {
      metric: 'Conversion Rate',
      ourValue: 3.8,
      unit: '%',
      quartiles: {
        top: 4.2,
        median: 2.9,
        bottom: 1.8
      },
      position: 'median',
      improvement: '+31% vs median'
    },
    {
      metric: 'Customer Acquisition Cost',
      ourValue: 142,
      unit: '$',
      quartiles: {
        top: 98,
        median: 156,
        bottom: 220
      },
      position: 'median',
      improvement: '+9% vs median'
    },
    {
      metric: 'Return on Ad Spend',
      ourValue: 4.2,
      unit: 'x',
      quartiles: {
        top: 5.1,
        median: 3.4,
        bottom: 2.1
      },
      position: 'median',
      improvement: '+24% vs median'
    },
    {
      metric: 'Click-Through Rate',
      ourValue: 2.1,
      unit: '%',
      quartiles: {
        top: 2.8,
        median: 1.9,
        bottom: 1.2
      },
      position: 'median',
      improvement: '+11% vs median'
    },
    {
      metric: 'Lead Quality Score',
      ourValue: 78,
      unit: '/100',
      quartiles: {
        top: 85,
        median: 72,
        bottom: 58
      },
      position: 'median',
      improvement: '+8% vs median'
    }
  ];

  const getPositionColor = (position) => {
    switch (position) {
      case 'top':
        return 'text-success';
      case 'median':
        return 'text-warning';
      case 'bottom':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPositionBadge = (position) => {
    switch (position) {
      case 'top':
        return { label: 'Top Quartile', color: 'bg-success/20 text-success border-success/30' };
      case 'median':
        return { label: 'Above Median', color: 'bg-warning/20 text-warning border-warning/30' };
      case 'bottom':
        return { label: 'Below Median', color: 'bg-destructive/20 text-destructive border-destructive/30' };
      default:
        return { label: 'Unknown', color: 'bg-muted/20 text-muted-foreground border-muted/30' };
    }
  };

  const calculatePosition = (value, quartiles, isReverse = false) => {
    const max = Math.max(quartiles?.top, quartiles?.median, quartiles?.bottom, value);
    const min = Math.min(quartiles?.top, quartiles?.median, quartiles?.bottom, value);
    const range = max - min;
    
    return ((value - min) / range) * 100;
  };

  const generateScaleMarkers = (item) => {
    const values = [item?.quartiles?.top, item?.quartiles?.median, item?.quartiles?.bottom, item?.ourValue];
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    
    // Create 5 evenly spaced markers
    const markers = [];
    for (let i = 0; i <= 4; i++) {
      const value = min + (range * i / 4);
      markers?.push({
        value: parseFloat(value?.toFixed(2)),
        position: (i / 4) * 100
      });
    }
    
    return markers;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Industry Benchmark Comparison
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Top Quartile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Median</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Bottom Quartile</span>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {benchmarkData?.map((item, index) => {
          const badge = getPositionBadge(item?.position);
          const ourPosition = calculatePosition(item?.ourValue, item?.quartiles);
          const scaleMarkers = generateScaleMarkers(item);
          
          return (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-foreground">
                    {item?.metric}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${badge?.color}`}>
                    {badge?.label}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-bold text-foreground">
                    {item?.unit === '$' ? '$' : ''}{item?.ourValue}{item?.unit !== '$' ? item?.unit : ''}
                  </span>
                  <span className={`text-xs font-medium ${getPositionColor(item?.position)}`}>
                    {item?.improvement}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                {/* Scale markers above the bar */}
                <div className="flex justify-between mb-1">
                  {scaleMarkers?.map((marker, markerIndex) => (
                    <div 
                      key={markerIndex} 
                      className="text-xs text-muted-foreground/70 font-mono"
                      style={{ position: 'absolute', left: `${marker?.position}%`, transform: 'translateX(-50%)' }}
                    >
                      {item?.unit === '$' ? '$' : ''}{marker?.value}{item?.unit !== '$' ? item?.unit : ''}
                    </div>
                  ))}
                </div>
                
                {/* Scale tick marks */}
                <div className="flex justify-between mb-2" style={{ height: '4px' }}>
                  {scaleMarkers?.map((marker, markerIndex) => (
                    <div 
                      key={markerIndex} 
                      className="w-px bg-border"
                      style={{ 
                        position: 'absolute', 
                        left: `${marker?.position}%`, 
                        height: '4px',
                        transform: 'translateX(-50%)'
                      }}
                    />
                  ))}
                </div>

                {/* Background bar with quartile zones */}
                <div className="h-8 bg-muted/20 rounded-lg overflow-hidden relative">
                  <div className="flex h-full">
                    <div className="flex-1 bg-success/20" />
                    <div className="flex-1 bg-warning/20" />
                    <div className="flex-1 bg-destructive/20" />
                  </div>
                  
                  {/* Value labels on the bar */}
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <span className="text-xs font-medium text-success">
                      {item?.unit === '$' ? '$' : ''}{item?.quartiles?.top}{item?.unit !== '$' ? item?.unit : ''}
                    </span>
                    <span className="text-xs font-medium text-warning">
                      {item?.unit === '$' ? '$' : ''}{item?.quartiles?.median}{item?.unit !== '$' ? item?.unit : ''}
                    </span>
                    <span className="text-xs font-medium text-destructive">
                      {item?.unit === '$' ? '$' : ''}{item?.quartiles?.bottom}{item?.unit !== '$' ? item?.unit : ''}
                    </span>
                  </div>
                </div>

                {/* Our position indicator */}
                <div 
                  className="absolute top-6 h-8 w-1 bg-primary rounded-full shadow-lg z-10"
                  style={{ left: `${ourPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                  {/* Our value label */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                    {item?.unit === '$' ? '$' : ''}{item?.ourValue}{item?.unit !== '$' ? item?.unit : ''}
                  </div>
                </div>

                {/* Bottom quartile labels */}
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Top Quartile</span>
                  <span className="font-medium">Median</span>
                  <span className="font-medium">Bottom Quartile</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">
              Overall performance: <span className="font-medium text-success">Above industry median</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-primary cursor-pointer hover:text-primary/80 transition-colors">
            <Icon name="Download" size={14} />
            <span className="text-sm">Export benchmark report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkComparisonBars;