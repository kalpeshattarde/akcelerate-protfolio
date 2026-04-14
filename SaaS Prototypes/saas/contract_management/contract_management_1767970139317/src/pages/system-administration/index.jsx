import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import UserManagementTab from './components/UserManagementTab';
import SystemConfigTab from './components/SystemConfigTab';
import SecurityManagementTab from './components/SecurityManagementTab';
import IntegrationMonitorTab from './components/IntegrationMonitorTab';
import AuditLogsTab from './components/AuditLogsTab';

const SystemAdministration = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { id: 'users', label: 'User Management', description: 'Manage user accounts and permissions' },
    { id: 'config', label: 'System Configuration', description: 'Configure global settings and workflows' },
    { id: 'integrations', label: 'Integration Monitor', description: 'Monitor API health and sync status' },
    { id: 'audit', label: 'Audit Logs', description: 'View complete activity trail' },
    { id: 'security', label: 'Security Management', description: 'Manage security policies and monitoring' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementTab />;
      case 'config':
        return <SystemConfigTab />;
      case 'integrations':
        return <IntegrationMonitorTab />;
      case 'audit':
        return <AuditLogsTab />;
      case 'security':
        return <SecurityManagementTab />;
      default:
        return <UserManagementTab />;
    }
  };

  return (
    <>
      <Helmet>
        <title>System Administration - ContractFlow Pro</title>
        <meta name="description" content="System administration dashboard with user management, security settings, integrations monitoring, and audit logs." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">System Administration</h1>
                  <p className="text-muted-foreground">Comprehensive platform management with enterprise-scale deployment capabilities</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-border">
                <nav className="flex space-x-6 overflow-x-auto scrollbar-hide">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-text-primary hover:border-border'
                      }`}
                      title={tab?.description}
                    >
                      {tab?.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-surface rounded-lg border border-border min-h-[600px]">
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SystemAdministration;