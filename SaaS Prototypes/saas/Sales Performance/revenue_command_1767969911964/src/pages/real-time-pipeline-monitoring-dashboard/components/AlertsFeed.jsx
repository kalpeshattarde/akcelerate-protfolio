import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsFeed = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  const initialAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Deal Stalled - Enterprise Software License',
      description: 'TechCorp deal ($125K) has been in negotiation for 45 days without activity',
      timestamp: new Date(Date.now() - 300000),
      dealId: 'DEAL-2024-001',
      rep: 'Sarah Johnson',
      action: 'Contact customer',
      isNew: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Quota Risk - Q4 Target',
      description: 'Mike Chen is 23% behind Q4 quota with 15 days remaining',
      timestamp: new Date(Date.now() - 600000),
      rep: 'Mike Chen',
      action: 'Review pipeline',
      isNew: true
    },
    {
      id: 3,
      type: 'info',
      title: 'High-Value Deal Progressed',
      description: 'MegaCorp annual contract ($200K) moved to final approval stage',
      timestamp: new Date(Date.now() - 900000),
      dealId: 'DEAL-2024-003',
      rep: 'Lisa Rodriguez',
      action: 'Monitor progress',
      isNew: false
    },
    {
      id: 4,
      type: 'critical',
      title: 'Anomaly Detected - Conversion Rate',
      description: 'Lead to opportunity conversion dropped 15% in last 7 days',
      timestamp: new Date(Date.now() - 1200000),
      action: 'Investigate leads',
      isNew: true
    },
    {
      id: 5,
      type: 'warning',
      title: 'Deal Aging Alert',
      description: '8 deals have been in proposal stage for >30 days',
      timestamp: new Date(Date.now() - 1800000),
      action: 'Review proposals',
      isNew: false
    },
    {
      id: 6,
      type: 'success',
      title: 'Target Achieved',
      description: 'North America region exceeded monthly target by 12%',
      timestamp: new Date(Date.now() - 2400000),
      action: 'Celebrate success',
      isNew: false
    },
    {
      id: 7,
      type: 'warning',
      title: 'Pipeline Velocity Decline',
      description: 'Average deal cycle increased by 3.2 days this month',
      timestamp: new Date(Date.now() - 3000000),
      action: 'Analyze bottlenecks',
      isNew: false
    },
    {
      id: 8,
      type: 'info',
      title: 'New High-Value Lead',
      description: 'Fortune 500 company submitted RFP worth $500K+',
      timestamp: new Date(Date.now() - 3600000),
      action: 'Assign top rep',
      isNew: false
    }
  ];

  useEffect(() => {
    setAlerts(initialAlerts);

    // Simulate real-time alerts
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)],
        title: 'New Alert Generated',
        description: 'This is a simulated real-time alert for demonstration',
        timestamp: new Date(),
        action: 'Take action',
        isNew: true
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'success':
        return 'CheckCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const handleDismiss = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleAction = (alert) => {
    console.log('Taking action for alert:', alert.title);
    // In a real implementation, this would trigger specific actions
    alert.isNew = false;
    setAlerts(prev => [...prev]);
  };

  const alertCounts = {
    all: alerts.length,
    critical: alerts.filter(a => a.type === 'critical').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    info: alerts.filter(a => a.type === 'info').length,
    success: alerts.filter(a => a.type === 'success').length
  };

  return (
    <div className="bg-card rounded-lg border border-border h-fit max-h-[800px] flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={18} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">Alerts Feed</h2>
            {alerts.filter(a => a.isNew).length > 0 && (
              <span className="bg-error text-white text-xs px-2 py-1 rounded-full">
                {alerts.filter(a => a.isNew).length} new
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-text-secondary">Live</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { key: 'all', label: 'All', count: alertCounts.all },
            { key: 'critical', label: 'Critical', count: alertCounts.critical },
            { key: 'warning', label: 'Warning', count: alertCounts.warning },
            { key: 'info', label: 'Info', count: alertCounts.info }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`
                flex-1 px-2 py-2 text-xs font-medium rounded-md transition-colors
                ${filter === tab.key
                  ? 'bg-card text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1 text-xs opacity-60">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List - Properly constrained with scroll */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-3 space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
              <p className="text-text-secondary">No alerts to display</p>
            </div>
          ) : (
            filteredAlerts.slice(0, 8).map((alert) => (
              <div
                key={alert.id}
                className={`
                  relative p-3 rounded-lg border transition-all duration-200 hover:shadow-sm
                  ${getAlertColor(alert.type)}
                  ${alert.isNew ? 'ring-1 ring-primary/20' : ''}
                `}
              >
                {/* New indicator */}
                {alert.isNew && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}

                {/* Alert content */}
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getAlertIcon(alert.type)} 
                    size={16} 
                    className={`mt-0.5 flex-shrink-0 ${alert.type === 'critical' ? 'text-error' : 
                      alert.type === 'warning' ? 'text-warning' : 
                      alert.type === 'success' ? 'text-success' : 'text-primary'}`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-medium text-text-primary mb-1 pr-4 leading-tight">
                        {alert.title}
                      </h3>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="text-text-secondary hover:text-text-primary transition-colors flex-shrink-0"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                    
                    <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                      {alert.description}
                    </p>
                    
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
                      <div className="flex items-center space-x-2 min-w-0">
                        {alert.rep && (
                          <span className="bg-muted px-2 py-1 rounded text-xs truncate">
                            {alert.rep}
                          </span>
                        )}
                        {alert.dealId && (
                          <span className="bg-muted px-2 py-1 rounded font-mono text-xs">
                            {alert.dealId}
                          </span>
                        )}
                      </div>
                      <span className="flex-shrink-0 ml-2">{formatTimeAgo(alert.timestamp)}</span>
                    </div>
                    
                    {/* Action button */}
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleAction(alert)}
                      className="w-full text-xs"
                    >
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {/* Show more indicator if there are more alerts */}
          {filteredAlerts.length > 8 && (
            <div className="text-center py-2">
              <span className="text-xs text-text-secondary">
                +{filteredAlerts.length - 8} more alerts
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last updated: {formatTimeAgo(new Date(Date.now() - 30000))}</span>
          <Button variant="ghost" size="xs" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertsFeed;