import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DeadlineCountdown = ({ isCompact = false }) => {
  const [timeRemaining, setTimeRemaining] = useState({});
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    // Mock upcoming deadlines
    const mockDeadlines = [
      {
        id: 1,
        name: 'SASB Annual Report',
        framework: 'SASB',
        dueDate: '2024-12-15T23:59:59',
        priority: 'high',
        status: 'in-progress',
        completionRate: 85,
        assignee: 'Sarah Johnson',
        description: 'Annual sustainability accounting standards board report submission'
      },
      {
        id: 2,
        name: 'TCFD Climate Disclosure',
        framework: 'TCFD',
        dueDate: '2024-12-20T17:00:00',
        priority: 'high',
        status: 'review',
        completionRate: 92,
        assignee: 'Michael Chen',
        description: 'Task force on climate-related financial disclosures'
      },
      {
        id: 3,
        name: 'GRI Standards Report',
        framework: 'GRI',
        dueDate: '2024-12-31T23:59:59',
        priority: 'medium',
        status: 'draft',
        completionRate: 78,
        assignee: 'Emily Rodriguez',
        description: 'Global reporting initiative universal standards compliance'
      },
      {
        id: 4,
        name: 'Q1 2025 ESG Brief',
        framework: 'Internal',
        dueDate: '2025-01-15T12:00:00',
        priority: 'medium',
        status: 'planning',
        completionRate: 25,
        assignee: 'David Kim',
        description: 'Quarterly executive ESG performance summary'
      }
    ];

    setDeadlines(mockDeadlines);

    // Update countdown every minute
    const updateCountdown = () => {
      const now = new Date();
      const remaining = {};

      mockDeadlines?.forEach(deadline => {
        const dueDate = new Date(deadline.dueDate);
        const diff = dueDate - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          remaining[deadline.id] = { days, hours, minutes, overdue: false };
        } else {
          remaining[deadline.id] = { days: 0, hours: 0, minutes: 0, overdue: true };
        }
      });

      setTimeRemaining(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning': return 'text-muted-foreground';
      case 'in-progress': return 'text-primary';
      case 'review': return 'text-warning';
      case 'draft': return 'text-secondary';
      case 'completed': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'planning': return 'Calendar';
      case 'in-progress': return 'Clock';
      case 'review': return 'Eye';
      case 'draft': return 'FileText';
      case 'completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const formatTimeRemaining = (time) => {
    if (time?.overdue) return 'Overdue';
    if (time?.days > 0) return `${time?.days}d ${time?.hours}h`;
    if (time?.hours > 0) return `${time?.hours}h ${time?.minutes}m`;
    return `${time?.minutes}m`;
  };

  const getUrgencyLevel = (time) => {
    if (time?.overdue) return 'overdue';
    if (time?.days === 0 && time?.hours < 24) return 'critical';
    if (time?.days < 3) return 'urgent';
    if (time?.days < 7) return 'warning';
    return 'normal';
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'overdue': return 'bg-error text-error-foreground';
      case 'critical': return 'bg-error/90 text-error-foreground';
      case 'urgent': return 'bg-warning text-warning-foreground';
      case 'warning': return 'bg-warning/70 text-warning-foreground';
      case 'normal': return 'bg-success/20 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const nextDeadline = deadlines?.filter(d => timeRemaining?.[d?.id] && !timeRemaining?.[d?.id]?.overdue)?.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))?.[0];

  if (isCompact && nextDeadline) {
    const time = timeRemaining?.[nextDeadline?.id];
    const urgency = getUrgencyLevel(time);

    return (
      <div className="bg-card border border-border rounded-lg p-6 h-full">
        <div className="flex items-center space-x-4 h-full">
          <div className="relative flex-shrink-0">
            <div className={`w-3 h-3 rounded-full ${getUrgencyColor(urgency)?.split(' ')?.[0]} animate-pulse`} />
            <div className={`absolute inset-0 w-3 h-3 rounded-full ${getUrgencyColor(urgency)?.split(' ')?.[0]} animate-ping opacity-75`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-foreground text-sm truncate mb-1">
              {nextDeadline?.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTimeRemaining(time)} remaining
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-sm font-medium text-foreground mb-1">
              {nextDeadline?.completionRate}%
            </div>
            <div className="text-xs text-muted-foreground">
              {nextDeadline?.framework}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-card h-full flex flex-col">
      {/* Header - Standardized Padding */}
      <div className="p-6 border-b border-border">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-1">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-warning" />
            </div>
          </div>
          <div className="col-span-7">
            <h3 className="font-semibold text-foreground text-lg">Upcoming Deadlines</h3>
            <p className="text-sm text-muted-foreground">
              {deadlines?.filter(d => timeRemaining?.[d?.id] && !timeRemaining?.[d?.id]?.overdue)?.length} active deadlines
            </p>
          </div>
          <div className="col-span-4 text-right">
            <div className="text-lg font-bold text-foreground">
              Q4 2024
            </div>
            <div className="text-sm text-muted-foreground">Reporting Period</div>
          </div>
        </div>
      </div>

      {/* Deadlines List - Consistent Spacing */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {deadlines?.slice(0, 4)?.map((deadline) => {
          const time = timeRemaining?.[deadline?.id];
          if (!time) return null;

          const urgency = getUrgencyLevel(time);

          return (
            <div key={deadline?.id} className="p-6 hover:bg-muted/50 transition-colors duration-150">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-1">
                  <Icon 
                    name={getStatusIcon(deadline?.status)} 
                    size={20} 
                    className={getStatusColor(deadline?.status)}
                  />
                </div>
                <div className="col-span-7">
                  <h4 className="font-medium text-foreground truncate mb-2">
                    {deadline?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate mb-4">
                    {deadline?.description}
                  </p>

                  {/* Progress Bar - Standardized */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {deadline?.completionRate}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          deadline?.completionRate >= 90 ? 'bg-success' :
                          deadline?.completionRate >= 70 ? 'bg-primary' :
                          deadline?.completionRate >= 50 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${deadline?.completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Metadata - Grid Layout */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground">
                        Assigned to {deadline?.assignee}
                      </span>
                      <span className={`px-2 py-1 rounded-full ${getPriorityColor(deadline?.priority)} bg-current/10`}>
                        {deadline?.priority} priority
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      Due {new Date(deadline.dueDate)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Time Remaining - Aligned */}
                <div className="col-span-4 flex flex-col items-end justify-center">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getUrgencyColor(urgency)} mb-2`}>
                    {formatTimeRemaining(time)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {deadline?.framework}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer - Standardized */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-8">
            <div className="text-sm text-muted-foreground">
              Next review: December 10, 2024
            </div>
          </div>
          <div className="col-span-4 flex justify-end space-x-4">
            <button className="text-sm text-primary hover:underline">
              View all deadlines
            </button>
            <button className="text-sm text-primary hover:underline">
              Set reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineCountdown;