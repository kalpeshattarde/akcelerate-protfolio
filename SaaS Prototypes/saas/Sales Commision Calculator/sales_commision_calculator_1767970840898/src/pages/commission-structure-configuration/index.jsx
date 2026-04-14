// src/pages/commission-structure-configuration/index.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import PageHeader from 'components/ui/PageHeader';
import Icon from 'components/AppIcon';
import useSidebar from 'hooks/useSidebar';
import TierManagement from './components/TierManagement';
import CommissionRateMatrix from './components/CommissionRateMatrix';
import RuleBuilder from './components/RuleBuilder';
import IntegrationPanel from './components/IntegrationPanel';
import ChangeManagement from './components/ChangeManagement';
import PreviewMode from './components/PreviewMode';



const CommissionStructureConfiguration = () => {
  const { getMainContentClasses } = useSidebar();
  const [activeTab, setActiveTab] = useState('tiers');
  const [userRole, setUserRole] = useState('admin'); // 'admin', 'specialist', 'viewer'
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [integrationStatus, setIntegrationStatus] = useState('connected');
  const [approvalPending, setApprovalPending] = useState(false);
  const [changeHistory, setChangeHistory] = useState([]);
  const [configurationData, setConfigurationData] = useState({
    tiers: [
      {
        id: 'tier-1',
        name: 'Tier 1 - Executive',
        quotaThreshold: 1000000,
        baseCommissionRate: 0.08,
        acceleratorTrigger: 0.9,
        spifEligible: true,
        order: 1
      },
      {
        id: 'tier-2', 
        name: 'Tier 2 - Senior',
        quotaThreshold: 750000,
        baseCommissionRate: 0.07,
        acceleratorTrigger: 0.85,
        spifEligible: true,
        order: 2
      },
      {
        id: 'tier-3',
        name: 'Tier 3 - Standard',
        quotaThreshold: 500000,
        baseCommissionRate: 0.06,
        acceleratorTrigger: 0.8,
        spifEligible: false,
        order: 3
      }
    ],
    rateMatrix: {
      territories: ['West Coast', 'East Coast', 'Central', 'International'],
      products: ['Enterprise', 'Professional', 'Standard', 'Starter'],
      rates: {
        'West Coast-Enterprise': 0.085,
        'West Coast-Professional': 0.075,
        'West Coast-Standard': 0.065,
        'West Coast-Starter': 0.055,
        'East Coast-Enterprise': 0.08,
        'East Coast-Professional': 0.07,
        'East Coast-Standard': 0.06,
        'East Coast-Starter': 0.05
      }
    },
    rules: [
      {
        id: 'rule-1',
        name: 'Q4 Accelerator',
        condition: 'quarter = Q4 AND quota_attainment >= 100%',
        action: 'multiply_commission(1.25)',
        active: true
      }
    ]
  });

  const tabs = [
    { id: 'tiers', label: 'Tier Management', icon: 'Layers', component: TierManagement },
    { id: 'rates', label: 'Rate Matrix', icon: 'Grid3X3', component: CommissionRateMatrix },
    { id: 'rules', label: 'Rule Builder', icon: 'GitBranch', component: RuleBuilder },
    { id: 'integration', label: 'Integration', icon: 'Link', component: IntegrationPanel },
    { id: 'changes', label: 'Change Management', icon: 'History', component: ChangeManagement },
    { id: 'preview', label: 'Preview', icon: 'Eye', component: PreviewMode }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+Tab to navigate between tabs
      if (e.ctrlKey && e.key === 'Tab') {
        e.preventDefault();
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setActiveTab(tabs[nextIndex].id);
      }
      // Ctrl+S to save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [activeTab, hasUnsavedChanges]);

  // Save configuration
  const handleSave = useCallback(() => {
    if (!hasUnsavedChanges) return;

    const changeRecord = {
      id: Date.now(),
      timestamp: new Date(),
      user: 'John Doe',
      action: 'Configuration Update',
      changes: 'Modified tier structures and commission rates',
      status: userRole === 'admin' ? 'approved' : 'pending'
    };

    setChangeHistory(prev => [changeRecord, ...prev]);
    setHasUnsavedChanges(false);
    
    if (userRole !== 'admin') {
      setApprovalPending(true);
    }
  }, [hasUnsavedChanges, userRole]);

  // Handle save changes function for PageHeader
  const handleSaveChanges = useCallback(() => {
    handleSave();
  }, [handleSave]);

  // Handle configuration changes
  const handleConfigurationChange = useCallback((section, data) => {
    setConfigurationData(prev => ({
      ...prev,
      [section]: data
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Toggle preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Get role permissions
  const canEdit = () => {
    return userRole === 'admin' || userRole === 'specialist';
  };

  const canApprove = () => {
    return userRole === 'admin';
  };

  // Get integration status color and icon
  const getIntegrationStatusDisplay = () => {
    switch (integrationStatus) {
      case 'connected':
        return { color: 'text-success', icon: 'CheckCircle', label: 'Connected' };
      case 'syncing':
        return { color: 'text-warning', icon: 'RefreshCw', label: 'Syncing' };
      case 'warning':
        return { color: 'text-warning', icon: 'AlertTriangle', label: 'Warning' };
      case 'error':
        return { color: 'text-error', icon: 'XCircle', label: 'Error' };
      default:
        return { color: 'text-secondary-400', icon: 'Circle', label: 'Unknown' };
    }
  };

  const statusDisplay = getIntegrationStatusDisplay();
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

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
            title="Commission Structure Configuration"
            description="Configure commission rates, tiers, and rules. Preview changes before implementation and manage approval workflows."
            icon="Settings"
            statusIndicators={[
              {
                icon: hasUnsavedChanges ? 'AlertCircle' : 'CheckCircle',
                iconClass: hasUnsavedChanges ? 'text-yellow-400' : 'text-neon-teal',
                label: hasUnsavedChanges ? 'Unsaved Changes' : 'All Changes Saved'
              },
              {
                icon: 'Shield',
                iconClass: 'text-neon-indigo',
                label: `${userRole === 'admin' ? 'Administrator' : 'Manager'} Access`
              },
              {
                icon: statusDisplay.icon,
                iconClass: `${statusDisplay.color} ${integrationStatus === 'syncing' ? 'animate-spin' : ''}`,
                label: `Integration: ${statusDisplay.label}`,
                animated: integrationStatus === 'syncing'
              }
            ]}
            actionButtons={[
              {
                icon: 'Eye',
                label: 'Preview Mode',
                onClick: () => setPreviewMode(!previewMode),
                variant: previewMode ? 'primary' : 'secondary'
              },
              {
                icon: 'Save',
                label: 'Save Changes',
                onClick: handleSaveChanges,
                disabled: !hasUnsavedChanges,
                variant: 'primary'
              }
            ]}
          />
        </motion.div>

        {/* Tab Navigation with Glass Effect */}
        <motion.div 
          className="glass-morphism border-b border-glass-border mx-6 mt-6 rounded-t-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-1 px-6">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'glass-morphism-elevated glow-indigo text-white border-b-2 border-neon-indigo' :'text-white/70 hover:text-white hover:glass-morphism-hover'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </motion.button>
            ))}
            
            {/* Tab navigation shortcut hint */}
            <div className="hidden lg:flex items-center ml-auto text-xs text-white/60">
              <kbd className="px-2 py-1 glass-morphism rounded mr-1">Ctrl</kbd>
              +
              <kbd className="px-2 py-1 glass-morphism rounded ml-1">Tab</kbd>
              <span className="ml-2">to navigate tabs</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Unsaved Changes Warning */}
          {hasUnsavedChanges && (
            <motion.div 
              className="mb-6 card-glass border border-yellow-400/30"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">
                  You have unsaved changes. Remember to save your configuration.
                </span>
              </div>
            </motion.div>
          )}

          {/* Access Control Warning */}
          {!canEdit() && (
            <motion.div 
              className="mb-6 card-glass border border-neon-aqua/30"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-neon-aqua" />
                <span className="text-sm font-medium text-neon-aqua">
                  You have read-only access to this configuration panel.
                </span>
              </div>
            </motion.div>
          )}

          {/* Tab Content */}
          <motion.div 
            className={`transition-all duration-300 ${isPreviewMode ? 'opacity-75 scale-95' : 'opacity-100 scale-100'}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {ActiveComponent && (
              <ActiveComponent
                data={configurationData}
                onChange={handleConfigurationChange}
                canEdit={canEdit()}
                canApprove={canApprove()}
                isPreviewMode={isPreviewMode}
                integrationStatus={integrationStatus}
                changeHistory={changeHistory}
                onStatusChange={setIntegrationStatus}
              />
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default CommissionStructureConfiguration;