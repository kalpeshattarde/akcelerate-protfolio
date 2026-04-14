import React from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatus = ({ integrations, onRefresh }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'syncing': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'syncing': return 'RotateCw';
      default: return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      case 'syncing': return 'Syncing';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary">System Integrations</h3>
        <button
          onClick={onRefresh}
          className="text-muted-foreground hover:text-text-primary transition-smooth"
        >
          <Icon name="RefreshCw" size={16} />
        </button>
      </div>
      <div className="space-y-3">
        {integrations?.map((integration) => (
          <div key={integration?.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={integration?.icon} size={16} className="text-text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{integration?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Last sync: {new Date(integration.lastSync)?.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(integration?.status)} 
                size={16} 
                className={`${getStatusColor(integration?.status)} ${
                  integration?.status === 'syncing' ? 'animate-spin' : ''
                }`}
              />
              <span className={`text-xs font-medium ${getStatusColor(integration?.status)}`}>
                {getStatusText(integration?.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {integrations?.filter(i => i?.status === 'connected')?.length} of {integrations?.length} connected
          </span>
          <span>Updated 2 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;