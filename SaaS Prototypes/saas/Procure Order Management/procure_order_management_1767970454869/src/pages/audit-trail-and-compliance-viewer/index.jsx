import React, { useState, useMemo } from 'react';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import FilterSidebar from './components/FilterSidebar';
import AuditLogTable from './components/AuditLogTable';
import ComplianceDashboard from './components/ComplianceDashboard';
import ExportModal from './components/ExportModal';
import TimelineVisualization from './components/TimelineVisualization';

const AuditTrailAndComplianceViewer = () => {
  const [activeView, setActiveView] = useState('audit-log');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: {
      start: startOfDay(subDays(new Date(), 30)),
      end: endOfDay(new Date())
    },
    users: [],
    actionTypes: [],
    complianceFrameworks: [],
    severity: 'all'
  });

  // Mock audit data
  const auditRecords = [
    {
      id: 'AUD-2024-001',
      timestamp: new Date(Date.now() - 300000),
      userId: 'john.doe@company.com',
      userName: 'John Doe',
      action: 'Purchase Order Created',
      actionType: 'CREATE',
      affectedRecord: 'PO-2024-001',
      recordType: 'Purchase Order',
      beforeValue: null,
      afterValue: `{"supplier": "ABC Corp", "amount": 15000, "status": "draft"}`,
      complianceTags: ['SOX', 'Internal Controls'],
      severity: 'medium',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      sessionId: 'sess_abc123',
      description: 'Created new purchase order for office supplies procurement'
    },
    {
      id: 'AUD-2024-002',
      timestamp: new Date(Date.now() - 600000),
      userId: 'jane.smith@company.com',
      userName: 'Jane Smith',
      action: 'Purchase Order Approved',
      actionType: 'APPROVE',
      affectedRecord: 'PO-2024-001',
      recordType: 'Purchase Order',
      beforeValue: `{"status": "pending_approval"}`,
      afterValue: `{"status": "approved", "approver": "jane.smith@company.com"}`,
      complianceTags: ['SOX', 'Approval Workflow'],
      severity: 'high',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      sessionId: 'sess_def456',
      description: 'Approved purchase order after budget verification'
    },
    {
      id: 'AUD-2024-003',
      timestamp: new Date(Date.now() - 900000),
      userId: 'mike.wilson@company.com',
      userName: 'Mike Wilson',
      action: 'Supplier Information Updated',
      actionType: 'UPDATE',
      affectedRecord: 'SUP-ABC-001',
      recordType: 'Supplier',
      beforeValue: `{"contact_email": "old@abccorp.com"}`,
      afterValue: `{"contact_email": "new@abccorp.com"}`,
      complianceTags: ['Vendor Management', 'Data Integrity'],
      severity: 'low',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      sessionId: 'sess_ghi789',
      description: 'Updated supplier contact information per vendor request'
    },
    {
      id: 'AUD-2024-004',
      timestamp: new Date(Date.now() - 1200000),
      userId: 'admin@company.com',
      userName: 'System Administrator',
      action: 'User Role Modified',
      actionType: 'SECURITY',
      affectedRecord: 'USR-JD-001',
      recordType: 'User Account',
      beforeValue: `{"role": "procurement_user"}`,
      afterValue: `{"role": "procurement_manager"}`,
      complianceTags: ['Access Control', 'Security'],
      severity: 'high',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      sessionId: 'sess_jkl012',
      description: 'Elevated user permissions for procurement management role'
    },
    {
      id: 'AUD-2024-005',
      timestamp: new Date(Date.now() - 1500000),
      userId: 'sarah.johnson@company.com',
      userName: 'Sarah Johnson',
      action: 'Budget Threshold Exceeded',
      actionType: 'ALERT',
      affectedRecord: 'BUD-Q1-2024',
      recordType: 'Budget',
      beforeValue: `{"spent": 45000, "limit": 50000}`,
      afterValue: `{"spent": 52000, "limit": 50000}`,
      complianceTags: ['Budget Control', 'Financial Oversight'],
      severity: 'critical',
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      sessionId: 'sess_mno345',
      description: 'Q1 budget limit exceeded by $2,000 - requires immediate attention'
    }
  ];

  // Filter audit records based on current filters and search
  const filteredRecords = useMemo(() => {
    return auditRecords.filter(record => {
      // Date range filter
      const recordDate = new Date(record.timestamp);
      if (recordDate < filters.dateRange.start || recordDate > filters.dateRange.end) {
        return false;
      }

      // User filter
      if (filters.users.length > 0 && !filters.users.includes(record.userId)) {
        return false;
      }

      // Action type filter
      if (filters.actionTypes.length > 0 && !filters.actionTypes.includes(record.actionType)) {
        return false;
      }

      // Compliance framework filter
      if (filters.complianceFrameworks.length > 0) {
        const hasMatchingTag = record.complianceTags.some(tag => 
          filters.complianceFrameworks.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      // Severity filter
      if (filters.severity !== 'all' && record.severity !== filters.severity) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchableText = `${record.action} ${record.userName} ${record.affectedRecord} ${record.description}`.toLowerCase();
        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [auditRecords, filters, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRecordSelection = (recordIds) => {
    setSelectedRecords(recordIds);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on records:`, selectedRecords);
    // Implement bulk actions
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting with config:', exportConfig);
    // Implement export functionality
    setIsExportModalOpen(false);
  };

  const complianceMetrics = {
    totalAuditEvents: auditRecords.length,
    criticalEvents: auditRecords.filter(r => r.severity === 'critical').length,
    complianceScore: 94,
    lastAuditDate: new Date(),
    frameworkCoverage: {
      'SOX': 85,
      'Internal Controls': 92,
      'Vendor Management': 88,
      'Security': 96
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole="admin" />
      <Header userRole="admin" userName="Admin User" notificationCount={2} />
      
      <main className="lg:ml-60 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
            onToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            auditRecords={auditRecords}
          />

          {/* Main Content */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${
            isFilterSidebarOpen ? 'ml-80' : 'ml-0'
          }`}>
            {/* Header Controls */}
            <div className="bg-surface border-b border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-heading-bold text-text-primary">
                    Audit Trail & Compliance
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Comprehensive audit visibility and regulatory reporting
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsExportModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
                  >
                    <Icon name="Download" size={16} />
                    <span>Export</span>
                  </button>
                  
                  <div className="flex bg-secondary-100 rounded-button p-1">
                    <button
                      onClick={() => setActiveView('audit-log')}
                      className={`px-3 py-1.5 text-sm rounded-button transition-smooth ${
                        activeView === 'audit-log' ?'bg-surface text-text-primary shadow-elevation-sm' :'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Audit Log
                    </button>
                    <button
                      onClick={() => setActiveView('compliance')}
                      className={`px-3 py-1.5 text-sm rounded-button transition-smooth ${
                        activeView === 'compliance' ?'bg-surface text-text-primary shadow-elevation-sm' :'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Compliance
                    </button>
                    <button
                      onClick={() => setActiveView('timeline')}
                      className={`px-3 py-1.5 text-sm rounded-button transition-smooth ${
                        activeView === 'timeline' ?'bg-surface text-text-primary shadow-elevation-sm' :'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      Timeline
                    </button>
                  </div>
                </div>
              </div>

              {/* Search and Quick Stats */}
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                    />
                    <input
                      type="text"
                      placeholder="Search audit records..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-heading-semibold text-text-primary">
                      {filteredRecords.length}
                    </div>
                    <div className="text-text-secondary">Records</div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading-semibold text-error">
                      {filteredRecords.filter(r => r.severity === 'critical').length}
                    </div>
                    <div className="text-text-secondary">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading-semibold text-success">
                      {complianceMetrics.complianceScore}%
                    </div>
                    <div className="text-text-secondary">Compliance</div>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedRecords.length > 0 && (
                <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-button">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary">
                      {selectedRecords.length} record(s) selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBulkAction('tag')}
                        className="px-3 py-1.5 text-sm bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
                      >
                        Add Tags
                      </button>
                      <button
                        onClick={() => handleBulkAction('flag')}
                        className="px-3 py-1.5 text-sm bg-warning text-white rounded-button hover:bg-warning-600 transition-smooth"
                      >
                        Flag for Review
                      </button>
                      <button
                        onClick={() => setSelectedRecords([])}
                        className="px-3 py-1.5 text-sm bg-secondary-200 text-text-secondary rounded-button hover:bg-secondary-300 transition-smooth"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              {activeView === 'audit-log' && (
                <AuditLogTable
                  records={filteredRecords}
                  selectedRecords={selectedRecords}
                  onRecordSelection={handleRecordSelection}
                />
              )}
              
              {activeView === 'compliance' && (
                <ComplianceDashboard
                  metrics={complianceMetrics}
                  records={filteredRecords}
                />
              )}
              
              {activeView === 'timeline' && (
                <TimelineVisualization
                  records={filteredRecords}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onExport={handleExport}
          recordCount={filteredRecords.length}
        />
      )}
    </div>
  );
};

export default AuditTrailAndComplianceViewer;