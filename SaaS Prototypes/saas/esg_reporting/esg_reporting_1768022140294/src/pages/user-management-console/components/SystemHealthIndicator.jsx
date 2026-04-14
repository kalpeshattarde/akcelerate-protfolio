import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthIndicator = () => {
  const [systemHealth, setSystemHealth] = useState({
    overall: 'healthy',
    services: {
      database: { status: 'healthy', responseTime: 45, uptime: 99.9 },
      authentication: { status: 'healthy', responseTime: 23, uptime: 99.8 },
      ldap: { status: 'warning', responseTime: 156, uptime: 98.5 },
      mfa: { status: 'healthy', responseTime: 67, uptime: 99.7 },
      api: { status: 'healthy', responseTime: 89, uptime: 99.6 }
    },
    activeSessions: 47,
    securityAlerts: 2,
    lastUpdate: new Date()?.toISOString()
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        activeSessions: prev?.activeSessions + Math.floor(Math.random() * 3) - 1,
        services: {
          ...prev?.services,
          database: {
            ...prev?.services?.database,
            responseTime: Math.max(20, prev?.services?.database?.responseTime + Math.floor(Math.random() * 10) - 5)
          },
          authentication: {
            ...prev?.services?.authentication,
            responseTime: Math.max(15, prev?.services?.authentication?.responseTime + Math.floor(Math.random() * 8) - 4)
          }
        },
        lastUpdate: new Date()?.toISOString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const getOverallStatus = () => {
    const statuses = Object.values(systemHealth?.services)?.map(service => service?.status);
    if (statuses?.includes('error')) return 'error';
    if (statuses?.includes('warning')) return 'warning';
    return 'healthy';
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="flex items-center space-x-6">
      {/* Overall System Health */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          overallStatus === 'healthy' ? 'bg-success' :
          overallStatus === 'warning' ? 'bg-warning' : 'bg-error'
        } animate-pulse`} />
        <span className="text-sm font-medium text-foreground">System Health</span>
        <Icon name={getStatusIcon(overallStatus)} size={16} className={getStatusColor(overallStatus)} />
      </div>
      {/* Active Sessions */}
      <div className="flex items-center space-x-2">
        <Icon name="Users" size={16} className="text-primary" />
        <span className="text-sm text-foreground">{systemHealth?.activeSessions}</span>
        <span className="text-xs text-muted-foreground">active</span>
      </div>
      {/* Security Alerts */}
      {systemHealth?.securityAlerts > 0 && (
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-warning" />
          <span className="text-sm text-warning font-medium">{systemHealth?.securityAlerts}</span>
          <span className="text-xs text-muted-foreground">alerts</span>
        </div>
      )}
      {/* Service Status Dropdown */}
      <div className="relative group">
        <button className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-150">
          <Icon name="Server" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Services</span>
          <Icon name="ChevronDown" size={12} className="text-muted-foreground" />
        </button>

        {/* Dropdown Content */}
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
          <div className="p-3">
            <h4 className="text-sm font-medium text-foreground mb-3">Service Status</h4>
            <div className="space-y-2">
              {Object.entries(systemHealth?.services)?.map(([service, data]) => (
                <div key={service} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name={getStatusIcon(data?.status)} size={12} className={getStatusColor(data?.status)} />
                    <span className="text-xs text-foreground capitalize">{service}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-foreground">{data?.responseTime}ms</div>
                    <div className="text-xs text-muted-foreground">{data?.uptime}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(systemHealth.lastUpdate)?.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthIndicator;