import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ProgressStatusIndicator from '../../components/ui/ProgressStatusIndicator';
import QuickActionLauncher from '../../components/ui/QuickActionLauncher';
import SystemMetricsGrid from './components/SystemMetricsGrid';
import IntegrationPanel from './components/IntegrationPanel';
import ConfigurationForms from './components/ConfigurationForms';
import PerformanceMonitoring from './components/PerformanceMonitoring';
import AlertManagement from './components/AlertManagement';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SystemConfigurationDashboard = () => {
  const [activeTab, setActiveTab] = useState('system-settings');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  const [userRole] = useState('admin');
  const [currentDomain] = useState('administration');

  // Mock notifications for admin users
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'System Maintenance Required',
      message: 'Database optimization scheduled for tonight at 2:00 AM UTC',
      time: '10 minutes ago',
      read: false,
      category: 'system',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'error',
      title: 'Integration Failure',
      message: 'HR system connection failed - authentication token expired',
      time: '25 minutes ago',
      read: false,
      category: 'integration',
      priority: 'high'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily system backup completed successfully',
      time: '2 hours ago',
      read: true,
      category: 'backup',
      priority: 'low'
    }
  ];

  const tabs = [
    { 
      id: 'system-settings', 
      label: 'System Settings', 
      icon: 'Settings',
      description: 'Configure core system parameters'
    },
    { 
      id: 'integration-management', 
      label: 'Integration Management', 
      icon: 'Workflow',
      description: 'Manage external system connections'
    },
    { 
      id: 'performance-monitoring', 
      label: 'Performance Monitoring', 
      icon: 'Activity',
      description: 'Monitor system performance metrics'
    },
    { 
      id: 'audit-configuration', 
      label: 'Alert Management', 
      icon: 'Bell',
      description: 'Configure system alerts and notifications'
    }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey) {
        switch (e?.key) {
          case '1':
            e?.preventDefault();
            setActiveTab('system-settings');
            break;
          case '2':
            e?.preventDefault();
            setActiveTab('integration-management');
            break;
          case '3':
            e?.preventDefault();
            setActiveTab('performance-monitoring');
            break;
          case '4':
            e?.preventDefault();
            setActiveTab('audit-configuration');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'system-settings':
        return (
          <div className="space-y-6">
            <SystemMetricsGrid />
            <ConfigurationForms />
          </div>
        );
      case 'integration-management':
        return <IntegrationPanel />;
      case 'performance-monitoring':
        return <PerformanceMonitoring />;
      case 'audit-configuration':
        return <AlertManagement />;
      default:
        return (
          <div className="space-y-6">
            <SystemMetricsGrid />
            <ConfigurationForms />
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>System Configuration Dashboard - ESG Dashboard Pro</title>
        <meta name="description" content="Administrative control center for ESG platform configuration, integration management, and system performance monitoring" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          userRole={userRole}
          currentDomain={currentDomain}
          notifications={notifications}
        />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          userRole={userRole}
          currentDomain={currentDomain}
        />

        {/* Main Content */}
        <main className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">System Configuration</h1>
                  <p className="text-muted-foreground mt-1">
                    Administrative control center for ESG platform management
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Progress Indicator */}
                  <ProgressStatusIndicator 
                    isCompact={true}
                    onToggleDetails={() => setShowProgressDetails(!showProgressDetails)}
                  />
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} className="mr-2" />
                      Export Config
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Import Config
                    </Button>
                  </div>
                </div>
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Keyboard" size={16} />
                  <span>Quick navigation:</span>
                  <div className="flex space-x-4">
                    <span><kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-xs">Ctrl+1</kbd> System Settings</span>
                    <span><kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-xs">Ctrl+2</kbd> Integrations</span>
                    <span><kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-xs">Ctrl+3</kbd> Performance</span>
                    <span><kbd className="px-1.5 py-0.5 bg-card border border-border rounded text-xs">Ctrl+4</kbd> Alerts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab Description */}
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {tabs?.find(tab => tab?.id === activeTab)?.description}
                </p>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {renderTabContent()}
            </div>
          </div>
        </main>

        {/* Progress Details Modal */}
        {showProgressDetails && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
              <ProgressStatusIndicator 
                isCompact={false}
                showDetails={true}
                onToggleDetails={() => setShowProgressDetails(false)}
              />
            </div>
          </div>
        )}

        {/* Notification Center */}
        <NotificationCenter
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          userRole={userRole}
          position="top-right"
        />

        {/* Quick Action Launcher */}
        <QuickActionLauncher
          userRole={userRole}
          currentPage="system-configuration-dashboard"
          position="bottom-right"
          isVisible={true}
        />
      </div>
    </>
  );
};

export default SystemConfigurationDashboard;