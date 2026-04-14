import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatusIndicator = ({ status }) => {
  const getStatusConfig = (statusType) => {
    const configs = {
      excellent: {
        color: 'success',
        bgColor: 'bg-success/10',
        textColor: 'text-success',
        icon: 'CheckCircle',
        label: 'Excellent'
      },
      good: {
        color: 'accent',
        bgColor: 'bg-accent/10',
        textColor: 'text-accent',
        icon: 'Circle',
        label: 'Good'
      },
      fair: {
        color: 'warning',
        bgColor: 'bg-warning/10',
        textColor: 'text-warning',
        icon: 'AlertCircle',
        label: 'Fair'
      },
      poor: {
        color: 'error',
        bgColor: 'bg-error/10',
        textColor: 'text-error',
        icon: 'XCircle',
        label: 'Poor'
      }
    };
    return configs?.[statusType] || configs?.good;
  };

  const statusItems = [
    {
      id: 'server',
      label: 'Server Status',
      value: status?.server || 'excellent',
      details: 'All systems operational'
    },
    {
      id: 'bandwidth',
      label: 'Bandwidth',
      value: status?.bandwidth || 'good',
      details: '850 Mbps available'
    },
    {
      id: 'latency',
      label: 'Network Latency',
      value: status?.latency || 'excellent',
      details: '12ms average'
    },
    {
      id: 'quality',
      label: 'Call Quality',
      value: status?.quality || 'good',
      details: '98.5% success rate'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">System Status</h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">Live</span>
        </div>
      </div>
      <div className="space-y-4">
        {statusItems?.map((item) => {
          const config = getStatusConfig(item?.value);
          return (
            <div key={item?.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-micro">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${config?.bgColor} rounded-full flex items-center justify-center`}>
                  <Icon name={config?.icon} size={16} className={config?.textColor} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item?.label}</p>
                  <p className="text-sm text-muted-foreground">{item?.details}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${config?.textColor}`}>
                  {config?.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last updated</span>
          <span className="text-foreground font-medium">
            {new Date()?.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusIndicator;