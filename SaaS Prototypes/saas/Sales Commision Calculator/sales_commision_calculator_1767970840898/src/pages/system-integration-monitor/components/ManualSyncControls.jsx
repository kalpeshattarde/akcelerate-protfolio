// src/pages/system-integration-monitor/components/ManualSyncControls.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ManualSyncControls = ({ onManualSync, isManualSyncActive, systemHealth, userRole }) => {
  const [selectedSystems, setSelectedSystems] = useState([]);
  const [syncOptions, setSyncOptions] = useState({
    fullSync: false,
    validateData: true,
    skipErrors: false,
    notifyOnComplete: true
  });
  const [showConflictResolution, setShowConflictResolution] = useState(false);
  const [conflictResolution, setConflictResolution] = useState('manual');

  const systems = [
    {
      id: 'hris',
      name: 'HRIS',
      displayName: 'Human Resources Information System',
      status: systemHealth?.hris,
      icon: 'Users',
      lastSync: '15 minutes ago',
      nextScheduled: '45 minutes',
      canSync: true
    },
    {
      id: 'crm',
      name: 'CRM',
      displayName: 'Customer Relationship Management',
      status: systemHealth?.crm,
      icon: 'Building',
      lastSync: '8 minutes ago',
      nextScheduled: '52 minutes',
      canSync: true
    },
    {
      id: 'payroll',
      name: 'Payroll',
      displayName: 'Payroll Processing System',
      status: systemHealth?.payroll,
      icon: 'DollarSign',
      lastSync: '2 hours ago',
      nextScheduled: '1 hour',
      canSync: true
    },
    {
      id: 'identity',
      name: 'Identity Provider',
      displayName: 'Identity and Access Management',
      status: systemHealth?.identity,
      icon: 'Shield',
      lastSync: '5 minutes ago',
      nextScheduled: '25 minutes',
      canSync: systemHealth?.identity !== 'error'
    }
  ];

  const conflictResolutionOptions = [
    { value: 'manual', label: 'Manual Review', description: 'Pause sync for manual conflict resolution' },
    { value: 'source_wins', label: 'Source Wins', description: 'Automatically use source system data' },
    { value: 'target_wins', label: 'Target Wins', description: 'Keep existing target system data' },
    { value: 'merge', label: 'Smart Merge', description: 'Attempt automatic data merging' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'syncing': return 'text-info';
      default: return 'text-secondary-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'syncing': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  const handleSystemToggle = (systemId) => {
    setSelectedSystems(prev => 
      prev.includes(systemId) 
        ? prev.filter(id => id !== systemId)
        : [...prev, systemId]
    );
  };

  const handleSelectAll = () => {
    const availableSystems = systems.filter(s => s.canSync).map(s => s.id);
    setSelectedSystems(availableSystems);
  };

  const handleClearAll = () => {
    setSelectedSystems([]);
  };

  const handleStartSync = () => {
    if (selectedSystems.length === 0) {
      alert('Please select at least one system to sync.');
      return;
    }

    const systemNames = selectedSystems.map(id => 
      systems.find(s => s.id === id)?.name
    ).filter(Boolean);

    // Show conflict resolution if needed
    if (syncOptions.fullSync && !showConflictResolution) {
      setShowConflictResolution(true);
      return;
    }

    onManualSync?.(systemNames.join(', '), {
      ...syncOptions,
      conflictResolution,
      selectedSystems
    });

    // Reset selections after sync
    setSelectedSystems([]);
    setShowConflictResolution(false);
  };

  const canStartSync = () => {
    return selectedSystems.length > 0 && !isManualSyncActive && userRole === 'admin';
  };

  const estimatedDuration = () => {
    const baseTime = selectedSystems.length * 2; // 2 minutes per system
    const fullSyncMultiplier = syncOptions.fullSync ? 3 : 1;
    const validationMultiplier = syncOptions.validateData ? 1.5 : 1;
    
    return Math.round(baseTime * fullSyncMultiplier * validationMultiplier);
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Manual Sync Controls</h2>
        <div className="flex items-center space-x-3">
          {isManualSyncActive && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-info-50 border border-info-200 rounded-sm">
              <Icon name="RefreshCw" size={16} className="text-info animate-spin" />
              <span className="text-sm font-medium text-info">Sync in Progress</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              disabled={isManualSyncActive}
              className="px-3 py-2 text-sm border border-border rounded-sm hover:bg-secondary-50 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              disabled={isManualSyncActive}
              className="px-3 py-2 text-sm border border-border rounded-sm hover:bg-secondary-50 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* System Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {systems.map((system) => (
          <div
            key={system.id}
            className={`p-4 border rounded-sm cursor-pointer transition-smooth ${
              selectedSystems.includes(system.id) 
                ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
            } ${!system.canSync ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => system.canSync && !isManualSyncActive && handleSystemToggle(system.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedSystems.includes(system.id)}
                  onChange={() => {}}
                  disabled={!system.canSync || isManualSyncActive}
                  className="rounded border-border"
                />
                <div className="p-2 bg-secondary-100 rounded-sm">
                  <Icon name={system.icon} size={18} className="text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{system.displayName}</h3>
                  <p className="text-sm text-text-secondary">{system.name}</p>
                </div>
              </div>
              
              {/* Status indicator removed as requested */}
            </div>
            
            <div className="text-xs text-text-secondary space-y-1">
              <div>Last sync: {system.lastSync}</div>
              <div>Next scheduled: {system.nextScheduled}</div>
            </div>
            
            {!system.canSync && (
              <div className="mt-2 text-xs text-error">
                System unavailable for manual sync
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sync Options */}
      <div className="mb-6">
        <h3 className="font-medium text-text-primary mb-4">Sync Options</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={syncOptions.fullSync}
              onChange={(e) => setSyncOptions(prev => ({ ...prev, fullSync: e.target.checked }))}
              disabled={isManualSyncActive}
              className="rounded border-border"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Full Synchronization</span>
              <p className="text-xs text-text-secondary">Complete data refresh (takes longer)</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={syncOptions.validateData}
              onChange={(e) => setSyncOptions(prev => ({ ...prev, validateData: e.target.checked }))}
              disabled={isManualSyncActive}
              className="rounded border-border"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Validate Data</span>
              <p className="text-xs text-text-secondary">Run validation checks during sync</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={syncOptions.skipErrors}
              onChange={(e) => setSyncOptions(prev => ({ ...prev, skipErrors: e.target.checked }))}
              disabled={isManualSyncActive}
              className="rounded border-border"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Skip Non-Critical Errors</span>
              <p className="text-xs text-text-secondary">Continue sync despite minor errors</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={syncOptions.notifyOnComplete}
              onChange={(e) => setSyncOptions(prev => ({ ...prev, notifyOnComplete: e.target.checked }))}
              disabled={isManualSyncActive}
              className="rounded border-border"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Notify on Completion</span>
              <p className="text-xs text-text-secondary">Send notification when sync finishes</p>
            </div>
          </label>
        </div>
      </div>

      {/* Conflict Resolution */}
      {showConflictResolution && (
        <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-sm">
          <h3 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={18} className="text-warning" />
            <span>Conflict Resolution Strategy</span>
          </h3>
          <div className="space-y-3">
            {conflictResolutionOptions.map((option) => (
              <label key={option.value} className="flex items-start space-x-3">
                <input
                  type="radio"
                  value={option.value}
                  checked={conflictResolution === option.value}
                  onChange={(e) => setConflictResolution(e.target.value)}
                  className="mt-1"
                />
                <div>
                  <span className="text-sm font-medium text-text-primary">{option.label}</span>
                  <p className="text-xs text-text-secondary">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Sync Summary */}
      {selectedSystems.length > 0 && (
        <div className="mb-6 p-4 bg-secondary-50 rounded-sm">
          <h3 className="font-medium text-text-primary mb-3">Sync Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Selected Systems:</span>
              <div className="font-medium text-text-primary">{selectedSystems.length}</div>
            </div>
            <div>
              <span className="text-text-secondary">Estimated Duration:</span>
              <div className="font-medium text-text-primary">{estimatedDuration()} minutes</div>
            </div>
            <div>
              <span className="text-text-secondary">Sync Type:</span>
              <div className="font-medium text-text-primary">
                {syncOptions.fullSync ? 'Full Sync' : 'Incremental'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          {userRole !== 'admin' && (
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-warning" />
              <span>Administrator privileges required for manual sync</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {showConflictResolution && (
            <button
              onClick={() => setShowConflictResolution(false)}
              className="px-4 py-2 border border-border text-text-primary rounded-sm hover:bg-secondary-50 transition-smooth"
            >
              Cancel
            </button>
          )}
          
          <button
            onClick={handleStartSync}
            disabled={!canStartSync()}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon 
              name={isManualSyncActive ? 'RefreshCw' : 'Play'} 
              size={16} 
              className={isManualSyncActive ? 'animate-spin' : ''}
            />
            <span>
              {isManualSyncActive ? 'Syncing...' : showConflictResolution ? 'Start Sync' : 'Initiate Sync'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualSyncControls;