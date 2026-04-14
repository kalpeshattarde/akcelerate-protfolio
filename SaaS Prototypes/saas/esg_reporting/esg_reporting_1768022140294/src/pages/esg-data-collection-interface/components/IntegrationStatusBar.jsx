import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatusBar = ({ onRefresh }) => {
  const [integrationStatus, setIntegrationStatus] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const mockIntegrationStatus = [
      {
        id: 'erp-system',
        name: 'ERP System',
        type: 'SAP',
        status: 'connected',
        lastSync: '2025-01-07T04:30:00Z',
        nextSync: '2025-01-07T05:00:00Z',
        dataPoints: 156,
        errors: 0,
        icon: 'Database'
      },
      {
        id: 'facility-mgmt',
        name: 'Facility Management',
        type: 'Building Automation',
        status: 'connected',
        lastSync: '2025-01-07T04:35:00Z',
        nextSync: '2025-01-07T04:50:00Z',
        dataPoints: 89,
        errors: 0,
        icon: 'Building2'
      },
      {
        id: 'hr-system',
        name: 'HR System',
        type: 'Workday',
        status: 'warning',
        lastSync: '2025-01-06T22:15:00Z',
        nextSync: '2025-01-07T05:15:00Z',
        dataPoints: 45,
        errors: 2,
        icon: 'Users'
      },
      {
        id: 'energy-meter',
        name: 'Smart Energy Meters',
        type: 'IoT Sensors',
        status: 'error',
        lastSync: '2025-01-06T18:45:00Z',
        nextSync: '2025-01-07T05:45:00Z',
        dataPoints: 0,
        errors: 5,
        icon: 'Zap'
      },
      {
        id: 'waste-mgmt',
        name: 'Waste Management',
        type: 'Third-party API',
        status: 'syncing',
        lastSync: '2025-01-07T04:40:00Z',
        nextSync: '2025-01-07T05:40:00Z',
        dataPoints: 23,
        errors: 0,
        icon: 'Trash2'
      }
    ];

    setIntegrationStatus(mockIntegrationStatus);
    setLastSync(new Date()?.toISOString());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setIntegrationStatus(prev => prev?.map(integration => {
        if (integration?.status === 'syncing') {
          return {
            ...integration,
            status: Math.random() > 0.7 ? 'connected' : 'syncing',
            lastSync: new Date()?.toISOString(),
            dataPoints: integration?.dataPoints + Math.floor(Math.random() * 5)
          };
        }
        return integration;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // Simulate refresh process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIntegrationStatus(prev => prev?.map(integration => ({
        ...integration,
        lastSync: new Date()?.toISOString(),
        status: integration?.status === 'error' ? 'warning' : integration?.status
      })));
      
      setLastSync(new Date()?.toISOString());
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'syncing': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'connected': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-error/10';
      case 'syncing': return 'bg-primary/10';
      default: return 'bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'syncing': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const connectedCount = integrationStatus?.filter(i => i?.status === 'connected')?.length;
  const totalDataPoints = integrationStatus?.reduce((sum, i) => sum + i?.dataPoints, 0);
  const totalErrors = integrationStatus?.reduce((sum, i) => sum + i?.errors, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Workflow" size={20} className="text-primary" />
          <div>
            <h3 className="font-medium text-foreground">Data Integration Status</h3>
            <p className="text-sm text-muted-foreground">
              {connectedCount}/{integrationStatus?.length} systems connected • 
              {totalDataPoints?.toLocaleString()} data points • 
              Last sync: {formatTimeAgo(lastSync)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {totalErrors > 0 && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-error/10 text-error rounded-full text-xs font-medium">
              <Icon name="AlertCircle" size={12} />
              <span>{totalErrors} errors</span>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <Icon 
              name="RefreshCw" 
              size={16} 
              className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            Refresh All
          </Button>
        </div>
      </div>
      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {integrationStatus?.map((integration) => (
          <div
            key={integration?.id}
            className={`p-3 rounded-lg border transition-all duration-150 hover:shadow-sm ${
              integration?.status === 'connected' ? 'border-success/20 bg-success/5' :
              integration?.status === 'warning' ? 'border-warning/20 bg-warning/5' :
              integration?.status === 'error' ? 'border-error/20 bg-error/5' :
              integration?.status === 'syncing'? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon name={integration?.icon} size={16} className="text-muted-foreground" />
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getStatusIcon(integration?.status)} 
                  size={12} 
                  className={`${getStatusColor(integration?.status)} ${
                    integration?.status === 'syncing' ? 'animate-spin' : ''
                  }`}
                />
              </div>
            </div>

            <div className="mb-2">
              <h4 className="text-sm font-medium text-foreground truncate">
                {integration?.name}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {integration?.type}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Data Points</span>
                <span className="font-medium text-foreground">
                  {integration?.dataPoints?.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Last Sync</span>
                <span className="font-medium text-foreground">
                  {formatTimeAgo(integration?.lastSync)}
                </span>
              </div>

              {integration?.errors > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Errors</span>
                  <span className="font-medium text-error">
                    {integration?.errors}
                  </span>
                </div>
              )}

              <div className={`px-2 py-1 rounded-full text-xs font-medium text-center capitalize ${
                getStatusBg(integration?.status)
              } ${getStatusColor(integration?.status)}`}>
                {integration?.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Next scheduled sync in {Math.floor(Math.random() * 30) + 5} minutes
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={14} className="mr-2" />
              Configure
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Eye" size={14} className="mr-2" />
              View Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatusBar;