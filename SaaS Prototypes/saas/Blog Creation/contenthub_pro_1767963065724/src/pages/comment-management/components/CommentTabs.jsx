import React from 'react';
import Icon from '../../../components/AppIcon';

const CommentTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    {
      id: 'pending',
      label: 'Pending Review',
      icon: 'Clock',
      count: counts?.pending,
      color: 'text-warning'
    },
    {
      id: 'approved',
      label: 'Approved',
      icon: 'CheckCircle',
      count: counts?.approved,
      color: 'text-success'
    },
    {
      id: 'flagged',
      label: 'Flagged',
      icon: 'Flag',
      count: counts?.flagged,
      color: 'text-error'
    },
    {
      id: 'rejected',
      label: 'Rejected',
      icon: 'XCircle',
      count: counts?.rejected,
      color: 'text-muted-foreground'
    },
    {
      id: 'all',
      label: 'All Comments',
      icon: 'MessageSquare',
      count: counts?.total,
      color: 'text-primary'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg mb-6">
      <div className="flex overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} className={activeTab === tab?.id ? 'text-primary' : tab?.color} />
            <span>{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count > 999 ? '999+' : tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommentTabs;