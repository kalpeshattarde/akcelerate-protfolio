import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ProgressStatusIndicator from '../../components/ui/ProgressStatusIndicator';
import QuickActionLauncher from '../../components/ui/QuickActionLauncher';
import IntegrationStatusGrid from './components/IntegrationStatusGrid';
import IntegrationFilters from './components/IntegrationFilters';
import IntegrationDetails from './components/IntegrationDetails';
import RealTimeMonitoringWidgets from './components/RealTimeMonitoringWidgets';
import IntegrationLogs from './components/IntegrationLogs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataIntegrationMonitor = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [activeView, setActiveView] = useState('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    severity: 'all'
  });
  const [savedViews, setSavedViews] = useState([
    { id: 1, name: 'Critical Systems', filters: { category: 'erp', status: 'error' } },
    { id: 2, name: 'Facility Monitoring', filters: { category: 'facility', status: 'all' } }
  ]);

  const [integrations, setIntegrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userRole = 'admin';
  const currentDomain = 'administration';

  useEffect(() => {
    // Mock integration data
    const mockIntegrations = [
      {
        id: 'sap-erp-001',
        name: 'SAP ERP System',
        type: 'Enterprise Resource Planning',
        category: 'erp',
        icon: 'Building',
        status: 'healthy',
        lastSync: '2025-01-07T04:45:00Z',
        recordCount: 15420,
        newRecords: 247,
        errorCount: 0,
        lastError: null,
        endpoint: 'https://sap.company.com/api/v1',
        protocol: 'HTTPS',
        auth: 'OAuth 2.0',
        timeout: '30 seconds',
        retryPolicy: '3 attempts',
        rateLimit: '100 req/min'
      },
      {
        id: 'facility-mgmt-001',
        name: 'Facility Management System',
        type: 'Building Automation',
        category: 'facility',
        icon: 'Home',
        status: 'warning',
        lastSync: '2025-01-07T04:30:00Z',
        recordCount: 8930,
        newRecords: 156,
        errorCount: 2,
        lastError: 'Rate limit exceeded',
        endpoint: 'https://facility.company.com/api',
        protocol: 'HTTPS',
        auth: 'API Key',
        timeout: '45 seconds',
        retryPolicy: '5 attempts',
        rateLimit: '50 req/min'
      },
      {
        id: 'sustainability-platform-001',
        name: 'Sustainability Platform',
        type: 'ESG Data Provider',
        category: 'sustainability',
        icon: 'Leaf',
        status: 'healthy',
        lastSync: '2025-01-07T04:50:00Z',
        recordCount: 5670,
        newRecords: 89,
        errorCount: 0,
        lastError: null,
        endpoint: 'https://api.sustainability.com/v2',
        protocol: 'HTTPS',
        auth: 'Bearer Token',
        timeout: '20 seconds',
        retryPolicy: '2 attempts',
        rateLimit: '200 req/min'
      },
      {
        id: 'iot-sensors-001',
        name: 'IoT Sensor Network',
        type: 'Environmental Monitoring',
        category: 'iot',
        icon: 'Wifi',
        status: 'error',
        lastSync: '2025-01-07T03:15:00Z',
        recordCount: 12340,
        newRecords: 0,
        errorCount: 5,
        lastError: 'Connection timeout',
        endpoint: 'https://iot.company.com/data',
        protocol: 'MQTT over TLS',
        auth: 'Certificate',
        timeout: '60 seconds',
        retryPolicy: '10 attempts',
        rateLimit: '1000 req/min'
      },
      {
        id: 'external-api-001',
        name: 'Carbon Footprint API',
        type: 'Third-party Service',
        category: 'external',
        icon: 'Globe',
        status: 'syncing',
        lastSync: '2025-01-07T04:55:00Z',
        recordCount: 2340,
        newRecords: 45,
        errorCount: 1,
        lastError: 'Authentication expired',
        endpoint: 'https://api.carbonfootprint.com/v1',
        protocol: 'HTTPS',
        auth: 'API Key',
        timeout: '15 seconds',
        retryPolicy: '3 attempts',
        rateLimit: '25 req/min'
      },
      {
        id: 'energy-meter-001',
        name: 'Smart Energy Meters',
        type: 'Utility Monitoring',
        category: 'iot',
        icon: 'Zap',
        status: 'healthy',
        lastSync: '2025-01-07T04:58:00Z',
        recordCount: 18750,
        newRecords: 312,
        errorCount: 0,
        lastError: null,
        endpoint: 'https://meters.utility.com/api',
        protocol: 'HTTPS',
        auth: 'OAuth 2.0',
        timeout: '25 seconds',
        retryPolicy: '3 attempts',
        rateLimit: '150 req/min'
      }
    ];

    setIntegrations(mockIntegrations);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      // Number keys 1-9 for quick integration selection
      if (e?.key >= '1' && e?.key <= '9') {
        const index = parseInt(e?.key) - 1;
        if (index < integrations?.length) {
          setSelectedIntegration(integrations?.[index]);
        }
      }
      
      // 's' key for sync selected integration
      if (e?.key === 's' && selectedIntegration) {
        handleSyncTrigger(selectedIntegration?.id);
      }
      
      // 'r' key for refresh view
      if (e?.key === 'r') {
        window.location?.reload();
      }
      
      // 'v' key to toggle view mode
      if (e?.key === 'v') {
        setActiveView(prev => prev === 'grid' ? 'logs' : 'grid');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [integrations, selectedIntegration]);

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({ category: 'all', status: 'all', severity: 'all' });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSaveView = (name, currentFilters) => {
    const newView = {
      id: Date.now(),
      name,
      filters: currentFilters
    };
    setSavedViews(prev => [...prev, newView]);
  };

  const handleLoadView = (view) => {
    setFilters(view?.filters);
  };

  const handleIntegrationSelect = (integration) => {
    setSelectedIntegration(integration);
  };

  const handleSyncTrigger = (integrationId) => {
    setIntegrations(prev => prev?.map(integration => 
      integration?.id === integrationId 
        ? { ...integration, status: 'syncing' }
        : integration
    ));

    // Simulate sync completion
    setTimeout(() => {
      setIntegrations(prev => prev?.map(integration => 
        integration?.id === integrationId 
          ? { 
              ...integration, 
              status: 'healthy', 
              lastSync: new Date()?.toISOString(),
              newRecords: Math.floor(Math.random() * 100) + 50
            }
          : integration
      ));
    }, 3000);
  };

  const handleBulkAction = (action, selectedIds) => {
    if (action === 'sync') {
      selectedIds?.forEach(id => handleSyncTrigger(id));
    } else if (action === 'test') {
      // Simulate connection test
      console.log('Testing connections for:', selectedIds);
    }
  };

  const filteredIntegrations = integrations?.filter(integration => {
    if (filters?.category !== 'all' && integration?.category !== filters?.category) return false;
    if (filters?.status !== 'all' && integration?.status !== filters?.status) return false;
    return true;
  });

  const notifications = [
    {
      type: 'error',
      title: 'Integration Failure',
      message: 'IoT Sensor Network connection failed. Manual intervention required.',
      time: '5 minutes ago',
      read: false
    },
    {
      type: 'warning',
      title: 'Rate Limit Warning',
      message: 'Facility Management System approaching rate limit threshold.',
      time: '15 minutes ago',
      read: false
    },
    {
      type: 'success',
      title: 'Sync Completed',
      message: 'SAP ERP System data synchronization completed successfully.',
      time: '30 minutes ago',
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        onDomainSwitch={() => {}}
        notifications={notifications}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={userRole}
        currentDomain={currentDomain}
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } mt-16 p-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Data Integration Monitor</h1>
              <p className="text-muted-foreground">
                Real-time monitoring of ESG data flows and system integrations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
                    activeView === 'grid' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Grid3X3" size={14} className="mr-2" />
                  Grid View
                </button>
                <button
                  onClick={() => setActiveView('logs')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
                    activeView === 'logs' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="FileText" size={14} className="mr-2" />
                  Logs View
                </button>
              </div>
              <Button variant="outline" onClick={() => window.location?.reload()}>
                <Icon name="RefreshCw" size={14} className="mr-2" />
                Refresh (R)
              </Button>
            </div>
          </div>

          {/* Real-time Monitoring Widgets */}
          <div className="mb-6">
            <RealTimeMonitoringWidgets />
          </div>

          {/* Main Content Layout */}
          <div className="space-y-6">
            {/* Filters Row - Full Width */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-3">
                <IntegrationFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  savedViews={savedViews}
                  onSaveView={handleSaveView}
                  onLoadView={handleLoadView}
                />
              </div>
            </div>

            {/* Main Panel - Full Width to match RealTimeMonitoringWidgets */}
            <div className="w-full">
              {activeView === 'grid' ? (
                <IntegrationStatusGrid
                  integrations={filteredIntegrations}
                  onIntegrationSelect={handleIntegrationSelect}
                  selectedIntegration={selectedIntegration}
                  onSyncTrigger={handleSyncTrigger}
                  onBulkAction={handleBulkAction}
                />
              ) : (
                <IntegrationLogs selectedIntegration={selectedIntegration} />
              )}
            </div>
          </div>

          {/* Right Panel - Details - Moved below main panel for better layout */}
          <div className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IntegrationDetails
                integration={selectedIntegration}
                onClose={() => setSelectedIntegration(null)}
              />
              
              {/* Progress Status */}
              <ProgressStatusIndicator
                isCompact={false}
                showDetails={showProgressDetails}
                onToggleDetails={() => setShowProgressDetails(!showProgressDetails)}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Notification Center */}
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        userRole={userRole}
      />
      {/* Quick Action Launcher */}
      <QuickActionLauncher
        userRole={userRole}
        currentPage="data-integration-monitor"
        isVisible={true}
      />
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Icon name="Loader2" size={24} className="animate-spin text-primary" />
            <span className="text-foreground">Loading integrations...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataIntegrationMonitor;