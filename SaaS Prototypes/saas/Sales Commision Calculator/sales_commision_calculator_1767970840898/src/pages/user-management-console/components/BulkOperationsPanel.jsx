// src/pages/user-management-console/components/BulkOperationsPanel.jsx
import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';

const BulkOperationsPanel = ({ selectedUsers, onBulkOperation, users, roles }) => {
  const [activeOperation, setActiveOperation] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [operationHistory, setOperationHistory] = useState([
    {
      id: 1,
      type: 'import',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      recordsProcessed: 25,
      recordsFailed: 0,
      description: 'HRIS User Import'
    },
    {
      id: 2,
      type: 'role_assignment',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: 'completed',
      recordsProcessed: 12,
      recordsFailed: 1,
      description: 'Sales Team Reorganization'
    }
  ]);
  const fileInputRef = useRef(null);

  const operations = [
    {
      id: 'import',
      name: 'Import Users',
      description: 'Mass user imports from HRIS systems',
      icon: 'Upload',
      color: 'bg-primary'
    },
    {
      id: 'role_assignment',
      name: 'Bulk Role Assignment',
      description: 'Role reassignments during reorganizations',
      icon: 'UserCog',
      color: 'bg-warning'
    },
    {
      id: 'deactivation',
      name: 'Account Deactivation',
      description: 'Bulk account deactivation workflows',
      icon: 'UserX',
      color: 'bg-error'
    },
    {
      id: 'permission_update',
      name: 'Permission Updates',
      description: 'Bulk permission modifications',
      icon: 'Key',
      color: 'bg-info'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file processing
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setActiveOperation(null);
          
          // Add to operation history
          const newOperation = {
            id: Date.now(),
            type: 'import',
            timestamp: new Date(),
            status: 'completed',
            recordsProcessed: Math.floor(Math.random() * 50) + 10,
            recordsFailed: Math.floor(Math.random() * 3),
            description: `File: ${file.name}`
          };
          setOperationHistory(prev => [newOperation, ...prev]);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleBulkRoleAssignment = (roleId) => {
    if (selectedUsers.length === 0) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const role = roles.find(r => r.id === roleId);
      onBulkOperation('role_assignment', {
        userIds: selectedUsers,
        role: role?.name
      });
      
      const newOperation = {
        id: Date.now(),
        type: 'role_assignment',
        timestamp: new Date(),
        status: 'completed',
        recordsProcessed: selectedUsers.length,
        recordsFailed: 0,
        description: `Assigned ${role?.name} role to ${selectedUsers.length} users`
      };
      setOperationHistory(prev => [newOperation, ...prev]);
      
      setIsProcessing(false);
      setActiveOperation(null);
    }, 2000);
  };

  const handleBulkDeactivation = () => {
    if (selectedUsers.length === 0) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      onBulkOperation('status_change', {
        userIds: selectedUsers,
        status: 'inactive'
      });
      
      const newOperation = {
        id: Date.now(),
        type: 'deactivation',
        timestamp: new Date(),
        status: 'completed',
        recordsProcessed: selectedUsers.length,
        recordsFailed: 0,
        description: `Deactivated ${selectedUsers.length} user accounts`
      };
      setOperationHistory(prev => [newOperation, ...prev]);
      
      setIsProcessing(false);
      setActiveOperation(null);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      case 'processing': return 'text-warning';
      default: return 'text-secondary-600';
    }
  };

  const getOperationIcon = (type) => {
    const operation = operations.find(op => op.id === type);
    return operation?.icon || 'Activity';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary">Bulk Operations Center</h2>
        <p className="text-text-secondary">Mass user imports, role reassignments, and account deactivation workflows</p>
      </div>

      {/* Operation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {operations.map((operation) => (
          <button
            key={operation.id}
            onClick={() => setActiveOperation(operation.id)}
            className={`p-6 border border-border rounded-sm hover:shadow-md transition-smooth text-left ${
              activeOperation === operation.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className={`w-12 h-12 ${operation.color} rounded-sm flex items-center justify-center mb-4`}>
              <Icon name={operation.icon} size={24} className="text-white" />
            </div>
            <h3 className="text-sm font-medium text-text-primary mb-2">{operation.name}</h3>
            <p className="text-xs text-text-secondary">{operation.description}</p>
          </button>
        ))}
      </div>

      {/* Active Operation Panel */}
      {activeOperation && (
        <div className="bg-surface border border-border rounded-sm p-6">
          {activeOperation === 'import' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Import Users from HRIS</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Upload File</label>
                  <div 
                    className="border-2 border-dashed border-border rounded-sm p-8 text-center cursor-pointer hover:border-primary transition-smooth"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Icon name="Upload" size={48} className="mx-auto text-secondary-400 mb-4" />
                    <p className="text-text-primary font-medium">Click to upload CSV file</p>
                    <p className="text-text-secondary text-sm mt-1">Supports CSV files up to 10MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-3">Required CSV Format</h4>
                  <div className="bg-secondary-50 p-4 rounded-sm">
                    <pre className="text-xs text-text-secondary">
{`name,email,role,department,territory
John Doe,john@company.com,Sales Rep,Sales,West
Jane Smith,jane@company.com,Manager,Sales,East`}
                    </pre>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-sm text-text-secondary">Automatic role mapping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-sm text-text-secondary">Duplicate detection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-sm text-text-secondary">Validation errors report</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {isProcessing && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">Processing...</span>
                    <span className="text-sm text-text-secondary">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeOperation === 'role_assignment' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Bulk Role Assignment</h3>
              
              {selectedUsers.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-info-50 border border-info-200 rounded-sm p-4">
                    <p className="text-sm text-info-800">
                      {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected for role assignment
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Select New Role</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {roles.map(role => (
                        <button
                          key={role.id}
                          onClick={() => handleBulkRoleAssignment(role.id)}
                          disabled={isProcessing}
                          className="p-4 border border-border rounded-sm hover:bg-secondary-50 transition-smooth text-left disabled:opacity-50"
                        >
                          <div className="font-medium text-text-primary">{role.name}</div>
                          <div className="text-sm text-text-secondary">{role.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="Users" size={48} className="mx-auto text-secondary-300 mb-4" />
                  <p className="text-text-secondary">Select users from the User Directory to assign roles</p>
                </div>
              )}
            </div>
          )}

          {activeOperation === 'deactivation' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Bulk Account Deactivation</h3>
              
              {selectedUsers.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-error-50 border border-error-200 rounded-sm p-4">
                    <p className="text-sm text-error-800">
                      ⚠️ This will deactivate {selectedUsers.length} user account{selectedUsers.length > 1 ? 's' : ''}. This action can be reversed.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleBulkDeactivation}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-error text-white rounded-sm hover:bg-error-700 transition-smooth disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : `Deactivate ${selectedUsers.length} Account${selectedUsers.length > 1 ? 's' : ''}`}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="UserX" size={48} className="mx-auto text-secondary-300 mb-4" />
                  <p className="text-text-secondary">Select users from the User Directory to deactivate</p>
                </div>
              )}
            </div>
          )}

          {activeOperation === 'permission_update' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Bulk Permission Updates</h3>
              <div className="text-center py-8">
                <Icon name="Settings" size={48} className="mx-auto text-secondary-300 mb-4" />
                <p className="text-text-secondary">Permission update interface coming soon</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
            <button
              onClick={() => setActiveOperation(null)}
              className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-sm hover:bg-secondary-200 transition-smooth"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Operation History */}
      <div className="bg-surface border border-border rounded-sm">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-medium text-text-primary">Recent Operations</h3>
        </div>
        <div className="divide-y divide-border">
          {operationHistory.map((operation) => (
            <div key={operation.id} className="px-6 py-4 hover:bg-secondary-50 transition-smooth">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={getOperationIcon(operation.type)} size={20} className="text-secondary-600" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{operation.description}</div>
                    <div className="text-xs text-text-secondary">{formatTimestamp(operation.timestamp)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getStatusColor(operation.status)}`}>
                    {operation.status}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {operation.recordsProcessed} processed
                    {operation.recordsFailed > 0 && `, ${operation.recordsFailed} failed`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsPanel;