import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityTimeline = ({ activities = [] }) => {
  const [filter, setFilter] = useState('all');
  const [showDetails, setShowDetails] = useState({});

  const mockActivities = [
    {
      id: 1,
      type: 'created',
      title: 'Contract Created',
      description: 'New service agreement contract initiated',
      user: 'John Doe',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      timestamp: new Date('2024-09-04T09:15:00'),
      details: {
        template: 'Standard Service Agreement',
        value: '$45,000',
        duration: '12 months'
      }
    },
    {
      id: 2,
      type: 'edited',
      title: 'Document Edited',
      description: 'Payment terms section updated',
      user: 'Sarah Smith',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      timestamp: new Date('2024-09-04T10:30:00'),
      details: {
        section: 'Payment Terms',
        changes: 'Modified payment schedule from Net 15 to Net 30',
        wordsChanged: 47
      }
    },
    {
      id: 3,
      type: 'comment',
      title: 'Comment Added',
      description: 'Legal review comment on liability clause',
      user: 'Mike Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      timestamp: new Date('2024-09-04T11:45:00'),
      details: {
        comment: 'Please review the liability limitation amount. Current cap may be too low for this contract value.',
        section: 'Section 8: Limitation of Liability'
      }
    },
    {
      id: 4,
      type: 'approval',
      title: 'Sent for Approval',
      description: 'Contract submitted to legal team for review',
      user: 'John Doe',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      timestamp: new Date('2024-09-04T14:20:00'),
      details: {
        approver: 'Lisa Brown - Legal Counsel',
        workflow: 'Standard Legal Review',
        deadline: '2024-09-06T17:00:00'
      }
    },
    {
      id: 5,
      type: 'version',
      title: 'Version Created',
      description: 'Version 1.2 saved with legal revisions',
      user: 'Lisa Brown',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      timestamp: new Date('2024-09-04T16:10:00'),
      details: {
        version: '1.2',
        changes: 'Updated liability clause, added force majeure provision',
        fileSize: '2.4 MB'
      }
    },
    {
      id: 6,
      type: 'approved',
      title: 'Legal Approval',
      description: 'Contract approved by legal team',
      user: 'Lisa Brown',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      timestamp: new Date('2024-09-04T17:30:00'),
      details: {
        status: 'Approved',
        notes: 'All legal requirements satisfied. Ready for finance review.',
        nextStep: 'Finance Approval'
      }
    }
  ];

  const allActivities = activities?.length > 0 ? activities : mockActivities;

  const activityTypes = [
    { value: 'all', label: 'All Activities', count: allActivities?.length },
    { value: 'created', label: 'Created', count: allActivities?.filter(a => a?.type === 'created')?.length },
    { value: 'edited', label: 'Edits', count: allActivities?.filter(a => a?.type === 'edited')?.length },
    { value: 'comment', label: 'Comments', count: allActivities?.filter(a => a?.type === 'comment')?.length },
    { value: 'approval', label: 'Approvals', count: allActivities?.filter(a => a?.type === 'approval')?.length },
    { value: 'version', label: 'Versions', count: allActivities?.filter(a => a?.type === 'version')?.length }
  ];

  const filteredActivities = filter === 'all' 
    ? allActivities 
    : allActivities?.filter(activity => activity?.type === filter);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'created': return 'FileText';
      case 'edited': return 'Edit3';
      case 'comment': return 'MessageSquare';
      case 'approval': return 'Send';
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'version': return 'GitBranch';
      case 'signed': return 'PenTool';
      default: return 'Circle';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created': return 'bg-accent text-accent-foreground';
      case 'edited': return 'bg-warning text-warning-foreground';
      case 'comment': return 'bg-primary text-primary-foreground';
      case 'approval': return 'bg-secondary text-secondary-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-error text-error-foreground';
      case 'version': return 'bg-muted text-muted-foreground';
      case 'signed': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const toggleDetails = (activityId) => {
    setShowDetails(prev => ({
      ...prev,
      [activityId]: !prev?.[activityId]
    }));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Activity Timeline</h3>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {activityTypes?.map(type => (
            <button
              key={type?.value}
              onClick={() => setFilter(type?.value)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                filter === type?.value
                  ? 'bg-surface text-text-primary shadow-soft'
                  : 'text-muted-foreground hover:text-text-primary'
              }`}
            >
              {type?.label}
              <span className="ml-1 text-xs">({type?.count})</span>
            </button>
          ))}
        </div>
      </div>
      {/* Timeline */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {filteredActivities?.map((activity, index) => (
              <div key={activity?.id} className="relative flex items-start space-x-4">
                {/* Timeline Dot */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">{activity?.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleDetails(activity?.id)}
                        iconName={showDetails?.[activity?.id] ? "ChevronUp" : "ChevronDown"}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src={activity?.userAvatar}
                            alt={activity?.user}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm font-medium text-text-primary">
                            {activity?.user}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity?.timestamp)}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {showDetails?.[activity?.id] && activity?.details && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-1 gap-3">
                          {Object.entries(activity?.details)?.map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm font-medium text-muted-foreground capitalize">
                                {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                              </span>
                              <span className="text-sm text-text-primary">
                                {typeof value === 'string' && value?.includes('T') 
                                  ? new Date(value)?.toLocaleString()
                                  : value
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="text-lg font-medium text-text-primary mb-2">No activities found</h4>
              <p className="text-muted-foreground">
                {filter === 'all' ?'No activities have been recorded yet'
                  : `No ${filter} activities found`
                }
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleString()}</span>
          <span>{filteredActivities?.length} activities shown</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;