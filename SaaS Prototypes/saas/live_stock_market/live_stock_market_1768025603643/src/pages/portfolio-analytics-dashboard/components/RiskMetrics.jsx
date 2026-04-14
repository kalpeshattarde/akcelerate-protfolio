import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskMetrics = () => {
  const riskData = [
    {
      label: 'VALUE AT RISK',
      value: '₹125,847',
      percentage: '10.0%',
      status: 'HIGH',
      color: 'bg-error',
      icon: 'AlertTriangle'
    },
    {
      label: 'MAX DRAWDOWN',
      value: '-18.5%',
      description: 'PEAK TO TROUGH',
      status: 'MODERATE',
      color: 'bg-warning',
      icon: 'TrendingDown'
    },
    {
      label: 'VOLATILITY',
      value: '24.3%',
      description: 'ANNUAL STDDEV',
      status: 'HIGH',
      color: 'bg-error',
      icon: 'Activity'
    },
    {
      label: 'BETA',
      value: '1.15',
      description: 'VS MARKET',
      status: 'MODERATE',
      color: 'bg-warning',
      icon: 'BarChart2'
    }
  ];

  const riskScore = {
    score: 7.2,
    level: 'HIGH RISK',
    color: 'text-error'
  };

  return (
    <div className="bg-card brutalist-border brutalist-shadow p-6">
      {/* HEADER */}
      <div className="border-l-8 border-error pl-4 mb-6">
        <h2 className="text-xl font-black text-card-foreground tracking-wider">RISK</h2>
        <h3 className="text-lg font-black text-error tracking-wider">METRICS</h3>
      </div>

      {/* RISK SCORE */}
      <div className="bg-background brutalist-border p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-black text-foreground tracking-wider mb-2">
              OVERALL RISK SCORE
            </div>
            <div className="text-4xl font-black font-mono text-error tracking-wider">
              {riskScore?.score}/10
            </div>
          </div>
          <div className="text-right">
            <div className="w-12 h-12 bg-error flex items-center justify-center brutalist-border-thin mb-2">
              <Icon name="AlertTriangle" size={24} className="text-error-foreground" />
            </div>
            <div className="text-base font-black text-error tracking-wider">
              {riskScore?.level}
            </div>
          </div>
        </div>
        
        {/* Visual Risk Bar */}
        <div className="mt-4">
          <div className="w-full h-4 bg-muted brutalist-border-thin">
            <div 
              className="h-full bg-error brutalist-border-thin"
              style={{ width: `${(riskScore?.score / 10) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs font-black text-foreground">
            <span>LOW</span>
            <span>MODERATE</span>
            <span>HIGH</span>
          </div>
        </div>
      </div>

      {/* RISK METRICS */}
      <div className="grid grid-cols-1 gap-3">
        {riskData?.map((metric, index) => (
          <div key={index} className="bg-background brutalist-border-thin p-4 brutalist-hover">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${metric?.color} flex items-center justify-center brutalist-border-thin`}>
                  <Icon 
                    name={metric?.icon} 
                    size={16} 
                    className="text-white"
                  />
                </div>
                <div>
                  <div className="text-xs font-black text-foreground tracking-wider">
                    {metric?.label}
                  </div>
                  {metric?.description && (
                    <div className="text-xs font-bold text-muted-foreground">
                      {metric?.description}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-black font-mono text-foreground">
                  {metric?.value}
                </div>
                <div className={`text-xs font-black tracking-wider ${
                  metric?.status === 'HIGH' ? 'text-error' :
                  metric?.status === 'MODERATE' ? 'text-warning' : 'text-success'
                }`}>
                  {metric?.status}
                </div>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex justify-end">
              <div className={`w-16 h-1 ${metric?.color}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* RISK ANALYSIS */}
      <div className="mt-8 pt-6 border-t-4 border-border">
        <div className="bg-error brutalist-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="AlertCircle" size={24} className="text-error-foreground" />
            <span className="text-lg font-black text-error-foreground tracking-wider">
              RISK ALERT
            </span>
          </div>
          <p className="font-bold text-error-foreground text-xs leading-tight">
            HIGH VOLATILITY DETECTED. PORTFOLIO EXCEEDS RECOMMENDED RISK THRESHOLDS. 
            CONSIDER REBALANCING OR RISK HEDGING STRATEGIES.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;