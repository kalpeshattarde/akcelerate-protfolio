import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ProgressStatusIndicator from '../../components/ui/ProgressStatusIndicator';
import QuickActionLauncher from '../../components/ui/QuickActionLauncher';

// Import page-specific components
import AuditLogTable from './components/AuditLogTable';
import ExportModal from './components/ExportModal';
import ComplianceReportGenerator from './components/ComplianceReportGenerator';

const AuditTrailViewer = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [progressDetailsOpen, setProgressDetailsOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [complianceReportOpen, setComplianceReportOpen] = useState(false);
  
  const [currentDomain, setCurrentDomain] = useState('administration');
  const [userRole] = useState('compliance-officer');
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [auditData, setAuditData] = useState([]);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);

  // Mock notifications for compliance officer
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'High-Risk Activity Detected',
      message: 'Multiple failed login attempts from external IP address detected.',
      time: '5 minutes ago',
      read: false,
      category: 'security',
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Quarterly Audit Report Ready',
      message: 'Q4 2024 compliance audit report has been generated and is ready for review.',
      time: '1 hour ago',
      read: false,
      category: 'compliance',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Data Backup Completed',
      message: 'Scheduled audit log backup completed successfully.',
      time: '3 hours ago',
      read: true,
      category: 'system',
      priority: 'low'
    }
  ];

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      // Export shortcut (Ctrl+E)
      if ((e?.ctrlKey || e?.metaKey) && e?.key === 'e') {
        e?.preventDefault();
        setExportModalOpen(true);
      }
      
      // Generate report shortcut (Ctrl+R)
      if ((e?.ctrlKey || e?.metaKey) && e?.key === 'r') {
        e?.preventDefault();
        setComplianceReportOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExport = (exportData) => {
    console.log('Exporting audit data:', exportData);
    // Export functionality would be implemented here
  };

  const handleGenerateReport = (reportData) => {
    console.log('Generating compliance report:', reportData);
    // Report generation functionality would be implemented here
  };

  const handleDomainSwitch = (domain) => {
    setCurrentDomain(domain);
  };

  return (
    <>
      <Helmet>
        <title>Audit Trail Viewer - ESG Dashboard Pro</title>
        <meta name="description" content="Comprehensive audit log interface supporting SOX compliance requirements and security monitoring for ESG data modifications and system access patterns." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header
          userRole={userRole}
          onDomainSwitch={handleDomainSwitch}
          notifications={notifications}
        />

        {/* Main Layout */}
        <div className="flex pt-16">
          {/* Main Sidebar */}
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            userRole={userRole}
            currentDomain={currentDomain}
          />

          {/* Content Area */}
          <div className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Page Header */}
              <div className="bg-card border-b border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Eye" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">Audit Trail Viewer</h1>
                      <p className="text-muted-foreground">
                        Monitor system activities and maintain compliance with comprehensive audit logging
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Real-time Toggle */}
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-muted-foreground">Real-time</label>
                      <button
                        onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isRealTimeEnabled ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isRealTimeEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <Button
                      variant="outline"
                      onClick={() => setComplianceReportOpen(true)}
                      iconName="FileText"
                      iconPosition="left"
                    >
                      Generate Report
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setExportModalOpen(true)}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Export Logs
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Activity" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">Total Events</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mt-1">12,847</div>
                    <div className="text-xs text-success">+5.2% from last week</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                      <span className="text-sm font-medium text-foreground">Critical Events</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mt-1">23</div>
                    <div className="text-xs text-error">+2 from yesterday</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-secondary" />
                      <span className="text-sm font-medium text-foreground">Active Users</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mt-1">156</div>
                    <div className="text-xs text-muted-foreground">Last 24 hours</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} className="text-success" />
                      <span className="text-sm font-medium text-foreground">Compliance Score</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mt-1">94.5%</div>
                    <div className="text-xs text-success">+1.2% this quarter</div>
                  </div>
                </div>
              </div>

              {/* Audit Log Table */}
              <div className="flex-1">
                <AuditLogTable
                  userRole={userRole}
                  isRealTimeEnabled={isRealTimeEnabled}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          selectedLogs={selectedLogs}
          totalLogs={auditData?.length}
          onExport={handleExport}
        />

        <ComplianceReportGenerator
          isOpen={complianceReportOpen}
          onClose={() => setComplianceReportOpen(false)}
          auditData={auditData}
          onGenerateReport={handleGenerateReport}
        />

        {/* Notification Center */}
        <NotificationCenter
          isOpen={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          userRole={userRole}
          position="top-right"
        />

        {/* Progress Status Indicator */}
        {progressDetailsOpen && (
          <div className="fixed top-20 right-6 z-40">
            <ProgressStatusIndicator
              showDetails={true}
              onToggleDetails={() => setProgressDetailsOpen(false)}
            />
          </div>
        )}

        {/* Quick Action Launcher */}
        <QuickActionLauncher
          userRole={userRole}
          currentPage="audit-trail-viewer"
          position="bottom-right"
          isVisible={true}
        />
      </div>
    </>
  );
};

export default AuditTrailViewer;