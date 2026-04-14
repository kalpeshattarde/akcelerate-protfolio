import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActionPanel = ({ selectedCount, onApprove, onReject, onDelegate, onClear }) => {
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [delegateUser, setDelegateUser] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [approvalComment, setApprovalComment] = useState('');

  const delegateOptions = [
    { id: 'john.smith', name: 'John Smith', role: 'Finance Director' },
    { id: 'sarah.johnson', name: 'Sarah Johnson', role: 'VP Finance' },
    { id: 'mike.chen', name: 'Mike Chen', role: 'CFO' }
  ];

  const handleApprove = () => {
    console.log('Approving with comment:', approvalComment);
    onApprove();
    setApprovalComment('');
  };

  const handleDelegate = () => {
    console.log('Delegating to:', delegateUser);
    onDelegate();
    setShowDelegateModal(false);
    setDelegateUser('');
  };

  const handleReject = () => {
    console.log('Rejecting with reason:', rejectReason);
    onReject();
    setShowRejectModal(false);
    setRejectReason('');
  };

  return (
    <>
      <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="font-body-medium text-text-primary">
                {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add approval comment..."
                value={approvalComment}
                onChange={(e) => setApprovalComment(e.target.value)}
                className="px-3 py-1.5 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleApprove}
              className="flex items-center px-3 py-1.5 bg-success text-white rounded-button hover:bg-success-700 transition-smooth text-sm"
            >
              <Icon name="Check" size={16} className="mr-1" />
              Approve ({selectedCount})
            </button>
            
            <button
              onClick={() => setShowRejectModal(true)}
              className="flex items-center px-3 py-1.5 bg-error text-white rounded-button hover:bg-error-600 transition-smooth text-sm"
            >
              <Icon name="X" size={16} className="mr-1" />
              Reject
            </button>
            
            <button
              onClick={() => setShowDelegateModal(true)}
              className="flex items-center px-3 py-1.5 bg-warning text-white rounded-button hover:bg-warning-600 transition-smooth text-sm"
            >
              <Icon name="UserPlus" size={16} className="mr-1" />
              Delegate
            </button>
            
            <button
              onClick={onClear}
              className="flex items-center px-3 py-1.5 bg-secondary-200 text-text-secondary rounded-button hover:bg-secondary-300 transition-smooth text-sm"
            >
              <Icon name="X" size={16} className="mr-1" />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Delegate Modal */}
      {showDelegateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="bg-surface rounded-card p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading-medium text-text-primary">
                Delegate Approval
              </h3>
              <button
                onClick={() => setShowDelegateModal(false)}
                className="p-1 hover:bg-secondary-100 rounded-button transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-body-medium text-text-secondary mb-2">
                Delegate to:
              </label>
              <select
                value={delegateUser}
                onChange={(e) => setDelegateUser(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select approver...</option>
                {delegateOptions.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.role}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDelegateModal(false)}
                className="px-4 py-2 text-text-secondary hover:bg-secondary-100 rounded-button transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleDelegate}
                disabled={!delegateUser}
                className="px-4 py-2 bg-warning text-white rounded-button hover:bg-warning-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delegate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="bg-surface rounded-card p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading-medium text-text-primary">
                Reject Purchase Orders
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="p-1 hover:bg-secondary-100 rounded-button transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-body-medium text-text-secondary mb-2">
                Reason for rejection:
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-24 resize-none"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-text-secondary hover:bg-secondary-100 rounded-button transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 bg-error text-white rounded-button hover:bg-error-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionPanel;