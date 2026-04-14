// src/pages/system-integration-monitor/components/ErrorManagementSection.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ErrorManagementSection = ({ integrationErrors, onRetryError, onResolveError, userRole }) => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [expandedError, setExpandedError] = useState(null);

  const severityFilters = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const systemFilters = [
    { value: 'all', label: 'All Systems' },
    { value: 'HRIS', label: 'HRIS' },
    { value: 'CRM', label: 'CRM' },
    { value: 'Payroll', label: 'Payroll' },
    { value: 'Identity Provider', label: 'Identity Provider' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'high': return 'text-error bg-error-50 border-error-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'low': return 'text-info bg-info-50 border-info-200';
      default: return 'text-secondary-600 bg-secondary-50 border-secondary-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'retrying': return 'text-info';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-error';
      case 'resolved': return 'text-success';
      default: return 'text-secondary-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'retrying': return 'RefreshCw';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      case 'resolved': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const filteredErrors = integrationErrors?.filter(error => {
    if (selectedSeverity !== 'all' && error.severity !== selectedSeverity) {
      return false;
    }
    if (selectedSystem !== 'all' && error.system !== selectedSystem) {
      return false;
    }
    return true;
  });

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 24 * 60) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / (24 * 60))}d ago`;
  };

  const canRetry = (error) => {
    return error.retryCount < error.maxRetries && error.status !== 'resolved' && userRole === 'admin';
  };

  const canResolve = (error) => {
    return error.status !== 'resolved' && userRole === 'admin';
  };

  return (
    <div className="bg-surface border border-integration-border rounded-lg p-4 sm:p-6 overflow-hidden shadow-integration backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-integration rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-white" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-text-primary bg-gradient-to-r from-integration-primary to-integration-secondary bg-clip-text text-transparent">
            Error Management
          </h2>
        </div>
        <div className="flex items-center space-x-3 flex-wrap gap-2">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 border border-integration-border rounded-lg bg-surface text-text-primary text-sm"
          >
            {severityFilters.map(filter => (
              <option key={filter.value} value={filter.value}>{filter.label}</option>
            ))}
          </select>
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="px-3 py-2 border border-integration-border rounded-lg bg-surface text-text-primary text-sm"
          >
            {systemFilters.map(filter => (
              <option key={filter.value} value={filter.value}>{filter.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center p-3 bg-error-50 rounded-lg border border-error-200">
          <div className="text-xl sm:text-2xl font-bold text-error">
            {integrationErrors?.filter(e => e.severity === 'critical')?.length || 0}
          </div>
          <p className="text-sm text-error truncate">Critical</p>
        </div>
        <div className="text-center p-3 bg-warning-50 rounded-lg border border-warning-200">
          <div className="text-xl sm:text-2xl font-bold text-warning">
            {integrationErrors?.filter(e => e.severity === 'high')?.length || 0}
          </div>
          <p className="text-sm text-warning truncate">High</p>
        </div>
        <div className="text-center p-3 bg-info-50 rounded-lg border border-info-200">
          <div className="text-xl sm:text-2xl font-bold text-info">
            {integrationErrors?.filter(e => e.severity === 'medium')?.length || 0}
          </div>
          <p className="text-sm text-info truncate">Medium</p>
        </div>
        <div className="text-center p-3 bg-secondary-50 rounded-lg border border-secondary-200">
          <div className="text-xl sm:text-2xl font-bold text-secondary-600">
            {integrationErrors?.filter(e => e.status === 'resolved')?.length || 0}
          </div>
          <p className="text-sm text-secondary-600 truncate">Resolved</p>
        </div>
      </div>

      {/* Error List */}
      <div className="space-y-4 mt-6">
        {filteredErrors?.length === 0 ? (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="CheckCircle" size={48} className="mx-auto mb-3 text-success" />
            <p>No integration errors found for the selected filters</p>
          </div>
        ) : (
          filteredErrors?.map((error) => (
            <div 
              key={error.id} 
              className={`border rounded-lg p-5 overflow-hidden ${getSeverityColor(error.severity)}`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-medium text-text-primary">{error.system}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(error.severity)}`}>
                      {error.severity}
                    </span>
                    <div className={`flex items-center space-x-1 ${getStatusColor(error.status)}`}>
                      <Icon 
                        name={getStatusIcon(error.status)} 
                        size={14} 
                        className={error.status === 'retrying' ? 'animate-spin' : ''}
                      />
                      <span className="text-sm font-medium capitalize">{error.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-text-primary font-medium mb-3 break-words">{error.error}</p>
                  
                  <div className="text-sm text-text-secondary mb-3 flex flex-wrap gap-x-4">
                    <span>Occurred: {formatTimeAgo(error.timestamp)}</span>
                    <span>Retry {error.retryCount} of {error.maxRetries}</span>
                  </div>
                  
                  {expandedError === error.id && (
                    <div className="mt-3 p-4 bg-surface rounded-lg border border-integration-border overflow-hidden">
                      <h4 className="font-medium text-text-primary mb-2">Recommendation:</h4>
                      <p className="text-text-secondary text-sm mb-4 break-words">{error.recommendation}</p>
                      
                      <h4 className="font-medium text-text-primary mb-2">Technical Details:</h4>
                      <div className="text-xs text-text-secondary space-y-1">
                        <div className="break-words">Error ID: ERR-{error.id.toString().padStart(6, '0')}</div>
                        <div className="break-all overflow-hidden">Timestamp: {new Date(error.timestamp).toISOString()}</div>
                        <div>System: {error.system}</div>
                        <div>Severity: {error.severity}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setExpandedError(expandedError === error.id ? null : error.id)}
                    className="p-2 hover:bg-surface rounded-full transition-smooth"
                    title="View details"
                  >
                    <Icon 
                      name={expandedError === error.id ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      className="text-text-secondary" 
                    />
                  </button>
                  
                  {canRetry(error) && (
                    <button
                      onClick={() => onRetryError?.(error.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-info text-white rounded-lg hover:bg-info-600 transition-smooth text-sm whitespace-nowrap"
                    >
                      <Icon name="RefreshCw" size={14} />
                      <span>Retry</span>
                    </button>
                  )}
                  
                  {canResolve(error) && (
                    <button
                      onClick={() => onResolveError?.(error.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-success text-white rounded-lg hover:bg-success-600 transition-smooth text-sm whitespace-nowrap"
                    >
                      <Icon name="Check" size={14} />
                      <span>Resolve</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {userRole !== 'admin' && integrationErrors?.length > 0 && (
        <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg overflow-hidden">
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-warning flex-shrink-0" />
            <span className="text-sm text-warning font-medium break-words">
              Administrator privileges required for error resolution actions
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorManagementSection;