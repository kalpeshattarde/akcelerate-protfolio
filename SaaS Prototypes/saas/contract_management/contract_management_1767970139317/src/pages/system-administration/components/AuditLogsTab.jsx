import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditLogsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [showFilters, setShowFilters] = useState(false);

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-01-04 07:45:23",
      user: "John Doe",
      userEmail: "john.doe@company.com",
      action: "User Created",
      resource: "User Management",
      resourceId: "USR-2025-001",
      details: "Created new user account for Sarah Wilson",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "Medium",
      status: "Success"
    },
    {
      id: 2,
      timestamp: "2025-01-04 07:42:15",
      user: "Sarah Wilson",
      userEmail: "sarah.wilson@company.com",
      action: "Contract Modified",
      resource: "Contract Repository",
      resourceId: "CNT-2024-1567",
      details: "Updated contract terms and conditions section",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "High",
      status: "Success"
    },
    {
      id: 3,
      timestamp: "2025-01-04 07:40:08",
      user: "Michael Chen",
      userEmail: "michael.chen@company.com",
      action: "Login Failed",
      resource: "Authentication",
      resourceId: "AUTH-2025-001",
      details: "Failed login attempt - incorrect password",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "High",
      status: "Failed"
    },
    {
      id: 4,
      timestamp: "2025-01-04 07:35:42",
      user: "Emily Rodriguez",
      userEmail: "emily.rodriguez@company.com",
      action: "Workflow Approved",
      resource: "Approval Workflows",
      resourceId: "WF-2025-089",
      details: "Approved contract workflow for vendor agreement",
      ipAddress: "192.168.1.115",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      severity: "Medium",
      status: "Success"
    },
    {
      id: 5,
      timestamp: "2025-01-04 07:30:19",
      user: "David Park",
      userEmail: "david.park@company.com",
      action: "System Configuration",
      resource: "System Administration",
      resourceId: "SYS-2025-012",
      details: "Modified business rule for contract value thresholds",
      ipAddress: "192.168.1.120",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "Critical",
      status: "Success"
    },
    {
      id: 6,
      timestamp: "2025-01-04 07:25:33",
      user: "System",
      userEmail: "system@company.com",
      action: "Data Export",
      resource: "Analytics Reporting",
      resourceId: "RPT-2025-045",
      details: "Automated export of monthly contract analytics report",
      ipAddress: "127.0.0.1",
      userAgent: "ContractFlow-System/2.1.0",
      severity: "Low",
      status: "Success"
    },
    {
      id: 7,
      timestamp: "2025-01-04 07:20:45",
      user: "John Doe",
      userEmail: "john.doe@company.com",
      action: "Permission Changed",
      resource: "User Management",
      resourceId: "USR-2024-156",
      details: "Updated user permissions for Michael Chen - added contract approval rights",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "High",
      status: "Success"
    },
    {
      id: 8,
      timestamp: "2025-01-04 07:15:12",
      user: "Sarah Wilson",
      userEmail: "sarah.wilson@company.com",
      action: "Document Deleted",
      resource: "Contract Repository",
      resourceId: "DOC-2024-789",
      details: "Permanently deleted expired contract document",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "Critical",
      status: "Success"
    }
  ];

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'User Created', label: 'User Created' },
    { value: 'Contract Modified', label: 'Contract Modified' },
    { value: 'Login Failed', label: 'Login Failed' },
    { value: 'Workflow Approved', label: 'Workflow Approved' },
    { value: 'System Configuration', label: 'System Configuration' },
    { value: 'Data Export', label: 'Data Export' },
    { value: 'Permission Changed', label: 'Permission Changed' },
    { value: 'Document Deleted', label: 'Document Deleted' }
  ];

  const userOptions = [
    { value: '', label: 'All Users' },
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Sarah Wilson', label: 'Sarah Wilson' },
    { value: 'Michael Chen', label: 'Michael Chen' },
    { value: 'Emily Rodriguez', label: 'Emily Rodriguez' },
    { value: 'David Park', label: 'David Park' },
    { value: 'System', label: 'System' }
  ];

  const timeframeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const filteredLogs = useMemo(() => {
    return auditLogs?.filter(log => {
      const matchesSearch = log?.user?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           log?.action?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           log?.resource?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           log?.details?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesAction = !selectedAction || log?.action === selectedAction;
      const matchesUser = !selectedUser || log?.user === selectedUser;
      
      return matchesSearch && matchesAction && matchesUser;
    });
  }, [searchQuery, selectedAction, selectedUser]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'text-error bg-error/10';
      case 'High':
        return 'text-warning bg-warning/10';
      case 'Medium':
        return 'text-accent bg-accent/10';
      case 'Low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'text-success bg-success/10';
      case 'Failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const handleExportLogs = () => {
    console.log('Exporting audit logs...');
  };

  const handleViewDetails = (log) => {
    console.log('Viewing details for log:', log);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Audit Logs</h2>
          <p className="text-muted-foreground">Complete activity trail with change history and rollback capabilities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            iconName="Filter"
            iconPosition="left"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={handleExportLogs}
          >
            Export Logs
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className={`bg-surface border border-border rounded-lg transition-all duration-300 ${showFilters ? 'p-4' : 'p-0 h-0 overflow-hidden border-0'}`}>
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="search"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
            <Select
              placeholder="Filter by action"
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
            />
            <Select
              placeholder="Filter by user"
              options={userOptions}
              value={selectedUser}
              onChange={setSelectedUser}
            />
            <Select
              placeholder="Timeframe"
              options={timeframeOptions}
              value={selectedTimeframe}
              onChange={setSelectedTimeframe}
            />
          </div>
        )}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-accent" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">{filteredLogs?.length}</div>
              <div className="text-sm text-muted-foreground">Total Activities</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-accent" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">
                {new Set(filteredLogs.map(log => log.user))?.size}
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">
                {filteredLogs?.filter(log => log?.status === 'Failed')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Failed Actions</div>
            </div>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-error" />
            <div>
              <div className="text-2xl font-semibold text-text-primary">
                {filteredLogs?.filter(log => log?.severity === 'Critical')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Events</div>
            </div>
          </div>
        </div>
      </div>
      {/* Audit Logs Table */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-text-primary">Timestamp</th>
                <th className="text-left p-4 font-medium text-text-primary">User</th>
                <th className="text-left p-4 font-medium text-text-primary">Action</th>
                <th className="text-left p-4 font-medium text-text-primary">Resource</th>
                <th className="text-left p-4 font-medium text-text-primary">Severity</th>
                <th className="text-left p-4 font-medium text-text-primary">Status</th>
                <th className="text-right p-4 font-medium text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs?.map((log) => (
                <tr key={log?.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <div className="text-sm text-text-primary">
                      {new Date(log.timestamp)?.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(log.timestamp)?.toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-text-primary">{log?.user}</div>
                      <div className="text-xs text-muted-foreground">{log?.userEmail}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-text-primary">{log?.action}</div>
                      <div className="text-xs text-muted-foreground">{log?.resourceId}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-sm text-text-primary">{log?.resource}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        {log?.details}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(log?.severity)}`}>
                      {log?.severity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(log?.status)}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        log?.status === 'Success' ? 'bg-success' : 'bg-error'
                      }`} />
                      {log?.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => handleViewDetails(log)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredLogs?.length} of {auditLogs?.length} audit logs
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsTab;