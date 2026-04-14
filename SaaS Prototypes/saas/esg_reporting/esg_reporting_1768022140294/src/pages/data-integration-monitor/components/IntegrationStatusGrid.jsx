import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationStatusGrid = ({ 
  integrations, 
  onIntegrationSelect, 
  selectedIntegration,
  onSyncTrigger,
  onBulkAction 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedItems, setSelectedItems] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'error': return 'text-error bg-error/10';
      case 'syncing': return 'text-primary bg-primary/10';
      case 'offline': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'syncing': return 'RefreshCw';
      case 'offline': return 'XCircle';
      default: return 'Circle';
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedIntegrations = [...integrations]?.sort((a, b) => {
    if (sortConfig?.key === 'lastSync') {
      const aTime = new Date(a.lastSync)?.getTime();
      const bTime = new Date(b.lastSync)?.getTime();
      return sortConfig?.direction === 'asc' ? aTime - bTime : bTime - aTime;
    }
    
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (typeof aValue === 'string') {
      return sortConfig?.direction === 'asc' 
        ? aValue?.localeCompare(bValue)
        : bValue?.localeCompare(aValue);
    }
    
    return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const handleSelectAll = (checked) => {
    setSelectedItems(checked ? integrations?.map(i => i?.id) : []);
  };

  const handleSelectItem = (id, checked) => {
    setSelectedItems(prev => 
      checked 
        ? [...prev, id]
        : prev?.filter(item => item !== id)
    );
  };

  const formatLastSync = (timestamp) => {
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - syncTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Header with Bulk Actions */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-foreground">Integration Status</h3>
            <span className="text-sm text-muted-foreground">
              {integrations?.length} integrations
            </span>
          </div>
          
          {selectedItems?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedItems?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('sync', selectedItems)}
              >
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Sync All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('test', selectedItems)}
              >
                <Icon name="Zap" size={14} className="mr-2" />
                Test All
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === integrations?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Integration</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('lastSync')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Last Sync</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('recordCount')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Records</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('errorCount')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Errors</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedIntegrations?.map((integration) => (
              <tr
                key={integration?.id}
                className={`border-b border-border hover:bg-muted/30 cursor-pointer transition-colors duration-150 ${
                  selectedIntegration?.id === integration?.id ? 'bg-primary/5' : ''
                }`}
                onClick={() => onIntegrationSelect(integration)}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(integration?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleSelectItem(integration?.id, e?.target?.checked);
                    }}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      integration?.category === 'erp' ? 'bg-primary/10 text-primary' :
                      integration?.category === 'facility' ? 'bg-secondary/10 text-secondary' :
                      integration?.category === 'sustainability'? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={integration?.icon} size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{integration?.name}</div>
                      <div className="text-xs text-muted-foreground">{integration?.type}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration?.status)}`}>
                      <Icon 
                        name={getStatusIcon(integration?.status)} 
                        size={12} 
                        className={integration?.status === 'syncing' ? 'animate-spin' : ''}
                      />
                      <span className="capitalize">{integration?.status}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">
                    {formatLastSync(integration?.lastSync)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(integration.lastSync)?.toLocaleDateString()}
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm font-medium text-foreground">
                    {integration?.recordCount?.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    +{integration?.newRecords} today
                  </div>
                </td>
                <td className="p-3">
                  <div className={`text-sm font-medium ${
                    integration?.errorCount > 0 ? 'text-error' : 'text-muted-foreground'
                  }`}>
                    {integration?.errorCount}
                  </div>
                  {integration?.errorCount > 0 && (
                    <div className="text-xs text-error">
                      Last: {integration?.lastError}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onSyncTrigger(integration?.id);
                      }}
                      disabled={integration?.status === 'syncing'}
                    >
                      <Icon name="RefreshCw" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle test connection
                      }}
                    >
                      <Icon name="Zap" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle view logs
                      }}
                    >
                      <Icon name="FileText" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {integrations?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Database" size={32} className="mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No integrations configured</p>
        </div>
      )}
    </div>
  );
};

export default IntegrationStatusGrid;