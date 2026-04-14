import React from 'react';
import Icon from '../../../components/AppIcon';

const RegionalPerformance = () => {
  const regionalData = [
    {
      id: 1,
      region: 'North America',
      revenue: 8500000,
      target: 8000000,
      achievement: 106.3,
      trend: 'up',
      status: 'success',
      deals: 142,
      reps: 28
    },
    {
      id: 2,
      region: 'Europe',
      revenue: 6200000,
      target: 6500000,
      achievement: 95.4,
      trend: 'up',
      status: 'warning',
      deals: 98,
      reps: 22
    },
    {
      id: 3,
      region: 'Asia Pacific',
      revenue: 4800000,
      target: 5200000,
      achievement: 92.3,
      trend: 'down',
      status: 'warning',
      deals: 76,
      reps: 18
    },
    {
      id: 4,
      region: 'Latin America',
      revenue: 2100000,
      target: 2500000,
      achievement: 84.0,
      trend: 'down',
      status: 'error',
      deals: 34,
      reps: 12
    },
    {
      id: 5,
      region: 'Middle East & Africa',
      revenue: 1800000,
      target: 2000000,
      achievement: 90.0,
      trend: 'up',
      status: 'warning',
      deals: 28,
      reps: 8
    }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'success': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-error/10';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Regional Performance</h3>
          <p className="text-sm text-text-secondary">Revenue achievement by territory</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full" />
          <span className="text-xs text-text-secondary mr-3">On Target</span>
          <div className="w-3 h-3 bg-warning rounded-full" />
          <span className="text-xs text-text-secondary mr-3">At Risk</span>
          <div className="w-3 h-3 bg-error rounded-full" />
          <span className="text-xs text-text-secondary">Behind</span>
        </div>
      </div>

      <div className="space-y-4">
        {regionalData.map((region) => (
          <div 
            key={region.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className={`w-3 h-3 rounded-full ${getStatusBg(region.status)}`}>
                <div className={`w-full h-full rounded-full ${getStatusColor(region.status).replace('text-', 'bg-')}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary">{region.region}</h4>
                  <Icon 
                    name={getTrendIcon(region.trend)} 
                    size={14} 
                    className={getTrendColor(region.trend)}
                  />
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>{region.deals} deals</span>
                  <span>•</span>
                  <span>{region.reps} reps</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="font-semibold text-text-primary">
                  {formatCurrency(region.revenue)}
                </div>
                <div className="text-sm text-text-secondary">
                  of {formatCurrency(region.target)}
                </div>
              </div>
              
              <div className="text-right min-w-[60px]">
                <div className={`font-bold text-lg ${getStatusColor(region.status)}`}>
                  {region.achievement}%
                </div>
                <div className="text-xs text-text-secondary">achievement</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-success">1</div>
            <div className="text-sm text-text-secondary">Exceeding</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">2</div>
            <div className="text-sm text-text-secondary">At Risk</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-error">2</div>
            <div className="text-sm text-text-secondary">Behind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalPerformance;