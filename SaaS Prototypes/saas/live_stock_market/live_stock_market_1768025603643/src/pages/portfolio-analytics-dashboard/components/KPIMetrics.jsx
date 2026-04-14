import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIMetrics = ({ portfolioData }) => {
  const metrics = [
    {
      title: 'TOTAL VALUE',
      value: '₹12,58,473',
      change: '+₹45,623',
      percentage: '+3.76%',
      trend: 'up',
      icon: 'TrendingUp',
      bgColor: 'bg-primary'
    },
    {
      title: 'ABSOLUTE RETURNS',
      value: '₹2,58,473',
      change: '+₹12,450',
      percentage: '+5.06%',
      trend: 'up',
      icon: 'DollarSign',
      bgColor: 'bg-success'
    },
    {
      title: 'GAINS/LOSSES',
      value: '+25.84%',
      change: '+2.34%',
      percentage: 'vs benchmark',
      trend: 'up',
      icon: 'BarChart3',
      bgColor: 'bg-warning'
    },
    {
      title: 'SHARPE RATIO',
      value: '1.42',
      change: '+0.08',
      percentage: 'vs last month',
      trend: 'up',
      icon: 'Target',
      bgColor: 'bg-secondary'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics?.map((metric, index) => (
        <div 
          key={index} 
          className="bg-card brutalist-hover p-6 relative overflow-hidden border border-white"
        >
          {/* Remove the white corner triangle decoration */}
          
          <div className="flex items-center justify-between mb-4">
            <div className={`w-16 h-16 ${metric?.bgColor} flex items-center justify-center`}>
              <Icon 
                name={metric?.icon} 
                size={32} 
                className="text-white font-black"
              />
            </div>
            
            <div className="text-right">
              <div className={`font-black text-lg tracking-wider ${
                metric?.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                {metric?.percentage}
              </div>
              <div className="w-8 h-1 bg-border ml-auto mt-2"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-black text-card-foreground tracking-wider leading-tight">
              {metric?.title}
            </h3>
            <p className="text-2xl font-black text-card-foreground font-mono tracking-wider">
              {metric?.value}
            </p>
            <div className="flex items-center gap-2">
              <Icon 
                name={metric?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} 
                size={18}
                className={`font-black ${metric?.trend === 'up' ? 'text-success' : 'text-error'}`}
              />
              <span className={`text-base font-black tracking-wider ${
                metric?.trend === 'up' ? 'text-success' : 'text-error'
              }`}>
                {metric?.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIMetrics;