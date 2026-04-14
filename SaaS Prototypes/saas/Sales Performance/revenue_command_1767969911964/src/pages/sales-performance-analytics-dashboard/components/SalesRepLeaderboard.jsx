import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SalesRepLeaderboard = () => {
  const [sortBy, setSortBy] = useState('revenue');
  const [timeframe, setTimeframe] = useState('month');

  const salesReps = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
      revenue: 485000,
      deals: 23,
      winRate: 78,
      activityScore: 95,
      quota: 500000,
      territory: 'West Coast',
      trend: [65, 72, 68, 75, 82, 78, 85, 88, 92, 95],
      rank: 1,
      change: 2
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      revenue: 467000,
      deals: 19,
      winRate: 82,
      activityScore: 88,
      quota: 480000,
      territory: 'East Coast',
      trend: [58, 62, 65, 70, 75, 78, 82, 85, 87, 88],
      rank: 2,
      change: -1
    },
    {
      id: 3,
      name: 'Emily Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      revenue: 445000,
      deals: 21,
      winRate: 71,
      activityScore: 92,
      quota: 450000,
      territory: 'Central',
      trend: [70, 68, 72, 75, 78, 82, 85, 88, 90, 92],
      rank: 3,
      change: 1
    },
    {
      id: 4,
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      revenue: 398000,
      deals: 17,
      winRate: 65,
      activityScore: 85,
      quota: 420000,
      territory: 'Southwest',
      trend: [60, 65, 68, 70, 72, 75, 78, 82, 84, 85],
      rank: 4,
      change: 0
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      revenue: 376000,
      deals: 15,
      winRate: 73,
      activityScore: 79,
      quota: 400000,
      territory: 'Southeast',
      trend: [55, 58, 62, 65, 68, 72, 75, 77, 78, 79],
      rank: 5,
      change: -2
    }
  ];

  const sortedReps = [...salesReps].sort((a, b) => {
    switch (sortBy) {
      case 'revenue':
        return b.revenue - a.revenue;
      case 'winRate':
        return b.winRate - a.winRate;
      case 'deals':
        return b.deals - a.deals;
      case 'activityScore':
        return b.activityScore - a.activityScore;
      default:
        return b.revenue - a.revenue;
    }
  });

  const getRankChangeIcon = (change) => {
    if (change > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (change < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-text-secondary' };
  };

  const generateMiniChart = (data) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return data.map((value, index) => {
      const height = ((value - min) / range) * 20 + 2;
      return (
        <div
          key={index}
          className="bg-primary/60 rounded-sm"
          style={{
            height: `${height}px`,
            width: '3px',
            marginRight: '1px'
          }}
        />
      );
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Trophy" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Sales Rep Leaderboard</h3>
            <p className="text-sm text-text-secondary">Performance rankings and metrics</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-muted border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="revenue">Revenue</option>
            <option value="winRate">Win Rate</option>
            <option value="deals">Deals Closed</option>
            <option value="activityScore">Activity Score</option>
          </select>
          
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1.5 bg-muted border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedReps.map((rep, index) => {
          const rankChange = getRankChangeIcon(rep.change);
          const quotaAttainment = (rep.revenue / rep.quota) * 100;
          
          return (
            <div
              key={rep.id}
              className="flex items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              {/* Rank */}
              <div className="flex items-center space-x-2 w-16">
                <span className="text-lg font-bold text-text-primary">#{index + 1}</span>
                <Icon name={rankChange.icon} size={14} className={rankChange.color} />
              </div>

              {/* Rep Info */}
              <div className="flex items-center space-x-3 flex-1">
                <div className="relative">
                  <Image
                    src={rep.avatar}
                    alt={rep.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                      <Icon name="Crown" size={12} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="font-medium text-text-primary">{rep.name}</div>
                  <div className="text-sm text-text-secondary">{rep.territory}</div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">
                    ${rep.revenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-text-secondary">Revenue</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">{rep.deals}</div>
                  <div className="text-xs text-text-secondary">Deals</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">{rep.winRate}%</div>
                  <div className="text-xs text-text-secondary">Win Rate</div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">{rep.activityScore}</div>
                  <div className="text-xs text-text-secondary">Activity</div>
                </div>

                {/* Mini Chart */}
                <div className="flex items-end space-x-px h-6">
                  {generateMiniChart(rep.trend)}
                </div>

                {/* Quota Progress */}
                <div className="w-20">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary">Quota</span>
                    <span className="font-medium text-text-primary">
                      {Math.round(quotaAttainment)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        quotaAttainment >= 100 ? 'bg-success' : 
                        quotaAttainment >= 80 ? 'bg-warning' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(quotaAttainment, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">
              ${sortedReps.reduce((sum, rep) => sum + rep.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-text-secondary">Total Revenue</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {sortedReps.reduce((sum, rep) => sum + rep.deals, 0)}
            </div>
            <div className="text-sm text-text-secondary">Total Deals</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {Math.round(sortedReps.reduce((sum, rep) => sum + rep.winRate, 0) / sortedReps.length)}%
            </div>
            <div className="text-sm text-text-secondary">Avg Win Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {Math.round(sortedReps.reduce((sum, rep) => sum + rep.activityScore, 0) / sortedReps.length)}
            </div>
            <div className="text-sm text-text-secondary">Avg Activity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRepLeaderboard;