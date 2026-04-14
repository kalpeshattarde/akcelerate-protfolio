import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditLogTable = ({ 
  filters = {}, 
  onExport, 
  userRole = 'compliance-officer',
  isRealTimeEnabled = true 
}) => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const logsPerPage = 25;

  useEffect(() => {
    loadAuditLogs();
    
    // Real-time updates
    if (isRealTimeEnabled) {
      const interval = setInterval(() => {
        loadAuditLogs(true);
        setLastUpdate(new Date());
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [filters, isRealTimeEnabled]);

  const loadAuditLogs = async (isUpdate = false) => {
    if (!isUpdate) setIsLoading(true);
    
    // Simulate API call with mock data
    const mockLogs = [
      {
        id: 'log_001',
        timestamp: '2024-12-07T16:45:23.123Z',
        user: 'john.smith@company.com',
        userName: 'John Smith',
        userRole: 'ESG Manager',
        action: 'data_update',
        actionLabel: 'Data Update',
        severity: 'medium',
        ipAddress: '192.168.1.45',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        dataType: 'esg_metrics',
        resourceId: 'metric_co2_q4_2024',
        resourceName: 'Q4 2024 CO2 Emissions',
        description: 'Updated Q4 CO2 emissions data from 1,250 to 1,275 tonnes',
        sessionId: 'sess_abc123',
        changes: {
          before: { value: 1250, unit: 'tonnes', verified: false },
          after: { value: 1275, unit: 'tonnes', verified: true }
        },
        metadata: {
          source: 'manual_entry',
          approver: 'sarah.johnson@company.com',
          reason: 'Updated with verified facility data'
        }
      },
      {
        id: 'log_002',
        timestamp: '2024-12-07T16:42:15.456Z',
        user: 'sarah.johnson@company.com',
        userName: 'Sarah Johnson',
        userRole: 'Compliance Officer',
        action: 'report_generate',
        actionLabel: 'Report Generation',
        severity: 'low',
        ipAddress: '192.168.1.67',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        dataType: 'compliance_reports',
        resourceId: 'report_tcfd_q4_2024',
        resourceName: 'TCFD Q4 2024 Report',
        description: 'Generated TCFD compliance report for Q4 2024',
        sessionId: 'sess_def456',
        changes: null,
        metadata: {
          format: 'PDF',
          pages: 45,
          frameworks: ['TCFD', 'GRI']
        }
      },
      {
        id: 'log_003',
        timestamp: '2024-12-07T16:38:42.789Z',
        user: 'system@company.com',
        userName: 'System Account',
        userRole: 'System',
        action: 'data_create',
        actionLabel: 'Data Creation',
        severity: 'info',
        ipAddress: '10.0.0.1',
        userAgent: 'ESG-DataSync/1.0',
        dataType: 'esg_metrics',
        resourceId: 'metric_energy_dec_2024',
        resourceName: 'December 2024 Energy Consumption',
        description: 'Automated import of December energy consumption data',
        sessionId: 'sys_sync_001',
        changes: {
          before: null,
          after: { value: 45678, unit: 'kWh', source: 'facility_meters' }
        },
        metadata: {
          source: 'automated_sync',
          facility: 'HQ Building A',
          meter_id: 'MTR_001'
        }
      },
      {
        id: 'log_004',
        timestamp: '2024-12-07T16:35:18.234Z',
        user: 'mike.chen@company.com',
        userName: 'Mike Chen',
        userRole: 'Admin',
        action: 'permission_change',
        actionLabel: 'Permission Change',
        severity: 'high',
        ipAddress: '192.168.1.89',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        dataType: 'user_accounts',
        resourceId: 'user_lisa_brown',
        resourceName: 'Lisa Brown User Account',
        description: 'Updated user permissions for Lisa Brown',
        sessionId: 'sess_ghi789',
        changes: {
          before: { role: 'analyst', permissions: ['read_data', 'create_reports'] },
          after: { role: 'senior_analyst', permissions: ['read_data', 'create_reports', 'approve_data'] }
        },
        metadata: {
          approver: 'mike.chen@company.com',
          reason: 'Promotion to Senior Analyst role'
        }
      },
      {
        id: 'log_005',
        timestamp: '2024-12-07T16:30:55.567Z',
        user: 'lisa.brown@company.com',
        userName: 'Lisa Brown',
        userRole: 'Senior Analyst',
        action: 'export',
        actionLabel: 'Data Export',
        severity: 'medium',
        ipAddress: '192.168.1.123',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        dataType: 'esg_metrics',
        resourceId: 'export_q4_metrics',
        resourceName: 'Q4 ESG Metrics Export',
        description: 'Exported Q4 ESG metrics data to CSV format',
        sessionId: 'sess_jkl012',
        changes: null,
        metadata: {
          format: 'CSV',
          records: 1247,
          date_range: '2024-10-01 to 2024-12-31'
        }
      },
      {
        id: 'log_006',
        timestamp: '2024-12-07T16:25:33.890Z',
        user: 'david.wilson@company.com',
        userName: 'David Wilson',
        userRole: 'External Auditor',
        action: 'login',
        actionLabel: 'User Login',
        severity: 'info',
        ipAddress: '203.45.67.89',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        dataType: 'user_accounts',
        resourceId: 'session_mno345',
        resourceName: 'Login Session',
        description: 'External auditor login for quarterly review',
        sessionId: 'sess_mno345',
        changes: null,
        metadata: {
          login_method: '2FA',
          location: 'External Network',
          duration: '4 hours'
        }
      }
    ];

    // Apply filters
    let filteredLogs = mockLogs;
    
    if (filters?.searchQuery) {
      const query = filters?.searchQuery?.toLowerCase();
      filteredLogs = filteredLogs?.filter(log => 
        log?.description?.toLowerCase()?.includes(query) ||
        log?.userName?.toLowerCase()?.includes(query) ||
        log?.ipAddress?.includes(query)
      );
    }

    if (filters?.users && filters?.users?.length > 0) {
      filteredLogs = filteredLogs?.filter(log => filters?.users?.includes(log?.user));
    }

    if (filters?.actionTypes && filters?.actionTypes?.length > 0) {
      filteredLogs = filteredLogs?.filter(log => filters?.actionTypes?.includes(log?.action));
    }

    if (filters?.severity && filters?.severity !== 'all') {
      filteredLogs = filteredLogs?.filter(log => log?.severity === filters?.severity);
    }

    if (filters?.dataTypes && filters?.dataTypes?.length > 0) {
      filteredLogs = filteredLogs?.filter(log => filters?.dataTypes?.includes(log?.dataType));
    }

    if (filters?.ipAddress) {
      const ipPattern = filters?.ipAddress?.replace(/\*/g, '.*');
      const regex = new RegExp(ipPattern);
      filteredLogs = filteredLogs?.filter(log => regex?.test(log?.ipAddress));
    }

    if (filters?.dateRange?.startDate) {
      filteredLogs = filteredLogs?.filter(log => 
        new Date(log.timestamp) >= new Date(filters.dateRange.startDate)
      );
    }

    if (filters?.dateRange?.endDate) {
      filteredLogs = filteredLogs?.filter(log => 
        new Date(log.timestamp) <= new Date(filters.dateRange.endDate + 'T23:59:59')
      );
    }

    // Apply sorting
    filteredLogs?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setAuditLogs(filteredLogs);
    setIsLoading(false);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleSelectLog = (logId) => {
    setSelectedLogs(prev => 
      prev?.includes(logId) 
        ? prev?.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const handleSelectAll = () => {
    const currentPageLogs = getCurrentPageLogs();
    const allSelected = currentPageLogs?.every(log => selectedLogs?.includes(log?.id));
    
    if (allSelected) {
      setSelectedLogs(prev => prev?.filter(id => !currentPageLogs?.find(log => log?.id === id)));
    } else {
      setSelectedLogs(prev => [...new Set([...prev, ...currentPageLogs.map(log => log.id)])]);
    }
  };

  const toggleRowExpansion = (logId) => {
    setExpandedRows(prev => 
      prev?.includes(logId)
        ? prev?.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const getCurrentPageLogs = () => {
    const startIndex = (currentPage - 1) * logsPerPage;
    return auditLogs?.slice(startIndex, startIndex + logsPerPage);
  };

  const totalPages = Math.ceil(auditLogs?.length / logsPerPage);
  const currentPageLogs = getCurrentPageLogs();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-primary bg-primary/10';
      case 'low': return 'text-success bg-success/10';
      case 'info': return 'text-muted-foreground bg-muted';
      default: return 'text-foreground bg-muted';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'login': return 'LogIn';
      case 'logout': return 'LogOut';
      case 'data_create': return 'Plus';
      case 'data_update': return 'Edit';
      case 'data_delete': return 'Trash2';
      case 'report_generate': return 'FileText';
      case 'export': return 'Download';
      case 'import': return 'Upload';
      case 'permission_change': return 'Shield';
      case 'system_config': return 'Settings';
      case 'backup': return 'HardDrive';
      case 'restore': return 'RotateCcw';
      default: return 'Activity';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleBulkExport = () => {
    const selectedData = auditLogs?.filter(log => selectedLogs?.includes(log?.id));
    onExport(selectedData?.length > 0 ? selectedData : auditLogs);
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">Audit Trail</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last updated: {formatTimestamp(lastUpdate?.toISOString())}</span>
            {isRealTimeEnabled && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {auditLogs?.length} entries
            {selectedLogs?.length > 0 && ` (${selectedLogs?.length} selected)`}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkExport}
            iconName="Download"
            iconPosition="left"
            disabled={auditLogs?.length === 0}
          >
            Export
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => loadAuditLogs()}
            disabled={isLoading}
          >
            <Icon name="RefreshCw" size={16} className={isLoading ? 'animate-spin' : ''} />
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span className="text-muted-foreground">Loading audit logs...</span>
            </div>
          </div>
        ) : currentPageLogs?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Icon name="Search" size={48} className="text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No audit logs found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your filters or search criteria
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted/50 sticky top-0 z-10">
              <tr>
                <th className="w-12 p-3 text-left">
                  <input
                    type="checkbox"
                    checked={currentPageLogs?.length > 0 && currentPageLogs?.every(log => selectedLogs?.includes(log?.id))}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="w-12 p-3"></th>
                <th 
                  className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Timestamp</span>
                    <Icon 
                      name={sortConfig?.key === 'timestamp' && sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th 
                  className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort('userName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>User</span>
                    <Icon 
                      name={sortConfig?.key === 'userName' && sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th 
                  className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort('action')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Action</span>
                    <Icon 
                      name={sortConfig?.key === 'action' && sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  </div>
                </th>
                <th className="p-3 text-left font-medium text-foreground">Resource</th>
                <th className="p-3 text-left font-medium text-foreground">IP Address</th>
                <th 
                  className="p-3 text-left font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort('severity')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Severity</span>
                    <Icon 
                      name={sortConfig?.key === 'severity' && sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPageLogs?.map((log) => (
                <React.Fragment key={log?.id}>
                  <tr className="border-b border-border hover:bg-muted/30 transition-colors duration-150">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedLogs?.includes(log?.id)}
                        onChange={() => handleSelectLog(log?.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="p-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRowExpansion(log?.id)}
                        className="w-6 h-6"
                      >
                        <Icon 
                          name={expandedRows?.includes(log?.id) ? "ChevronDown" : "ChevronRight"} 
                          size={14} 
                        />
                      </Button>
                    </td>
                    <td className="p-3">
                      <div className="text-sm font-mono text-foreground">
                        {formatTimestamp(log?.timestamp)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={14} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{log?.userName}</div>
                          <div className="text-xs text-muted-foreground">{log?.userRole}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={getActionIcon(log?.action)} size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{log?.actionLabel}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-foreground">{log?.resourceName}</div>
                      <div className="text-xs text-muted-foreground font-mono">{log?.resourceId}</div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm font-mono text-foreground">{log?.ipAddress}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(log?.severity)}`}>
                        {log?.severity?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Expanded Row Details */}
                  {expandedRows?.includes(log?.id) && (
                    <tr className="border-b border-border bg-muted/20">
                      <td colSpan="8" className="p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Description */}
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{log?.description}</p>
                          </div>
                          
                          {/* Session Info */}
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Session Information</h4>
                            <div className="space-y-1 text-sm">
                              <div><span className="text-muted-foreground">Session ID:</span> <span className="font-mono">{log?.sessionId}</span></div>
                              <div><span className="text-muted-foreground">User Agent:</span> <span className="font-mono text-xs">{log?.userAgent}</span></div>
                            </div>
                          </div>
                          
                          {/* Changes */}
                          {log?.changes && (
                            <div className="lg:col-span-2">
                              <h4 className="font-medium text-foreground mb-2">Changes</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {log?.changes?.before && (
                                  <div>
                                    <h5 className="text-sm font-medium text-error mb-1">Before</h5>
                                    <pre className="text-xs bg-error/10 p-2 rounded border text-error">
                                      {JSON.stringify(log?.changes?.before, null, 2)}
                                    </pre>
                                  </div>
                                )}
                                <div>
                                  <h5 className="text-sm font-medium text-success mb-1">After</h5>
                                  <pre className="text-xs bg-success/10 p-2 rounded border text-success">
                                    {JSON.stringify(log?.changes?.after, null, 2)}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Metadata */}
                          {log?.metadata && (
                            <div className="lg:col-span-2">
                              <h4 className="font-medium text-foreground mb-2">Additional Information</h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                {Object.entries(log?.metadata)?.map(([key, value]) => (
                                  <div key={key}>
                                    <span className="text-muted-foreground capitalize">{key?.replace('_', ' ')}:</span>
                                    <div className="font-medium text-foreground">
                                      {Array.isArray(value) ? value?.join(', ') : String(value)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * logsPerPage) + 1} to {Math.min(currentPage * logsPerPage, auditLogs?.length)} of {auditLogs?.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogTable;