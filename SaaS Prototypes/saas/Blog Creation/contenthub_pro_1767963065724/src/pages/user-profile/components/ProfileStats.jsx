import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Articles',
      value: stats?.articlesCount,
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      label: 'Followers',
      value: stats?.followersCount,
      icon: 'Users',
      color: 'text-success'
    },
    {
      label: 'Following',
      value: stats?.followingCount,
      icon: 'UserPlus',
      color: 'text-accent'
    },
    {
      label: 'Total Views',
      value: stats?.totalViews,
      icon: 'Eye',
      color: 'text-secondary'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems?.map((item) => (
        <div
          key={item?.label}
          className="bg-card border border-border rounded-xl p-6 text-center glassmorphism hover:shadow-lg transition-all duration-300 micro-interaction"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3 ${item?.color}`}>
            <Icon name={item?.icon} size={20} />
          </div>
          <div className="text-2xl font-heading font-bold text-foreground mb-1">
            {formatNumber(item?.value)}
          </div>
          <div className="text-sm text-muted-foreground">
            {item?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;