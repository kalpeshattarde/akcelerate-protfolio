// src/pages/bulk-operations-center/components/AuditLogging.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AuditLogging = ({ auditLogs }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterType, setFilterType] = useState('all'); // all, operation, approval, rollback, error
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);

  // Mock audit logs if none provided
  const mockLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      user: 'John Doe',
      action: 'Mass Scenario Application Started',
      operation: 'Mass Scenario Application',
      affectedRecords: 248,
      details: 'Applied Q4 bonus scenario to 248 representatives',
      type: 'operation',
      status: 'completed',
      duration: '15m 32s',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'Sarah Johnson',
      action: 'Manager Approval Granted',
      operation: 'Quota Adjustments',
      affectedRecords: 75,
      details: 'Approved quota adjustments exceeding budget threshold',
      type: 'approval',
      status: 'completed',
      approvalNote: 'Approved for Q4 performance alignment',
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      user: 'Michael Chen',
      action: 'Validation Error Resolved',
      operation: 'Tier Reassignments',
      affectedRecords: 12,
      details: 'Fixed invalid employee ID formats in uploaded file',
      type: 'error',
      status: 'resolved',
      errorCount: 12,
      ipAddress: '192.168.1.102'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      user: 'Emily Rodriguez',
      action: 'Rollback Operation Initiated',
      operation: 'Commission Recalculations',
      affectedRecords: 156,
      details: 'Rolled back commission recalculations due to data discrepancy',
      type: 'rollback',
      status: 'completed',
      rollbackReason: 'Data integrity issue detected',
      ipAddress: '192.168.1.103'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      user: 'David Thompson',
      action: 'Scheduled Operation Executed',
      operation: 'Mass Scenario Application',
      affectedRecords: 320,
      details: 'Automated execution of monthly scenario updates',
      type: 'operation',
      status: 'completed',
      scheduleType: 'recurring',
      duration: '22m 45s',
      ipAddress: 'System'
    }
  ];

  const logs = auditLogs?.length > 0 ? auditLogs : mockLogs;

  const logTypes = {
    operation: { color: 'primary', icon: 'Play', label: 'Operations' },
    approval: { color: 'warning', icon: 'Shield', label: 'Approvals' },
    rollback: { color: 'error', icon: 'RotateCcw', label: 'Rollbacks' },
    error: { color: 'error', icon: 'AlertTriangle', label: 'Errors' },
    system: { color: 'info', icon: 'Server', label: 'System' }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filterType === 'all' || log.type === filterType;
    const matchesSearch = !searchTerm || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.operation?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleSelectLog = (logId) => {
    setSelectedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLogs.length === filteredLogs.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(filteredLogs.map(log => log.id));
    }
  };

  const exportLogs = (format) => {
    const logsToExport = selectedLogs.length > 0 
      ? logs.filter(log => selectedLogs.includes(log.id))
      : filteredLogs;
    
    if (format === 'csv') {
      const csvContent = [
        ['Timestamp', 'User', 'Action', 'Operation', 'Affected Records', 'Status', 'Details'],
        ...logsToExport.map(log => [
          log.timestamp.toISOString(),
          log.user,
          log.action,
          log.operation || '',
          log.affectedRecords || '',
          log.status,
          log.details
        ])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(logsToExport, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    setShowExportModal(false);
    setSelectedLogs([]);
  };

  const formatRelativeTime = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getLogTypeInfo = (type) => {
    return logTypes[type] || logTypes.operation;
  };

  const logCounts = Object.keys(logTypes).reduce((acc, type) => {
    acc[type] = logs.filter(log => log.type === type).length;
    return acc;
  }, {});

  return (
    <>
      <div className="glass-morphism-dark border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-white">Audit Trail</h3>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-neon-indigo/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-neon-indigo">{logs.length}</span>
              </div>
              <span className="text-sm text-white/60">entries</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-smooth"
            >
              <Icon name="Download" size={16} />
              <span>Export</span>
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 px-3 py-2 bg-neon-indigo text-white rounded-lg hover:bg-neon-indigo/80 transition-smooth"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {Object.entries(logCounts).map(([type, count]) => {
            const typeInfo = getLogTypeInfo(type);
            return (
              <div key={type} className="p-3 glass-morphism rounded-lg text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <Icon name={typeInfo.icon} size={16} className={`text-${typeInfo.color === 'primary' ? 'neon-indigo' : typeInfo.color === 'warning' ? 'amber-400' : typeInfo.color === 'error' ? 'red-400' : 'cyan-400'}`} />
                  <span className="text-sm font-medium text-white/70">{typeInfo.label}</span>
                </div>
                <p className="text-xl font-semibold text-white">{count}</p>
              </div>
            );
          })}
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Filters and Search */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="select-glass"
                >
                  <option value="all">All Types</option>
                  {Object.entries(logTypes).map(([type, info]) => (
                    <option key={type} value={type}>
                      {info.label}
                    </option>
                  ))}
                </select>
                
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search logs..."
                    className="input-glass-dark pl-10"
                  />
                </div>
              </div>
              
              {selectedLogs.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-white/60">
                    {selectedLogs.length} selected
                  </span>
                  <button
                    onClick={() => setSelectedLogs([])}
                    className="text-sm text-red-400 hover:text-red-300 transition-smooth"
                  >
                    Clear selection
                  </button>
                </div>
              )}
            </div>

            {/* Bulk Selection */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 text-sm text-neon-indigo hover:text-neon-aqua transition-smooth"
              >
                <Icon 
                  name={selectedLogs.length === filteredLogs.length ? 'CheckSquare' : 'Square'} 
                  size={16} 
                />
                <span>
                  {selectedLogs.length === filteredLogs.length ? 'Deselect All' : 'Select All'}
                </span>
              </button>
              <span className="text-sm text-white/60">
                ({filteredLogs.length} of {logs.length} entries)
              </span>
            </div>

            {/* Audit Log Entries */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => {
                const typeInfo = getLogTypeInfo(log.type);
                const isSelected = selectedLogs.includes(log.id);
                
                return (
                  <div 
                    key={log.id}
                    className={`border rounded-lg p-4 transition-all duration-200 ${
                      isSelected ? 'border-neon-indigo bg-neon-indigo/10' : 'border-white/10 glass-morphism hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => handleSelectLog(log.id)}
                        className="mt-1"
                      >
                        <Icon 
                          name={isSelected ? 'CheckSquare' : 'Square'} 
                          size={16} 
                          className={isSelected ? 'text-neon-indigo' : 'text-white/40'} 
                        />
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon 
                              name={typeInfo.icon} 
                              size={16} 
                              className={`text-${typeInfo.color === 'primary' ? 'neon-indigo' : typeInfo.color === 'warning' ? 'amber-400' : typeInfo.color === 'error' ? 'red-400' : 'cyan-400'}`} 
                            />
                            <span className={`text-xs font-medium px-2 py-1 rounded glass-morphism ${
                              typeInfo.color === 'primary' ? 'text-neon-indigo' : 
                              typeInfo.color === 'warning' ? 'text-amber-400' : 
                              typeInfo.color === 'error' ? 'text-red-400' : 'text-cyan-400'
                            }`}>
                              {typeInfo.label}
                            </span>
                            {log.status && (
                              <span className={`text-xs px-2 py-1 rounded glass-morphism ${
                                log.status === 'completed' ? 'text-emerald-400' :
                                log.status === 'error' ? 'text-red-400' :
                                log.status === 'pending'? 'text-amber-400' : 'text-white/60'
                              }`}>
                                {log.status}
                              </span>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-white/60">
                              {formatRelativeTime(log.timestamp)}
                            </p>
                            <p className="text-xs text-white/40">
                              {log.timestamp.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <p className="font-medium text-white mb-1">{log.action}</p>
                          <p className="text-sm text-white/70">{log.details}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="font-medium text-white/60">User:</span>
                            <p className="text-white">{log.user}</p>
                          </div>
                          
                          {log.operation && (
                            <div>
                              <span className="font-medium text-white/60">Operation:</span>
                              <p className="text-white">{log.operation}</p>
                            </div>
                          )}
                          
                          {log.affectedRecords && (
                            <div>
                              <span className="font-medium text-white/60">Records:</span>
                              <p className="text-white">{log.affectedRecords.toLocaleString()}</p>
                            </div>
                          )}
                          
                          {log.duration && (
                            <div>
                              <span className="font-medium text-white/60">Duration:</span>
                              <p className="text-white">{log.duration}</p>
                            </div>
                          )}
                        </div>
                        
                        {/* Additional Details */}
                        {(log.approvalNote || log.rollbackReason || log.errorCount) && (
                          <div className="mt-2 pt-2 border-t border-white/10">
                            {log.approvalNote && (
                              <p className="text-xs text-white/60">
                                <span className="font-medium">Approval Note:</span> {log.approvalNote}
                              </p>
                            )}
                            {log.rollbackReason && (
                              <p className="text-xs text-white/60">
                                <span className="font-medium">Rollback Reason:</span> {log.rollbackReason}
                              </p>
                            )}
                            {log.errorCount && (
                              <p className="text-xs text-white/60">
                                <span className="font-medium">Errors Resolved:</span> {log.errorCount}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <Icon name="FileText" size={48} className="text-white/20 mx-auto mb-3" />
                <p className="text-white/60">No audit logs match your current filters</p>
              </div>
            )}
          </div>
        )}

        {/* Compliance Note */}
        <div className="mt-4 p-3 glass-morphism border border-cyan-400/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Shield" size={16} className="text-cyan-400" />
            <h4 className="font-medium text-white">Compliance & Retention</h4>
          </div>
          <div className="text-sm text-white/70 space-y-1">
            <p>• All bulk operations are automatically logged with complete audit trail</p>
            <p>• Logs include user identity, timestamp, affected records, and change summaries</p>
            <p>• Audit data is retained for 7 years for compliance reporting</p>
            <p>• Tamper-proof logging ensures data integrity and non-repudiation</p>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-200">
          <div className="modal-glass p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-neon-indigo/20 rounded-full flex items-center justify-center">
                <Icon name="Download" size={20} className="text-neon-indigo" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Export Audit Logs</h3>
                <p className="text-sm text-white/60">
                  {selectedLogs.length > 0 
                    ? `${selectedLogs.length} selected entries`
                    : `${filteredLogs.length} filtered entries`
                  }
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => exportLogs('csv')}
                className="w-full flex items-center space-x-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-smooth text-left"
              >
                <Icon name="FileText" size={20} className="text-white/60" />
                <div>
                  <p className="font-medium text-white">CSV Format</p>
                  <p className="text-sm text-white/60">Spreadsheet-compatible format</p>
                </div>
              </button>
              
              <button
                onClick={() => exportLogs('json')}
                className="w-full flex items-center space-x-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-smooth text-left"
              >
                <Icon name="Code" size={20} className="text-white/60" />
                <div>
                  <p className="font-medium text-white">JSON Format</p>
                  <p className="text-sm text-white/60">Structured data format</p>
                </div>
              </button>
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 text-white/60 hover:text-white transition-smooth"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuditLogging;