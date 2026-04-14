import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityStream = ({ activities, onActivityClick }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created': return 'Plus';
      case 'updated': return 'Edit3';
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'signed': return 'PenTool';
      case 'expired': return 'Clock';
      case 'renewed': return 'RotateCcw';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created': return 'text-accent';
      case 'updated': return 'text-warning';
      case 'approved': return 'text-success';
      case 'rejected': return 'text-error';
      case 'signed': return 'text-success';
      case 'expired': return 'text-error';
      case 'renewed': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-sm text-accent hover:text-accent/80 transition-smooth">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div 
            key={activity?.id}
            className={`flex items-start space-x-3 p-3 rounded-lg transition-smooth hover:bg-muted cursor-pointer ${
              index < activities?.length - 1 ? 'border-b border-border pb-4 mb-4' : ''
            }`}
            onClick={() => onActivityClick && onActivityClick(activity)}
          >
            <div className={`w-8 h-8 rounded-full bg-surface border-2 flex items-center justify-center ${
              getActivityColor(activity?.type)?.replace('text-', 'border-')
            }`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={14} 
                className={getActivityColor(activity?.type)}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-text-primary truncate">
                  {activity?.title}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {activity?.description}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{activity?.contractId}</span>
                <span>•</span>
                <span>{activity?.user}</span>
                {activity?.department && (
                  <>
                    <span>•</span>
                    <span>{activity?.department}</span>
                  </>
                )}
              </div>
              
              {activity?.metadata && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.entries(activity?.metadata)?.map(([key, value]) => (
                    <span 
                      key={key}
                      className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityStream;