import React, { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import UserManagement from './components/UserManagement';
import WorkflowConfiguration from './components/WorkflowConfiguration';
import IntegrationSettings from './components/IntegrationSettings';
import SystemMonitoring from './components/SystemMonitoring';

const SystemAdministrationPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    {
      id: 'users',
      label: 'User Management',
      icon: 'Users',
      component: UserManagement
    },
    {
      id: 'workflow',
      label: 'Workflow Configuration',
      icon: 'GitBranch',
      component: WorkflowConfiguration
    },
    {
      id: 'integrations',
      label: 'Integration Settings',
      icon: 'Plug',
      component: IntegrationSettings
    },
    {
      id: 'monitoring',
      label: 'System Monitoring',
      icon: 'Activity',
      component: SystemMonitoring
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole="admin" />
      <Header userRole="admin" userName="Admin User" notificationCount={5} />
      
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading-bold text-text-primary mb-2">
                  System Administration Panel
                </h1>
                <p className="text-text-secondary">
                  Configure procurement workflows, manage users, and monitor system performance
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Config
                </button>
                <button className="flex items-center px-4 py-2 bg-success text-white rounded-button hover:bg-success-700 transition-smooth">
                  <Icon name="Save" size={16} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search configurations, users, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-body-medium text-sm transition-smooth ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }`}
                  >
                    <Icon 
                      name={tab.icon} 
                      size={16} 
                      className={`mr-2 ${activeTab === tab.id ? 'text-primary' : 'text-text-secondary'}`}
                    />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-surface rounded-card border border-border">
            {ActiveComponent && <ActiveComponent searchQuery={searchQuery} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemAdministrationPanel;