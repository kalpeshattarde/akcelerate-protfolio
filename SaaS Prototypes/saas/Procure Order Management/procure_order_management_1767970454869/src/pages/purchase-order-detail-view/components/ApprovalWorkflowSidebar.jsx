// /home/ubuntu/app/procureflow/src/pages/purchase-order-detail-view/components/ApprovalWorkflowSidebar.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ApprovalWorkflowSidebar = ({ purchaseOrder, userRole }) => {
  const [activeTab, setActiveTab] = useState('workflow');
  const [newComment, setNewComment] = useState('');

  const formatDateTime = (date) => {
    if (!date) return '—';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return { icon: 'CheckCircle', color: 'text-success' };
      case 'pending': return { icon: 'Clock', color: 'text-warning' };
      case 'rejected': return { icon: 'XCircle', color: 'text-error' };
      case 'waiting': return { icon: 'Circle', color: 'text-text-secondary' };
      default: return { icon: 'Circle', color: 'text-text-secondary' };
    }
  };

  const getSyncStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'synced': return 'text-success';
      case 'pending': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Mock comment addition
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  const tabs = [
    { id: 'workflow', label: 'Workflow', icon: 'GitBranch' },
    { id: 'comments', label: 'Comments', icon: 'MessageSquare' },
    { id: 'attachments', label: 'Files', icon: 'Paperclip' },
    { id: 'audit', label: 'Audit', icon: 'Shield' }
  ];

  return (
    <div className="bg-surface border border-border rounded-card shadow-elevation-sm h-fit">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center px-2 py-3 text-xs lg:text-sm font-body-medium transition-smooth ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
            >
              <Icon name={tab.icon} size={16} className="mb-1" />
              <span className="hidden sm:inline truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content - Scrollable Area */}
      <div className="max-h-96 lg:max-h-screen lg:overflow-y-auto">
        {activeTab === 'workflow' && (
          <div className="p-4 space-y-4">
            <h3 className="text-base font-heading-medium text-text-primary">Approval Workflow</h3>
            
            <div className="space-y-3">
              {purchaseOrder?.approvalWorkflow?.map((step, index) => {
                const statusInfo = getStatusIcon(step.status);
                return (
                  <div key={step.id} className="relative">
                    {index < purchaseOrder.approvalWorkflow.length - 1 && (
                      <div className="absolute left-3 top-8 w-px h-8 bg-border"></div>
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <Icon name={statusInfo.icon} size={20} className={`${statusInfo.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-body-medium text-text-primary break-words">{step.step}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2 ${
                            step.status === 'Approved' ? 'bg-success-100 text-success-700' :
                            step.status === 'Pending'? 'bg-warning-100 text-warning-700' : 'bg-secondary-100 text-secondary-700'
                          }`}>
                            {step.status}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary break-words">{step.approver}</p>
                        {step.timestamp && (
                          <p className="text-xs text-text-secondary mt-1">
                            {formatDateTime(step.timestamp)}
                          </p>
                        )}
                        {step.comments && (
                          <p className="text-sm text-text-primary mt-2 p-2 bg-secondary-50 rounded text-sm break-words">
                            {step.comments}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ERP Sync Status */}
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-heading-medium text-text-primary mb-3">ERP Integration</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Status</span>
                  <span className={`text-sm font-body-medium ${getSyncStatusColor(purchaseOrder?.erpSyncStatus?.status)} break-words`}>
                    {purchaseOrder?.erpSyncStatus?.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Last Sync</span>
                  <span className="text-sm text-text-primary break-words">
                    {formatDateTime(purchaseOrder?.erpSyncStatus?.lastSync)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Next Sync</span>
                  <span className="text-sm text-text-primary break-words">
                    {formatDateTime(purchaseOrder?.erpSyncStatus?.nextSync)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="p-4 space-y-4">
            <h3 className="text-base font-heading-medium text-text-primary">Comments</h3>
            
            {/* Add Comment */}
            <div className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="w-full px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-smooth text-sm font-body-medium"
              >
                Add Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {purchaseOrder?.comments?.map((comment) => (
                <div key={comment.id} className="p-3 bg-secondary-50 rounded-card">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <h5 className="text-sm font-body-medium text-text-primary break-words">{comment.author}</h5>
                      <p className="text-xs text-text-secondary break-words">{comment.role}</p>
                    </div>
                    <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                      {formatDateTime(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary break-words">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-heading-medium text-text-primary">Attachments</h3>
              <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
                <Icon name="Plus" size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              {purchaseOrder?.attachments?.map((attachment) => (
                <div key={attachment.id} className="flex items-center space-x-3 p-3 border border-border rounded-card hover:bg-secondary-50 transition-smooth">
                  <div className="flex-shrink-0">
                    <Icon 
                      name={attachment.type.includes('pdf') ? 'FileText' : 'FileSpreadsheet'} 
                      size={20} 
                      className="text-text-secondary" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-body-medium text-text-primary truncate" title={attachment.name}>
                      {attachment.name}
                    </h5>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <span>{attachment.size}</span>
                      <span>•</span>
                      <span className="truncate">{attachment.uploadedBy}</span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 p-1 text-text-secondary hover:text-text-primary transition-smooth">
                    <Icon name="Download" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="p-4 space-y-4">
            <h3 className="text-base font-heading-medium text-text-primary">Audit History</h3>
            
            <div className="space-y-3">
              {purchaseOrder?.auditHistory?.map((entry, index) => (
                <div key={entry.id} className="relative">
                  {index < purchaseOrder.auditHistory.length - 1 && (
                    <div className="absolute left-2 top-6 w-px h-full bg-border"></div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h5 className="text-sm font-body-medium text-text-primary break-words">{entry.action}</h5>
                        <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                          {formatDateTime(entry.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary break-words">{entry.user}</p>
                      <p className="text-sm text-text-primary mt-1 break-words">{entry.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalWorkflowSidebar;