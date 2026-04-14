// src/pages/system-integration-monitor/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import PageHeader from 'components/ui/PageHeader';
import useSidebar from 'hooks/useSidebar';
import SystemStatusOverview from './components/SystemStatusOverview';
import DataFlowMonitoring from './components/DataFlowMonitoring';
import PerformanceMetrics from './components/PerformanceMetrics';
import AlertingSystem from './components/AlertingSystem';
import ErrorManagementSection from './components/ErrorManagementSection';
import IntegrationConfiguration from './components/IntegrationConfiguration';
import AutomatedDiagnostics from './components/AutomatedDiagnostics';
import ManualSyncControls from './components/ManualSyncControls';
import AuditLogging from './components/AuditLogging';
import ExportCapabilities from './components/ExportCapabilities';

const SystemIntegrationMonitor = () => {
  const { getMainContentClasses } = useSidebar();
  const [userRole, setUserRole] = useState('admin'); // admin, operator
  const [systemStatus, setSystemStatus] = useState('healthy'); // healthy, warning, critical
  const [activeConnections, setActiveConnections] = useState(0);
  const [lastSync, setLastSync] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const [integrations, setIntegrations] = useState([]);
  const [dataFlows, setDataFlows] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [systemErrors, setSystemErrors] = useState([]);
  const [diagnosticResults, setDiagnosticResults] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDiagnosticsRunning, setIsDiagnosticsRunning] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAlertConfig, setShowAlertConfig] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [selectedError, setSelectedError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds

  // Mock data initialization
  useEffect(() => {
    // Initialize sync activities
    setSyncActivities([
      {
        id: 1,
        system: 'HRIS',
        type: 'Employee Data Sync',
        status: 'success',
        successRate: 98.5,
        errorCount: 3,
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
        recordsProcessed: 2847,
        duration: 45
      },
      {
        id: 2,
        system: 'CRM',
        type: 'Sales Data Sync',
        status: 'success',
        successRate: 100,
        errorCount: 0,
        lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
        recordsProcessed: 1523,
        duration: 32
      },
      {
        id: 3,
        system: 'Payroll',
        type: 'Commission Calculation',
        status: 'running',
        successRate: 95.2,
        errorCount: 12,
        lastUpdate: new Date(),
        recordsProcessed: 856,
        duration: null
      },
      {
        id: 4,
        system: 'Identity Provider',
        type: 'User Authentication',
        status: 'warning',
        successRate: 87.3,
        errorCount: 25,
        lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
        recordsProcessed: 198,
        duration: 15
      }
    ]);

    // Initialize integration errors
    setIntegrationErrors([
      {
        id: 1,
        system: 'Identity Provider',
        error: 'Authentication timeout for user sync batch #1247',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        severity: 'high',
        retryCount: 2,
        maxRetries: 3,
        status: 'retrying',
        recommendation: 'Check identity provider connection settings'
      },
      {
        id: 2,
        system: 'HRIS',
        error: 'Invalid employee record format in batch #8394',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        severity: 'medium',
        retryCount: 1,
        maxRetries: 3,
        status: 'pending',
        recommendation: 'Validate data format against schema'
      },
      {
        id: 3,
        system: 'Payroll',
        error: 'Commission calculation exceeded timeout limit',
        timestamp: new Date(Date.now() - 35 * 60 * 1000),
        severity: 'high',
        retryCount: 3,
        maxRetries: 3,
        status: 'failed',
        recommendation: 'Optimize calculation queries or increase timeout'
      }
    ]);

    // Initialize performance data
    setPerformanceData({
      apiResponseTimes: {
        hris: 245,
        crm: 180,
        payroll: 520,
        identity: 890
      },
      dataTransferVolumes: {
        hris: 125.8,
        crm: 78.3,
        payroll: 45.2,
        identity: 12.7
      },
      availability: {
        hris: 99.8,
        crm: 99.9,
        payroll: 98.5,
        identity: 95.2
      }
    });

    // Initialize active alerts
    setActiveAlerts([
      {
        id: 1,
        type: 'performance_degradation',
        severity: 'warning',
        message: 'Identity Provider response time exceeding threshold',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        acknowledged: false,
        system: 'Identity Provider'
      },
      {
        id: 2,
        type: 'integration_failure',
        severity: 'critical',
        message: 'Payroll commission sync failed after maximum retries',
        timestamp: new Date(Date.now() - 35 * 60 * 1000),
        acknowledged: false,
        system: 'Payroll'
      },
      {
        id: 3,
        type: 'data_inconsistency',
        severity: 'medium',
        message: 'Employee count mismatch between HRIS and local database',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        acknowledged: true,
        system: 'HRIS'
      }
    ]);

    // Initialize audit events
    setAuditEvents([
      {
        id: 1,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        user: 'system',
        action: 'Automatic sync initiated',
        system: 'HRIS',
        details: 'Scheduled employee data synchronization',
        transactionId: 'TXN-789456123'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        user: 'john.doe@company.com',
        action: 'Manual sync triggered',
        system: 'CRM',
        details: 'User initiated sales data refresh',
        transactionId: 'TXN-789456124'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        user: 'system',
        action: 'Configuration updated',
        system: 'Payroll',
        details: 'Sync schedule modified to hourly',
        transactionId: 'TXN-789456125'
      }
    ]);

    // Initialize diagnostics results
    setDiagnosticsResults([
      {
        id: 1,
        test: 'Connectivity Test',
        system: 'HRIS',
        status: 'passed',
        lastRun: new Date(Date.now() - 10 * 60 * 1000),
        duration: 2.3,
        details: 'All endpoints responding normally'
      },
      {
        id: 2,
        test: 'Data Validation Check',
        system: 'CRM',
        status: 'passed',
        lastRun: new Date(Date.now() - 15 * 60 * 1000),
        duration: 5.7,
        details: 'Schema validation successful'
      },
      {
        id: 3,
        test: 'Authentication Test',
        system: 'Identity Provider',
        status: 'warning',
        lastRun: new Date(Date.now() - 5 * 60 * 1000),
        duration: 8.9,
        details: 'Elevated response times detected'
      }
    ]);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update system health randomly
      setSystemHealth(prev => ({
        ...prev,
        overall: ['healthy', 'warning'][Math.floor(Math.random() * 2)],
        identity: ['connected', 'warning', 'error'][Math.floor(Math.random() * 3)]
      }));

      // Update performance metrics
      setPerformanceData(prev => ({
        ...prev,
        apiResponseTimes: {
          ...prev.apiResponseTimes,
          identity: 800 + Math.random() * 200
        }
      }));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleManualSync = (systemType) => {
    setIsManualSyncActive(true);
    
    // Add audit log
    const newAuditEvent = {
      id: Date.now(),
      timestamp: new Date(),
      user: 'current.user@company.com',
      action: 'Manual sync initiated',
      system: systemType,
      details: `User triggered ${systemType} data synchronization`,
      transactionId: `TXN-${Date.now()}`
    };
    setAuditEvents(prev => [newAuditEvent, ...prev]);

    // Simulate sync completion
    setTimeout(() => {
      setIsManualSyncActive(false);
      
      // Update sync activities
      setSyncActivities(prev => prev?.map(activity => 
        activity.system === systemType ? {
          ...activity,
          lastUpdate: new Date(),
          status: 'success'
        } : activity
      ));
    }, 3000);
  };

  const handleSyncTrigger = (systemType) => {
    setIsSyncing(true);
    handleManualSync(systemType);
    
    // Reset syncing state after completion
    setTimeout(() => {
      setIsSyncing(false);
    }, 3000);
  };

  const handleAcknowledgeAlert = (alertId) => {
    setActiveAlerts(prev => prev?.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleAlertDismiss = (alertId) => {
    handleAcknowledgeAlert(alertId);
  };

  const handleRetryError = (errorId) => {
    setIntegrationErrors(prev => prev?.map(error => 
      error.id === errorId ? {
        ...error,
        status: 'retrying',
        retryCount: error.retryCount + 1
      } : error
    ));
  };

  const handleErrorResolve = (errorId) => {
    setSystemErrors(prev => prev?.filter(error => error.id !== errorId));
    
    // Also update integrationErrors if it exists there
    setIntegrationErrors(prev => prev?.map(error => 
      error.id === errorId ? {
        ...error,
        status: 'resolved',
        resolvedAt: new Date(),
        resolvedBy: 'current.user@company.com'
      } : error
    ));

    // Add audit log for error resolution
    const newAuditEvent = {
      id: Date.now(),
      timestamp: new Date(),
      user: 'current.user@company.com',
      action: 'Error resolved',
      system: 'System Integration Monitor',
      details: `Error ${errorId} marked as resolved`,
      transactionId: `TXN-${Date.now()}`
    };
    setAuditEvents(prev => [newAuditEvent, ...prev]);
  };

  const getSystemHealthStatus = () => {
    const connectedSystems = Object.values(systemHealth).filter(status => status === 'connected').length;
    const totalSystems = Object.keys(systemHealth).length - 1; // Exclude 'overall'
    
    if (connectedSystems === totalSystems) return 'All Systems Operational';
    if (connectedSystems >= totalSystems * 0.75) return 'Minor Issues Detected';
    return 'Multiple System Issues';
  };

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyboardShortcuts = (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            handleManualSync('HRIS');
            break;
          case '2':
            event.preventDefault();
            handleManualSync('CRM');
            break;
          case '3':
            event.preventDefault();
            handleManualSync('Payroll');
            break;
          case 'r':
            event.preventDefault();
            window.location.reload();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Sidebar />
      <Header />
      
      <main className={`pt-16 transition-all duration-300 ${getMainContentClasses()}`}>
        {/* Animated Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageHeader
            title="System Integration Monitor"
            description="Monitor and manage system integrations, data flow, and performance metrics across all connected platforms."
            icon="Activity"
            statusIndicators={[
              {
                icon: systemStatus === 'healthy' ? 'CheckCircle' : systemStatus === 'warning' ? 'AlertTriangle' : 'XCircle',
                iconClass: systemStatus === 'healthy' ? 'text-neon-teal' : systemStatus === 'warning' ? 'text-yellow-400' : 'text-red-400',
                label: `System: ${systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}`,
                animated: systemStatus === 'syncing'
              },
              {
                icon: 'Database',
                iconClass: 'text-neon-indigo',
                label: `${activeConnections} Active Connections`
              },
              {
                icon: 'Zap',
                iconClass: 'text-neon-aqua',
                label: 'Real-time Monitoring'
              }
            ]}
            actionButtons={[
              {
                icon: 'RefreshCw',
                label: 'Sync Now',
                onClick: handleManualSync,
                variant: 'primary',
                loading: isSyncing
              },
              {
                icon: 'Settings',
                label: 'Configure',
                onClick: () => setShowConfiguration(true),
                variant: 'secondary'
              },
              {
                icon: 'Download',
                label: 'Export Logs',
                onClick: () => setShowExportModal(true),
                variant: 'secondary'
              }
            ]}
          />
        </motion.div>

        <motion.div 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* System Status Overview */}
          <motion.div 
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SystemStatusOverview
              systemStatus={systemStatus}
              integrations={integrations}
              lastSync={lastSync}
              uptime={uptime}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Data Flow Monitoring */}
            <motion.div 
              className="xl:col-span-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DataFlowMonitoring
                dataFlows={dataFlows}
                onFlowSelect={setSelectedFlow}
                selectedFlow={selectedFlow}
              />
            </motion.div>

            {/* Performance Metrics */}
            <motion.div 
              className="xl:col-span-1"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <PerformanceMetrics
                metrics={performanceMetrics}
                alerts={activeAlerts}
              />
            </motion.div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Alerting System */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <AlertingSystem
                alerts={activeAlerts}
                onAlertDismiss={handleAlertDismiss}
                onAlertConfig={setShowAlertConfig}
              />
            </motion.div>

            {/* Error Management */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <ErrorManagementSection
                errors={systemErrors}
                onErrorResolve={handleErrorResolve}
                onErrorDetails={setSelectedError}
              />
            </motion.div>
          </div>

          {/* Additional Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Manual Sync Controls */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <ManualSyncControls
                integrations={integrations}
                onSyncTrigger={handleSyncTrigger}
                isSyncing={isSyncing}
              />
            </motion.div>

            {/* Automated Diagnostics */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <AutomatedDiagnostics
                diagnostics={diagnosticResults}
                onRunDiagnostics={handleRunDiagnostics}
                isRunning={isDiagnosticsRunning}
              />
            </motion.div>

            {/* Audit Logging */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <AuditLogging
                recentLogs={auditLogs}
                onViewFullLogs={() => setShowFullAuditLog(true)}
              />
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Configuration Modal */}
      {showConfiguration && (
        <IntegrationConfiguration
          integrations={integrations}
          onClose={() => setShowConfiguration(false)}
          onSave={handleConfigurationSave}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportCapabilities
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          logs={auditLogs}
        />
      )}
    </div>
  );
};

export default SystemIntegrationMonitor;