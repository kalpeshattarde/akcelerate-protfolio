import React from 'react';
import Icon from '../../../components/AppIcon';

const BenchmarkBars = () => {
  const benchmarkData = [
    {
      metric: 'Cost Per Lead',
      brandValue: 45,
      industryQuartiles: {
        q1: 25,
        q2: 35,
        q3: 50,
        q4: 75
      },
      unit: '$',
      status: 'good'
    },
    {
      metric: 'Customer Acquisition Cost',
      brandValue: 180,
      industryQuartiles: {
        q1: 120,
        q2: 160,
        q3: 200,
        q4: 280
      },
      unit: '$',
      status: 'average'
    },
    {
      metric: 'Return on Ad Spend',
      brandValue: 4.2,
      industryQuartiles: {
        q1: 2.5,
        q2: 3.2,
        q3: 4.0,
        q4: 5.5
      },
      unit: 'x',
      status: 'good'
    },
    {
      metric: 'Conversion Rate',
      brandValue: 2.8,
      industryQuartiles: {
        q1: 1.5,
        q2: 2.2,
        q3: 3.0,
        q4: 4.2
      },
      unit: '%',
      status: 'average'
    },
    {
      metric: 'Lead Quality Score',
      brandValue: 78,
      industryQuartiles: {
        q1: 60,
        q2: 70,
        q3: 80,
        q4: 90
      },
      unit: '/100',
      status: 'average'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'average': return 'text-warning';
      case 'poor': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return 'TrendingUp';
      case 'average': return 'Minus';
      case 'poor': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const calculatePosition = (value, quartiles) => {
    const max = Math.max(quartiles?.q4, value);
    return (value / max) * 100;
  };

  return (
    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Icon name="Target" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Industry Benchmarks</h3>
            <p className="text-sm text-muted-foreground">Performance vs market quartiles</p>
          </div>
        </div>
        
        <button className="p-2 rounded-lg hover:bg-gray-800/40 backdrop-blur-sm transition-colors duration-200">
          <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-6">
        {benchmarkData?.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{item?.metric}</span>
                <Icon 
                  name={getStatusIcon(item?.status)} 
                  size={14} 
                  className={getStatusColor(item?.status)} 
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-foreground">
                  {item?.unit}{item?.brandValue}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item?.status === 'good' ? 'bg-success/10 text-success' :
                  item?.status === 'average'? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                }`}>
                  {item?.status}
                </span>
              </div>
            </div>
            
            <div className="relative">
              {/* Quartile background bars */}
              <div className="flex h-6 rounded-lg overflow-hidden bg-gray-800/30 backdrop-blur-sm">
                <div className="flex-1 bg-success/20 border-r border-gray-700/50"></div>
                <div className="flex-1 bg-warning/20 border-r border-gray-700/50"></div>
                <div className="flex-1 bg-warning/30 border-r border-gray-700/50"></div>
                <div className="flex-1 bg-destructive/20"></div>
              </div>
              
              {/* Brand value indicator */}
              <div 
                className="absolute top-0 h-6 w-1 bg-primary rounded-full shadow-lg"
                style={{ 
                  left: `${calculatePosition(item?.brandValue, item?.industryQuartiles)}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                  {item?.unit}{item?.brandValue}
                </div>
              </div>
            </div>
            
            {/* Quartile labels */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Q1: {item?.unit}{item?.industryQuartiles?.q1}</span>
              <span>Q2: {item?.unit}{item?.industryQuartiles?.q2}</span>
              <span>Q3: {item?.unit}{item?.industryQuartiles?.q3}</span>
              <span>Q4: {item?.unit}{item?.industryQuartiles?.q4}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success/40 rounded"></div>
              <span className="text-muted-foreground">Top 25%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning/40 rounded"></div>
              <span className="text-muted-foreground">Average</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-destructive/40 rounded"></div>
              <span className="text-muted-foreground">Bottom 25%</span>
            </div>
          </div>
          <span className="text-muted-foreground">Last updated: 2 hours ago</span>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkBars;