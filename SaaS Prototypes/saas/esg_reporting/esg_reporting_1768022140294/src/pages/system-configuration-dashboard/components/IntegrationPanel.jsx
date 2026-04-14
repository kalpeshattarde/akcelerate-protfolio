import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationPanel = () => {
  const [integrations, setIntegrations] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    const mockIntegrations = [
      {
        id: 'erp-sap',
        name: 'ERP System',
        subtitle: 'SAP',
        type: 'ERP',
        status: 'connected',
        lastSync: '2025-01-07T12:06:00Z',
        health: 98.5,
        endpoint: 'https://erp.company.com/api/v1',
        errors: [],
        dataPoints: 1247,
        syncFrequency: '15 minutes',
        icon: 'Database'
      },
      {
        id: 'facility-mgmt',
        name: 'Facility Management',
        subtitle: 'Building Automation',
        type: 'Facility',
        status: 'connected',
        lastSync: '2025-01-07T12:08:00Z',
        health: 85.2,
        endpoint: 'https://facilities.company.com/api',
        errors: [],
        dataPoints: 892,
        syncFrequency: '30 minutes',
        icon: 'Building'
      },
      {
        id: 'smart-energy',
        name: 'Smart Energy Meters',
        subtitle: 'IoT Sensors',
        type: 'IoT',
        status: 'syncing',
        lastSync: '2025-01-07T12:13:00Z',
        health: 99.1,
        endpoint: 'https://energy.company.com/api/v2',
        errors: [],
        dataPoints: 2348,
        syncFrequency: '5 minutes',
        icon: 'Zap'
      },
      {
        id: 'hr-system',
        name: 'HR System',
        subtitle: 'Workday',
        type: 'HR',
        status: 'warning',
        lastSync: '2025-01-07T10:13:00Z',
        health: 45.8,
        endpoint: 'https://hr.company.com/api',
        errors: [
          { timestamp: '2025-01-07T10:13:00Z', message: 'Authentication token expired', severity: 'warning' }
        ],
        dataPoints: 456,
        syncFrequency: '6 hours',
        icon: 'Users'
      }
    ];

    setIntegrations(mockIntegrations);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'syncing': return 'text-primary';
      case 'maintenance': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'syncing': return 'RefreshCw';
      case 'maintenance': return 'Settings';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'connected': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-error/10';
      case 'syncing': return 'bg-primary/10';
      case 'maintenance': return 'bg-muted/10';
      default: return 'bg-muted/10';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      case 'syncing': return 'Syncing...';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const handleRetrySync = (integrationId) => {
    setIntegrations(prev => prev?.map(integration => 
      integration?.id === integrationId 
        ? { ...integration, status: 'syncing', lastSync: new Date()?.toISOString() }
        : integration
    ));

    // Simulate retry process
    setTimeout(() => {
      setIntegrations(prev => prev?.map(integration => 
        integration?.id === integrationId 
          ? { ...integration, status: 'connected', health: 95 + Math.random() * 5, errors: [] }
          : integration
      ));
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const connectedCount = integrations?.filter(i => i?.status === 'connected')?.length || 0;
  const syncingCount = integrations?.filter(i => i?.status === 'syncing')?.length || 0;
  const warningCount = integrations?.filter(i => i?.status === 'warning')?.length || 0;
  const errorCount = integrations?.filter(i => i?.status === 'error')?.length || 0;

  return (
    <div className="space-y-6">
      {/* System Integrations Section */}
      <div className="bg-card border border-border rounded-lg">
        {/* Header Section */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2 break-words">
                System Integrations
              </h2>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span className="break-words">Real-time data sync status</span>
                <span className="hidden sm:inline">•</span>
                <span className="break-words">Last updated 2m ago</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground whitespace-nowrap">2 active</span>
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Icon name="Plus" size={16} className="mr-2" />
                <span className="hidden sm:inline">Add Integration</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Integration Cards Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {integrations?.map((integration) => (
              <div key={integration?.id} className="bg-muted/30 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-150">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 ${getStatusBg(integration?.status)} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon 
                        name={integration?.icon} 
                        size={18} 
                        className="text-foreground"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-foreground text-sm break-words leading-tight">
                        {integration?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground break-words leading-tight mt-1">
                        {integration?.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Icon 
                      name={getStatusIcon(integration?.status)} 
                      size={14} 
                      className={`${getStatusColor(integration?.status)} ${integration?.status === 'syncing' ? 'animate-spin' : ''}`}
                    />
                    <span className={`text-xs font-medium ${getStatusColor(integration?.status)} whitespace-nowrap`}>
                      {getStatusText(integration?.status)}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="break-words">
                      {integration?.dataPoints?.toLocaleString()} data points
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="whitespace-nowrap">
                      {formatTimeAgo(integration?.lastSync)}
                    </span>
                  </div>

                  {/* Error Message */}
                  {integration?.errors?.length > 0 && (
                    <div className="bg-warning/10 border border-warning/20 rounded p-2 mt-2">
                      <p className="text-xs text-warning break-words leading-tight">
                        {integration?.errors?.[0]?.message}
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  {integration?.status === 'warning' && (
                    <div className="flex justify-end mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs px-3 py-1 h-auto"
                        onClick={() => handleRetrySync(integration?.id)}
                      >
                        <Icon name="RefreshCw" size={12} className="mr-1" />
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Footer */}
          <div className="border-t border-border pt-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground whitespace-nowrap">
                  {connectedCount} Connected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground whitespace-nowrap">
                  {syncingCount} Syncing
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-muted-foreground whitespace-nowrap">
                  {warningCount} Warning
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-error rounded-full"></div>
                <span className="text-muted-foreground whitespace-nowrap">
                  {errorCount} Error
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {integrations?.filter(i => i?.status === 'connected')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Connected</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {integrations?.filter(i => i?.status === 'warning')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="XCircle" size={20} className="text-error" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {integrations?.filter(i => i?.status === 'error')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Database" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {integrations?.reduce((sum, i) => sum + i?.dataPoints, 0)?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Data Points</div>
            </div>
          </div>
        </div>
      </div>
      {/* Integration List */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">System Integrations</h3>
            <Button variant="outline" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Integration
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {integrations?.map((integration) => (
            <div key={integration?.id} className="p-4 hover:bg-muted/50 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${getStatusBg(integration?.status)} rounded-lg flex items-center justify-center`}>
                    <Icon 
                      name={getStatusIcon(integration?.status)} 
                      size={20} 
                      className={getStatusColor(integration?.status)}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{integration?.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{integration?.type}</span>
                      <span>•</span>
                      <span>Last sync: {formatTimeAgo(integration?.lastSync)}</span>
                      <span>•</span>
                      <span>{integration?.dataPoints?.toLocaleString()} data points</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getStatusColor(integration?.status)}`}>
                      {integration?.health > 0 ? `${integration?.health?.toFixed(1)}% Health` : 'Offline'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Sync: {integration?.syncFrequency}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedIntegration(integration);
                        setShowLogs(true);
                      }}
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    
                    {integration?.status === 'error' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetrySync(integration?.id)}
                      >
                        <Icon name="RefreshCw" size={16} className="mr-2" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {integration?.errors?.length > 0 && (
                <div className="mt-3 pl-16">
                  <div className="bg-error/5 border border-error/20 rounded-lg p-3">
                    <div className="text-sm font-medium text-error mb-2">Recent Errors:</div>
                    {integration?.errors?.slice(0, 2)?.map((error, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        <span className={getSeverityColor(error?.severity)}>
                          {formatTimeAgo(error?.timestamp)}:
                        </span>
                        <span className="ml-2">{error?.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Integration Details Modal */}
      {showLogs && selectedIntegration && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground break-words pr-4">
                {selectedIntegration?.name} - Details
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => setShowLogs(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Status</div>
                  <div className={`text-sm font-medium ${getStatusColor(selectedIntegration?.status)} break-words`}>
                    {selectedIntegration?.status?.charAt(0)?.toUpperCase() + selectedIntegration?.status?.slice(1)}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Health</div>
                  <div className="text-sm font-medium text-foreground">
                    {selectedIntegration?.health?.toFixed(1)}%
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-sm font-medium text-muted-foreground">Endpoint</div>
                  <div className="text-sm text-foreground font-mono break-all">
                    {selectedIntegration?.endpoint}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Sync Frequency</div>
                  <div className="text-sm text-foreground break-words">
                    {selectedIntegration?.syncFrequency}
                  </div>
                </div>
              </div>

              {selectedIntegration?.errors?.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Error Log</div>
                  <div className="bg-muted rounded-lg p-3 max-h-40 overflow-y-auto">
                    {selectedIntegration?.errors?.map((error, index) => (
                      <div key={index} className="text-sm mb-2 last:mb-0 break-words">
                        <span className="text-muted-foreground">
                          {new Date(error.timestamp)?.toLocaleString()}
                        </span>
                        <span className={`ml-2 font-medium ${getSeverityColor(error?.severity)}`}>
                          [{error?.severity?.toUpperCase()}]
                        </span>
                        <span className="ml-2 text-foreground">{error?.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-border flex flex-col sm:flex-row justify-end gap-2">
              <Button variant="outline" onClick={() => setShowLogs(false)}>
                Close
              </Button>
              <Button onClick={() => handleRetrySync(selectedIntegration?.id)}>
                Test Connection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationPanel;