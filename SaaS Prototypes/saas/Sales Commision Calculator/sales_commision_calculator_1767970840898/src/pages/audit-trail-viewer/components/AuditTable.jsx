import React from 'react';
import Icon from 'components/AppIcon';

const AuditTable = ({ data, selectedRecord, onSelectRecord, sortConfig, onSort }) => {
  const getImpactLevelColor = (level) => {
    switch (level) {
      case 'LOW': return 'text-accent bg-accent-50';
      case 'MEDIUM': return 'text-warning bg-warning-50';
      case 'HIGH': return 'text-error bg-error-50';
      case 'CRITICAL': return 'text-white bg-error';
      default: return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getChangeTypeIcon = (type) => {
    switch (type) {
      case 'CREATE': return 'Plus';
      case 'UPDATE': return 'Edit';
      case 'DELETE': return 'Trash2';
      case 'READ': return 'Eye';
      case 'SYNC': return 'RefreshCw';
      default: return 'Activity';
    }
  };

  const getChangeTypeColor = (type) => {
    switch (type) {
      case 'CREATE': return 'text-accent';
      case 'UPDATE': return 'text-warning';
      case 'DELETE': return 'text-error';
      case 'READ': return 'text-secondary-600';
      case 'SYNC': return 'text-primary';
      default: return 'text-secondary-600';
    }
  };

  const handleSort = (field) => {
    const direction = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction });
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp);
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-50 transition-smooth"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <div className="flex flex-col">
          <Icon 
            name="ChevronUp" 
            size={12} 
            className={`${sortConfig.field === field && sortConfig.direction === 'asc' ? 'text-primary' : 'text-secondary-300'}`} 
          />
          <Icon 
            name="ChevronDown" 
            size={12} 
            className={`${sortConfig.field === field && sortConfig.direction === 'desc' ? 'text-primary' : 'text-secondary-300'} -mt-1`} 
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="card-glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="glass-morphism-elevated">
            <tr>
              <SortableHeader field="timestamp">Timestamp</SortableHeader>
              <SortableHeader field="user">User</SortableHeader>
              <SortableHeader field="action">Action</SortableHeader>
              <SortableHeader field="entity">Entity</SortableHeader>
              <SortableHeader field="impactLevel">Impact</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Summary
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Records
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.map((record) => (
              <React.Fragment key={record.id}>
                <tr 
                  className={`hover:bg-white/5 transition-smooth cursor-pointer ${
                    selectedRecord?.id === record.id ? 'bg-white/10' : ''
                  }`}
                  onClick={() => onSelectRecord(selectedRecord?.id === record.id ? null : record)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">
                      {formatTimestamp(record.timestamp)}
                    </div>
                    <div className="text-xs text-white/60 font-data">
                      {record.sessionId}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">
                      {record.user}
                    </div>
                    <div className="text-xs text-white/60">
                      {record.userRole}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getChangeTypeIcon(record.changeType)} 
                        size={16} 
                        className={getChangeTypeColor(record.changeType)} 
                      />
                      <span className="text-sm text-white">{record.action}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{record.entity}</div>
                    <div className="text-xs text-white/60 font-data">{record.entityId}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getImpactLevelBadge(record.impactLevel)}`}>
                      {record.impactLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-white max-w-xs truncate">
                      {record.summary}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-white/70">
                    {record.affectedRecords}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRecord(selectedRecord?.id === record.id ? null : record);
                        }}
                        className="p-1 text-white/60 hover:text-neon-indigo transition-smooth"
                        title="View Details"
                      >
                        <Icon name={selectedRecord?.id === record.id ? "ChevronUp" : "ChevronDown"} size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Export record:', record.id);
                        }}
                        className="p-1 text-white/60 hover:text-neon-aqua transition-smooth"
                        title="Export Record"
                      >
                        <Icon name="Download" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Enhanced Expanded Details Row */}
                {selectedRecord?.id === record.id && (
                  <tr>
                    <td colSpan="8" className="px-4 py-6 glass-morphism-elevated">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Enhanced Change Details */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-3">Change Details</h4>
                          <div className="space-y-3">
                            <div className="text-sm text-white/70">
                              {record.details}
                            </div>
                            
                            {record.beforeValue && (
                              <div>
                                <div className="text-xs font-medium text-white/60 mb-1">Before:</div>
                                <div className="glass-morphism-dark border border-red-400/30 rounded-lg p-2 text-xs font-data text-white/80">
                                  {record.beforeValue}
                                </div>
                              </div>
                            )}
                            
                            {record.afterValue && (
                              <div>
                                <div className="text-xs font-medium text-white/60 mb-1">After:</div>
                                <div className="glass-morphism-dark border border-emerald-400/30 rounded-lg p-2 text-xs font-data text-white/80">
                                  {record.afterValue}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Enhanced Metadata */}
                        <div>
                          <h4 className="text-sm font-medium text-white mb-3">Metadata</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/60">IP Address:</span>
                              <span className="text-white font-data">{record.ipAddress}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60">Session ID:</span>
                              <span className="text-white font-data">{record.sessionId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60">Change Type:</span>
                              <span className="text-white">{record.changeType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/60">Affected Records:</span>
                              <span className="text-white">{record.affectedRecords}</span>
                            </div>
                            
                            {record.relatedChanges.length > 0 && (
                              <div>
                                <div className="text-white/60 mb-1">Related Changes:</div>
                                <div className="space-y-1">
                                  {record.relatedChanges.map(changeId => (
                                    <div key={changeId} className="text-xs text-neon-indigo font-data">
                                      {changeId}
                                    </div>
                                  ))}
                                </div>
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
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-white/30 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No audit records found</h3>
          <p className="text-white/60">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

// Enhanced helper function for impact level badges
const getImpactLevelBadge = (level) => {
  switch (level) {
    case 'LOW': return 'badge-success';
    case 'MEDIUM': return 'badge-warning';
    case 'HIGH': return 'badge-error';
    case 'CRITICAL': return 'badge-error text-white';
    default: return 'badge-glass text-white/60';
  }
};

export default AuditTable;