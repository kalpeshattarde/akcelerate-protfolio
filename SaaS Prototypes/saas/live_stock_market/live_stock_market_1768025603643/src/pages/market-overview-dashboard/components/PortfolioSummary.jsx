import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioSummary = () => {
  const [timeRange, setTimeRange] = useState('1D');

  const portfolioData = {
    totalValue: 1258473.25,
    dayChange: 28945.67,
    dayChangePercent: 2.35,
    totalGainLoss: 185623.45,
    totalGainLossPercent: 17.28,
    investedAmount: 1072849.80
  };

  const allocationData = [
    { name: 'Equity', value: 65, amount: 817607.61, color: '#1565C0' },
    { name: 'Mutual Funds', value: 20, amount: 251694.65, color: '#2E7D32' },
    { name: 'Bonds', value: 10, amount: 125847.33, color: '#F57C00' },
    { name: 'Cash', value: 5, amount: 62923.66, color: '#757575' }
  ];

  const topHoldings = [
    { symbol: 'TCS', name: 'Tata Consultancy Services', allocation: 8.5, value: 106969.23, change: 3.45 },
    { symbol: 'RELIANCE', name: 'Reliance Industries', allocation: 7.2, value: 90609.67, change: -1.23 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', allocation: 6.8, value: 85575.78, change: 2.67 },
    { symbol: 'INFY', name: 'Infosys Ltd', allocation: 5.9, value: 74249.62, change: 4.12 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', allocation: 5.1, value: 64181.93, change: 1.89 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value?.toFixed(2)}%`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {data?.value}% • {formatCurrency(data?.amount)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Portfolio Summary</h3>
          <p className="text-sm text-muted-foreground">Your investment overview</p>
        </div>
        <div className="flex items-center space-x-2">
          {['1D', '1W', '1M', '3M']?.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                timeRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      {/* Portfolio Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Value</span>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-foreground font-mono">
            {formatCurrency(portfolioData?.totalValue)}
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-sm font-medium ${
              portfolioData?.dayChange >= 0 ? 'text-success' : 'text-error'
            }`}>
              {formatCurrency(portfolioData?.dayChange)}
            </span>
            <span className={`text-xs ${
              portfolioData?.dayChangePercent >= 0 ? 'text-success' : 'text-error'
            }`}>
              {formatPercentage(portfolioData?.dayChangePercent)}
            </span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Gain/Loss</span>
            <Icon name="BarChart3" size={16} className="text-primary" />
          </div>
          <div className={`text-2xl font-bold font-mono ${
            portfolioData?.totalGainLoss >= 0 ? 'text-success' : 'text-error'
          }`}>
            {formatCurrency(portfolioData?.totalGainLoss)}
          </div>
          <div className="mt-1">
            <span className={`text-sm font-medium ${
              portfolioData?.totalGainLossPercent >= 0 ? 'text-success' : 'text-error'
            }`}>
              {formatPercentage(portfolioData?.totalGainLossPercent)}
            </span>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Invested Amount</span>
            <Icon name="DollarSign" size={16} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-foreground font-mono">
            {formatCurrency(portfolioData?.investedAmount)}
          </div>
          <div className="mt-1">
            <span className="text-sm text-muted-foreground">Principal investment</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation Chart */}
        <div>
          <h4 className="font-medium text-foreground mb-4">Asset Allocation</h4>
          <div className="flex items-center">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="ml-4 space-y-2">
              {allocationData?.map((item) => (
                <div key={item?.name} className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item?.color }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item?.name}</span>
                      <span className="text-sm text-muted-foreground">{item?.value}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {formatCurrency(item?.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Holdings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Top Holdings</h4>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {topHoldings?.map((holding) => (
              <div key={holding?.symbol} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {holding?.symbol?.substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{holding?.symbol}</div>
                    <div className="text-xs text-muted-foreground">{holding?.name}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {holding?.allocation}%
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatCurrency(holding?.value)}
                    </span>
                    <span className={`text-xs font-medium ${
                      holding?.change >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatPercentage(holding?.change)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            Add Investment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;