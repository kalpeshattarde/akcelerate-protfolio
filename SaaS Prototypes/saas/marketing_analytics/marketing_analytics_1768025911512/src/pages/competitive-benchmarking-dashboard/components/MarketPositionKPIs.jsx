import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketPositionKPIs = () => {
  const kpiData = [
    {
      id: 'market-share',
      title: 'Market Share',
      value: '12.4%',
      change: '+2.1%',
      trend: 'up',
      percentile: '75th',
      description: 'Industry position'
    },
    {
      id: 'cpl-ranking',
      title: 'CPL Ranking',
      value: '#3',
      change: '+1',
      trend: 'up',
      percentile: '82nd',
      description: 'Cost efficiency rank'
    },
    {
      id: 'brand-awareness',
      title: 'Brand Awareness',
      value: '68%',
      change: '+5%',
      trend: 'up',
      percentile: '71st',
      description: 'Consumer recognition'
    },
    {
      id: 'share-voice',
      title: 'Share of Voice',
      value: '15.8%',
      change: '-1.2%',
      trend: 'down',
      percentile: '65th',
      description: 'Market conversation'
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {kpiData?.map((kpi) => (
        <div
          key={kpi?.id}
          className="glass-card p-6 hover:shadow-elevated transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {kpi?.title}
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-foreground">
                  {kpi?.value}
                </span>
                <div className={`flex items-center space-x-1 ${getTrendColor(kpi?.trend)}`}>
                  <Icon 
                    name={getTrendIcon(kpi?.trend)} 
                    size={14} 
                    className={getTrendColor(kpi?.trend)}
                  />
                  <span className="text-sm font-medium">
                    {kpi?.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {kpi?.description}
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-xs font-medium text-primary">
                {kpi?.percentile}
              </span>
              <span className="text-xs text-muted-foreground">
                percentile
              </span>
            </div>
          </div>
          
          <div className="mt-3 w-full bg-muted/30 rounded-full h-1.5">
            <div 
              className="bg-gradient-primary h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${parseInt(kpi?.percentile)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketPositionKPIs;