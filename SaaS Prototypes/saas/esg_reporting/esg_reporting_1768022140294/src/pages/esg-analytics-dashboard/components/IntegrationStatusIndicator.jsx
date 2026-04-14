import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatusIndicator = ({ isCompact = false }) => {
  const [integrations, setIntegrations] = useState([]);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    // Mock integration status data with updated data points to match requirements
    const mockIntegrations = [
      {
        id: 'erp-system',
        name: 'ERP System',
        type: 'SAP',
        status: 'connected',
        lastSync: new Date(Date.now() - 300000), // 5 minutes ago
        dataPoints: 1247,
        icon: 'Database'
      },
      {
        id: 'facility-mgmt',
        name: 'Facility Management',
        type: 'Building Automation',
        status: 'connected',
        lastSync: new Date(Date.now() - 180000), // 3 minutes ago
        dataPoints: 892,
        icon: 'Building'
      },
      {
        id: 'energy-meters',
        name: 'Smart Energy Meters',
        type: 'IoT Sensors',
        status: 'syncing',
        lastSync: new Date(Date.now() - 60000), // Just now
        dataPoints: 2265,
        icon: 'Zap'
      },
      {
        id: 'hr-system',
        name: 'HR System',
        type: 'Workday',
        status: 'warning',
        lastSync: new Date(Date.now() - 7200000), // 2 hours ago
        dataPoints: 456,
        icon: 'Users',
        error: 'Authentication token expired'
      }
    ];

    setIntegrations(mockIntegrations);
    setLastSync(new Date());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setIntegrations(prev => prev?.map(integration => {
        if (integration?.status === 'syncing') {
          return {
            ...integration,
            lastSync: new Date(),
            dataPoints: integration?.dataPoints + Math.floor(Math.random() * 10)
          };
        }
        return integration;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'syncing': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'connected': return 'bg-success/10';
      case 'syncing': return 'bg-primary/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-error/10';
      default: return 'bg-muted/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'syncing': return 'RefreshCw';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const connectedCount = integrations?.filter(i => i?.status === 'connected')?.length;
  const totalCount = integrations?.length;

  if (isCompact) {
    return (
      <div className="flex items-center space-x-3 bg-muted rounded-lg px-4 py-3">
        <div className="flex items-center space-x-2">
          <Icon name="Wifi" size={16} className="text-success" />
          <span className="text-sm font-medium text-foreground">
            {connectedCount}/{totalCount}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          integrations active
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className="text-base font-semibold text-foreground break-words">System Integrations</h3>
          <p className="text-xs text-muted-foreground break-words">
            Real-time data sync status • Last updated {formatTimeAgo(lastSync)}
          </p>
        </div>
        <div className="flex items-center bg-muted/50 px-2 py-1.5 rounded-lg flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0" />
            <span className="text-xs font-medium text-foreground whitespace-nowrap">{connectedCount} active</span>
          </div>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid gap-2 mb-4">
        {integrations?.map((integration) => (
          <div
            key={integration?.id}
            className={`p-2.5 rounded-lg border transition-all duration-200 ${getStatusBg(integration?.status)} border-border hover:shadow-sm`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <div className={`${getStatusColor(integration?.status)} flex-shrink-0`}>
                  <Icon name={integration?.icon} size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1.5 mb-0.5">
                    <h4 className="font-semibold text-foreground text-xs truncate">
                      {integration?.name}
                    </h4>
                  </div>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className={`flex items-center space-x-1 ${getStatusColor(integration?.status)} flex-shrink-0 ml-2`}>
                <Icon 
                  name={getStatusIcon(integration?.status)} 
                  size={12} 
                  className={integration?.status === 'syncing' ? 'animate-spin' : ''}
                />
                <span className="text-xs font-medium capitalize">
                  {integration?.status === 'syncing' ? 'Syncing...' : integration?.status}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="space-y-1.5">
              {/* Data Points and Time */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium">
                  {integration?.dataPoints?.toLocaleString()} data points
                </span>
                <span>
                  {formatTimeAgo(integration?.lastSync)}
                </span>
              </div>

              {/* Error Message */}
              {integration?.error && (
                <div className="flex items-start justify-between pt-1.5 border-t border-border/50">
                  <p className="text-xs text-error flex-1 mr-2 leading-relaxed">
                    {integration?.error}
                  </p>
                  <button className="text-xs text-primary hover:text-primary/80 font-medium px-1.5 py-0.5 rounded transition-colors whitespace-nowrap flex-shrink-0">
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-success mb-0.5">
            {integrations?.filter(i => i?.status === 'connected')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Connected</div>
        </div>
        
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-primary mb-0.5">
            {integrations?.filter(i => i?.status === 'syncing')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Syncing</div>
        </div>
        
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-warning mb-0.5">
            {integrations?.filter(i => i?.status === 'warning')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Warning</div>
        </div>
        
        <div className="text-center p-2 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-error mb-0.5">
            {integrations?.filter(i => i?.status === 'error')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Error</div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatusIndicator;