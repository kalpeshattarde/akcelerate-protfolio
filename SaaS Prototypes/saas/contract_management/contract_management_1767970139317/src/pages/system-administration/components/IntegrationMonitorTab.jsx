import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IntegrationMonitorTab = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const integrations = [
    {
      id: 1,
      name: "SAP ERP Integration",
      type: "ERP",
      status: "Connected",
      health: "Healthy",
      lastSync: "2025-01-04 07:45:00",
      syncFrequency: "Every 15 minutes",
      recordsProcessed: 1247,
      errors: 0,
      endpoint: "https://api.sap.company.com/v2",
      apiKey: "sap_***_key_ending_xyz"
    },
    {
      id: 2,
      name: "Salesforce CRM",
      type: "CRM",
      status: "Connected",
      health: "Warning",
      lastSync: "2025-01-04 07:30:00",
      syncFrequency: "Every 30 minutes",
      recordsProcessed: 892,
      errors: 3,
      endpoint: "https://company.salesforce.com/services/data/v58.0",
      apiKey: "sf_***_key_ending_abc"
    },
    {
      id: 3,
      name: "DocuSign eSignature",
      type: "Document",
      status: "Connected",
      health: "Healthy",
      lastSync: "2025-01-04 07:40:00",
      syncFrequency: "Real-time webhooks",
      recordsProcessed: 156,
      errors: 0,
      endpoint: "https://demo.docusign.net/restapi/v2.1",
      apiKey: "ds_***_key_ending_def"
    },
    {
      id: 4,
      name: "Active Directory",
      type: "Authentication",
      status: "Disconnected",
      health: "Error",
      lastSync: "2025-01-04 06:15:00",
      syncFrequency: "Every 1 hour",
      recordsProcessed: 0,
      errors: 12,
      endpoint: "ldap://ad.company.com:389",
      apiKey: "ad_***_key_ending_ghi"
    },
    {
      id: 5,
      name: "Oracle Financial Cloud",
      type: "Finance",
      status: "Connected",
      health: "Healthy",
      lastSync: "2025-01-04 07:35:00",
      syncFrequency: "Every 2 hours",
      recordsProcessed: 634,
      errors: 1,
      endpoint: "https://company.oraclecloud.com/fscmRestApi/resources/11.13.18.05",
      apiKey: "oc_***_key_ending_jkl"
    }
  ];

  const recentLogs = [
    {
      id: 1,
      timestamp: "2025-01-04 07:45:23",
      integration: "SAP ERP Integration",
      level: "INFO",
      message: "Successfully synchronized 45 contract records",
      details: "Batch sync completed in 2.3 seconds"
    },
    {
      id: 2,
      timestamp: "2025-01-04 07:42:15",
      integration: "Salesforce CRM",
      level: "WARNING",
      message: "Rate limit approaching for API calls",
      details: "Current usage: 4,850/5,000 calls per hour"
    },
    {
      id: 3,
      timestamp: "2025-01-04 07:40:08",
      integration: "DocuSign eSignature",
      level: "INFO",
      message: "Webhook received for envelope completion",
      details: "Contract ID: CNT-2024-1567 signed by all parties"
    },
    {
      id: 4,
      timestamp: "2025-01-04 07:35:42",
      integration: "Oracle Financial Cloud",
      level: "ERROR",
      message: "Failed to update invoice status",
      details: "HTTP 500 - Internal server error from Oracle API"
    },
    {
      id: 5,
      timestamp: "2025-01-04 07:30:19",
      integration: "Active Directory",
      level: "ERROR",
      message: "Connection timeout during user sync",
      details: "Unable to reach LDAP server at ad.company.com:389"
    }
  ];

  const systemMetrics = {
    totalIntegrations: 5,
    activeConnections: 4,
    totalApiCalls: 15420,
    errorRate: 2.3,
    avgResponseTime: 245,
    dataProcessed: "2.4 GB"
  };

  const timeframeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Connected', label: 'Connected' },
    { value: 'Disconnected', label: 'Disconnected' },
    { value: 'Error', label: 'Error' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const filteredIntegrations = integrations?.filter(integration => {
    const matchesSearch = integration?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         integration?.type?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = !selectedStatus || integration?.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getHealthColor = (health) => {
    switch (health) {
      case 'Healthy':
        return 'text-success bg-success/10';
      case 'Warning':
        return 'text-warning bg-warning/10';
      case 'Error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'INFO':
        return 'text-accent bg-accent/10';
      case 'WARNING':
        return 'text-warning bg-warning/10';
      case 'ERROR':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleTestConnection = (integration) => {
    console.log('Testing connection for:', integration?.name);
  };

  const handleRefreshIntegration = (integration) => {
    console.log('Refreshing integration:', integration?.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Integration Monitor</h2>
          <p className="text-muted-foreground">Monitor API health, sync status, and system integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastRefresh?.toLocaleTimeString()}
          </div>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => setLastRefresh(new Date())}
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Plug" size={20} className="text-accent" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">{systemMetrics?.totalIntegrations}</div>
              <div className="text-sm text-muted-foreground">Total Integrations</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">{systemMetrics?.activeConnections}</div>
              <div className="text-sm text-muted-foreground">Active Connections</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-accent" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">{systemMetrics?.totalApiCalls?.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">API Calls Today</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">{systemMetrics?.errorRate}%</div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-accent" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">{systemMetrics?.avgResponseTime}ms</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={20} className="text-accent" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">{systemMetrics?.dataProcessed}</div>
              <div className="text-sm text-muted-foreground">Data Processed</div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="md:col-span-2"
          />
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
          <Select
            placeholder="Timeframe"
            options={timeframeOptions}
            value={selectedTimeframe}
            onChange={setSelectedTimeframe}
          />
        </div>
      </div>
      {/* Integrations Table */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-medium text-text-primary">Active Integrations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-text-primary">Integration</th>
                <th className="text-left p-4 font-medium text-text-primary">Status</th>
                <th className="text-left p-4 font-medium text-text-primary">Health</th>
                <th className="text-left p-4 font-medium text-text-primary">Last Sync</th>
                <th className="text-left p-4 font-medium text-text-primary">Records</th>
                <th className="text-left p-4 font-medium text-text-primary">Errors</th>
                <th className="text-right p-4 font-medium text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIntegrations?.map((integration) => (
                <tr key={integration?.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-text-primary">{integration?.name}</div>
                      <div className="text-sm text-muted-foreground">{integration?.type}</div>
                      <div className="text-xs text-muted-foreground mt-1">{integration?.syncFrequency}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      integration?.status === 'Connected' ?'bg-success/10 text-success' :'bg-error/10 text-error'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        integration?.status === 'Connected' ? 'bg-success' : 'bg-error'
                      }`} />
                      {integration?.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHealthColor(integration?.health)}`}>
                      {integration?.health}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-text-primary">
                      {new Date(integration.lastSync)?.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(integration.lastSync)?.toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-text-primary">{integration?.recordsProcessed?.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className={`text-sm font-medium ${integration?.errors > 0 ? 'text-error' : 'text-success'}`}>
                      {integration?.errors}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Activity"
                        onClick={() => handleTestConnection(integration)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="RefreshCw"
                        onClick={() => handleRefreshIntegration(integration)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Settings"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Recent Activity Logs */}
      <div className="bg-surface border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-text-primary">Recent Activity Logs</h3>
            <Button variant="outline" size="sm" iconName="Download">
              Export Logs
            </Button>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {recentLogs?.map((log) => (
            <div key={log?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLogLevelColor(log?.level)}`}>
                {log?.level}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-text-primary">{log?.integration}</div>
                  <div className="text-xs text-muted-foreground">{log?.timestamp}</div>
                </div>
                <div className="text-sm text-text-primary mt-1">{log?.message}</div>
                <div className="text-xs text-muted-foreground mt-1">{log?.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationMonitorTab;