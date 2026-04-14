import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const SpendAnalyticsWidget = ({ timeframe = 'monthly' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('last6months');

  // Mock spend analytics data
  const spendData = {
    overview: {
      totalSpend: 12400000,
      previousPeriodSpend: 10800000,
      changePercentage: 14.8,
      changeType: 'positive',
      topCategories: [
        { category: 'IT Services', amount: 3200000, percentage: 25.8, change: '+12%' },
        { category: 'Cloud Infrastructure', amount: 2800000, percentage: 22.6, change: '+18%' },
        { category: 'Professional Services', amount: 2100000, percentage: 16.9, change: '+5%' },
        { category: 'Software Licenses', amount: 1900000, percentage: 15.3, change: '+8%' },
        { category: 'Maintenance', amount: 1400000, percentage: 11.3, change: '-2%' }
      ]
    },
    monthlyTrend: [
      { month: 'Jul', amount: 1800000, target: 2000000 },
      { month: 'Aug', amount: 2100000, target: 2000000 },
      { month: 'Sep', amount: 1950000, target: 2000000 },
      { month: 'Oct', amount: 2300000, target: 2200000 },
      { month: 'Nov', amount: 2150000, target: 2200000 },
      { month: 'Dec', amount: 2100000, target: 2200000 }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatCompactCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000)?.toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000)?.toFixed(0)}K`;
    }
    return formatCurrency(amount);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Widget Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 text-xs rounded-md transition-smooth ${
              activeTab === 'overview' ?'bg-background text-text-primary shadow-sm' :'text-muted-foreground hover:text-text-primary'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-3 py-1 text-xs rounded-md transition-smooth ${
              activeTab === 'trends' ?'bg-background text-text-primary shadow-sm' :'text-muted-foreground hover:text-text-primary'
            }`}
          >
            Trends
          </button>
        </div>

        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e?.target?.value)}
          className="text-xs bg-background border border-border rounded px-2 py-1"
        >
          <option value="last3months">Last 3 months</option>
          <option value="last6months">Last 6 months</option>
          <option value="last12months">Last 12 months</option>
        </select>
      </div>
      {/* Content Based on Active Tab */}
      {activeTab === 'overview' ? (
        <div className="flex-1 space-y-4">
          {/* Total Spend Summary */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Contract Spend</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold text-text-primary">
                    {formatCompactCurrency(spendData?.overview?.totalSpend)}
                  </span>
                  <div className={`flex items-center text-xs ${
                    spendData?.overview?.changeType === 'positive' ? 'text-success' : 'text-error'
                  }`}>
                    <Icon 
                      name={spendData?.overview?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                      size={12} 
                      className="mr-1" 
                    />
                    {spendData?.overview?.changePercentage}%
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">vs Previous Period</p>
                <p className="text-sm font-medium text-muted-foreground">
                  {formatCompactCurrency(spendData?.overview?.previousPeriodSpend)}
                </p>
              </div>
            </div>
          </div>

          {/* Top Spending Categories */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Top Spending Categories</h4>
            <div className="space-y-3">
              {spendData?.overview?.topCategories?.map((category, index) => (
                <div key={category?.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-2 h-2 rounded-full bg-primary opacity-80" 
                         style={{ opacity: 1 - (index * 0.15) }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {category?.category}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-smooth"
                            style={{ width: `${category?.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {category?.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium text-text-primary">
                      {formatCompactCurrency(category?.amount)}
                    </p>
                    <p className={`text-xs ${
                      category?.change?.startsWith('+') ? 'text-success' : 'text-error'
                    }`}>
                      {category?.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-4">
          {/* Monthly Trend Chart */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Monthly Spending Trend</h4>
            <div className="space-y-2">
              {spendData?.monthlyTrend?.map((month) => (
                <div key={month?.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-16">
                    <span className="text-sm font-medium text-text-primary w-8">
                      {month?.month}
                    </span>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                      {/* Target line */}
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-secondary z-10"
                        style={{ 
                          left: `${Math.min((month?.target / 2500000) * 100, 100)}%` 
                        }}
                      ></div>
                      {/* Actual spending bar */}
                      <div 
                        className={`h-full rounded-full transition-smooth ${
                          month?.amount >= month?.target ? 'bg-success' : 'bg-primary'
                        }`}
                        style={{ 
                          width: `${Math.min((month?.amount / 2500000) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right w-20">
                    <p className="text-sm font-medium text-text-primary">
                      {formatCompactCurrency(month?.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      vs {formatCompactCurrency(month?.target)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="pt-2 border-t border-border">
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Key Insights</h5>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Icon name="TrendingUp" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-primary">
                  IT Services spending increased by 12% this quarter
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Target" size={12} className="text-warning mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-primary">
                  October exceeded budget target by $100K
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={12} className="text-info mt-0.5 flex-shrink-0" />
                <p className="text-xs text-text-primary">
                  3 contracts require budget reallocation
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendAnalyticsWidget;