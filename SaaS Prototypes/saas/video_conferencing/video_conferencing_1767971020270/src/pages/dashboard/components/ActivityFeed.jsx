import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      meeting_started: 'Video',
      meeting_ended: 'VideoOff',
      user_joined: 'UserPlus',
      user_left: 'UserMinus',
      recording_started: 'Record',
      recording_stopped: 'Square',
      screen_share: 'Monitor',
      chat_message: 'MessageCircle',
      system_alert: 'AlertTriangle',
      bandwidth_warning: 'Wifi'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      meeting_started: 'text-success',
      meeting_ended: 'text-muted-foreground',
      user_joined: 'text-accent',
      user_left: 'text-warning',
      recording_started: 'text-error',
      recording_stopped: 'text-muted-foreground',
      screen_share: 'text-primary',
      chat_message: 'text-accent',
      system_alert: 'text-warning',
      bandwidth_warning: 'text-error'
    };
    return colors?.[type] || 'text-foreground';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Activity Feed</h2>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-micro">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={activity?.id || index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-micro">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity?.user}</span>
                    <span className="ml-1">{activity?.action}</span>
                    {activity?.target && (
                      <span className="ml-1 font-medium">{activity?.target}</span>
                    )}
                  </p>
                  {activity?.details && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity?.details}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;