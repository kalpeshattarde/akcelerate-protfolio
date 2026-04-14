// src/pages/commission-structure-configuration/components/IntegrationPanel.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const IntegrationPanel = ({ integrationStatus, onStatusChange, canEdit, isPreviewMode }) => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'salesforce',
      name: 'Salesforce CRM',
      type: 'CRM',
      status: 'connected',
      lastSync: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      syncFrequency: 'realtime',
      dataMapping: {
        'sales_rep_id': 'Rep_ID__c',
        'territory': 'Territory__c',
        'quota': 'Annual_Quota__c',
        'ytd_sales': 'YTD_Sales__c'
      },
      config: {
        apiEndpoint: 'https://api.salesforce.com/v1',
        authType: 'oauth2',
        syncDirection: 'bidirectional'
      }
    },
    {
      id: 'workday',
      name: 'Workday HCM',
      type: 'HRIS',
      status: 'connected',
      lastSync: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      syncFrequency: 'hourly',
      dataMapping: {
        'employee_id': 'Worker_ID',
        'hire_date': 'Hire_Date',
        'base_salary': 'Base_Salary',
        'commission_tier': 'Commission_Tier'
      },
      config: {
        apiEndpoint: 'https://api.workday.com/v1',
        authType: 'basic',
        syncDirection: 'inbound'
      }
    },
    {
      id: 'adp',
      name: 'ADP Payroll',
      type: 'Payroll',
      status: 'warning',
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      syncFrequency: 'daily',
      dataMapping: {
        'employee_id': 'EMP_ID',
        'commission_amount': 'COMM_AMT',
        'bonus_amount': 'BONUS_AMT',
        'pay_period': 'PAY_PERIOD'
      },
      config: {
        apiEndpoint: 'https://api.adp.com/v1',
        authType: 'oauth2',
        syncDirection: 'outbound'
      }
    },
    {
      id: 'netsuite',
      name: 'NetSuite ERP',
      type: 'ERP',
      status: 'error',
      lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      syncFrequency: 'daily',
      dataMapping: {
        'transaction_id': 'TRAN_ID',
        'sales_amount': 'AMOUNT',
        'product_line': 'ITEM_TYPE',
        'customer_segment': 'CUST_SEGMENT'
      },
      config: {
        apiEndpoint: 'https://api.netsuite.com/v1',
        authType: 'token',
        syncDirection: 'inbound'
      }
    }
  ]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [syncLogs, setSyncLogs] = useState([
    {
      id: 1,
      integration: 'salesforce',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'success',
      recordsProcessed: 1247,
      message: 'Successfully synced sales data'
    },
    {
      id: 2,
      integration: 'workday',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'success',
      recordsProcessed: 350,
      message: 'Employee data synchronized'
    },
    {
      id: 3,
      integration: 'adp',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'warning',
      recordsProcessed: 89,
      message: 'Partial sync - some records failed validation'
    },
    {
      id: 4,
      integration: 'netsuite',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'error',
      recordsProcessed: 0,
      message: 'Connection timeout - retrying'
    }
  ]);

  // Get status display info
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'connected':
        return { color: 'text-emerald-300', bgColor: 'glass-morphism', icon: 'CheckCircle', label: 'Connected' };
      case 'syncing':
        return { color: 'text-blue-300', bgColor: 'glass-morphism', icon: 'RefreshCw', label: 'Syncing' };
      case 'warning':
        return { color: 'text-amber-300', bgColor: 'glass-morphism', icon: 'AlertTriangle', label: 'Warning' };
      case 'error':
        return { color: 'text-red-300', bgColor: 'glass-morphism', icon: 'XCircle', label: 'Error' };
      case 'disconnected':
        return { color: 'text-white/60', bgColor: 'glass-morphism', icon: 'Circle', label: 'Disconnected' };
      default:
        return { color: 'text-white/60', bgColor: 'glass-morphism', icon: 'Circle', label: 'Unknown' };
    }
  };

  // Force sync
  const forceSync = (integrationId) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;

    // Update integration status to syncing
    setIntegrations(prev => prev.map(i => 
      i.id === integrationId ? { ...i, status: 'syncing' } : i
    ));

    // Simulate sync process
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      const newStatus = success ? 'connected' : 'error';
      
      setIntegrations(prev => prev.map(i => 
        i.id === integrationId 
          ? { ...i, status: newStatus, lastSync: new Date() }
          : i
      ));

      // Add sync log
      const newLog = {
        id: Date.now(),
        integration: integrationId,
        timestamp: new Date(),
        status: success ? 'success' : 'error',
        recordsProcessed: success ? Math.floor(Math.random() * 1000) + 100 : 0,
        message: success ? 'Manual sync completed successfully' : 'Sync failed - check configuration'
      };
      
      setSyncLogs(prev => [newLog, ...prev.slice(0, 9)]);
    }, 3000);
  };

  // Test connection
  const testConnection = (integrationId) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;

    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      alert(success ? 'Connection test successful!' : 'Connection test failed - check credentials');
    }, 1500);
  };

  // Get time ago string
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">System Integration</h2>
          <p className="text-sm text-white/70 mt-1">
            Manage synchronization with payroll systems and external data feeds.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sync All */}
          {canEdit && !isPreviewMode && (
            <button
              onClick={() => {
                integrations.forEach(integration => {
                  if (integration.status !== 'syncing') {
                    forceSync(integration.id);
                  }
                });
              }}
              className="btn-glass-primary"
            >
              <Icon name="RefreshCw" size={16} />
              <span>Sync All</span>
            </button>
          )}
        </div>
      </div>

      {/* Integration Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['connected', 'warning', 'error', 'syncing'].map(status => {
          const count = integrations.filter(i => i.status === status).length;
          const display = getStatusDisplay(status);
          
          return (
            <div key={status} className="card-glass-compact">
              <div className="flex items-center space-x-3">
                <div className="glass-morphism-elevated p-2 rounded-lg">
                  <Icon name={display.icon} size={20} className={display.color} />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">{count}</div>
                  <div className="text-sm text-white/70 capitalize">{display.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration List */}
      <div className="glass-morphism-dark rounded-xl overflow-hidden">
        <div className="glass-morphism-elevated p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Connected Systems</h3>
          <p className="text-sm text-white/70 mt-1">
            Monitor and manage external system integrations and data mapping.
          </p>
        </div>

        <div className="divide-y divide-white/10">
          {integrations.map((integration) => {
            const statusDisplay = getStatusDisplay(integration.status);
            
            return (
              <div key={integration.id} className="p-4 hover:bg-white/5 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Status Indicator */}
                    <div className="glass-morphism-elevated p-2 rounded-lg">
                      <Icon 
                        name={statusDisplay.icon} 
                        size={20} 
                        className={`${statusDisplay.color} ${integration.status === 'syncing' ? 'animate-spin' : ''}`} 
                      />
                    </div>

                    {/* Integration Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-white">{integration.name}</h4>
                        <span className="badge-dark">
                          {integration.type}
                        </span>
                        <span className={`badge-glass text-xs ${statusDisplay.color}`}>
                          {statusDisplay.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6 mt-2 text-sm text-white/60">
                        <span>Last sync: {getTimeAgo(integration.lastSync)}</span>
                        <span>Frequency: {integration.syncFrequency}</span>
                        <span>Direction: {integration.config.syncDirection}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {canEdit && !isPreviewMode && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => testConnection(integration.id)}
                        className="btn-glass-outline text-sm"
                      >
                        Test
                      </button>
                      <button
                        onClick={() => forceSync(integration.id)}
                        disabled={integration.status === 'syncing'}
                        className="btn-glass-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sync
                      </button>
                      <button
                        onClick={() => {
                          setSelectedIntegration(integration);
                          setShowConfigModal(true);
                        }}
                        className="glass-morphism-hover p-2 rounded-lg text-white/70 hover:text-white transition-all duration-300"
                      >
                        <Icon name="Settings" size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Data Mapping Preview */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(integration.dataMapping).slice(0, 4).map(([internal, external]) => (
                    <div key={internal} className="glass-morphism p-2 rounded-lg text-xs">
                      <div className="font-medium text-white/90">{internal}</div>
                      <div className="text-white/60">→ {external}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sync Logs */}
      <div className="glass-morphism-dark rounded-xl overflow-hidden">
        <div className="glass-morphism-elevated p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Synchronization Logs</h3>
          <p className="text-sm text-white/70 mt-1">
            Recent sync activities and status updates.
          </p>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {syncLogs.length === 0 ? (
            <div className="p-8 text-center text-white/60">
              <Icon name="Activity" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No sync logs available</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {syncLogs.map((log) => {
                const statusDisplay = getStatusDisplay(log.status);
                const integration = integrations.find(i => i.id === log.integration);
                
                return (
                  <div key={log.id} className="p-3 flex items-center space-x-3 hover:bg-white/5 transition-all duration-300">
                    <Icon name={statusDisplay.icon} size={16} className={statusDisplay.color} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="font-medium text-white">{integration?.name}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60">{getTimeAgo(log.timestamp)}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60">{log.recordsProcessed} records</span>
                      </div>
                      <div className="text-xs text-white/50 mt-1">{log.message}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && selectedIntegration && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4">
          <div className="modal-glass max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Configure {selectedIntegration.name}
                </h3>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Connection Settings */}
                <div>
                  <h4 className="font-medium text-white mb-3">Connection Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-1">
                        API Endpoint
                      </label>
                      <input
                        type="url"
                        value={selectedIntegration.config.apiEndpoint}
                        className="input-glass-dark w-full"
                        readOnly={!canEdit || isPreviewMode}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-1">
                        Authentication Type
                      </label>
                      <select
                        value={selectedIntegration.config.authType}
                        className="select-glass w-full"
                        disabled={!canEdit || isPreviewMode}
                      >
                        <option value="oauth2">OAuth 2.0</option>
                        <option value="basic">Basic Auth</option>
                        <option value="token">API Token</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Data Mapping */}
                <div>
                  <h4 className="font-medium text-white mb-3">Data Mapping</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedIntegration.dataMapping).map(([internal, external]) => (
                      <div key={internal} className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={internal}
                          className="input-glass-dark"
                          readOnly
                        />
                        <input
                          type="text"
                          value={external}
                          className="input-glass-dark"
                          readOnly={!canEdit || isPreviewMode}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="btn-glass-outline"
                >
                  Cancel
                </button>
                {canEdit && !isPreviewMode && (
                  <button
                    onClick={() => {
                      // Save configuration
                      setShowConfigModal(false);
                    }}
                    className="btn-glass-primary"
                  >
                    Save Configuration
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationPanel;