import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityAlert = ({ alert, onResolve, onView }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-error bg-error/5';
      case 'high': return 'border-l-warning bg-warning/5';
      case 'medium': return 'border-l-accent bg-accent/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getPriorityIcon = (type) => {
    switch (type) {
      case 'expiring': return 'Clock';
      case 'approval': return 'CheckCircle';
      case 'compliance': return 'Shield';
      case 'payment': return 'DollarSign';
      default: return 'AlertTriangle';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className={`border-l-4 rounded-r-lg p-4 mb-3 ${getPriorityColor(alert?.priority)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center mt-0.5">
            <Icon name={getPriorityIcon(alert?.type)} size={16} className="text-text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-medium text-text-primary truncate">
                {alert?.title}
              </h4>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                alert?.priority === 'critical' ? 'bg-error text-error-foreground' :
                alert?.priority === 'high' ? 'bg-warning text-warning-foreground' :
                'bg-accent text-accent-foreground'
              }`}>
                {alert?.priority}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>{alert?.contractId}</span>
              <span>•</span>
              <span>{formatTimeAgo(alert?.createdAt)}</span>
              {alert?.dueDate && (
                <>
                  <span>•</span>
                  <span className="text-error">Due: {new Date(alert.dueDate)?.toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(alert)}
            iconName="Eye"
            iconSize={14}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onResolve(alert)}
            iconName="Check"
            iconSize={14}
          >
            Resolve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriorityAlert;