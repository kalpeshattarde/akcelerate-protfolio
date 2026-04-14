import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMonitor = ({ loading = false }) => {
  const [selectedMetric, setSelectedMetric] = useState('cpu');

  const systemMetrics = {
    cpu: {
      label: 'CPU Usage',
      value: 45,
      status: 'good',
      icon: 'Cpu',
      color: 'success'
    },
    memory: {
      label: 'Memory Usage',
      value: 68,
      status: 'warning',
      icon: 'HardDrive',
      color: 'warning'
    },
    bandwidth: {
      label: 'Bandwidth',
      value: 82,
      status: 'good',
      icon: 'Wifi',
      color: 'success'
    },
    storage: {
      label: 'Storage',
      value: 34,
      status: 'good',
      icon: 'Database',
      color: 'success'
    }
  };

  const activeConnections = [
    { id: 1, room: "Board Meeting", participants: 12, quality: "HD", status: "stable" },
    { id: 2, room: "Team Standup", participants: 8, quality: "HD", status: "stable" },
    { id: 3, room: "Client Call", participants: 5, quality: "SD", status: "unstable" },
    { id: 4, room: "Training Session", participants: 25, quality: "HD", status: "stable" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      stable: 'text-success',
      unstable: 'text-warning',
      poor: 'text-error'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    const icons = {
      stable: 'CheckCircle',
      unstable: 'AlertTriangle',
      poor: 'XCircle'
    };
    return icons?.[status] || 'Circle';
  };

  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-48 mb-6"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4]?.map((i) => (
            <div key={i} className="h-20 bg-muted rounded"></div>
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="h-12 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">System Performance</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      {/* System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(systemMetrics)?.map(([key, metric]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
              selectedMetric === key 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedMetric(key)}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={16} className="text-muted-foreground" />
              <span className={`text-xs font-medium ${
                metric?.color === 'success' ? 'text-success' : 
                metric?.color === 'warning' ? 'text-warning' : 'text-error'
              }`}>
                {metric?.status?.toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">{metric?.label}</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric?.color === 'success' ? 'bg-success' : 
                    metric?.color === 'warning' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${metric?.value}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-foreground">{metric?.value}%</span>
            </div>
          </div>
        ))}
      </div>
      {/* Active Connections */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-4">Active Meetings</h4>
        <div className="space-y-3">
          {activeConnections?.map((connection) => (
            <div key={connection?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Video" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{connection?.room}</p>
                  <p className="text-xs text-muted-foreground">
                    {connection?.participants} participants • {connection?.quality}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(connection?.status)} 
                  size={16} 
                  className={getStatusColor(connection?.status)}
                />
                <span className={`text-xs font-medium ${getStatusColor(connection?.status)}`}>
                  {connection?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;