// src/pages/commission-structure-configuration/components/ChangeManagement.jsx
import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const ChangeManagement = ({ changeHistory, canApprove, canEdit, isPreviewMode }) => {
  const [selectedChanges, setSelectedChanges] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalComments, setApprovalComments] = useState('');
  const [impactAnalysis, setImpactAnalysis] = useState(null);

  // Mock additional change data for demonstration
  const [changes] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'John Doe',
      userRole: 'Sales Operations Manager',
      action: 'Tier Structure Update',
      changes: 'Modified Tier 1 commission rate from 8% to 8.5%, updated quota threshold to $1.2M',
      status: 'approved',
      approver: 'Jane Smith',
      approvalDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
      impactedReps: 23,
      estimatedImpact: '+$145,000 annual commission',
      changeType: 'rate_adjustment',
      priority: 'medium'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      user: 'Sarah Johnson',
      userRole: 'Compensation Specialist',
      action: 'Rule Addition',
      changes: 'Added Q4 accelerator rule: 25% bonus for >100% quota attainment in Q4',
      status: 'pending',
      approver: null,
      approvalDate: null,
      impactedReps: 156,
      estimatedImpact: '+$320,000 potential payout',
      changeType: 'rule_addition',
      priority: 'high'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      user: 'Michael Chen',
      userRole: 'Sales Director',
      action: 'Territory Rate Matrix',
      changes: 'Updated West Coast Enterprise rates across all product lines (+0.5%)',
      status: 'rejected',
      approver: 'Jane Smith',
      approvalDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      impactedReps: 45,
      estimatedImpact: '+$89,000 annual commission',
      changeType: 'rate_adjustment',
      priority: 'low',
      rejectionReason: 'Exceeds budget allocation for West Coast territory'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      user: 'Emily Rodriguez',
      userRole: 'Compensation Specialist',
      action: 'SPIF Configuration',
      changes: 'Enabled SPIF eligibility for Tier 3 representatives, added product-specific multipliers',
      status: 'approved',
      approver: 'John Doe',
      approvalDate: new Date(Date.now() - 7 * 60 * 60 * 1000),
      impactedReps: 78,
      estimatedImpact: '+$67,000 potential SPIF payout',
      changeType: 'benefit_addition',
      priority: 'medium'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      user: 'David Thompson',
      userRole: 'System Administrator',
      action: 'Integration Update',
      changes: 'Updated Salesforce data mapping, modified sync frequency to real-time',
      status: 'approved',
      approver: 'Jane Smith',
      approvalDate: new Date(Date.now() - 11 * 60 * 60 * 1000),
      impactedReps: 0,
      estimatedImpact: 'System efficiency improvement',
      changeType: 'system_config',
      priority: 'medium'
    }
  ]);

  // Filter changes
  const filteredChanges = useMemo(() => {
    return changes.filter(change => {
      const statusMatch = filterStatus === 'all' || change.status === filterStatus;
      const userMatch = filterUser === 'all' || change.user === filterUser;
      return statusMatch && userMatch;
    });
  }, [changes, filterStatus, filterUser]);

  // Get unique users for filter
  const uniqueUsers = useMemo(() => {
    return [...new Set(changes.map(change => change.user))];
  }, [changes]);

  // Get status display info
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'approved':
        return { color: 'text-success', bgColor: 'bg-success-100', icon: 'CheckCircle', label: 'Approved' };
      case 'pending':
        return { color: 'text-warning', bgColor: 'bg-warning-100', icon: 'Clock', label: 'Pending' };
      case 'rejected':
        return { color: 'text-error', bgColor: 'bg-error-100', icon: 'XCircle', label: 'Rejected' };
      default:
        return { color: 'text-secondary-400', bgColor: 'bg-secondary-100', icon: 'Circle', label: 'Unknown' };
    }
  };

  // Get priority display
  const getPriorityDisplay = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'text-error', bgColor: 'bg-error-100', label: 'High' };
      case 'medium':
        return { color: 'text-warning', bgColor: 'bg-warning-100', label: 'Medium' };
      case 'low':
        return { color: 'text-success', bgColor: 'bg-success-100', label: 'Low' };
      default:
        return { color: 'text-secondary-400', bgColor: 'bg-secondary-100', label: 'Unknown' };
    }
  };

  // Handle approval
  const handleApproval = (changeId, approved) => {
    if (approved) {
      setSelectedChanges([changeId]);
      setShowApprovalModal(true);
    } else {
      // Handle rejection
      const rejectionReason = prompt('Please provide a reason for rejection:');
      if (rejectionReason) {
        console.log(`Change ${changeId} rejected: ${rejectionReason}`);
        // Here you would update the change status
      }
    }
  };

  // Process approval
  const processApproval = () => {
    selectedChanges.forEach(changeId => {
      console.log(`Approving change ${changeId} with comments: ${approvalComments}`);
      // Here you would update the change status and apply the changes
    });
    setShowApprovalModal(false);
    setApprovalComments('');
    setSelectedChanges([]);
  };

  // Show impact analysis
  const showImpactAnalysis = (change) => {
    setImpactAnalysis({
      change,
      affectedSystems: ['Salesforce CRM', 'ADP Payroll', 'Internal Calculator'],
      riskLevel: change.priority === 'high' ? 'Medium' : 'Low',
      estimatedEffort: '2-4 hours',
      rollbackComplexity: 'Simple',
      dependencies: ['Q4 payout schedule', 'Territory assignments']
    });
  };

  // Get time ago string
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Recently';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Change Management</h2>
          <p className="text-sm text-white/70 mt-1">
            Track modifications with user attribution, timestamps, and impact analysis for SOX compliance.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Filters */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select-glass"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="select-glass"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['pending', 'approved', 'rejected'].map(status => {
          const count = changes.filter(c => c.status === status).length;
          const display = getStatusDisplay(status);
          
          return (
            <div key={status} className="card-glass-compact">
              <div className="flex items-center space-x-3">
                <div className={`p-2 glass-morphism-elevated rounded-sm`}>
                  <Icon name={display.icon} size={20} className={display.color === 'text-success' ? 'text-neon-teal' : display.color === 'text-warning' ? 'text-yellow-400' : display.color === 'text-error' ? 'text-red-400' : 'text-white/60'} />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">{count}</div>
                  <div className="text-sm text-white/70">{display.label}</div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Total Impact */}
        <div className="card-glass-compact">
          <div className="flex items-center space-x-3">
            <div className="p-2 glass-morphism-elevated rounded-sm">
              <Icon name="TrendingUp" size={20} className="text-neon-indigo" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">
                {changes.filter(c => c.status === 'approved').reduce((sum, c) => {
                  const match = c.estimatedImpact.match(/[\+\-]?\$([\d,]+)/);
                  return sum + (match ? parseInt(match[1].replace(/,/g, '')) : 0);
                }, 0).toLocaleString()}
              </div>
              <div className="text-sm text-white/70">Total Impact ($)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Changes List */}
      <div className="card-glass rounded-xl">
        <div className="p-4 border-b border-glass-border">
          <h3 className="font-medium text-white">Change History</h3>
          <p className="text-sm text-white/70 mt-1">
            Complete audit trail with user attribution and approval workflow.
          </p>
        </div>

        <div className="divide-y divide-glass-border">
          {filteredChanges.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="History" size={48} className="text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Changes Found</h3>
              <p className="text-white/70">
                No changes match the current filter criteria.
              </p>
            </div>
          ) : (
            filteredChanges.map((change) => {
              const statusDisplay = getStatusDisplay(change.status);
              const priorityDisplay = getPriorityDisplay(change.priority);
              
              return (
                <div key={change.id} className="p-4 hover:bg-glass-white-hover transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-white">{change.action}</h4>
                        <span className={`px-2 py-1 text-xs rounded glass-morphism-elevated border border-glass-border ${
                          statusDisplay.color === 'text-success' ? 'text-neon-teal' : 
                          statusDisplay.color === 'text-warning' ? 'text-yellow-400' : 
                          statusDisplay.color === 'text-error' ? 'text-red-400' : 'text-white/60'
                        }`}>
                          {statusDisplay.label}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded glass-morphism-elevated border border-glass-border ${
                          priorityDisplay.color === 'text-error' ? 'text-red-400' : 
                          priorityDisplay.color === 'text-warning' ? 'text-yellow-400' : 
                          priorityDisplay.color === 'text-success' ? 'text-neon-teal' : 'text-white/60'
                        }`}>
                          {priorityDisplay.label}
                        </span>
                      </div>
                      
                      <p className="text-sm text-white/70 mb-3">{change.changes}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-white">User:</span>
                          <div className="text-white/70">{change.user}</div>
                          <div className="text-xs text-white/60">{change.userRole}</div>
                        </div>
                        <div>
                          <span className="font-medium text-white">Timestamp:</span>
                          <div className="text-white/70">{getTimeAgo(change.timestamp)}</div>
                          <div className="text-xs text-white/60">
                            {change.timestamp.toLocaleDateString()} {change.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-white">Impact:</span>
                          <div className="text-white/70">{change.impactedReps} reps</div>
                          <div className="text-xs text-white/60">{change.estimatedImpact}</div>
                        </div>
                        <div>
                          <span className="font-medium text-white">Approval:</span>
                          {change.approver ? (
                            <div>
                              <div className="text-white/70">{change.approver}</div>
                              <div className="text-xs text-white/60">
                                {change.approvalDate ? getTimeAgo(change.approvalDate) : 'N/A'}
                              </div>
                            </div>
                          ) : (
                            <div className="text-white/70">Pending</div>
                          )}
                        </div>
                      </div>

                      {/* Rejection Reason */}
                      {change.status === 'rejected' && change.rejectionReason && (
                        <div className="mt-3 p-3 glass-morphism-elevated border border-red-400/30 rounded-sm">
                          <div className="flex items-center space-x-2">
                            <Icon name="AlertTriangle" size={16} className="text-red-400" />
                            <span className="text-sm font-medium text-red-400">Rejection Reason:</span>
                          </div>
                          <p className="text-sm text-red-300 mt-1">{change.rejectionReason}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      {/* Impact Analysis */}
                      <button
                        onClick={() => showImpactAnalysis(change)}
                        className="p-2 text-neon-indigo hover:bg-glass-white-hover rounded transition-smooth"
                        title="View impact analysis"
                      >
                        <Icon name="BarChart3" size={16} />
                      </button>

                      {/* Approval Actions */}
                      {change.status === 'pending' && canApprove && !isPreviewMode && (
                        <>
                          <button
                            onClick={() => handleApproval(change.id, true)}
                            className="p-2 text-neon-teal hover:bg-glass-white-hover rounded transition-smooth"
                            title="Approve change"
                          >
                            <Icon name="Check" size={16} />
                          </button>
                          <button
                            onClick={() => handleApproval(change.id, false)}
                            className="p-2 text-red-400 hover:bg-glass-white-hover rounded transition-smooth"
                            title="Reject change"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </>
                      )}

                      {/* Rollback */}
                      {change.status === 'approved' && canApprove && !isPreviewMode && (
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to rollback this change?')) {
                              console.log(`Rolling back change ${change.id}`);
                            }
                          }}
                          className="p-2 text-yellow-400 hover:bg-glass-white-hover rounded transition-smooth"
                          title="Rollback change"
                        >
                          <Icon name="RotateCcw" size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 modal-overlay-dark flex items-center justify-center z-150 p-4">
          <div className="modal-glass max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Approve Changes</h3>
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Approval Comments (Optional)
                  </label>
                  <textarea
                    value={approvalComments}
                    onChange={(e) => setApprovalComments(e.target.value)}
                    rows={3}
                    className="textarea-glass w-full"
                    placeholder="Add any notes or conditions for this approval..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="btn-glass-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={processApproval}
                  className="btn-glass-primary glow-teal"
                >
                  Approve Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Impact Analysis Modal */}
      {impactAnalysis && (
        <div className="fixed inset-0 modal-overlay-dark flex items-center justify-center z-150 p-4">
          <div className="modal-glass max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Impact Analysis</h3>
                <button
                  onClick={() => setImpactAnalysis(null)}
                  className="text-white/60 hover:text-white"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Change Details</h4>
                  <div className="p-3 glass-morphism-elevated rounded-sm border border-glass-border">
                    <div className="font-medium text-white">{impactAnalysis.change.action}</div>
                    <div className="text-sm text-white/70 mt-1">{impactAnalysis.change.changes}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-white mb-2">Risk Assessment</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Risk Level:</span>
                        <span className={`font-medium ${
                          impactAnalysis.riskLevel === 'High' ? 'text-red-400' : 
                          impactAnalysis.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-neon-teal'
                        }`}>{impactAnalysis.riskLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Estimated Effort:</span>
                        <span className="text-white">{impactAnalysis.estimatedEffort}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Rollback Complexity:</span>
                        <span className="text-white">{impactAnalysis.rollbackComplexity}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-white mb-2">Affected Systems</h5>
                    <ul className="space-y-1 text-sm">
                      {impactAnalysis.affectedSystems.map((system, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={12} className="text-neon-teal" />
                          <span className="text-white/70">{system}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-white mb-2">Dependencies</h5>
                  <ul className="space-y-1 text-sm">
                    {impactAnalysis.dependencies.map((dep, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={12} className="text-yellow-400" />
                        <span className="text-white/70">{dep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setImpactAnalysis(null)}
                  className="btn-glass-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeManagement;