import React from 'react';
import Icon from '../../../components/AppIcon';

const TopHoldings = () => {
  const holdings = [
    {
      symbol: 'RELIANCE',
      name: 'RELIANCE INDUSTRIES LTD',
      value: 245680,
      percentage: 19.5,
      change: 2.34,
      trend: 'up',
      quantity: 120,
      price: 2047.33
    },
    {
      symbol: 'TCS',
      name: 'TATA CONSULTANCY SERVICES',
      value: 189750,
      percentage: 15.1,
      change: -1.22,
      trend: 'down',
      quantity: 50,
      price: 3795.00
    },
    {
      symbol: 'HDFC',
      name: 'HDFC BANK LIMITED',
      value: 167834,
      percentage: 13.3,
      change: 0.89,
      trend: 'up',
      quantity: 100,
      price: 1678.34
    },
    {
      symbol: 'INFY',
      name: 'INFOSYS LIMITED',
      value: 134567,
      percentage: 10.7,
      change: 1.56,
      trend: 'up',
      quantity: 80,
      price: 1682.09
    },
    {
      symbol: 'ITC',
      name: 'ITC LIMITED',
      value: 98234,
      percentage: 7.8,
      change: -0.45,
      trend: 'down',
      quantity: 200,
      price: 491.17
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  return (
    <div className="bg-card brutalist-border brutalist-shadow p-6">
      {/* HEADER */}
      <div className="border-l-8 border-success pl-4 mb-6">
        <h2 className="text-xl font-black text-card-foreground tracking-wider">TOP</h2>
        <h3 className="text-lg font-black text-success tracking-wider">HOLDINGS</h3>
      </div>

      {/* HOLDINGS LIST */}
      <div className="space-y-3">
        {holdings?.map((holding, index) => (
          <div key={index} className="bg-background brutalist-border-thin p-3 brutalist-hover">
            {/* HEADER ROW */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted brutalist-border-thin flex items-center justify-center">
                  <span className="text-sm font-black text-foreground tracking-wider">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <div className="text-base font-black text-foreground tracking-wider font-mono">
                    {holding?.symbol}
                  </div>
                  <div className="text-xs font-bold text-muted-foreground leading-tight">
                    {holding?.name}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-base font-black font-mono text-foreground">
                  {formatCurrency(holding?.value)}
                </div>
                <div className="text-sm font-black text-primary">
                  {holding?.percentage}%
                </div>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mb-2">
              <div className="w-full h-2 bg-muted brutalist-border-thin">
                <div 
                  className="h-full bg-primary brutalist-border-thin"
                  style={{ width: `${holding?.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* DETAILS ROW */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="font-black text-foreground">
                  QTY: <span className="font-mono">{holding?.quantity}</span>
                </div>
                <div className="font-black text-foreground">
                  PRICE: <span className="font-mono">₹{holding?.price?.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon 
                  name={holding?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} 
                  size={14}
                  className={`font-black ${
                    holding?.trend === 'up' ? 'text-success' : 'text-error'
                  }`}
                />
                <span className={`text-sm font-black font-mono ${
                  holding?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {holding?.change > 0 ? '+' : ''}{holding?.change?.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PORTFOLIO CONCENTRATION */}
      <div className="mt-6 pt-4 border-t-4 border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-black text-card-foreground tracking-wider">
            CONCENTRATION
          </span>
          <span className="text-lg font-black text-primary font-mono">
            66.4%
          </span>
        </div>
        
        <div className="bg-warning brutalist-border p-3">
          <div className="flex items-center gap-3">
            <Icon name="AlertTriangle" size={18} className="text-warning-foreground" />
            <span className="font-black text-warning-foreground text-xs tracking-wider">
              TOP 5 HOLDINGS REPRESENT 66.4% OF PORTFOLIO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHoldings;