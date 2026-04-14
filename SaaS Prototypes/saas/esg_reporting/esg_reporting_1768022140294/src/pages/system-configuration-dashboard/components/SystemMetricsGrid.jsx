import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemMetricsGrid = () => {
  const [metrics, setMetrics] = useState({
    activeSessions: 0,
    dataSync: 'syncing',
    apiHealth: 98.5,
    storageUsed: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    networkLatency: 0,
    errorRate: 0
  });

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeSessions: Math.floor(Math.random() * 50) + 25,
        dataSync: ['syncing', 'completed', 'error']?.[Math.floor(Math.random() * 3)],
        apiHealth: 95 + Math.random() * 5,
        storageUsed: 65 + Math.random() * 10,
        cpuUsage: 20 + Math.random() * 30,
        memoryUsage: 40 + Math.random() * 20,
        networkLatency: 10 + Math.random() * 20,
        errorRate: Math.random() * 2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'syncing': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'syncing': return 'RefreshCw';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getHealthColor = (value) => {
    if (value >= 95) return 'text-success';
    if (value >= 85) return 'text-warning';
    return 'text-error';
  };

  const getUsageColor = (value) => {
    if (value >= 80) return 'text-error';
    if (value >= 60) return 'text-warning';
    return 'text-success';
  };

  const metricCards = [
    {
      title: 'Active Sessions',
      value: metrics?.activeSessions,
      unit: 'users',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Data Sync Status',
      value: metrics?.dataSync,
      icon: getStatusIcon(metrics?.dataSync),
      color: getStatusColor(metrics?.dataSync),
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'API Health',
      value: `${metrics?.apiHealth?.toFixed(1)}%`,
      icon: 'Activity',
      color: getHealthColor(metrics?.apiHealth),
      bgColor: 'bg-success/10'
    },
    {
      title: 'Storage Used',
      value: `${metrics?.storageUsed?.toFixed(1)}%`,
      icon: 'HardDrive',
      color: getUsageColor(metrics?.storageUsed),
      bgColor: 'bg-warning/10'
    },
    {
      title: 'CPU Usage',
      value: `${metrics?.cpuUsage?.toFixed(1)}%`,
      icon: 'Cpu',
      color: getUsageColor(metrics?.cpuUsage),
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Memory Usage',
      value: `${metrics?.memoryUsage?.toFixed(1)}%`,
      icon: 'MemoryStick',
      color: getUsageColor(metrics?.memoryUsage),
      bgColor: 'bg-secondary/10'
    },
    {
      title: 'Network Latency',
      value: `${metrics?.networkLatency?.toFixed(0)}ms`,
      icon: 'Wifi',
      color: metrics?.networkLatency > 100 ? 'text-error' : 'text-success',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Error Rate',
      value: `${metrics?.errorRate?.toFixed(2)}%`,
      icon: 'AlertTriangle',
      color: metrics?.errorRate > 1 ? 'text-error' : 'text-success',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${metric?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon 
                name={metric?.icon} 
                size={20} 
                className={metric?.color}
              />
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${metric?.color}`}>
                {typeof metric?.value === 'string' && metric?.value !== 'syncing' && metric?.value !== 'completed' && metric?.value !== 'error' 
                  ? metric?.value 
                  : typeof metric?.value === 'number' 
                    ? metric?.value 
                    : metric?.value?.charAt(0)?.toUpperCase() + metric?.value?.slice(1)
                }
              </div>
              {metric?.unit && (
                <div className="text-xs text-muted-foreground">{metric?.unit}</div>
              )}
            </div>
          </div>
          <div className="text-sm font-medium text-foreground">{metric?.title}</div>
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                metric?.color?.includes('success') ? 'bg-success' :
                metric?.color?.includes('warning') ? 'bg-warning' :
                metric?.color?.includes('error') ? 'bg-error' : 'bg-primary'
              }`}
              style={{ 
                width: `${
                  typeof metric?.value === 'string' ? 
                    (metric?.value === 'completed' ? 100 : metric?.value === 'syncing' ? 50 : 25) :
                    Math.min(100, typeof metric?.value === 'number'? (metric?.title?.includes('%') ? parseFloat(metric?.value) : 
                       metric?.title === 'Active Sessions' ? (metric?.value / 75) * 100 :
                       metric?.title === 'Network Latency' ? Math.min(100, (metric?.value / 200) * 100) :
                       metric?.title === 'Error Rate' ? Math.min(100, (metric?.value / 5) * 100) : 50) : 50)
                }%` 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemMetricsGrid;