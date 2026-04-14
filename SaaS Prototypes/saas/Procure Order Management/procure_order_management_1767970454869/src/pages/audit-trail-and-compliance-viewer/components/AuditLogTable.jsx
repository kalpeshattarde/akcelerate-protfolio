import React, { useState } from 'react';
import { format } from 'date-fns';
import Icon from '../../../components/AppIcon';

const AuditLogTable = ({ records, selectedRecords, onRecordSelection }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [expandedRecord, setExpandedRecord] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRecords = [...records].sort((a, b) => {
    if (sortConfig.key === 'timestamp') {
      const aValue = new Date(a[sortConfig.key]);
      const bValue = new Date(b[sortConfig.key]);
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aValue = a[sortConfig.key]?.toString().toLowerCase() || '';
    const bValue = b[sortConfig.key]?.toString().toLowerCase() || '';
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      onRecordSelection(records.map(r => r.id));
    } else {
      onRecordSelection([]);
    }
  };

  const handleSelectRecord = (recordId, checked) => {
    if (checked) {
      onRecordSelection([...selectedRecords, recordId]);
    } else {
      onRecordSelection(selectedRecords.filter(id => id !== recordId));
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error-50';
      case 'high': return 'text-error bg-error-50';
      case 'medium': return 'text-warning bg-warning-50';
      case 'low': return 'text-success bg-success-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const getActionTypeIcon = (actionType) => {
    switch (actionType) {
      case 'CREATE': return 'Plus';
      case 'UPDATE': return 'Edit';
      case 'DELETE': return 'Trash2';
      case 'APPROVE': return 'CheckCircle';
      case 'REJECT': return 'XCircle';
      case 'SECURITY': return 'Shield';
      case 'ALERT': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const toggleRecordExpansion = (recordId) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  const formatJsonValue = (value) => {
    if (!value) return 'N/A';
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return value;
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 sticky top-0 z-10">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRecords.length === records.length && records.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Timestamp</span>
                  <Icon 
                    name={sortConfig.key === 'timestamp' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('userName')}
              >
                <div className="flex items-center space-x-1">
                  <span>User</span>
                  <Icon 
                    name={sortConfig.key === 'userName' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('action')}
              >
                <div className="flex items-center space-x-1">
                  <span>Action</span>
                  <Icon 
                    name={sortConfig.key === 'action' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Affected Record
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Compliance
              </th>
              <th className="px-4 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedRecords.map((record) => (
              <React.Fragment key={record.id}>
                <tr className="hover:bg-secondary-50 transition-smooth">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)}
                      onChange={(e) => handleSelectRecord(record.id, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-text-primary">
                      {format(new Date(record.timestamp), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {format(new Date(record.timestamp), 'HH:mm:ss')}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-body-medium text-text-primary">
                      {record.userName}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {record.userId}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getActionTypeIcon(record.actionType)} 
                        size={16} 
                        className="text-text-secondary"
                      />
                      <div>
                        <div className="text-sm font-body-medium text-text-primary">
                          {record.action}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {record.actionType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-body-medium text-text-primary">
                      {record.affectedRecord}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {record.recordType}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium ${getSeverityColor(record.severity)}`}>
                      {record.severity.charAt(0).toUpperCase() + record.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {record.complianceTags.slice(0, 2).map((tag, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-button text-xs bg-primary-100 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                      {record.complianceTags.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-button text-xs bg-secondary-100 text-text-secondary">
                          +{record.complianceTags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleRecordExpansion(record.id)}
                        className="p-1 rounded-button hover:bg-secondary-100 transition-smooth"
                        title="View Details"
                      >
                        <Icon 
                          name={expandedRecord === record.id ? 'ChevronUp' : 'ChevronDown'} 
                          size={16} 
                          className="text-text-secondary"
                        />
                      </button>
                      <button
                        className="p-1 rounded-button hover:bg-secondary-100 transition-smooth"
                        title="Flag for Review"
                      >
                        <Icon name="Flag" size={16} className="text-text-secondary" />
                      </button>
                      <button
                        className="p-1 rounded-button hover:bg-secondary-100 transition-smooth"
                        title="Add to Report"
                      >
                        <Icon name="FileText" size={16} className="text-text-secondary" />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {expandedRecord === record.id && (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 bg-secondary-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-heading-medium text-text-primary mb-3">
                            Event Details
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Description:</span>
                              <span className="text-text-primary">{record.description}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">IP Address:</span>
                              <span className="text-text-primary font-mono">{record.ipAddress}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Session ID:</span>
                              <span className="text-text-primary font-mono">{record.sessionId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">User Agent:</span>
                              <span className="text-text-primary text-xs truncate" title={record.userAgent}>
                                {record.userAgent}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-heading-medium text-text-primary mb-3">
                            Data Changes
                          </h4>
                          <div className="space-y-3">
                            {record.beforeValue && (
                              <div>
                                <span className="text-xs text-text-secondary">Before:</span>
                                <pre className="mt-1 p-2 bg-surface border border-border rounded text-xs font-mono overflow-x-auto">
                                  {formatJsonValue(record.beforeValue)}
                                </pre>
                              </div>
                            )}
                            {record.afterValue && (
                              <div>
                                <span className="text-xs text-text-secondary">After:</span>
                                <pre className="mt-1 p-2 bg-surface border border-border rounded text-xs font-mono overflow-x-auto">
                                  {formatJsonValue(record.afterValue)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
        {records.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mb-4" />
            <h3 className="text-lg font-heading-medium text-text-primary mb-2">
              No audit records found
            </h3>
            <p className="text-text-secondary text-center max-w-md">
              Try adjusting your filters or search criteria to find the audit records you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogTable;