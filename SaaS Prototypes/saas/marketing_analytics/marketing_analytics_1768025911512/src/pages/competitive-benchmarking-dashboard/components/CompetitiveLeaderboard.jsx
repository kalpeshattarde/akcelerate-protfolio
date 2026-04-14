import React from 'react';
import Icon from '../../../components/AppIcon';

const CompetitiveLeaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      company: 'Market Leader Corp',
      marketShare: 18.2,
      trend: 'up',
      change: '+2.1%',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=center',
      isOurBrand: false
    },
    {
      rank: 2,
      company: 'Industry Veteran Ltd',
      marketShare: 15.1,
      trend: 'down',
      change: '-0.8%',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=40&h=40&fit=crop&crop=center',
      isOurBrand: false
    },
    {
      rank: 3,
      company: 'Our Brand',
      marketShare: 12.4,
      trend: 'up',
      change: '+1.5%',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=40&h=40&fit=crop&crop=center',
      isOurBrand: true
    },
    {
      rank: 4,
      company: 'Direct Rival Inc',
      marketShare: 9.8,
      trend: 'up',
      change: '+0.3%',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=40&h=40&fit=crop&crop=center',
      isOurBrand: false
    },
    {
      rank: 5,
      company: 'Emerging Player Co',
      marketShare: 7.5,
      trend: 'up',
      change: '+1.2%',
      logo: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=40&h=40&fit=crop&crop=center',
      isOurBrand: false
    },
    {
      rank: 6,
      company: 'Regional Competitor',
      marketShare: 6.3,
      trend: 'down',
      change: '-0.5%',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=40&h=40&fit=crop&crop=center',
      isOurBrand: false
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-warning text-warning-foreground';
    if (rank === 2) return 'bg-muted text-muted-foreground';
    if (rank === 3) return 'bg-amber-600 text-white';
    return 'bg-muted/50 text-muted-foreground';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Market Share Leaderboard
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Updated 2 hours ago</span>
        </div>
      </div>
      <div className="space-y-3">
        {leaderboardData?.map((company) => (
          <div
            key={company?.rank}
            className={`
              flex items-center space-x-4 p-4 rounded-lg transition-all duration-200
              ${company?.isOurBrand 
                ? 'bg-primary/10 border border-primary/20 shadow-glow' 
                : 'bg-muted/20 hover:bg-muted/30'
              }
            `}
          >
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
              ${getRankBadgeColor(company?.rank)}
            `}>
              {company?.rank}
            </div>

            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={company?.logo}
                alt={`${company?.company} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className={`font-medium truncate ${
                  company?.isOurBrand ? 'text-primary' : 'text-foreground'
                }`}>
                  {company?.company}
                </h4>
                {company?.isOurBrand && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-xs text-warning font-medium">You</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-muted-foreground">
                  Market Share: {company?.marketShare}%
                </span>
                <div className={`flex items-center space-x-1 ${getTrendColor(company?.trend)}`}>
                  <Icon 
                    name={getTrendIcon(company?.trend)} 
                    size={12} 
                    className={getTrendColor(company?.trend)}
                  />
                  <span className="text-xs font-medium">
                    {company?.change}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-foreground">
                {company?.marketShare}%
              </div>
              <div className="w-20 bg-muted/30 rounded-full h-1.5 mt-1">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    company?.isOurBrand ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                  style={{ width: `${(company?.marketShare / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Total tracked market share: 69.3%
          </span>
          <div className="flex items-center space-x-2 text-primary">
            <Icon name="ExternalLink" size={14} />
            <span>View full report</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveLeaderboard;