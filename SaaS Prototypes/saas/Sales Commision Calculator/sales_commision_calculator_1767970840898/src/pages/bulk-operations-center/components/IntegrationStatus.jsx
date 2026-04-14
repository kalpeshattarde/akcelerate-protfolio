// src/pages/bulk-operations-center/components/IntegrationStatus.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const IntegrationStatus = ({ integrationStatus = {} }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [lastSync, setLastSync] = useState({
    hris: new Date(Date.now() - 5 * 60 * 1000),
    payroll: new Date(Date.now() - 15 * 60 * 1000),
    crm: new Date(Date.now() - 2 * 60 * 1000)
  });

  const systemDetails = {
    hris: {
      name: 'Human Resources Information System',
      description: 'Employee data and organizational structure',
      endpoint: 'https://api.hris.company.com',
      version: 'v2.1',
      dataElements: ['Employee records', 'Org structure', 'Job titles', 'Reporting hierarchy']
    },
    payroll: {
      name: 'Payroll Management System',
      description: 'Compensation and benefits processing',
      endpoint: 'https://api.payroll.company.com',
      version: 'v3.0',
      dataElements: ['Salary data', 'Commission records', 'Tax information', 'Payment schedules']
    },
    crm: {
      name: 'Customer Relationship Management',
      description: 'Sales data and customer interactions',
      endpoint: 'https://api.crm.company.com',
      version: 'v4.2',
      dataElements: ['Sales transactions', 'Customer data', 'Deal pipeline', 'Activity tracking']
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'connected':
        return {
          color: 'success',
          icon: 'CheckCircle',
          label: 'Connected',
          description: 'System is healthy and responding'
        };
      case 'syncing':
        return {
          color: 'warning',
          icon: 'RefreshCw',
          label: 'Syncing',
          description: 'Data synchronization in progress'
        };
      case 'warning':
        return {
          color: 'warning',
          icon: 'AlertTriangle',
          label: 'Warning',
          description: 'Minor issues detected, monitoring required'
        };
      case 'error':
        return {
          color: 'error',
          icon: 'XCircle',
          label: 'Error',
          description: 'Connection failed or system unavailable'
        };
      default:
        return {
          color: 'secondary',
          icon: 'Circle',
          label: 'Unknown',
          description: 'Status information unavailable'
        };
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getOverallStatus = () => {
    // Add null check and provide fallback
    if (!integrationStatus || typeof integrationStatus !== 'object') {
      return 'unknown';
    }
    
    const statuses = Object.values(integrationStatus);
    if (statuses.length === 0) return 'unknown';
    if (statuses.every(status => status === 'connected')) return 'healthy';
    if (statuses.some(status => status === 'error')) return 'critical';
    if (statuses.some(status => ['warning', 'syncing'].includes(status))) return 'warning';
    return 'unknown';
  };

  const overallStatus = getOverallStatus();
  const overallStatusInfo = getStatusInfo(overallStatus === 'healthy' ? 'connected' : overallStatus);

  const handleRefreshIntegration = (systemKey) => {
    console.log(`Refreshing ${systemKey} integration...`);
    // Mock refresh - in real implementation, this would trigger API calls
  };

  const handleTestConnection = (systemKey) => {
    console.log(`Testing ${systemKey} connection...`);
    // Mock test - in real implementation, this would test the connection
  };

  return (
    <div className="glass-morphism border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-white">Integration Status</h3>
          <div className={`flex items-center space-x-2 px-2 py-1 rounded text-xs font-medium ${
            overallStatus === 'healthy' ? 'badge-success' :
            overallStatus === 'critical' ? 'badge-error' :
            overallStatus === 'warning'? 'badge-warning' : 'glass-morphism-dark text-white/60'
          }`}>
            <Icon 
              name={overallStatusInfo.icon} 
              size={12} 
              className={`${overallStatus === 'warning' && integrationStatus.crm === 'syncing' ? 'animate-spin' : ''}`}
            />
            <span>{overallStatusInfo.label}</span>
          </div>
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-sm transition-smooth"
        >
          <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} size={16} />
          <span>Details</span>
        </button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        {integrationStatus && typeof integrationStatus === 'object' ? 
          Object.entries(integrationStatus).map(([systemKey, status]) => {
            const statusInfo = getStatusInfo(status);
            const systemInfo = systemDetails[systemKey];
            
            return (
              <div 
                key={systemKey} 
                className={`p-3 border rounded-lg ${
                  status === 'connected' ? 'border-success/30 glass-morphism-elevated' :
                  status === 'error' ? 'border-error/30 glass-morphism-elevated' :
                  status === 'warning' ? 'border-warning/30 glass-morphism-elevated' :
                  status === 'syncing'? 'border-warning/30 glass-morphism-elevated' : 'border-white/20 glass-morphism-dark'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={statusInfo.icon} 
                      size={20} 
                      className={`text-${statusInfo.color} ${status === 'syncing' ? 'animate-spin' : ''}`} 
                    />
                    <div>
                      <p className="font-medium text-white capitalize">
                        {systemKey.toUpperCase()}
                      </p>
                      <p className="text-sm text-white/70">
                        {statusInfo.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-white/60">
                      {formatTimeAgo(lastSync[systemKey])}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleRefreshIntegration(systemKey)}
                        className="p-1 text-white/60 hover:text-white rounded transition-smooth"
                        title="Refresh connection"
                      >
                        <Icon name="RefreshCw" size={14} />
                      </button>
                      <button
                        onClick={() => handleTestConnection(systemKey)}
                        className="p-1 text-white/60 hover:text-white rounded transition-smooth"
                        title="Test connection"
                      >
                        <Icon name="Zap" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : 
          <div className="p-3 border rounded-lg border-white/20 glass-morphism-dark">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-warning" />
              <p className="text-white/70">No integration status data available</p>
            </div>
          </div>
        }
      </div>

      {/* Detailed Information */}
      {showDetails && (
        <div className="border-t border-white/10 pt-4">
          <div className="space-y-4">
            {Object.entries(systemDetails).map(([systemKey, details]) => {
              const status = integrationStatus[systemKey];
              const statusInfo = getStatusInfo(status);
              
              return (
                <div key={systemKey} className="p-4 glass-morphism-dark rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={statusInfo.icon} 
                        size={16} 
                        className={`text-${statusInfo.color}`} 
                      />
                      <h4 className="font-medium text-white">{details.name}</h4>
                    </div>
                    <span className="text-xs glass-morphism-elevated text-white/60 px-2 py-1 rounded">
                      {details.version}
                    </span>
                  </div>
                  
                  <p className="text-sm text-white/70 mb-3">{details.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs font-medium text-white/60 mb-1">Endpoint</p>
                      <p className="text-sm text-white font-mono glass-morphism-elevated px-2 py-1 rounded">
                        {details.endpoint}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 mb-1">Last Sync</p>
                      <p className="text-sm text-white">
                        {lastSync[systemKey].toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-white/60 mb-2">Data Elements</p>
                    <div className="flex flex-wrap gap-1">
                      {details.dataElements.map((element, index) => (
                        <span 
                          key={index}
                          className="text-xs glass-morphism-elevated text-white/70 px-2 py-1 rounded"
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Integration Health Summary */}
          <div className="mt-4 p-3 glass-morphism-elevated rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Activity" size={16} className="text-info" />
              <h4 className="font-medium text-white">Integration Health</h4>
            </div>
            <div className="text-sm text-white/70 space-y-1">
              <p>• Data consistency checks run every 15 minutes</p>
              <p>• Bulk operations trigger additional validation cycles</p>
              <p>• All systems maintain real-time event logging</p>
              <p>• Automatic failover mechanisms are active</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2 text-sm text-white/70">
          <Icon name="Shield" size={14} />
          <span>Data consistency monitored during bulk operations</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-sm transition-smooth">
            <Icon name="Settings" size={16} />
            <span>Configure</span>
          </button>
          
          <button className="btn-glass-primary">
            <Icon name="RefreshCw" size={16} />
            <span>Refresh All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;