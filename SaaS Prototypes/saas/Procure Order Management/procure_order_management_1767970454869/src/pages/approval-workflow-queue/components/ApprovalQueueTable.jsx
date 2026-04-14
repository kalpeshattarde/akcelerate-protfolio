import React from 'react';
import Icon from '../../../components/AppIcon';

const ApprovalQueueTable = ({ 
  approvalQueue, 
  selectedItems, 
  onSelectItem, 
  onSelectAll, 
  expandedRow, 
  onExpandRow,
  userRole 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error bg-error-50 border-error-200';
      case 'high': return 'text-warning bg-warning-50 border-warning-200';
      case 'medium': return 'text-primary bg-primary-50 border-primary-200';
      case 'low': return 'text-success bg-success-50 border-success-200';
      default: return 'text-text-secondary bg-secondary-50 border-secondary-200';
    }
  };

  const getComplianceColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-success bg-success-50';
      case 'review_required': return 'text-warning bg-warning-50';
      case 'non_compliant': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const handleApprove = (item) => {
    console.log('Approving:', item.id);
  };

  const handleReject = (item) => {
    console.log('Rejecting:', item.id);
  };

  const handleDelegate = (item) => {
    console.log('Delegating:', item.id);
  };

  const canApprove = (item) => {
    const amount = item.amount;
    if (userRole === 'admin') return true;
    if (userRole === 'finance') return amount <= 50000;
    return amount <= 10000;
  };

  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-border bg-secondary-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === approvalQueue.length && approvalQueue.length > 0}
                onChange={onSelectAll}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm font-body-medium text-text-secondary">
                Select All ({approvalQueue.length})
              </span>
            </label>
          </div>
          <div className="text-sm text-text-secondary">
            Showing {approvalQueue.length} pending approvals
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Select
              </th>
              <th className="px-6 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                PO Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Requestor
              </th>
              <th className="px-6 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-heading-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {approvalQueue.map((item) => (
              <React.Fragment key={item.id}>
                <tr className={`hover:bg-secondary-50 transition-smooth ${
                  selectedItems.includes(item.id) ? 'bg-primary-50' : ''
                }`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => onSelectItem(item.id)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onExpandRow(expandedRow === item.id ? null : item.id)}
                        className="p-1 hover:bg-secondary-100 rounded-button transition-smooth"
                      >
                        <Icon 
                          name={expandedRow === item.id ? 'ChevronDown' : 'ChevronRight'} 
                          size={16} 
                          className="text-text-secondary"
                        />
                      </button>
                      <div>
                        <div className="font-body-medium text-text-primary">{item.poNumber}</div>
                        <div className="text-sm text-text-secondary">{item.supplier}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-body-medium text-text-primary">{item.requestor}</div>
                      <div className="text-sm text-text-secondary">{item.requestorDept}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="font-body-medium text-text-primary">
                      {formatCurrency(item.amount)}
                    </div>
                    {!canApprove(item) && (
                      <div className="text-xs text-error">Exceeds limit</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium border ${getPriorityColor(item.priority)}`}>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-text-primary">{formatDate(item.dueDate)}</div>
                    {new Date(item.dueDate) < new Date() && (
                      <div className="text-xs text-error">Overdue</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleApprove(item)}
                        disabled={!canApprove(item)}
                        className="p-2 text-success hover:bg-success-50 rounded-button transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Approve"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(item)}
                        className="p-2 text-error hover:bg-error-50 rounded-button transition-smooth"
                        title="Reject"
                      >
                        <Icon name="X" size={16} />
                      </button>
                      <button
                        onClick={() => handleDelegate(item)}
                        className="p-2 text-warning hover:bg-warning-50 rounded-button transition-smooth"
                        title="Delegate"
                      >
                        <Icon name="UserPlus" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {expandedRow === item.id && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 bg-secondary-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* PO Details */}
                        <div>
                          <h4 className="font-heading-medium text-text-primary mb-3">Purchase Order Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Description:</span>
                              <span className="text-text-primary font-body-medium">{item.description}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Budget Impact:</span>
                              <span className="text-text-primary">{item.budgetImpact}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Risk Level:</span>
                              <span className={`${item.riskLevel === 'high' ? 'text-error' : item.riskLevel === 'medium' ? 'text-warning' : 'text-success'}`}>
                                {item.riskLevel.charAt(0).toUpperCase() + item.riskLevel.slice(1)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Compliance:</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${getComplianceColor(item.complianceStatus)}`}>
                                {item.complianceStatus.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-secondary">Attachments:</span>
                              <span className="text-text-primary">{item.attachments} files</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Approval History */}
                        <div>
                          <h4 className="font-heading-medium text-text-primary mb-3">Approval History</h4>
                          <div className="space-y-3">
                            {item.approvalHistory.map((approval, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-button border border-border">
                                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="font-body-medium text-text-primary">{approval.approver}</div>
                                      <div className="text-xs text-text-secondary">{approval.role}</div>
                                    </div>
                                    <div className="text-xs text-text-secondary">{formatDate(approval.date)}</div>
                                  </div>
                                  {approval.comment && (
                                    <div className="text-sm text-text-secondary mt-1">{approval.comment}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                            
                            {/* Next Approver */}
                            <div className="flex items-start space-x-3 p-3 bg-warning-50 rounded-button border border-warning-200">
                              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                              <div className="flex-1">
                                <div className="font-body-medium text-text-primary">Pending: {item.nextApprover}</div>
                                <div className="text-xs text-text-secondary">Awaiting approval</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {approvalQueue.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-heading-medium text-text-primary mb-2">
            No Pending Approvals
          </h3>
          <p className="text-text-secondary">
            All purchase orders have been processed. Great work!
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovalQueueTable;