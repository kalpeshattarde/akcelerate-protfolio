// src/pages/bulk-operations-center/components/RollbackCapabilities.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const RollbackCapabilities = ({ rollbackOperations, onRollback }) => {
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [rollbackReason, setRollbackReason] = useState('');
  const [impactAnalysis, setImpactAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock rollback operations with 24-hour window
  const mockOperations = [
    {
      id: 'OP-2024-001',
      type: 'Mass Scenario Application',
      executedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      user: 'John Doe',
      affectedRecords: 248,
      payoutChange: 125000,
      status: 'rollback_available',
      remainingTime: 16 * 60 * 60 * 1000, // 16 hours remaining
      details: 'Q4 bonus scenario applied to West Coast region'
    },
    {
      id: 'OP-2024-002',
      type: 'Tier Reassignments',
      executedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      user: 'Sarah Johnson',
      affectedRecords: 75,
      payoutChange: -15000,
      status: 'rollback_available',
      remainingTime: 12 * 60 * 60 * 1000, // 12 hours remaining
      details: 'Tier adjustments based on Q3 performance review'
    },
    {
      id: 'OP-2024-003',
      type: 'Quota Adjustments',
      executedAt: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20 hours ago
      user: 'Michael Chen',
      affectedRecords: 156,
      payoutChange: 87500,
      status: 'rollback_available',
      remainingTime: 4 * 60 * 60 * 1000, // 4 hours remaining
      details: 'Annual quota adjustments for sales representatives'
    },
    {
      id: 'OP-2024-004',
      type: 'Commission Recalculations',
      executedAt: new Date(Date.now() - 26 * 60 * 60 * 1000), // 26 hours ago
      user: 'Emily Rodriguez',
      affectedRecords: 89,
      payoutChange: 45000,
      status: 'rollback_expired',
      remainingTime: 0,
      details: 'Retroactive commission corrections for July period'
    }
  ];

  const operations = rollbackOperations?.length > 0 ? rollbackOperations : mockOperations;

  const formatTimeRemaining = (milliseconds) => {
    if (milliseconds <= 0) return 'Expired';
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'rollback_available': return 'success';
      case 'rollback_expired': return 'secondary';
      case 'rolling_back': return 'warning';
      case 'rollback_completed': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'rollback_available': return 'RotateCcw';
      case 'rollback_expired': return 'Clock';
      case 'rolling_back': return 'RefreshCw';
      case 'rollback_completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'rollback_available': return 'Available for Rollback';
      case 'rollback_expired': return 'Rollback Expired';
      case 'rolling_back': return 'Rolling Back';
      case 'rollback_completed': return 'Rollback Completed';
      default: return 'Unknown';
    }
  };

  const analyzeRollbackImpact = async (operation) => {
    setIsAnalyzing(true);
    
    // Simulate impact analysis
    setTimeout(() => {
      const mockImpact = {
        affectedEmployees: operation.affectedRecords,
        payoutReversion: -operation.payoutChange,
        dataIntegrityChecks: {
          hris: 'passed',
          payroll: 'passed',
          crm: 'warning' // Some dependent calculations may need review
        },
        dependentOperations: [
          {
            id: 'OP-2024-005',
            type: 'Commission Calculations',
            impact: 'Requires recalculation'
          }
        ],
        estimatedDuration: '5-10 minutes',
        risks: [
          'Dependent commission calculations will need to be recalculated',
          'Employee notifications will be sent automatically',
          'Audit trail will be updated with rollback information'
        ]
      };
      
      setImpactAnalysis(mockImpact);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleRollbackClick = (operation) => {
    setSelectedOperation(operation);
    setShowRollbackModal(true);
    analyzeRollbackImpact(operation);
  };

  const handleConfirmRollback = () => {
    if (selectedOperation && rollbackReason.trim()) {
      onRollback(selectedOperation.id);
      setShowRollbackModal(false);
      setSelectedOperation(null);
      setRollbackReason('');
      setImpactAnalysis(null);
    }
  };

  const handleCloseModal = () => {
    setShowRollbackModal(false);
    setSelectedOperation(null);
    setRollbackReason('');
    setImpactAnalysis(null);
  };

  const availableOperations = operations.filter(op => op.status === 'rollback_available');
  const expiredOperations = operations.filter(op => op.status === 'rollback_expired');

  return (
    <>
      <div className="glass-morphism border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-white">Rollback Capabilities</h3>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 glass-morphism-elevated rounded-full flex items-center justify-center border border-warning/30">
                <span className="text-xs font-medium text-warning">{availableOperations.length}</span>
              </div>
              <span className="text-sm text-white/70">available</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm text-white/70">24-hour rollback window</span>
          </div>
        </div>

        {/* Available Rollbacks */}
        {availableOperations.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
              <Icon name="RotateCcw" size={16} className="text-success" />
              <span>Available for Rollback</span>
            </h4>
            
            <div className="space-y-3">
              {availableOperations.map((operation) => {
                const statusColor = getStatusColor(operation.status);
                const statusIcon = getStatusIcon(operation.status);
                
                return (
                  <div key={operation.id} className="border border-success/30 glass-morphism-elevated rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name={statusIcon} size={16} className={`text-${statusColor}`} />
                          <span className="font-medium text-white">{operation.type}</span>
                          <span className="text-xs glass-morphism-dark text-white/70 px-2 py-1 rounded">
                            {operation.id}
                          </span>
                        </div>
                        
                        <p className="text-sm text-white/70 mb-2">{operation.details}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium text-white/60">Executed:</span>
                            <p className="text-white">{operation.executedAt.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium text-white/60">User:</span>
                            <p className="text-white">{operation.user}</p>
                          </div>
                          <div>
                            <span className="font-medium text-white/60">Records:</span>
                            <p className="text-white">{operation.affectedRecords.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium text-white/60">Payout Impact:</span>
                            <p className={`text-white ${
                              operation.payoutChange > 0 ? 'text-success' : 'text-error'
                            }`}>
                              {operation.payoutChange > 0 ? '+' : ''}{formatCurrency(operation.payoutChange)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-warning">
                            <Icon name="Clock" size={14} />
                            <span className="text-sm font-medium">
                              {formatTimeRemaining(operation.remainingTime)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleRollbackClick(operation)}
                        className="flex items-center space-x-2 px-4 py-2 bg-warning text-white rounded-sm hover:bg-amber-600 transition-smooth"
                      >
                        <Icon name="RotateCcw" size={16} />
                        <span>Rollback</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Expired Rollbacks */}
        {expiredOperations.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-white/60" />
              <span>Rollback Expired</span>
            </h4>
            
            <div className="space-y-3">
              {expiredOperations.map((operation) => (
                <div key={operation.id} className="border border-white/20 glass-morphism-dark rounded-xl p-4 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Clock" size={16} className="text-white/60" />
                        <span className="font-medium text-white">{operation.type}</span>
                        <span className="text-xs glass-morphism-elevated text-white/60 px-2 py-1 rounded">
                          {operation.id}
                        </span>
                        <span className="text-xs glass-morphism-elevated text-error px-2 py-1 rounded">
                          Expired
                        </span>
                      </div>
                      
                      <p className="text-sm text-white/70 mb-2">{operation.details}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-white/60">Executed:</span>
                          <p className="text-white">{operation.executedAt.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-white/60">User:</span>
                          <p className="text-white">{operation.user}</p>
                        </div>
                        <div>
                          <span className="font-medium text-white/60">Records:</span>
                          <p className="text-white">{operation.affectedRecords.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-white/60">Payout Impact:</span>
                          <p className={`text-white ${
                            operation.payoutChange > 0 ? 'text-success' : 'text-error'
                          }`}>
                            {operation.payoutChange > 0 ? '+' : ''}{formatCurrency(operation.payoutChange)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-error font-medium">Rollback Expired</p>
                      <p className="text-xs text-white/60">Contact IT for data recovery</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {operations.length === 0 && (
          <div className="text-center py-8">
            <Icon name="RotateCcw" size={48} className="text-white/30 mx-auto mb-3" />
            <p className="text-white/70">No operations available for rollback</p>
            <p className="text-sm text-white/60 mt-1">
              Operations can be rolled back within 24 hours of execution
            </p>
          </div>
        )}

        {/* Information Panel */}
        <div className="p-3 glass-morphism-elevated border border-info/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-info" />
            <h4 className="font-medium text-white">Rollback Policy</h4>
          </div>
          <div className="text-sm text-white/70 space-y-1">
            <p>• Operations can be rolled back within 24 hours of execution</p>
            <p>• Rollback includes complete data reversion and impact analysis</p>
            <p>• Dependent calculations and downstream systems are automatically updated</p>
            <p>• All rollback actions are logged in the audit trail for compliance</p>
          </div>
        </div>
      </div>

      {/* Rollback Confirmation Modal */}
      {showRollbackModal && selectedOperation && (
        <div className="fixed inset-0 modal-overlay-dark flex items-center justify-center z-50">
          <div className="modal-glass max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 glass-morphism-elevated rounded-full flex items-center justify-center border border-warning/30">
                  <Icon name="RotateCcw" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Confirm Rollback</h3>
                  <p className="text-sm text-white/70">{selectedOperation.type} - {selectedOperation.id}</p>
                </div>
              </div>

              {/* Operation Details */}
              <div className="glass-morphism-dark rounded-lg p-4 mb-6">
                <h4 className="font-medium text-white mb-3">Operation Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-white/60">Executed:</span>
                    <p className="text-white">{selectedOperation.executedAt.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-white/60">User:</span>
                    <p className="text-white">{selectedOperation.user}</p>
                  </div>
                  <div>
                    <span className="font-medium text-white/60">Affected Records:</span>
                    <p className="text-white">{selectedOperation.affectedRecords.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-white/60">Payout Change:</span>
                    <p className={`text-white ${
                      selectedOperation.payoutChange > 0 ? 'text-success' : 'text-error'
                    }`}>
                      {selectedOperation.payoutChange > 0 ? '+' : ''}{formatCurrency(selectedOperation.payoutChange)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Impact Analysis */}
              {isAnalyzing ? (
                <div className="glass-morphism-dark rounded-lg p-4 mb-6 text-center">
                  <div className="w-8 h-8 mx-auto mb-2">
                    <Icon name="RefreshCw" size={32} className="text-neon-indigo animate-spin" />
                  </div>
                  <p className="text-sm text-white">Analyzing rollback impact...</p>
                </div>
              ) : impactAnalysis && (
                <div className="glass-morphism-elevated border border-warning/30 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-white mb-3 flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span>Impact Analysis</span>
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-white/60">Affected Employees:</span>
                        <p className="text-white">{impactAnalysis.affectedEmployees}</p>
                      </div>
                      <div>
                        <span className="font-medium text-white/60">Payout Reversion:</span>
                        <p className={`text-white ${
                          impactAnalysis.payoutReversion > 0 ? 'text-success' : 'text-error'
                        }`}>
                          {impactAnalysis.payoutReversion > 0 ? '+' : ''}{formatCurrency(impactAnalysis.payoutReversion)}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-white/60 mb-2 block">Data Integrity Checks:</span>
                      <div className="flex items-center space-x-4">
                        {Object.entries(impactAnalysis.dataIntegrityChecks).map(([system, status]) => (
                          <div key={system} className="flex items-center space-x-2">
                            <Icon 
                              name={status === 'passed' ? 'CheckCircle' : 'AlertTriangle'} 
                              size={14} 
                              className={status === 'passed' ? 'text-success' : 'text-warning'} 
                            />
                            <span className="text-sm text-white uppercase">{system}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {impactAnalysis.risks && (
                      <div>
                        <span className="font-medium text-white/60 mb-2 block">Potential Risks:</span>
                        <ul className="text-sm text-white/70 space-y-1">
                          {impactAnalysis.risks.map((risk, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-warning mt-1">•</span>
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rollback Reason */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Rollback Reason <span className="text-error">*</span>
                </label>
                <textarea
                  value={rollbackReason}
                  onChange={(e) => setRollbackReason(e.target.value)}
                  className="textarea-glass w-full"
                  rows={3}
                  placeholder="Please provide a detailed reason for rolling back this operation..."
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-white/70 hover:text-white transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRollback}
                  disabled={!rollbackReason.trim() || isAnalyzing}
                  className="flex items-center space-x-2 px-4 py-2 bg-warning text-white rounded-sm hover:bg-amber-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="RotateCcw" size={16} />
                  <span>Confirm Rollback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RollbackCapabilities;