import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopMoversTable = () => {
  const [activeTab, setActiveTab] = useState('gainers');

  const gainersData = [
    { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 1245.60, change: 89.45, changePercent: 7.73, volume: '2.3M' },
    { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1089.30, change: 67.20, changePercent: 6.58, volume: '1.8M' },
    { symbol: 'DRREDDY', name: 'Dr Reddys Lab', price: 5234.75, change: 298.50, changePercent: 6.05, volume: '890K' },
    { symbol: 'CIPLA', name: 'Cipla Ltd', price: 1456.80, change: 78.90, changePercent: 5.73, volume: '1.2M' },
    { symbol: 'TECHM', name: 'Tech Mahindra', price: 1678.45, change: 87.30, changePercent: 5.49, volume: '2.1M' },
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 567.20, change: 28.40, changePercent: 5.27, volume: '3.4M' },
    { symbol: 'HCLTECH', name: 'HCL Tech', price: 1789.60, change: 86.70, changePercent: 5.09, volume: '1.6M' },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1834.25, change: 82.15, changePercent: 4.69, volume: '2.8M' }
  ];

  const losersData = [
    { symbol: 'TATASTEEL', name: 'Tata Steel', price: 134.60, change: -12.45, changePercent: -8.47, volume: '4.2M' },
    { symbol: 'HINDALCO', name: 'Hindalco Ind', price: 567.30, change: -45.20, changePercent: -7.38, volume: '3.1M' },
    { symbol: 'JSWSTEEL', name: 'JSW Steel', price: 789.45, change: -56.80, changePercent: -6.71, volume: '2.9M' },
    { symbol: 'COALINDIA', name: 'Coal India', price: 234.75, change: -16.50, changePercent: -6.57, volume: '5.6M' },
    { symbol: 'ONGC', name: 'ONGC Ltd', price: 189.60, change: -12.30, changePercent: -6.09, volume: '8.7M' },
    { symbol: 'NTPC', name: 'NTPC Ltd', price: 345.80, change: -21.40, changePercent: -5.83, volume: '4.3M' },
    { symbol: 'POWERGRID', name: 'Power Grid', price: 267.45, change: -15.60, changePercent: -5.51, volume: '3.8M' },
    { symbol: 'IOC', name: 'Indian Oil Corp', price: 156.30, change: -8.90, changePercent: -5.39, volume: '6.2M' }
  ];

  const activeData = activeTab === 'gainers' ? gainersData : losersData;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const formatChange = (change, changePercent) => {
    const isPositive = change > 0;
    return {
      change: `${isPositive ? '+' : ''}${change?.toFixed(2)}`,
      changePercent: `${isPositive ? '+' : ''}${changePercent?.toFixed(2)}%`,
      isPositive
    };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Top Movers</h3>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('gainers')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'gainers' ?'bg-success text-success-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab('losers')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'losers' ?'bg-error text-error-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Top Losers
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Stock</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Change</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Volume</th>
                <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeData?.map((stock, index) => {
                const changeData = formatChange(stock?.change, stock?.changePercent);
                return (
                  <tr 
                    key={stock?.symbol} 
                    className="border-b border-border hover:bg-muted/50 transition-colors duration-150"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          changeData?.isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{stock?.symbol}</div>
                          <div className="text-xs text-muted-foreground">{stock?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="font-mono text-sm text-foreground">
                        {formatPrice(stock?.price)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex flex-col items-end">
                        <span className={`font-mono text-sm ${
                          changeData?.isPositive ? 'text-success' : 'text-error'
                        }`}>
                          {changeData?.change}
                        </span>
                        <span className={`font-mono text-xs ${
                          changeData?.isPositive ? 'text-success' : 'text-error'
                        }`}>
                          {changeData?.changePercent}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="font-mono text-sm text-muted-foreground">
                        {stock?.volume}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Plus"
                        className="h-8 w-8"
                        title="Add to Watchlist"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
        <Button variant="outline" size="sm" iconName="ExternalLink">
          View All
        </Button>
      </div>
    </div>
  );
};

export default TopMoversTable;