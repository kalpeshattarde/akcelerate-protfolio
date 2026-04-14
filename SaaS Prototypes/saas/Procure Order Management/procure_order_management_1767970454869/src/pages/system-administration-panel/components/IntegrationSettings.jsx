import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationSettings = ({ searchQuery }) => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [testingConnection, setTestingConnection] = useState(null);

  const integrations = [
    {
      id: 'erp-sap',
      name: 'SAP ERP',
      type: 'ERP System',
      status: 'Connected',
      lastSync: '2024-01-15 10:30 AM',
      health: 'Healthy',
      description: 'Enterprise resource planning integration for financial data synchronization',
      endpoint: 'https://sap.company.com/api/v1',
      authentication: 'OAuth 2.0',
      syncFrequency: 'Every 15 minutes',
      dataTypes: ['Purchase Orders', 'Invoices', 'Vendors', 'GL Accounts'],
      errorCount: 0,
      successRate: 99.8
    },
    {
      id: 'supplier-portal',
      name: 'Supplier Portal',
      type: 'External Portal',
      status: 'Connected',
      lastSync: '2024-01-15 10:25 AM',
      health: 'Healthy',
      description: 'Supplier self-service portal for order confirmations and delivery updates',
      endpoint: 'https://suppliers.company.com/api',
      authentication: 'API Key',
      syncFrequency: 'Real-time',
      dataTypes: ['Order Confirmations', 'Delivery Updates', 'Invoices'],
      errorCount: 2,
      successRate: 98.5
    },
    {
      id: 'payment-processor',
      name: 'Payment Gateway',
      type: 'Payment System',
      status: 'Warning',
      lastSync: '2024-01-15 09:45 AM',
      health: 'Degraded',
      description: 'Payment processing system for automated vendor payments',
      endpoint: 'https://payments.bank.com/api/v2',
      authentication: 'Certificate',
      syncFrequency: 'Daily',
      dataTypes: ['Payment Status', 'Transaction Records'],
      errorCount: 15,
      successRate: 94.2
    },
    {
      id: 'email-service',
      name: 'Email Service',
      type: 'Communication',
      status: 'Connected',
      lastSync: '2024-01-15 10:32 AM',
      health: 'Healthy',
      description: 'Email notification service for workflow alerts and approvals',
      endpoint: 'smtp.company.com:587',
      authentication: 'SMTP Auth',
      syncFrequency: 'Real-time',
      dataTypes: ['Notifications', 'Alerts', 'Reports'],
      errorCount: 0,
      successRate: 100
    },
    {
      id: 'document-storage',
      name: 'Document Storage',
      type: 'File System',
      status: 'Error',
      lastSync: '2024-01-15 08:15 AM',
      health: 'Critical',
      description: 'Cloud document storage for purchase order attachments and contracts',
      endpoint: 'https://storage.cloud.com/api',
      authentication: 'Bearer Token',
      syncFrequency: 'On-demand',
      dataTypes: ['Documents', 'Attachments', 'Contracts'],
      errorCount: 45,
      successRate: 87.3
    },
    {
      id: 'audit-system',
      name: 'Audit System',
      type: 'Compliance',
      status: 'Connected',
      lastSync: '2024-01-15 10:00 AM',
      health: 'Healthy',
      description: 'Compliance and audit trail system for regulatory reporting',
      endpoint: 'https://audit.company.com/api',
      authentication: 'Mutual TLS',
      syncFrequency: 'Hourly',
      dataTypes: ['Audit Logs', 'Compliance Reports', 'User Activities'],
      errorCount: 1,
      successRate: 99.9
    }
  ];

  const connectionLogs = [
    {
      id: 1,
      integration: 'SAP ERP',
      timestamp: '2024-01-15 10:30:15',
      type: 'Success',
      message: 'Data synchronization completed successfully',
      details: 'Synchronized 45 purchase orders and 12 vendor records'
    },
    {
      id: 2,
      integration: 'Payment Gateway',
      timestamp: '2024-01-15 10:15:22',
      type: 'Warning',
      message: 'Connection timeout during payment status check',
      details: 'Retrying connection in 5 minutes'
    },
    {
      id: 3,
      integration: 'Document Storage',
      timestamp: '2024-01-15 09:45:33',
      type: 'Error',
      message: 'Authentication failed - invalid token',
      details: 'Token expired, automatic renewal failed'
    },
    {
      id: 4,
      integration: 'Supplier Portal',
      timestamp: '2024-01-15 09:30:44',
      type: 'Success',
      message: 'Real-time order confirmation received',
      details: 'PO-2024-001 confirmed by ABC Corp'
    },
    {
      id: 5,
      integration: 'Email Service',
      timestamp: '2024-01-15 09:15:55',
      type: 'Success',
      message: 'Notification sent successfully',
      details: 'Approval reminder sent to finance team'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Connected': return 'bg-success-100 text-success-700';
      case 'Warning': return 'bg-warning-100 text-warning-700';
      case 'Error': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'Healthy': return 'text-success';
      case 'Degraded': return 'text-warning';
      case 'Critical': return 'text-error';
      default: return 'text-secondary';
    }
  };

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'Success': return 'bg-success-100 text-success-700';
      case 'Warning': return 'bg-warning-100 text-warning-700';
      case 'Error': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const handleTestConnection = async (integrationId) => {
    setTestingConnection(integrationId);
    // Simulate API call
    setTimeout(() => {
      setTestingConnection(null);
    }, 2000);
  };

  const filteredIntegrations = integrations.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading-semibold text-text-primary mb-2">Integration Settings</h2>
          <p className="text-text-secondary">Manage external system connections and data synchronization</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Sync All
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth">
            <Icon name="Plus" size={16} className="mr-2" />
            Add Integration
          </button>
        </div>
      </div>

      {/* Integration Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-surface border border-border rounded-card p-4 hover:shadow-elevation-md transition-smooth cursor-pointer"
            onClick={() => setSelectedIntegration(integration)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={
                      integration.type === 'ERP System' ? 'Database' :
                      integration.type === 'Payment System' ? 'CreditCard' :
                      integration.type === 'Communication' ? 'Mail' :
                      integration.type === 'File System' ? 'FolderOpen' :
                      integration.type === 'Compliance'? 'Shield' : 'Plug'
                    } 
                    size={20} 
                    className="text-primary"
                  />
                </div>
                <div>
                  <h3 className="font-heading-medium text-text-primary">{integration.name}</h3>
                  <p className="text-sm text-text-secondary">{integration.type}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium ${getStatusColor(integration.status)}`}>
                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                  integration.status === 'Connected' ? 'bg-success-500' :
                  integration.status === 'Warning'? 'bg-warning-500' : 'bg-error-500'
                }`}></div>
                {integration.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Health</span>
                <span className={`font-body-medium ${getHealthColor(integration.health)}`}>
                  {integration.health}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Success Rate</span>
                <span className="font-body-medium text-text-primary">{integration.successRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Errors</span>
                <span className={`font-body-medium ${integration.errorCount > 10 ? 'text-error' : 'text-text-primary'}`}>
                  {integration.errorCount}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                Last sync: {integration.lastSync}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTestConnection(integration.id);
                }}
                disabled={testingConnection === integration.id}
                className="flex items-center px-2 py-1 text-xs bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth disabled:opacity-50"
              >
                {testingConnection === integration.id ? (
                  <>
                    <Icon name="Loader2" size={12} className="mr-1 animate-spin" />
                    Testing
                  </>
                ) : (
                  <>
                    <Icon name="Zap" size={12} className="mr-1" />
                    Test
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Details Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="bg-surface rounded-card border border-border max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={
                        selectedIntegration.type === 'ERP System' ? 'Database' :
                        selectedIntegration.type === 'Payment System' ? 'CreditCard' :
                        selectedIntegration.type === 'Communication' ? 'Mail' :
                        selectedIntegration.type === 'File System' ? 'FolderOpen' :
                        selectedIntegration.type === 'Compliance'? 'Shield' : 'Plug'
                      } 
                      size={24} 
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading-semibold text-text-primary">{selectedIntegration.name}</h2>
                    <p className="text-text-secondary">{selectedIntegration.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-button transition-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-heading-medium text-text-primary mb-3">Connection Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-text-secondary">Endpoint</label>
                      <p className="font-body-normal text-text-primary">{selectedIntegration.endpoint}</p>
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary">Authentication</label>
                      <p className="font-body-normal text-text-primary">{selectedIntegration.authentication}</p>
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary">Sync Frequency</label>
                      <p className="font-body-normal text-text-primary">{selectedIntegration.syncFrequency}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading-medium text-text-primary mb-3">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-text-secondary">Success Rate</label>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-success-500 h-2 rounded-full"
                            style={{ width: `${selectedIntegration.successRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-body-medium text-text-primary">
                          {selectedIntegration.successRate}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary">Error Count (24h)</label>
                      <p className={`font-body-normal ${selectedIntegration.errorCount > 10 ? 'text-error' : 'text-text-primary'}`}>
                        {selectedIntegration.errorCount}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary">Last Sync</label>
                      <p className="font-body-normal text-text-primary">{selectedIntegration.lastSync}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-heading-medium text-text-primary mb-3">Data Types</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedIntegration.dataTypes.map((dataType, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary rounded-full text-sm"
                    >
                      {dataType}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button className="px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth">
                  Edit Configuration
                </button>
                <button className="px-4 py-2 bg-warning text-white rounded-button hover:bg-warning-700 transition-smooth">
                  Restart Connection
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth">
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connection Logs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-semibold text-text-primary">Recent Connection Activity</h3>
          <button className="flex items-center px-3 py-1.5 border border-border rounded-button hover:bg-secondary-50 transition-smooth text-sm">
            <Icon name="Download" size={14} className="mr-1" />
            Export Logs
          </button>
        </div>
        <div className="bg-surface border border-border rounded-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-heading-medium text-text-primary">Timestamp</th>
                  <th className="text-left p-4 font-heading-medium text-text-primary">Integration</th>
                  <th className="text-left p-4 font-heading-medium text-text-primary">Type</th>
                  <th className="text-left p-4 font-heading-medium text-text-primary">Message</th>
                  <th className="text-left p-4 font-heading-medium text-text-primary">Details</th>
                </tr>
              </thead>
              <tbody>
                {connectionLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border hover:bg-secondary-50 transition-smooth">
                    <td className="p-4">
                      <span className="text-sm text-text-secondary">{log.timestamp}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-body-medium text-text-primary">{log.integration}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium ${getLogTypeColor(log.type)}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-text-primary">{log.message}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-text-secondary">{log.details}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;