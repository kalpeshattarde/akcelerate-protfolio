import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceLeaderboard = () => {
  const [sortBy, setSortBy] = useState('roas');
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Email Newsletter',
      channel: 'Email Marketing',
      spend: 7600,
      revenue: 200000,
      roas: 26.32,
      conversions: 200,
      cpl: 38.00,
      status: 'active',
      trend: 'up',
      change: 18.9,
      revenueProgress: 8
    },
    {
      id: 2,
      name: 'Holiday Sale - Search',
      channel: 'Google Ads',
      spend: 4800,
      revenue: 300000,
      roas: 62.5,
      conversions: 300,
      cpl: 16.00,
      status: 'active',
      trend: 'up',
      change: 12.5,
      revenueProgress: 68
    },
    {
      id: 3,
      name: 'Brand Awareness - Video',
      channel: 'Facebook Ads',
      spend: 4600,
      revenue: 800000,
      roas: 173.91,
      conversions: 800,
      cpl: 5.75,
      status: 'active',
      trend: 'up',
      change: 8.3,
      revenueProgress: 51
    }
  ]);

  const sortOptions = [
    { value: 'roas', label: 'ROAS', icon: 'TrendingUp' },
    { value: 'spend', label: 'Spend', icon: 'DollarSign' },
    { value: 'conversions', label: 'Conversions', icon: 'Target' },
    { value: 'cpl', label: 'CPL', icon: 'Calculator' }
  ];

  const handleBudgetAdjustment = (campaignId, action) => {
    setCampaigns(prev => prev?.map(campaign => {
      if (campaign?.id === campaignId) {
        const adjustment = action === 'increase' ? 1.1 : 0.9;
        return {
          ...campaign,
          spend: Math.round(campaign?.spend * adjustment)
        };
      }
      return campaign;
    }));
  };

  const getChannelColor = (channel) => {
    const colors = {
      'Google Ads': 'text-blue-400',
      'Facebook Ads': 'text-blue-600',
      'LinkedIn Ads': 'text-blue-700',
      'Email Marketing': 'text-green-500'
    };
    return colors?.[channel] || 'text-muted-foreground';
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-success/20 text-success border-success/30',
      paused: 'bg-warning/20 text-warning border-warning/30',
      ended: 'bg-muted/20 text-muted-foreground border-muted/30'
    };
    return styles?.[status] || styles?.active;
  };

  const sortedCampaigns = [...campaigns]?.sort((a, b) => {
    if (sortBy === 'cpl') return a?.[sortBy] - b?.[sortBy];
    return b?.[sortBy] - a?.[sortBy];
  });

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Trophy" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Performance Leaderboard
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          {sortOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={sortBy === option?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy(option?.value)}
              iconName={option?.icon}
              iconPosition="left"
              iconSize={14}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Horizontal Layout for Campaign Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sortedCampaigns?.map((campaign, index) => (
          <div
            key={campaign?.id}
            className="glass-surface p-6 rounded-lg hover:shadow-elevated transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBudgetAdjustment(campaign?.id, 'decrease')}
                  iconName="Minus"
                  className="w-8 h-8 p-0"
                  title="Decrease budget"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBudgetAdjustment(campaign?.id, 'increase')}
                  iconName="Plus"
                  className="w-8 h-8 p-0"
                  title="Increase budget"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                  className="w-8 h-8 p-0"
                  title="Campaign settings"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-foreground text-lg">
                  {campaign?.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(campaign?.status)}`}>
                  {campaign?.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className={getChannelColor(campaign?.channel)}>
                  {campaign?.channel}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={campaign?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={campaign?.trend === 'up' ? 'text-success' : 'text-destructive'}
                  />
                  <span className={campaign?.trend === 'up' ? 'text-success' : 'text-destructive'}>
                    {Math.abs(campaign?.change)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">ROAS</div>
                <div className="font-bold text-foreground text-lg">{campaign?.roas?.toFixed(1)}x</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Spend</div>
                <div className="font-bold text-foreground text-lg">
                  {campaign?.spend >= 1000 ? `${(campaign?.spend / 1000)?.toFixed(1)}M` : `${campaign?.spend}`}/
                  {campaign?.conversions}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Conv.</div>
                <div className="font-bold text-foreground text-lg">{campaign?.conversions}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">CPL</div>
                <div className="font-bold text-foreground text-lg">${campaign?.cpl?.toFixed(0)}</div>
              </div>
            </div>

            {/* Revenue Progress */}
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Revenue Progress</span>
                <span>{campaign?.revenueProgress}% of target</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-primary transition-all duration-500"
                  style={{ width: `${campaign?.revenueProgress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing top {sortedCampaigns?.length} performing campaigns
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            View All Campaigns
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceLeaderboard;