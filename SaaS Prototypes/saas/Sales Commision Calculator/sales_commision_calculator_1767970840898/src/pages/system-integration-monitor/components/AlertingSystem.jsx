// src/pages/system-integration-monitor/components/AlertingSystem.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertingSystem = ({ activeAlerts, onAcknowledgeAlert, userRole }) => {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showAcknowledged, setShowAcknowledged] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState(null);

  const severityFilters = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'medium', label: 'Medium' },
    { value: 'info', label: 'Info' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error-50 border-error-200 text-error';
      case 'warning': return 'bg-warning-50 border-warning-200 text-warning';
      case 'medium': return 'bg-info-50 border-info-200 text-info';
      case 'info': return 'bg-secondary-50 border-secondary-200 text-secondary-600';
      default: return 'bg-secondary-50 border-secondary-200 text-secondary-600';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'info': return 'Bell';
      default: return 'Bell';
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'integration_failure': return 'XCircle';
      case 'performance_degradation': return 'TrendingDown';
      case 'data_inconsistency': return 'Database';
      case 'authentication_issue': return 'Shield';
      case 'connection_timeout': return 'Clock';
      default: return 'AlertTriangle';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 24 * 60) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / (24 * 60))}d ago`;
  };

  const filteredAlerts = activeAlerts?.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) {
      return false;
    }
    if (!showAcknowledged && alert.acknowledged) {
      return false;
    }
    return true;
  });

  const getAlertTitle = (type) => {
    switch (type) {
      case 'integration_failure': return 'Integration Failure';
      case 'performance_degradation': return 'Performance Degradation';
      case 'data_inconsistency': return 'Data Inconsistency';
      case 'authentication_issue': return 'Authentication Issue';
      case 'connection_timeout': return 'Connection Timeout';
      default: return 'System Alert';
    }
  };

  const getRecommendedActions = (alert) => {
    switch (alert.type) {
      case 'integration_failure':
        return [
          'Check system connectivity',
          'Review integration logs',
          'Verify authentication credentials',
          'Contact system administrator'
        ];
      case 'performance_degradation':
        return [
          'Monitor system resources',
          'Check network connectivity',
          'Review recent configuration changes',
          'Consider scaling resources'
        ];
      case 'data_inconsistency':
        return [
          'Run data validation checks',
          'Compare source and target data',
          'Review synchronization logs',
          'Initiate manual data reconciliation'
        ];
      default:
        return [
          'Check system status',
          'Review recent changes',
          'Contact support if needed'
        ];
    }
  };

  const urgentAlertsCount = activeAlerts?.filter(alert => 
    alert.severity === 'critical' && !alert.acknowledged
  )?.length || 0;

  return (
    <div className="bg-surface border border-integration-border rounded-lg p-4 sm:p-6 overflow-hidden shadow-integration backdrop-blur-sm">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="p-2 bg-gradient-integration rounded-lg">
              <Icon name="Bell" size={20} className="text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary bg-gradient-to-r from-integration-primary to-integration-secondary bg-clip-text text-transparent">
              Real-time Alerts
            </h2>
            {urgentAlertsCount > 0 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-error-50 border border-error-200 rounded-full flex-shrink-0">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="text-sm font-medium text-error whitespace-nowrap">
                  {urgentAlertsCount} urgent
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 border border-integration-border rounded-lg bg-surface text-text-primary text-sm flex-1 sm:flex-none"
          >
            {severityFilters.map(filter => (
              <option key={filter.value} value={filter.value}>{filter.label}</option>
            ))}
          </select>
          
          <label className="flex items-center space-x-2 text-sm text-text-secondary whitespace-nowrap">
            <input
              type="checkbox"
              checked={showAcknowledged}
              onChange={(e) => setShowAcknowledged(e.target.checked)}
              className="rounded border-integration-border"
            />
            <span>Show acknowledged</span>
          </label>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-error-50 rounded-lg border border-error-200 min-w-0">
          <div className="text-xl sm:text-2xl font-bold text-error">
            {activeAlerts?.filter(a => a.severity === 'critical' && !a.acknowledged)?.length || 0}
          </div>
          <p className="text-xs sm:text-sm text-error truncate">Critical</p>
        </div>
        <div className="text-center p-3 bg-warning-50 rounded-lg border border-warning-200 min-w-0">
          <div className="text-xl sm:text-2xl font-bold text-warning">
            {activeAlerts?.filter(a => a.severity === 'warning' && !a.acknowledged)?.length || 0}
          </div>
          <p className="text-xs sm:text-sm text-warning truncate">Warning</p>
        </div>
        <div className="text-center p-3 bg-info-50 rounded-lg border border-info-200 min-w-0">
          <div className="text-xl sm:text-2xl font-bold text-info">
            {activeAlerts?.filter(a => a.severity === 'medium' && !a.acknowledged)?.length || 0}
          </div>
          <p className="text-xs sm:text-sm text-info truncate">Medium</p>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg border border-success-200 min-w-0">
          <div className="text-xl sm:text-2xl font-bold text-success">
            {activeAlerts?.filter(a => a.acknowledged)?.length || 0}
          </div>
          <p className="text-xs sm:text-sm text-success truncate">Acknowledged</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-3 text-success" />
            <p>No active alerts matching your filters</p>
            <p className="text-sm mt-1">All systems are operating normally</p>
          </div>
        ) : (
          filteredAlerts?.map((alert) => (
            <div 
              key={alert.id} 
              className={`border rounded-lg p-4 transition-all duration-200 overflow-hidden ${
                alert.acknowledged ? 'opacity-60' : ''
              } ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={getAlertTypeIcon(alert.type)} size={18} className="flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base truncate">{getAlertTitle(alert.type)}</span>
                      </div>
                      
                      <span className="text-xs px-2 py-1 bg-surface rounded-full border whitespace-nowrap">
                        {alert.system}
                      </span>
                      
                      <span className="text-xs text-text-secondary whitespace-nowrap">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                      
                      {alert.acknowledged && (
                        <div className="flex items-center space-x-1 text-xs text-success whitespace-nowrap">
                          <Icon name="Check" size={12} />
                          <span>Acknowledged</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-text-primary mb-3 break-words text-sm">{alert.message}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                      className="p-2 hover:bg-surface rounded-full transition-smooth"
                      title="View details"
                    >
                      <Icon 
                        name={expandedAlert === alert.id ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    </button>
                    
                    {!alert.acknowledged && userRole === 'admin' && (
                      <button
                        onClick={() => onAcknowledgeAlert?.(alert.id)}
                        className="flex items-center space-x-1 px-3 py-2 bg-success text-white rounded-lg hover:bg-success-600 transition-smooth text-sm whitespace-nowrap"
                      >
                        <Icon name="Check" size={14} />
                        <span className="hidden sm:inline">Acknowledge</span>
                        <span className="sm:hidden">ACK</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {expandedAlert === alert.id && (
                  <div className="mt-2 p-3 bg-surface rounded-lg border border-integration-border overflow-hidden">
                    <h4 className="font-medium text-text-primary mb-3">Recommended Actions:</h4>
                    <ul className="space-y-2">
                      {getRecommendedActions(alert).map((action, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                          <Icon name="ChevronRight" size={12} className="mt-0.5 flex-shrink-0" />
                          <span className="break-words">{action}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-3 border-t border-integration-border">
                      <h4 className="font-medium text-text-primary mb-2">Alert Details:</h4>
                      <div className="text-xs text-text-secondary space-y-1 overflow-hidden">
                        <div className="break-words">Alert ID: ALT-{alert.id.toString().padStart(6, '0')}</div>
                        <div>Severity: {alert.severity}</div>
                        <div>Type: {alert.type}</div>
                        <div>System: {alert.system}</div>
                        <div className="break-all truncate">Timestamp: {new Date(alert.timestamp).toISOString()}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Settings */}
      <div className="mt-6 p-4 bg-integration-surface rounded-lg border border-integration-border overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-medium text-text-primary mb-1">Alert Notifications</h3>
            <p className="text-sm text-text-secondary break-words">Configure how you receive system alerts</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center space-x-2 text-sm whitespace-nowrap">
                <input type="checkbox" defaultChecked className="rounded border-integration-border" />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center space-x-2 text-sm whitespace-nowrap">
                <input type="checkbox" defaultChecked className="rounded border-integration-border" />
                <span>Browser notifications</span>
              </label>
            </div>
            <button className="flex items-center space-x-1 px-3 py-2 bg-gradient-integration text-white rounded-lg hover:shadow-glow transition-all duration-200 text-sm whitespace-nowrap">
              <Icon name="Settings" size={14} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertingSystem;