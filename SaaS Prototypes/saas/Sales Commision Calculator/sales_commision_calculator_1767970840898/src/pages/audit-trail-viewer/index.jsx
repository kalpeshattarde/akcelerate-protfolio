import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import PageHeader from 'components/ui/PageHeader';
import useSidebar from 'hooks/useSidebar';
import FilterPanel from './components/FilterPanel';
import AuditTable from './components/AuditTable';
import ExportModal from './components/ExportModal';
import SavedSearches from './components/SavedSearches';

const AuditTrailViewer = () => {
  const navigate = useNavigate();
  const { getMainContentClasses } = useSidebar();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    user: '',
    actionType: '',
    entity: '',
    impactLevel: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortConfig, setSortConfig] = useState({ field: 'timestamp', direction: 'desc' });

  // Mock audit trail data
  const auditData = [
    {
      id: 'AUD-2024-001',
      timestamp: new Date('2024-01-15T14:30:00'),
      user: 'john.doe@company.com',
      userRole: 'Sales Operations Manager',
      action: 'Commission Structure Modified',
      entity: 'Sales Tier Configuration',
      entityId: 'TIER-001',
      changeType: 'UPDATE',
      impactLevel: 'HIGH',
      summary: 'Updated commission rate for Tier 1 from 8% to 10%',
      beforeValue: `{"tier1Rate": 0.08, "threshold": 50000}`,
      afterValue: `{"tier1Rate": 0.10, "threshold": 50000}`,
      affectedRecords: 45,
      ipAddress: '192.168.1.100',
      sessionId: 'SES-789123',
      details: `Modified commission structure for Sales Tier 1:
- Commission Rate: 8.0% → 10.0%
- Effective Date: 2024-02-01
- Approval Status: Pending
- Estimated Impact: $125,000 additional quarterly payout`,
      relatedChanges: ['CALC-2024-001', 'SCENARIO-2024-015']
    },
    {
      id: 'AUD-2024-002',
      timestamp: new Date('2024-01-15T13:45:00'),
      user: 'sarah.wilson@company.com',
      userRole: 'Finance Director',
      action: 'Scenario Created',
      entity: 'Compensation Scenario',
      entityId: 'SCENARIO-2024-016',
      changeType: 'CREATE',
      impactLevel: 'MEDIUM',
      summary: 'Created new bonus scenario "Q1 2024 Accelerator"',
      beforeValue: null,
      afterValue: `{"spifRate": 0.05, "accelerator": 1.5, "bonusMultiplier": 1.2}`,
      affectedRecords: 0,
      ipAddress: '192.168.1.105',
      sessionId: 'SES-789124',
      details: `Created compensation scenario with parameters:
- SPIF Rate: 5.0%
- Accelerator: 1.5x
- Bonus Multiplier: 1.2x
- Target Representatives: All Tier 1 & 2
- Projected Additional Cost: $89,500`,
      relatedChanges: []
    },
    {
      id: 'AUD-2024-003',
      timestamp: new Date('2024-01-15T12:20:00'),
      user: 'mike.chen@company.com',
      userRole: 'Sales Representative',
      action: 'Data Export',
      entity: 'Performance Report',
      entityId: 'RPT-2024-001',
      changeType: 'READ',
      impactLevel: 'LOW',
      summary: 'Exported personal performance data for Q4 2023',
      beforeValue: null,
      afterValue: null,
      affectedRecords: 1,
      ipAddress: '192.168.1.110',
      sessionId: 'SES-789125',
      details: `Exported performance report containing:
- Personal YTD Revenue: $485,000
- Quota Attainment: 97%
- Commission Earned: $38,800
- Export Format: PDF
- File Size: 2.3 MB`,
      relatedChanges: []
    },
    {
      id: 'AUD-2024-004',
      timestamp: new Date('2024-01-15T11:15:00'),
      user: 'admin@company.com',
      userRole: 'System Administrator',
      action: 'User Access Modified',
      entity: 'User Account',
      entityId: 'USER-456',
      changeType: 'UPDATE',
      impactLevel: 'HIGH',
      summary: 'Granted audit viewer access to compliance team',
      beforeValue: `{"role": "viewer", "permissions": ["read_own_data"]}`,
      afterValue: `{"role": "auditor", "permissions": ["read_own_data", "read_audit_trail", "export_reports"]}`,
      affectedRecords: 1,
      ipAddress: '192.168.1.200',
      sessionId: 'SES-789126',
      details: `Modified user permissions for compliance requirements:
- Previous Role: Viewer
- New Role: Auditor
- Added Permissions: Audit Trail Access, Report Export
- Approval: SOX Compliance Officer
- Effective Immediately`,
      relatedChanges: ['SEC-2024-001']
    },
    {
      id: 'AUD-2024-005',
      timestamp: new Date('2024-01-15T10:30:00'),
      user: 'system@company.com',
      userRole: 'System Process',
      action: 'Data Synchronization',
      entity: 'CRM Integration',
      entityId: 'SYNC-2024-001',
      changeType: 'SYNC',
      impactLevel: 'MEDIUM',
      summary: 'Synchronized sales data from Salesforce CRM',
      beforeValue: null,
      afterValue: `{"recordsProcessed": 1250, "recordsUpdated": 45, "recordsCreated": 12}`,
      affectedRecords: 57,
      ipAddress: '10.0.0.50',
      sessionId: 'SYS-AUTO-001',
      details: `Automated data synchronization completed:
- Total Records Processed: 1,250
- Records Updated: 45
- New Records Created: 12
- Sync Duration: 3.2 minutes
- Status: Success
- Next Sync: 2024-01-15T22:30:00`,
      relatedChanges: ['CALC-2024-002', 'CALC-2024-003']
    },
    {
      id: 'AUD-2024-006',
      timestamp: new Date('2024-01-15T09:45:00'),
      user: 'lisa.martinez@company.com',
      userRole: 'HR Compensation Specialist',
      action: 'Quota Adjustment',
      entity: 'Sales Representative',
      entityId: 'REP-789',
      changeType: 'UPDATE',
      impactLevel: 'HIGH',
      summary: 'Adjusted annual quota due to territory change',
      beforeValue: `{"annualQuota": 500000, "territory": "West Coast"}`,
      afterValue: `{"annualQuota": 650000, "territory": "Enterprise Accounts"}`,
      affectedRecords: 1,
      ipAddress: '192.168.1.115',
      sessionId: 'SES-789127',
      details: `Quota adjustment for territory reassignment:
- Previous Quota: $500,000
- New Quota: $650,000
- Territory Change: West Coast → Enterprise Accounts
- Effective Date: 2024-01-01
- Approval: Sales Director
- Impact: Recalculation of Q1 commission structure`,
      relatedChanges: ['CALC-2024-004', 'TERRITORY-2024-001']
    }
  ];

  // Filter and search logic
  const filteredData = auditData.filter(record => {
    const matchesSearch = !searchQuery || 
      record.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.entity.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUser = !filters.user || record.user.includes(filters.user);
    const matchesAction = !filters.actionType || record.action.includes(filters.actionType);
    const matchesEntity = !filters.entity || record.entity.includes(filters.entity);
    const matchesImpact = !filters.impactLevel || record.impactLevel === filters.impactLevel;

    const matchesDateRange = (!filters.dateRange.start || record.timestamp >= new Date(filters.dateRange.start)) &&
                            (!filters.dateRange.end || record.timestamp <= new Date(filters.dateRange.end));

    return matchesSearch && matchesUser && matchesAction && matchesEntity && matchesImpact && matchesDateRange;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleExport = (format) => {
    console.log(`Exporting audit trail in ${format} format`);
    setShowExportModal(false);
  };

  const handleSaveSearch = (searchName) => {
    console.log(`Saving search as: ${searchName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Sidebar />
      <Header />
      
      <main className={`pt-16 transition-all duration-300 ${getMainContentClasses()}`}>
        {/* Enhanced Header Section with proper spacing */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 sm:px-6 lg:px-8"
        >
          <PageHeader
            title="Audit Trail Viewer"
            description="Complete system activity log for compliance and audit requirements"
            icon="FileText"
            statusIndicators={[
              {
                icon: 'Shield',
                iconClass: 'text-neon-indigo',
                label: 'SOX Compliance'
              },
              {
                icon: 'Database',
                iconClass: 'text-neon-teal',
                label: 'Real-time Logging'
              }
            ]}
            actionButtons={[
              {
                icon: 'Filter',
                label: 'Filters',
                onClick: () => setShowFilters(!showFilters),
                variant: showFilters ? 'primary' : 'secondary'
              },
              {
                icon: 'Download',
                label: 'Export',
                onClick: () => setShowExportModal(true),
                variant: 'primary'
              }
            ]}
          >
            {/* Enhanced Search Bar with proper glass styling */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="relative max-w-2xl">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  placeholder="Search audit records by user, action, entity, or summary..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-glass w-full pl-12 pr-4 py-3 text-sm"
                />
              </div>
            </motion.div>
          </PageHeader>
        </motion.div>

        {/* Enhanced Main Content Grid with proper spacing and responsiveness */}
        <motion.div 
          className="px-4 sm:px-6 lg:px-8 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Enhanced Filter Panel with proper responsive behavior */}
            {showFilters && (
              <motion.div 
                className="lg:col-span-1"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="space-y-6">
                  <FilterPanel 
                    filters={filters}
                    setFilters={setFilters}
                    onSaveSearch={handleSaveSearch}
                  />
                  <SavedSearches />
                </div>
              </motion.div>
            )}

            {/* Enhanced Main Content Area with dynamic column span */}
            <motion.div 
              className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'} min-w-0`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Enhanced Results Summary with proper glass styling */}
              <div className="card-glass mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="text-sm text-white/70">
                      Showing {startIndex + 1}-{Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length} records
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-white/70 whitespace-nowrap">Show:</label>
                      <select
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="input-glass text-sm px-3 py-1 min-w-0"
                      >
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Enhanced Pagination Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn-glass-secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <span className="text-sm text-white/70 px-3 whitespace-nowrap">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="btn-glass-secondary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Audit Table with proper containment */}
              <div className="min-w-0 overflow-hidden">
                <AuditTable
                  data={paginatedData}
                  selectedRecord={selectedRecord}
                  onSelectRecord={setSelectedRecord}
                  sortConfig={sortConfig}
                  onSort={setSortConfig}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          recordCount={filteredData.length}
        />
      )}
    </div>
  );
};

export default AuditTrailViewer;