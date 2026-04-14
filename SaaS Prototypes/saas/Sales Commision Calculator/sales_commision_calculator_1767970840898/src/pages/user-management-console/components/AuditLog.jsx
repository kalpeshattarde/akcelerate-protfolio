// src/pages/user-management-console/components/AuditLog.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { format } from 'date-fns';

const AuditLog = ({ auditLogs = [], filter = {}, onFilterChange }) => {
  const [showJustification, setShowJustification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'user_creation', label: 'User Creation' },
    { value: 'user_modification', label: 'User Modification' },
    { value: 'user_deactivation', label: 'User Deactivation' },
    { value: 'role_assignment', label: 'Role Assignment' },
    { value: 'permission_change', label: 'Permission Change' },
    { value: 'login_attempt', label: 'Login Attempt' },
    { value: 'system_config', label: 'System Configuration' }
  ];

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const getActionIcon = (action) => {
    switch (action) {
      case 'user_creation': return 'UserPlus';
      case 'user_modification': return 'UserCog';
      case 'user_deactivation': return 'UserX';
      case 'role_assignment': return 'Shield';
      case 'permission_change': return 'Key';
      case 'login_attempt': return 'LogIn';
      case 'system_config': return 'Settings';
      default: return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'user_creation': return 'text-success';
      case 'user_modification': return 'text-info';
      case 'user_deactivation': return 'text-error';
      case 'role_assignment': return 'text-primary';
      case 'permission_change': return 'text-warning';
      case 'login_attempt': return 'text-secondary-600';
      case 'system_config': return 'text-purple-600';
      default: return 'text-secondary-600';
    }
  };

  const getRiskLevel = (action, details) => {
    if (action?.includes('deactivation') || action?.includes('deletion')) return 'high';
    if (action?.includes('permission') || action?.includes('role')) return 'medium';
    return 'low';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-error-100 text-error border-error-200';
      case 'medium': return 'bg-warning-100 text-warning border-warning-200';
      case 'low': return 'bg-success-100 text-success border-success-200';
      default: return 'bg-secondary-100 text-secondary-600 border-secondary-200';
    }
  };

  // Filter audit logs with safe array handling
  const filteredLogs = (auditLogs || []).filter(log => {
    const matchesAction = filter?.action === 'all' || log?.action === filter?.action;
    const matchesSearch = !searchTerm || 
      log?.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log?.target?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log?.details?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Time range filtering would go here
    return matchesAction && matchesSearch;
  });

  const exportAuditLog = () => {
    console.log('Exporting audit log...');
    // Implementation for audit log export
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Audit Log</h2>
          <p className="text-text-secondary">Track all permission modifications with user attribution and change justification</p>
        </div>
        <button
          onClick={exportAuditLog}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
        >
          <Icon name="Download" size={16} />
          <span>Export Log</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-secondary-50 p-4 rounded-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Time Range</label>
            <select 
              value={filter?.timeRange || '24h'}
              onChange={(e) => onFilterChange?.({ ...filter, timeRange: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Action Type</label>
            <select 
              value={filter?.action || 'all'}
              onChange={(e) => onFilterChange?.({ ...filter, action: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {actionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Search</label>
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search user, target, or details..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={() => {
                onFilterChange?.({ timeRange: '24h', action: 'all' });
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-sm hover:bg-secondary-200 transition-smooth"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs?.map((log) => {
                const riskLevel = getRiskLevel(log?.action, log?.details);
                return (
                  <tr key={log?.id} className="hover:bg-secondary-50 transition-smooth">
                    <td className="px-6 py-4 text-sm text-text-primary">
                      {log?.timestamp ? format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss') : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {log?.user?.split(' ').map(n => n?.[0]).join('').toUpperCase() || '?'}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-text-primary">{log?.user || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getActionIcon(log?.action)} 
                          size={16} 
                          className={getActionColor(log?.action)} 
                        />
                        <span className="text-sm text-text-primary">{log?.action?.replace('_', ' ') || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-text-primary">{log?.target || '-'}</div>
                        <div className="text-xs text-text-secondary">{log?.details || '-'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-sm border ${getRiskColor(riskLevel)}`}>
                        {riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary font-mono">
                      {log?.ipAddress || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowJustification(showJustification === log?.id ? null : log?.id)}
                          className="p-1 text-secondary-600 hover:text-primary transition-smooth"
                          title="View Justification"
                        >
                          <Icon name="MessageSquare" size={16} />
                        </button>
                        <button
                          className="p-1 text-secondary-600 hover:text-info transition-smooth"
                          title="View Details"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredLogs?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FileText" size={48} className="mx-auto text-secondary-300 mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No audit logs found</h3>
              <p className="text-text-secondary">No logs match your current filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Justification Modal */}
      {showJustification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300">
          <div className="bg-surface border border-border rounded-sm p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-text-primary">Change Justification</h3>
              <button
                onClick={() => setShowJustification(null)}
                className="p-1 text-secondary-600 hover:text-error transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            {(() => {
              const log = (auditLogs || []).find(l => l?.id === showJustification);
              return log ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-text-primary">Action:</span>
                    <span className="ml-2 text-sm text-text-secondary">{log?.action?.replace('_', ' ') || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-primary">Target:</span>
                    <span className="ml-2 text-sm text-text-secondary">{log?.target || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-primary">Justification:</span>
                    <p className="mt-1 text-sm text-text-secondary bg-secondary-50 p-3 rounded-sm">
                      {log?.justification || 'No justification provided'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-primary">Timestamp:</span>
                    <span className="ml-2 text-sm text-text-secondary">
                      {log?.timestamp ? format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss') : 'Unknown'}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-text-secondary">Log entry not found</p>
              );
            })()
            }
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-sm p-4 text-center">
          <div className="text-lg font-semibold text-text-primary">{filteredLogs?.length || 0}</div>
          <div className="text-sm text-text-secondary">Total Events</div>
        </div>
        <div className="bg-surface border border-border rounded-sm p-4 text-center">
          <div className="text-lg font-semibold text-error">
            {filteredLogs?.filter(log => getRiskLevel(log?.action, log?.details) === 'high').length || 0}
          </div>
          <div className="text-sm text-text-secondary">High Risk</div>
        </div>
        <div className="bg-surface border border-border rounded-sm p-4 text-center">
          <div className="text-lg font-semibold text-primary">
            {[...new Set(filteredLogs?.map(log => log?.user).filter(Boolean))].length || 0}
          </div>
          <div className="text-sm text-text-secondary">Unique Users</div>
        </div>
        <div className="bg-surface border border-border rounded-sm p-4 text-center">
          <div className="text-lg font-semibold text-info">
            {filteredLogs?.filter(log => log?.action?.includes('permission')).length || 0}
          </div>
          <div className="text-sm text-text-secondary">Permission Changes</div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;