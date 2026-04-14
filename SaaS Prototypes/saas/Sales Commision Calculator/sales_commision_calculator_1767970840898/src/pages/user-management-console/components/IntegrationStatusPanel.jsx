// src/pages/user-management-console/components/IntegrationStatusPanel.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const IntegrationStatusPanel = ({ ssoStatus }) => {
  const [showDetails, setShowDetails] = useState(false);

  const integrations = [
    {
      id: 'sso',
      name: 'Single Sign-On',
      status: ssoStatus,
      description: 'Active Directory / LDAP integration',
      lastSync: '2024-01-20T11:45:00Z',
      userCount: 247
    },
    {
      id: 'hris',
      name: 'HRIS System',
      status: 'healthy',
      description: 'Employee data synchronization',
      lastSync: '2024-01-20T10:30:00Z',
      userCount: 247
    },
    {
      id: 'provisioning',
      name: 'User Provisioning',
      status: 'syncing',
      description: 'Automated account creation',
      lastSync: '2024-01-20T11:50:00Z',
      userCount: 12
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'healthy':
        return {
          color: 'text-success',
          bgColor: 'bg-success-100',
          icon: 'CheckCircle',
          label: 'Healthy'
        };
      case 'syncing':
        return {
          color: 'text-info',
          bgColor: 'bg-info-100',
          icon: 'RefreshCw',
          label: 'Syncing',
          animate: true
        };
      case 'warning':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning-100',
          icon: 'AlertTriangle',
          label: 'Warning'
        };
      case 'error':
        return {
          color: 'text-error',
          bgColor: 'bg-error-100',
          icon: 'AlertCircle',
          label: 'Error'
        };
      default:
        return {
          color: 'text-secondary-400',
          bgColor: 'bg-secondary-100',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  const formatLastSync = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / (1000 * 60));
      
      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes} min ago`;
      
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      
      return date.toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  };

  const getOverallStatus = () => {
    const statuses = integrations.map(i => i.status);
    if (statuses.includes('error')) return 'error';
    if (statuses.includes('warning')) return 'warning';
    if (statuses.includes('syncing')) return 'syncing';
    return 'healthy';
  };

  const overallStatusConfig = getStatusConfig(getOverallStatus());

  return (
    <div className="bg-surface border-b border-border px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Overall Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${overallStatusConfig.bgColor} rounded-full flex items-center justify-center`}>
              <Icon 
                name={overallStatusConfig.icon} 
                size={16} 
                className={`${overallStatusConfig.color} ${overallStatusConfig.animate ? 'animate-spin' : ''}`} 
              />
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">Integration Status</div>
              <div className={`text-xs ${overallStatusConfig.color}`}>
                System {overallStatusConfig.label}
              </div>
            </div>
          </div>

          {/* Individual Integration Status */}
          <div className="flex items-center space-x-3">
            {integrations.map((integration) => {
              const statusConfig = getStatusConfig(integration.status);
              return (
                <div key={integration.id} className="flex items-center space-x-2">
                  <Icon 
                    name={statusConfig.icon} 
                    size={14} 
                    className={`${statusConfig.color} ${statusConfig.animate ? 'animate-spin' : ''}`} 
                  />
                  <span className="text-sm text-text-secondary">{integration.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-secondary-600 hover:text-primary transition-smooth"
          >
            <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} size={16} />
            <span>{showDetails ? 'Hide' : 'Show'} Details</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-1 text-sm text-secondary-600 hover:text-primary transition-smooth">
            <Icon name="RefreshCw" size={16} />
            <span>Sync Now</span>
          </button>
        </div>
      </div>

      {/* Detailed Status Panel */}
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrations.map((integration) => {
              const statusConfig = getStatusConfig(integration.status);
              return (
                <div key={integration.id} className="bg-secondary-50 rounded-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-text-primary">{integration.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={statusConfig.icon} 
                        size={14} 
                        className={`${statusConfig.color} ${statusConfig.animate ? 'animate-spin' : ''}`} 
                      />
                      <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-text-secondary mb-3">{integration.description}</p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">Last Sync:</span>
                      <span className="text-xs text-text-primary">{formatLastSync(integration.lastSync)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">Users:</span>
                      <span className="text-xs text-text-primary">{integration.userCount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border">
                    <button className="text-xs text-primary hover:text-primary-700 transition-smooth">
                      View Logs
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* System Health Metrics */}
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-text-primary mb-3">System Health</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-success">99.9%</div>
                <div className="text-xs text-text-secondary">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">247</div>
                <div className="text-xs text-text-secondary">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-info">12</div>
                <div className="text-xs text-text-secondary">Pending Sync</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-warning">2</div>
                <div className="text-xs text-text-secondary">Warnings</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationStatusPanel;