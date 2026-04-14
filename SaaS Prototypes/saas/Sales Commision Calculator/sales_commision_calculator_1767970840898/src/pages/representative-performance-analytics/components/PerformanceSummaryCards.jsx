import React from 'react';
import Icon from 'components/AppIcon';

const PerformanceSummaryCards = ({ representative }) => {
  if (!representative) {
    return (
      <div className="card-glass">
        <div className="text-center text-white/70">
          <Icon name="User" size={48} className="mx-auto mb-4 text-white/40" />
          <p>Select a representative to view performance summary</p>
        </div>
      </div>
    );
  }

  const getQuotaAttainmentColor = (attainment) => {
    if (attainment >= 100) return 'text-success';
    if (attainment >= 80) return 'text-warning';
    return 'text-error';
  };

  const getQuotaAttainmentBgColor = (attainment) => {
    if (attainment >= 100) return 'bg-success-50 border-success-200';
    if (attainment >= 80) return 'bg-warning-50 border-warning-200';
    return 'bg-error-50 border-error-200';
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Tier 1': return 'bg-success-100 text-success-700';
      case 'Tier 2': return 'bg-warning-100 text-warning-700';
      case 'Tier 3': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const performanceCards = [
    {
      title: 'YTD Revenue',
      value: `$${representative.ytdRevenue.toLocaleString()}`,
      subtitle: `vs $${representative.quota.toLocaleString()} quota`,
      icon: 'DollarSign',
      trend: representative.ytdRevenue > representative.quota ? 'up' : 'down',
      trendValue: `${((representative.ytdRevenue / representative.quota - 1) * 100).toFixed(1)}%`,
      color: representative.ytdRevenue > representative.quota ? 'success' : 'error'
    },
    {
      title: 'Quota Attainment',
      value: `${representative.quotaAttainment}%`,
      subtitle: `${representative.ytdRevenue > representative.quota ? 'Above' : 'Below'} target`,
      icon: 'Target',
      trend: representative.quotaAttainment >= 100 ? 'up' : 'down',
      trendValue: `${representative.quotaAttainment >= 100 ? '+' : ''}${(representative.quotaAttainment - 100).toFixed(1)}%`,
      color: representative.quotaAttainment >= 100 ? 'success' : representative.quotaAttainment >= 80 ? 'warning' : 'error'
    },
    {
      title: 'Sales Tier',
      value: representative.tier,
      subtitle: `Based on performance metrics`,
      icon: 'Award',
      trend: 'neutral',
      trendValue: 'Current tier',
      color: 'primary'
    },
    {
      title: 'Team Ranking',
      value: `#${representative.ranking}`,
      subtitle: `of ${representative.totalReps} representatives`,
      icon: 'TrendingUp',
      trend: representative.ranking <= 10 ? 'up' : 'down',
      trendValue: `Top ${Math.round((representative.ranking / representative.totalReps) * 100)}%`,
      color: representative.ranking <= 10 ? 'success' : representative.ranking <= 25 ? 'warning' : 'error'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          icon: 'text-success',
          text: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          icon: 'text-warning',
          text: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          border: 'border-error-200',
          icon: 'text-error',
          text: 'text-error'
        };
      case 'primary':
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-200',
          icon: 'text-primary',
          text: 'text-primary'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          border: 'border-secondary-200',
          icon: 'text-secondary-600',
          text: 'text-secondary-600'
        };
    }
  };

  return (
    <div className="card-glass">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">Performance Summary</h3>
            <p className="text-sm text-white/70 mt-1">Key metrics for {representative.name}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-sm ${getTierColor(representative.tier)}`}>
            {representative.tier}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performanceCards.map((card, index) => {
            const colors = getColorClasses(card.color);
            
            return (
              <div
                key={index}
                className="glass-morphism-dark p-4 rounded-sm border border-white/10 transition-smooth hover:bg-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="glass-morphism p-2 rounded-sm border border-white/10">
                    <Icon name={card.icon} size={20} className={colors.icon} />
                  </div>
                  {card.trend !== 'neutral' && (
                    <div className={`flex items-center space-x-1 ${colors.text}`}>
                      <Icon 
                        name={card.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        size={14} 
                      />
                      <span className="text-xs font-medium">{card.trendValue}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-1">{card.title}</h4>
                  <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
                  <p className="text-xs text-white/60">{card.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="text-sm font-medium text-white mb-3">Additional Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 glass-morphism-dark rounded-sm">
              <div className="text-lg font-bold text-white">{representative.deals}</div>
              <div className="text-xs text-white/60">Deals Closed</div>
            </div>
            <div className="text-center p-3 glass-morphism-dark rounded-sm">
              <div className="text-lg font-bold text-white">${representative.avgDealSize.toLocaleString()}</div>
              <div className="text-xs text-white/60">Avg Deal Size</div>
            </div>
            <div className="text-center p-3 glass-morphism-dark rounded-sm">
              <div className="text-lg font-bold text-white">{representative.winRate}%</div>
              <div className="text-xs text-white/60">Win Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummaryCards;