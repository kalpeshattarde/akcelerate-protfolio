// src/pages/system-integration-monitor/components/IntegrationConfiguration.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const IntegrationConfiguration = ({ onUpdateConfiguration, onTestConnection }) => {
  const [selectedSystem, setSelectedSystem] = useState('hris');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [testResults, setTestResults] = useState({});

  const systems = {
    hris: {
      name: 'HRIS',
      displayName: 'Human Resources Information System',
      icon: 'Users',
      endpoint: 'https://api.hris.company.com/v1',
      authType: 'oauth2',
      syncSchedule: 'hourly',
      timeout: 30,
      retryAttempts: 3,
      batchSize: 100
    },
    crm: {
      name: 'CRM',
      displayName: 'Customer Relationship Management',
      icon: 'Building',
      endpoint: 'https://api.crm.company.com/v2',
      authType: 'api_key',
      syncSchedule: 'every_30_minutes',
      timeout: 45,
      retryAttempts: 5,
      batchSize: 200
    },
    payroll: {
      name: 'Payroll',
      displayName: 'Payroll Processing System',
      icon: 'DollarSign',
      endpoint: 'https://payroll.company.com/api/v1',
      authType: 'basic',
      syncSchedule: 'daily',
      timeout: 60,
      retryAttempts: 2,
      batchSize: 50
    },
    identity: {
      name: 'Identity Provider',
      displayName: 'Identity and Access Management',
      icon: 'Shield',
      endpoint: 'https://identity.company.com/oauth',
      authType: 'oauth2',
      syncSchedule: 'every_15_minutes',
      timeout: 20,
      retryAttempts: 4,
      batchSize: 150
    }
  };

  const authTypes = [
    { value: 'oauth2', label: 'OAuth 2.0' },
    { value: 'api_key', label: 'API Key' },
    { value: 'basic', label: 'Basic Authentication' },
    { value: 'bearer', label: 'Bearer Token' }
  ];

  const syncSchedules = [
    { value: 'every_5_minutes', label: 'Every 5 minutes' },
    { value: 'every_15_minutes', label: 'Every 15 minutes' },
    { value: 'every_30_minutes', label: 'Every 30 minutes' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'every_4_hours', label: 'Every 4 hours' },
    { value: 'daily', label: 'Daily' },
    { value: 'manual', label: 'Manual only' }
  ];

  const [configurations, setConfigurations] = useState(systems);
  const currentConfig = configurations[selectedSystem];

  const handleConfigurationChange = (field, value) => {
    setConfigurations(prev => ({
      ...prev,
      [selectedSystem]: {
        ...prev[selectedSystem],
        [field]: value
      }
    }));
    setPendingChanges(true);
  };

  const handleSaveChanges = () => {
    onUpdateConfiguration?.(selectedSystem, configurations[selectedSystem]);
    setPendingChanges(false);
  };

  const handleTestConnection = async (systemId) => {
    setTestResults(prev => ({ ...prev, [systemId]: 'testing' }));
    
    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      setTestResults(prev => ({
        ...prev,
        [systemId]: {
          success,
          timestamp: new Date(),
          responseTime: Math.round(100 + Math.random() * 200),
          message: success 
            ? 'Connection successful' :'Connection failed - check endpoint and credentials'
        }
      }));
      
      onTestConnection?.(systemId, { success });
    }, 2000);
  };

  const getTestResultIcon = (result) => {
    if (result === 'testing') return 'RefreshCw';
    if (result?.success) return 'CheckCircle';
    return 'XCircle';
  };

  const getTestResultColor = (result) => {
    if (result === 'testing') return 'text-info';
    if (result?.success) return 'text-success';
    return 'text-error';
  };

  const formatLastTested = (timestamp) => {
    if (!timestamp) return 'Never tested';
    const now = new Date();
    const diffMs = now - new Date(timestamp);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just tested';
    if (diffMins < 60) return `Tested ${diffMins}m ago`;
    return `Tested ${Math.floor(diffMins / 60)}h ago`;
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Integration Configuration</h2>
        <div className="flex items-center space-x-3">
          {pendingChanges && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-warning-50 border border-warning-200 rounded-sm">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Unsaved changes</span>
            </div>
          )}
          
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border text-text-primary rounded-sm hover:bg-secondary-50 transition-smooth"
          >
            <Icon name="Key" size={16} />
            <span>Manage Auth</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* System Selection */}
        <div className="lg:col-span-1">
          <h3 className="font-medium text-text-primary mb-4">Select System</h3>
          <div className="space-y-2">
            {Object.entries(systems).map(([key, system]) => (
              <button
                key={key}
                onClick={() => setSelectedSystem(key)}
                className={`w-full flex items-center space-x-3 p-3 rounded-sm border transition-smooth ${
                  selectedSystem === key 
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:bg-secondary-50 text-text-primary'
                }`}
              >
                <Icon name={system.icon} size={20} />
                <div className="text-left">
                  <div className="font-medium">{system.name}</div>
                  <div className="text-xs opacity-70">{system.displayName}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Form */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-text-primary">
              {currentConfig?.displayName} Configuration
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleTestConnection(selectedSystem)}
                disabled={testResults[selectedSystem] === 'testing'}
                className="flex items-center space-x-2 px-3 py-2 bg-info text-white rounded-sm hover:bg-info-700 transition-smooth disabled:opacity-50"
              >
                <Icon 
                  name={testResults[selectedSystem] === 'testing' ? 'RefreshCw' : 'Zap'} 
                  size={16} 
                  className={testResults[selectedSystem] === 'testing' ? 'animate-spin' : ''}
                />
                <span>{testResults[selectedSystem] === 'testing' ? 'Testing...' : 'Test Connection'}</span>
              </button>
              
              {pendingChanges && (
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center space-x-2 px-4 py-2 bg-success text-white rounded-sm hover:bg-success-700 transition-smooth"
                >
                  <Icon name="Save" size={16} />
                  <span>Save Changes</span>
                </button>
              )}
            </div>
          </div>

          {/* Connection Test Results */}
          {testResults[selectedSystem] && (
            <div className={`mb-6 p-4 rounded-sm border ${
              testResults[selectedSystem] === 'testing' ? 'bg-info-50 border-info-200' :
              testResults[selectedSystem]?.success ? 'bg-success-50 border-success-200': 'bg-error-50 border-error-200'
            }`}>
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getTestResultIcon(testResults[selectedSystem])} 
                  size={20} 
                  className={`${getTestResultColor(testResults[selectedSystem])} ${
                    testResults[selectedSystem] === 'testing' ? 'animate-spin' : ''
                  }`}
                />
                <div>
                  <div className={`font-medium ${getTestResultColor(testResults[selectedSystem])}`}>
                    {testResults[selectedSystem] === 'testing' ? 'Testing connection...' : testResults[selectedSystem]?.message}
                  </div>
                  {testResults[selectedSystem]?.responseTime && (
                    <div className="text-sm text-text-secondary">
                      Response time: {testResults[selectedSystem].responseTime}ms • {formatLastTested(testResults[selectedSystem].timestamp)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Configuration Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Endpoint URL
              </label>
              <input
                type="url"
                value={currentConfig?.endpoint || ''}
                onChange={(e) => handleConfigurationChange('endpoint', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
                placeholder="https://api.system.com/v1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Authentication Type
              </label>
              <select
                value={currentConfig?.authType || ''}
                onChange={(e) => handleConfigurationChange('authType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
              >
                {authTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Sync Schedule
              </label>
              <select
                value={currentConfig?.syncSchedule || ''}
                onChange={(e) => handleConfigurationChange('syncSchedule', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
              >
                {syncSchedules.map(schedule => (
                  <option key={schedule.value} value={schedule.value}>{schedule.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Timeout (seconds)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                value={currentConfig?.timeout || 30}
                onChange={(e) => handleConfigurationChange('timeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Retry Attempts
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={currentConfig?.retryAttempts || 3}
                onChange={(e) => handleConfigurationChange('retryAttempts', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Batch Size
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                value={currentConfig?.batchSize || 100}
                onChange={(e) => handleConfigurationChange('batchSize', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="mt-6">
            <h4 className="font-medium text-text-primary mb-4">Advanced Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-text-primary">Enable SSL verification</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-text-primary">Use connection pooling</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-text-primary">Enable data compression</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-text-primary">Log all API requests</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Change Approval Notice */}
      <div className="mt-6 p-4 bg-info-50 border border-info-200 rounded-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-info" />
          <span className="text-sm text-info font-medium">
            Configuration changes require approval and may affect scheduled synchronizations
          </span>
        </div>
      </div>

      {/* Authentication Management Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-200">
          <div className="bg-surface border border-border rounded-sm p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Authentication Settings</h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="p-2 hover:bg-secondary-100 rounded-sm transition-smooth"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {currentConfig?.authType === 'oauth2' ? 'Client ID' : 
                   currentConfig?.authType === 'api_key' ? 'API Key' : 'Username'}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
                  placeholder="Enter credential"
                />
              </div>
              
              {currentConfig?.authType !== 'api_key' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {currentConfig?.authType === 'oauth2' ? 'Client Secret' : 'Password'}
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-border rounded-sm bg-surface text-text-primary"
                    placeholder="Enter secret"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 border border-border text-text-primary rounded-sm hover:bg-secondary-50 transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
              >
                Save Credentials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationConfiguration;